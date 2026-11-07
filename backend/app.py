"""
VectorLab AI - Backend Flask Application
Exposes REST API endpoints for embeddings, semantic search, vector comparison,
and 2D projection visualizations.
"""

import os
import sys
import logging
from flask import Flask, request, jsonify
from flask_cors import CORS
from embedding_service import EmbeddingService

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(name)s: %(message)s"
)
logger = logging.getLogger("VectorLabApp")

app = Flask(__name__)

# Explicitly permit Cloudflare Worker production origin and local development origins
ALLOWED_ORIGINS = [
    "https://vectorlab-ai.sairushithreddymusipatla.workers.dev",
    "http://localhost:3000",
    "http://localhost:5173",
    "http://127.0.0.1:3000",
    "http://127.0.0.1:5173",
]

CORS(app, resources={
    r"/api/*": {
        "origins": "*",
        "methods": ["GET", "POST", "OPTIONS"],
        "allow_headers": ["Content-Type", "Authorization", "Accept", "X-Requested-With"]
    }
})

@app.before_request
def handle_preflight():
    if request.method == "OPTIONS":
        origin = request.headers.get("Origin", "*")
        response = app.make_default_options_response()
        response.headers["Access-Control-Allow-Origin"] = origin
        response.headers["Access-Control-Allow-Methods"] = "GET, POST, OPTIONS"
        response.headers["Access-Control-Allow-Headers"] = "Content-Type, Authorization, Accept, X-Requested-With"
        return response

@app.after_request
def add_cors_headers(response):
    origin = request.headers.get("Origin")
    if origin:
        response.headers["Access-Control-Allow-Origin"] = origin
    else:
        response.headers["Access-Control-Allow-Origin"] = "*"
    response.headers["Access-Control-Allow-Methods"] = "GET, POST, OPTIONS"
    response.headers["Access-Control-Allow-Headers"] = "Content-Type, Authorization, Accept, X-Requested-With"
    return response

# Initialize embedding service singleton (loads SentenceTransformer model once)
logger.info("Initializing VectorLab Embedding Service...")
service = EmbeddingService()
logger.info("VectorLab Embedding Service ready.")


@app.route("/api/health", methods=["GET"])
def health():
    """
    Health check endpoint: Returns backend status and embedding model readiness.
    """
    status = service.get_status()
    http_code = 200 if status["is_loaded"] else 503
    return jsonify({
        "status": "healthy" if status["is_loaded"] else "degraded",
        "service": "VectorLab AI Embedding Engine",
        "version": "1.0.0",
        "model_status": status
    }), http_code


@app.route("/api/embed", methods=["POST"])
def embed():
    """
    Vectorize a single text string.
    Payload: {"text": "..."}
    Returns: {"text": "...", "dimension": 384, "vector": [...], "sample_slice": [...], ...}
    """
    data = request.get_json(silent=True)
    if not data or "text" not in data:
        return jsonify({"error": "Missing 'text' field in request body."}), 400

    text = data.get("text", "")
    if not isinstance(text, str) or not text.strip():
        return jsonify({"error": "Text field cannot be empty."}), 400

    if len(text) > 4000:
        return jsonify({"error": "Text exceeds maximum supported length (4000 characters)."}), 400

    try:
        result = service.embed_single(text)
        return jsonify(result), 200
    except Exception as e:
        logger.error(f"Error in /api/embed: {e}")
        return jsonify({"error": str(e)}), 500


@app.route("/api/search", methods=["POST"])
def search():
    """
    Perform semantic search over a collection of documents given a search query.
    Payload: {
        "query": "string",
        "documents": ["string", "string", ...],
        "top_k": 5 (optional)
    }
    """
    data = request.get_json(silent=True)
    if not data:
        return jsonify({"error": "Request body must be valid JSON."}), 400

    query = data.get("query", "")
    if not isinstance(query, str) or not query.strip():
        return jsonify({"error": "Query field cannot be empty."}), 400

    documents = data.get("documents", [])
    if not isinstance(documents, list) or len(documents) == 0:
        return jsonify({"error": "Documents field must be a non-empty list of strings."}), 400

    # Filter non-empty strings
    clean_docs = [str(d).strip() for d in documents if str(d).strip()]
    if not clean_docs:
        return jsonify({"error": "No non-empty documents found."}), 400

    top_k = data.get("top_k", None)
    if top_k is not None:
        try:
            top_k = int(top_k)
            if top_k <= 0:
                top_k = None
        except ValueError:
            top_k = None

    try:
        results = service.semantic_search(query=query, documents=clean_docs, top_k=top_k)
        return jsonify(results), 200
    except Exception as e:
        logger.error(f"Error in /api/search: {e}")
        return jsonify({"error": str(e)}), 500


@app.route("/api/compare", methods=["POST"])
def compare():
    """
    Compare two text strings and return their cosine similarity with mathematical breakdown.
    Payload: {"text_a": "string", "text_b": "string"}
    """
    data = request.get_json(silent=True)
    if not data:
        return jsonify({"error": "Request body must be valid JSON."}), 400

    text_a = data.get("text_a", "")
    text_b = data.get("text_b", "")

    if not isinstance(text_a, str) or not text_a.strip():
        return jsonify({"error": "'text_a' must be a non-empty string."}), 400
    if not isinstance(text_b, str) or not text_b.strip():
        return jsonify({"error": "'text_b' must be a non-empty string."}), 400

    try:
        result = service.compare_texts(text_a, text_b)
        return jsonify(result), 200
    except Exception as e:
        logger.error(f"Error in /api/compare: {e}")
        return jsonify({"error": str(e)}), 500


@app.route("/api/visualize", methods=["POST"])
def visualize():
    """
    Project a list of sentences into 2D coordinates using PCA for vector visualization.
    Payload: {"texts": ["sentence 1", "sentence 2", ...]}
    """
    data = request.get_json(silent=True)
    if not data or "texts" not in data:
        return jsonify({"error": "Missing 'texts' field in request body."}), 400

    texts = data.get("texts", [])
    if not isinstance(texts, list) or len(texts) < 2:
        return jsonify({"error": "'texts' must contain at least 2 non-empty strings."}), 400

    clean_texts = [str(t).strip() for t in texts if str(t).strip()]
    if len(clean_texts) < 2:
        return jsonify({"error": "At least 2 non-empty texts are required for 2D visualization."}), 400

    try:
        result = service.project_2d(clean_texts)
        return jsonify(result), 200
    except Exception as e:
        logger.error(f"Error in /api/visualize: {e}")
        return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    debug = os.environ.get("FLASK_ENV") == "development"
    logger.info(f"Starting VectorLab AI Backend on http://127.0.0.1:{port}")
    app.run(host="127.0.0.1", port=port, debug=False)
