# VectorLab AI - Backend Service

High-performance Python Flask backend powering **VectorLab AI** with real text embeddings, cosine similarity calculation, semantic search ranking, and 2D PCA dimensionality reduction.

---

## Model Specifications
- **Model Architecture**: `sentence-transformers/all-MiniLM-L6-v2`
- **Output Embedding Dimensions**: 384 dimensions
- **Frameworks**: PyTorch, HuggingFace Transformers, Sentence-Transformers, Scikit-learn, NumPy, Flask, Flask-CORS
- **Similarity Metric**: Cosine Similarity: `cos(θ) = (A · B) / (||A|| × ||B||)`
- **Dimensionality Reduction**: Principal Component Analysis (PCA) for 2D semantic plane visualization

---

## API Endpoints

### 1. `GET /api/health`
Checks backend health and embedding model readiness.
- **Response**:
```json
{
  "status": "healthy",
  "service": "VectorLab AI Embedding Engine",
  "version": "1.0.0",
  "model_status": {
    "model_name": "sentence-transformers/all-MiniLM-L6-v2",
    "is_loaded": true,
    "dimension": 384,
    "device": "cpu"
  }
}
```

### 2. `POST /api/embed`
Generates authentic 384D dense vector for input text.
- **Payload**:
```json
{ "text": "Artificial intelligence and machine learning" }
```
- **Response**:
```json
{
  "text": "Artificial intelligence and machine learning",
  "dimension": 384,
  "vector": [-0.0451, 0.0812, ...],
  "sample_slice": [-0.0451, 0.0812, 0.0211, ...],
  "vector_norm": 1.0,
  "min_val": -0.142,
  "max_val": 0.185,
  "mean_val": 0.0012
}
```

### 3. `POST /api/compare`
Calculates exact cosine similarity, dot product, vector norms, and angle in degrees between two sentences.
- **Payload**:
```json
{
  "text_a": "I love programming in Python.",
  "text_b": "I enjoy coding with Python scripts."
}
```

### 4. `POST /api/search`
Ranks a document collection against a user search query using cosine similarity.
- **Payload**:
```json
{
  "query": "How can I improve my physical health and fitness?",
  "documents": [
    "Building muscle through regular gym workouts.",
    "Healthy food habits and daily nutritional advice.",
    "Premier League football tournament match scores.",
    "Introduction to relational database management."
  ],
  "top_k": 4
}
```

### 5. `POST /api/visualize`
Projects high-dimensional sentence embeddings onto a 2D coordinate space using PCA.
- **Payload**:
```json
{
  "texts": [
    "Artificial intelligence models",
    "Deep neural network architectures",
    "Cooking delicious pasta dinner",
    "Baking sourdough bread"
  ]
}
```

---

## Local Setup & Execution

```bash
# 1. Install dependencies
pip install -r requirements.txt

# 2. Run automated test suite
python test_backend.py

# 3. Start Flask server
python app.py
```
Server runs at `http://127.0.0.1:5000`.

---

## Render Deployment Settings (Render.com Web Service)

- **Environment**: Python
- **Root Directory**: `backend` (Recommended)
- **Build Command**: `pip install -r requirements.txt`
- **Start Command**: `gunicorn app:app --timeout 120`

*(Note: `--timeout 120` ensures Gunicorn allows sufficient time on initial cold start while SentenceTransformer weights load into memory).*
