import { ModuleMeta } from '../types';

export const COURSE_MODULES: ModuleMeta[] = [
  {
    id: 'module-1',
    number: 1,
    title: 'Introduction to Semantic Search',
    shortTitle: 'Keyword vs Meaning',
    durationMinutes: 3,
    tagline: 'Why searching by meaning changes everything',
    badge: '3 min read & play',
    description:
      'Discover how traditional search breaks down when words don’t match exactly, and how semantic search enables computers to grasp user intent.',
    keyTakeaways: [
      'Keyword search matches literal words; semantic search understands underlying intent.',
      'Synonyms and natural questions cause traditional keyword search to fail.',
      'Understanding semantic intent is the foundation of modern search and AI assistants.',
    ],
  },
  {
    id: 'module-2',
    number: 2,
    title: 'Understanding Embeddings',
    shortTitle: 'From Text to Numbers',
    durationMinutes: 7,
    tagline: 'How computers convert thoughts into mathematical coordinates',
    badge: '7 min core concept',
    description:
      'Learn why AI models cannot read text directly, how vectors translate language into geometry, and what multi-dimensional space really means.',
    keyTakeaways: [
      'Computers only compute numbers, matrices, and dot products.',
      'An embedding is an array of numbers (a vector) representing conceptual meaning.',
      'Sentences with similar meanings produce vectors pointing in nearby directions.',
      'Real models use hundreds of dimensions (e.g. 384) to capture nuanced linguistic relationships.',
    ],
  },
  {
    id: 'module-3',
    number: 3,
    title: 'From Text to Vectors',
    shortTitle: 'The Embedding Pipeline',
    durationMinutes: 8,
    tagline: 'Watch raw words transform into dense 384-dimensional vectors',
    badge: '8 min interactive',
    description:
      'Follow the 5-stage pipeline from input words to tokenization, transformer attention layers, mean pooling, and final vector output.',
    keyTakeaways: [
      'Step 1: Input text is broken down into subword tokens.',
      'Step 2: Transformer attention calculates contextual relationships between words.',
      'Step 3: Hidden states are pooled into a single fixed-length 384-dimensional vector.',
      'Contextual embeddings differentiate polysemous words (e.g. river bank vs money bank).',
    ],
  },
  {
    id: 'module-4',
    number: 4,
    title: 'Vector Space Visualization',
    shortTitle: '2D Coordinate Plane',
    durationMinutes: 7,
    tagline: 'See language plotted as points on an interactive coordinate plane',
    badge: '7 min visual lab',
    description:
      'Explore how semantic relationships create geometric clusters. Measure Euclidean distances and angular cosine similarities between sentences.',
    keyTakeaways: [
      'High-dimensional vectors can be projected onto a 2D plane using Principal Component Analysis (PCA).',
      'The closer two points lie, the more related their underlying topics.',
      '2D visualizations compress 384 dimensions into 2 axes, preserving dominant variance.',
    ],
  },
  {
    id: 'module-5',
    number: 5,
    title: 'Semantic Search Playground',
    shortTitle: 'Live AI Search Engine',
    durationMinutes: 10,
    tagline: 'Test queries live against a real SentenceTransformer embedding model',
    badge: '10 min live lab',
    description:
      'Type any query, watch actual cosine similarities compute in real time, compare keyword matches vs semantic rankings, and dissect the mathematical formula.',
    keyTakeaways: [
      'Cosine similarity measures directional alignment: cos(θ) = (A · B) / (||A|| × ||B||).',
      'Cosine scores range from -1 to 1 (typically 0.0 to 0.9 for language embeddings).',
      'High similarity indicates directional affinity, not guaranteed factual truth.',
    ],
  },
  {
    id: 'module-6',
    number: 6,
    title: 'Real-World AI Applications',
    shortTitle: 'Industry Use Cases & RAG',
    durationMinutes: 5,
    tagline: 'How ChatGPT, Google, Spotify, and enterprise systems use embeddings',
    badge: '5 min industry',
    description:
      'Explore 7 real-world applications including customer chatbots, recommendations, and an interactive step-by-step walkthrough of Retrieval-Augmented Generation (RAG).',
    keyTakeaways: [
      'Embeddings power vector databases (Pinecone, Milvus, Qdrant, Chroma).',
      'In RAG, embeddings perform the retrieval step, and the LLM generates the human response.',
      'Recommendation engines recommend items by matching user history vectors to product vectors.',
    ],
  },
  {
    id: 'module-7',
    number: 7,
    title: 'Hands-on Engineering Challenge',
    shortTitle: 'Become a Search Engineer',
    durationMinutes: 5,
    tagline: 'Put your knowledge to work on a real enterprise support routing challenge',
    badge: '5 min challenge',
    description:
      'Step into the shoes of an AI Search Engineer. Formulate a query, generate embeddings, inspect similarity scores, pick the optimal documentation, and defend your rationale.',
    keyTakeaways: [
      'Balancing precision and recall when ranking knowledge base articles.',
      'Interpreting similarity thresholds to avoid false positive retrievals.',
      'Explaining retrieval decisions with mathematical and contextual evidence.',
    ],
  },
];
