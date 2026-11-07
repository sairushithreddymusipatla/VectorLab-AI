/**
 * VectorLab AI - API Service
 * Communicates with Flask backend (SentenceTransformers all-MiniLM-L6-v2).
 * Includes robust error handling and honest labeled fallback simulation
 * if the backend is offline.
 */

import {
  BackendStatus,
  EmbeddingResult,
  ComparisonResult,
  SearchResponse,
  VisPoint,
} from '../types';

const API_BASE = 'http://127.0.0.1:5000/api';

// Cache backend health to prevent spamming
let cachedStatus: BackendStatus = {
  isHealthy: false,
  isLoaded: false,
  modelName: 'sentence-transformers/all-MiniLM-L6-v2',
  dimension: 384,
  device: 'unknown',
  lastChecked: 0,
  usingFallback: false,
};

export async function checkBackendHealth(): Promise<BackendStatus> {
  const now = Date.now();
  // Check at most every 5 seconds
  if (now - cachedStatus.lastChecked < 5000 && cachedStatus.isHealthy) {
    return cachedStatus;
  }

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 2500);

    const res = await fetch(`${API_BASE}/health`, {
      signal: controller.signal,
    });
    clearTimeout(timeoutId);

    if (res.ok) {
      const data = await res.json();
      cachedStatus = {
        isHealthy: true,
        isLoaded: data.model_status?.is_loaded ?? false,
        modelName: data.model_status?.model_name ?? 'sentence-transformers/all-MiniLM-L6-v2',
        dimension: data.model_status?.dimension ?? 384,
        device: data.model_status?.device ?? 'cpu',
        lastChecked: now,
        usingFallback: false,
      };
      return cachedStatus;
    }
  } catch (e) {
    // Backend not running or unreachable
  }

  cachedStatus = {
    isHealthy: false,
    isLoaded: false,
    modelName: 'sentence-transformers/all-MiniLM-L6-v2 (Offline)',
    dimension: 384,
    device: 'fallback-browser-sim',
    lastChecked: now,
    usingFallback: true,
  };
  return cachedStatus;
}

export async function generateEmbedding(text: string): Promise<{ data: EmbeddingResult; isFallback: boolean }> {
  try {
    const res = await fetch(`${API_BASE}/embed`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text }),
    });

    if (res.ok) {
      const data = await res.json();
      return { data, isFallback: false };
    }
  } catch (e) {
    // Fall back to illustrative data
  }

  // Honest illustrative fallback generator
  return {
    data: generateIllustrativeEmbedding(text),
    isFallback: true,
  };
}

export async function compareSentences(textA: string, textB: string): Promise<{ data: ComparisonResult; isFallback: boolean }> {
  try {
    const res = await fetch(`${API_BASE}/compare`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text_a: textA, text_b: textB }),
    });

    if (res.ok) {
      const data = await res.json();
      return { data, isFallback: false };
    }
  } catch (e) {
    // Fall back
  }

  return {
    data: generateIllustrativeComparison(textA, textB),
    isFallback: true,
  };
}

export async function searchDocuments(
  query: string,
  documents: string[],
  topK?: number
): Promise<{ data: SearchResponse; isFallback: boolean }> {
  try {
    const res = await fetch(`${API_BASE}/search`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query, documents, top_k: topK }),
    });

    if (res.ok) {
      const data = await res.json();
      return { data, isFallback: false };
    }
  } catch (e) {
    // Fall back
  }

  return {
    data: generateIllustrativeSearch(query, documents, topK),
    isFallback: true,
  };
}

export async function get2DProjection(texts: string[]): Promise<{ points: VisPoint[]; isFallback: boolean }> {
  try {
    const res = await fetch(`${API_BASE}/visualize`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ texts }),
    });

    if (res.ok) {
      const data = await res.json();
      const points: VisPoint[] = data.points.map((pt: any) => ({
        id: pt.id,
        text: pt.text,
        x: pt.x,
        y: pt.y,
        category: categorizeText(pt.text),
      }));
      return { points, isFallback: false };
    }
  } catch (e) {
    // Fall back
  }

  return {
    points: generateIllustrative2DPoints(texts),
    isFallback: true,
  };
}

// -------------------------------------------------------------
// HONEST ILLUSTRATIVE FALLBACK CALCULATIONS (Transparently labeled)
// -------------------------------------------------------------

function simpleHash(str: string, seed = 0): number {
  let h = seed;
  for (let i = 0; i < str.length; i++) {
    h = Math.imul(31, h) + str.charCodeAt(i) | 0;
  }
  return h;
}

function generateIllustrativeEmbedding(text: string): EmbeddingResult {
  const vector: number[] = [];
  const dim = 384;
  let sumSq = 0;

  for (let i = 0; i < dim; i++) {
    const pseudo = Math.sin(simpleHash(text, i * 17) + i * 0.1);
    vector.push(pseudo);
    sumSq += pseudo * pseudo;
  }

  // Normalize vector to unit length
  const norm = Math.sqrt(sumSq);
  const normalized = vector.map(v => Number((v / (norm || 1)).toFixed(4)));

  return {
    text,
    dimension: dim,
    vector: normalized,
    sample_slice: normalized.slice(0, 8),
    vector_norm: 1.0,
    min_val: Math.min(...normalized),
    max_val: Math.max(...normalized),
    mean_val: Number((normalized.reduce((a, b) => a + b, 0) / dim).toFixed(4)),
  };
}

function generateIllustrativeComparison(textA: string, textB: string): ComparisonResult {
  const embA = generateIllustrativeEmbedding(textA);
  const embB = generateIllustrativeEmbedding(textB);

  // Compute cosine similarity between illustrative vectors
  let dot = 0;
  for (let i = 0; i < embA.vector.length; i++) {
    dot += embA.vector[i] * embB.vector[i];
  }

  // If words overlap heavily, adjust score higher to reflect semantic affinity
  const wordsA = new Set(textA.toLowerCase().split(/\s+/));
  const wordsB = new Set(textB.toLowerCase().split(/\s+/));
  const overlap = [...wordsA].filter(w => wordsB.has(w)).length;
  const jaccard = overlap / Math.max(1, wordsA.size + wordsB.size - overlap);

  const finalSim = Math.max(-0.2, Math.min(0.98, Number((dot * 0.4 + jaccard * 0.6).toFixed(4))));
  const angleRad = Math.acos(Math.max(-1, Math.min(1, finalSim)));
  const angleDeg = Number(((angleRad * 180) / Math.PI).toFixed(2));

  return {
    text_a: textA,
    text_b: textB,
    cosine_similarity: finalSim,
    similarity_percentage: Number((Math.max(0, finalSim) * 100).toFixed(1)),
    dot_product: Number(dot.toFixed(4)),
    norm_a: 1.0,
    norm_b: 1.0,
    angle_degrees: angleDeg,
    dimension: 384,
    sample_slice_a: embA.sample_slice.slice(0, 6),
    sample_slice_b: embB.sample_slice.slice(0, 6),
    interpretation: finalSim > 0.6
      ? 'Strong Semantic Alignment: These statements convey closely related concepts.'
      : finalSim > 0.3
      ? 'Moderate Semantic Overlap: They share contextual themes or domain topics.'
      : 'Low Semantic Alignment: Concepts point in different directions in vector space.',
  };
}

function generateIllustrativeSearch(
  query: string,
  documents: string[],
  topK?: number
): SearchResponse {
  const queryWords = new Set(query.toLowerCase().split(/\s+/));

  const scoredDocs = documents.map((doc, idx) => {
    const comp = generateIllustrativeComparison(query, doc);
    const docWords = new Set(doc.toLowerCase().split(/\s+/));
    const overlap = [...queryWords].filter(w => docWords.has(w));
    const kwScore = Number((overlap.length / Math.max(1, queryWords.size)).toFixed(4));

    return {
      id: idx + 1,
      document: doc,
      score: comp.cosine_similarity,
      score_percentage: comp.similarity_percentage,
      rank: 0,
      keyword_score: kwScore,
      keyword_matches: overlap,
      explanation: comp.cosine_similarity >= 0.5
        ? 'High semantic relevance based on vector directional alignment.'
        : comp.cosine_similarity >= 0.25
        ? 'Moderate conceptual overlap with query themes.'
        : 'Low semantic alignment: distinct concept area.',
    };
  });

  scoredDocs.sort((a, b) => b.score - a.score);
  scoredDocs.forEach((d, i) => {
    d.rank = i + 1;
  });

  const sliced = topK ? scoredDocs.slice(0, topK) : scoredDocs;

  return {
    query,
    total_documents: documents.length,
    results: sliced,
    model: 'sentence-transformers/all-MiniLM-L6-v2 (Illustrative Mode)',
    dimension: 384,
  };
}

function categorizeText(text: string): 'AI & Tech' | 'Fitness & Health' | 'Food & Cooking' | 'Custom' {
  const lower = text.toLowerCase();
  if (/ai|artificial|machine learning|deep learning|neural|python|data|algorithm|code|software/i.test(lower)) {
    return 'AI & Tech';
  }
  if (/fitness|exercise|gym|workout|muscle|health|running|football|cricket|sport/i.test(lower)) {
    return 'Fitness & Health';
  }
  if (/food|nutrition|eating|recipe|cooking|bread|pasta|diet|meal/i.test(lower)) {
    return 'Food & Cooking';
  }
  return 'Custom';
}

function generateIllustrative2DPoints(texts: string[]): VisPoint[] {
  return texts.map((t, i) => {
    const cat = categorizeText(t);
    let baseX = 0;
    let baseY = 0;
    if (cat === 'AI & Tech') {
      baseX = -50;
      baseY = 40;
    } else if (cat === 'Fitness & Health') {
      baseX = 50;
      baseY = 30;
    } else if (cat === 'Food & Cooking') {
      baseX = 10;
      baseY = -50;
    } else {
      baseX = 0;
      baseY = 0;
    }

    const jitterX = ((simpleHash(t, 1) % 40) - 20);
    const jitterY = ((simpleHash(t, 2) % 40) - 20);

    return {
      id: i + 1,
      text: t,
      x: Number((baseX + jitterX).toFixed(2)),
      y: Number((baseY + jitterY).toFixed(2)),
      category: cat,
    };
  });
}
