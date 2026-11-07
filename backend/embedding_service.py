"""
VectorLab AI - Embedding Service
Handles SentenceTransformer model loading, text vectorization,
cosine similarity computation, semantic search ranking, and 2D PCA projections.
"""

import logging
import math
from typing import List, Dict, Any, Optional
import numpy as np

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("VectorLabEmbeddingService")

MODEL_NAME = "sentence-transformers/all-MiniLM-L6-v2"
EXPECTED_DIMENSION = 384


class EmbeddingService:
    def __init__(self, model_name: str = MODEL_NAME):
        self.model_name = model_name
        self.model = None
        self.is_loaded = False
        self.load_error = None
        self._load_model()

    def _load_model(self):
        """Loads SentenceTransformer model into memory once."""
        try:
            from sentence_transformers import SentenceTransformer
            logger.info(f"Loading embedding model: {self.model_name}...")
            self.model = SentenceTransformer(self.model_name)
            self.is_loaded = True
            logger.info("SentenceTransformer model successfully loaded.")
        except Exception as e:
            self.load_error = str(e)
            logger.error(f"Failed to load embedding model: {e}")
            self.is_loaded = False

    def get_status(self) -> Dict[str, Any]:
        """Returns model operational status and metadata."""
        return {
            "model_name": self.model_name,
            "is_loaded": self.is_loaded,
            "dimension": EXPECTED_DIMENSION,
            "load_error": self.load_error,
            "device": str(self.model.device) if self.model else "unavailable"
        }

    def compute_cosine_similarity(self, vec_a: np.ndarray, vec_b: np.ndarray) -> float:
        """
        Computes cosine similarity using formula: (A . B) / (||A|| * ||B||)
        """
        norm_a = np.linalg.norm(vec_a)
        norm_b = np.linalg.norm(vec_b)
        if norm_a == 0.0 or norm_b == 0.0:
            return 0.0
        dot_product = np.dot(vec_a, vec_b)
        similarity = float(dot_product / (norm_a * norm_b))
        # Clamp to [-1.0, 1.0] to guard against floating point inaccuracies
        return max(-1.0, min(1.0, similarity))

    def embed_texts(self, texts: List[str]) -> List[List[float]]:
        """
        Generates genuine dense embeddings for a list of input strings.
        Returns list of float lists (each length 384).
        """
        if not self.is_loaded or self.model is None:
            raise RuntimeError(f"Embedding model is not loaded: {self.load_error}")

        # Clean and process input texts
        cleaned = [t.strip() for t in texts]
        embeddings = self.model.encode(cleaned, convert_to_numpy=True, normalize_embeddings=False)
        return embeddings.tolist()

    def embed_single(self, text: str) -> Dict[str, Any]:
        """
        Generates embedding for a single text string with diagnostic metadata.
        """
        clean_text = text.strip()
        if not clean_text:
            raise ValueError("Input text cannot be empty.")

        vectors = self.embed_texts([clean_text])
        vector = vectors[0]
        norm = float(np.linalg.norm(vector))
        
        # Select first 8 illustrative coordinates for beginner-friendly preview
        sample_slice = [round(float(x), 4) for x in vector[:8]]

        return {
            "text": clean_text,
            "dimension": len(vector),
            "vector": vector,
            "vector_norm": round(norm, 4),
            "sample_slice": sample_slice,
            "min_val": round(float(np.min(vector)), 4),
            "max_val": round(float(np.max(vector)), 4),
            "mean_val": round(float(np.mean(vector)), 4)
        }

    def compare_texts(self, text_a: str, text_b: str) -> Dict[str, Any]:
        """
        Computes cosine similarity between two sentences and returns
        mathematical breakdown (dot product, norms, angles).
        """
        if not text_a.strip() or not text_b.strip():
            raise ValueError("Both text_a and text_b must be non-empty strings.")

        embeddings = self.embed_texts([text_a, text_b])
        vec_a = np.array(embeddings[0])
        vec_b = np.array(embeddings[1])

        dot_product = float(np.dot(vec_a, vec_b))
        norm_a = float(np.linalg.norm(vec_a))
        norm_b = float(np.linalg.norm(vec_b))
        
        similarity = self.compute_cosine_similarity(vec_a, vec_b)
        
        # Calculate angle in degrees: θ = arccos(cosine_similarity)
        # Cosine similarity in range [-1, 1]
        clamped_sim = max(-1.0, min(1.0, similarity))
        angle_rad = math.acos(clamped_sim)
        angle_deg = math.degrees(angle_rad)

        # Instructional interpretation
        if similarity >= 0.75:
            interpretation = "Strong Semantic Alignment: These statements convey closely related concepts or intent."
        elif similarity >= 0.45:
            interpretation = "Moderate Semantic Overlap: They share contextual themes or domain topics."
        elif similarity >= 0.15:
            interpretation = "Low Semantic Similarity: Weak or tangential conceptual overlap."
        else:
            interpretation = "Divergent Meanings: The statements point in substantially different directions in semantic space."

        return {
            "text_a": text_a,
            "text_b": text_b,
            "cosine_similarity": round(similarity, 4),
            "similarity_percentage": round(max(0.0, similarity) * 100, 2),
            "dot_product": round(dot_product, 4),
            "norm_a": round(norm_a, 4),
            "norm_b": round(norm_b, 4),
            "angle_degrees": round(angle_deg, 2),
            "dimension": len(vec_a),
            "sample_slice_a": [round(float(x), 4) for x in vec_a[:6]],
            "sample_slice_b": [round(float(x), 4) for x in vec_b[:6]],
            "interpretation": interpretation
        }

    def semantic_search(self, query: str, documents: List[str], top_k: Optional[int] = None) -> Dict[str, Any]:
        """
        Ranks document collection against user query using SentenceTransformer
        embeddings and cosine similarity. Also computes keyword match score for comparison.
        """
        clean_query = query.strip()
        if not clean_query:
            raise ValueError("Search query cannot be empty.")
        if not documents:
            raise ValueError("Document collection cannot be empty.")

        # Clean document list
        clean_docs = [d.strip() for d in documents if d and d.strip()]
        if not clean_docs:
            raise ValueError("No valid non-empty documents provided.")

        # Vectorize query and all documents in one batch
        all_texts = [clean_query] + clean_docs
        all_embeddings = np.array(self.embed_texts(all_texts))

        query_vec = all_embeddings[0]
        doc_vecs = all_embeddings[1:]

        results = []
        query_words = set(clean_query.lower().split())

        for idx, (doc_text, doc_vec) in enumerate(zip(clean_docs, doc_vecs)):
            sim = self.compute_cosine_similarity(query_vec, doc_vec)
            
            # Simple keyword matching calculation: jaccard / token overlap
            doc_words = set(doc_text.lower().split())
            overlap = query_words.intersection(doc_words)
            keyword_score = len(overlap) / len(query_words) if query_words else 0.0

            # Pedagogical explanation of why this document ranked where it did
            if sim >= 0.65:
                explanation = "High semantic relevance: The model identified strong topical and contextual alignment."
            elif sim >= 0.40:
                explanation = "Partial semantic relevance: Related domain concepts detected."
            else:
                explanation = "Low semantic relevance: Concepts differ in vector space direction."

            results.append({
                "id": idx + 1,
                "document": doc_text,
                "score": round(sim, 4),
                "score_percentage": round(max(0.0, sim) * 100, 1),
                "keyword_score": round(keyword_score, 4),
                "keyword_matches": list(overlap),
                "explanation": explanation
            })

        # Rank descending by cosine similarity
        results.sort(key=lambda r: r["score"], reverse=True)
        for rank, r in enumerate(results, start=1):
            r["rank"] = rank

        if top_k is not None and top_k > 0:
            results = results[:top_k]

        return {
            "query": clean_query,
            "total_documents": len(clean_docs),
            "results": results,
            "model": self.model_name,
            "dimension": EXPECTED_DIMENSION
        }

    def project_2d(self, texts: List[str]) -> Dict[str, Any]:
        """
        Projects high-dimensional embeddings down to 2D coordinates for visual plotting.
        Uses Principal Component Analysis (PCA).
        """
        if len(texts) < 2:
            raise ValueError("At least 2 texts are required for 2D projection.")

        from sklearn.decomposition import PCA

        embeddings = np.array(self.embed_texts(texts))
        
        # Fit PCA with 2 components
        n_samples = len(texts)
        n_components = min(2, n_samples)
        
        pca = PCA(n_components=n_components, random_state=42)
        coords_2d = pca.fit_transform(embeddings)

        # If only 1 component could be computed (unlikely if n_samples >= 2), pad with 0
        if coords_2d.shape[1] == 1:
            coords_2d = np.hstack([coords_2d, np.zeros((coords_2d.shape[0], 1))])

        # Scale coordinates to reasonable bounds [-100, 100] for interactive chart rendering
        max_abs = np.max(np.abs(coords_2d))
        if max_abs > 0:
            scaled_coords = (coords_2d / max_abs) * 80.0
        else:
            scaled_coords = coords_2d

        points = []
        for i, text in enumerate(texts):
            points.append({
                "id": i + 1,
                "text": text,
                "x": round(float(scaled_coords[i][0]), 2),
                "y": round(float(scaled_coords[i][1]), 2),
                "original_x": round(float(coords_2d[i][0]), 4),
                "original_y": round(float(coords_2d[i][1]), 4),
            })

        explained_variance = [round(float(v) * 100, 1) for v in pca.explained_variance_ratio_]

        return {
            "points": points,
            "explained_variance_ratio": explained_variance,
            "total_variance_explained": round(float(sum(pca.explained_variance_ratio_)) * 100, 1),
            "dimension": EXPECTED_DIMENSION,
            "projection_method": "Principal Component Analysis (PCA)"
        }
