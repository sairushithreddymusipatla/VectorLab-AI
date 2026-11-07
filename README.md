# VectorLab AI – Interactive AI Learning Platform

> **"Understand Meaning. Explore Intelligence. Build with AI."**  
> Complete interactive educational web application teaching **Embeddings and Semantic Search** to beginners.  
> Developed as part of the **Kalvium Instructional Designer Intern (AI Courses)** hiring assessment.

---

## 🌟 1. Project Overview

**VectorLab AI** is a complete, professional, 45-minute self-paced interactive learning platform engineered to guide students with zero prior AI experience into intuitive mastery of **Text Embeddings** and **Semantic Search**.

Unlike static textbook lessons or video slides, VectorLab AI unites **instructional design pedagogy** with **real machine learning engineering**. The platform features:
- Live embedding generation via the `sentence-transformers/all-MiniLM-L6-v2` neural network.
- Interactive 2D coordinate space projections using Principal Component Analysis (PCA).
- A real-time Semantic Search Playground computing authentic Cosine Similarities.
- A hands-on enterprise troubleshooting challenge ("Become a Semantic Search Engineer").
- A 10-question adaptive assessment with immediate educational feedback.
- Persistent progress tracking stored in browser `localStorage` without forced authentication.

---

## 🎯 2. Problem Statement & Learning Objectives

### The Problem
Traditional keyword search evaluates string overlap (e.g. searching for the letter sequence *"fitness"*). If an enterprise or student searches *"How can I improve my fitness?"*, traditional search fails on vital documentation titled *"Tips for exercising daily"* or *"Building muscle through workouts"* because of zero keyword overlap.

Embeddings solve this by converting human language into multi-dimensional vectors where distance and angle represent semantic meaning.

### 10 Core Learning Objectives
At the end of this 45-minute self-paced curriculum, learners are able to:
1. Explain what text embeddings are and how they represent conceptual meaning.
2. Understand how text is converted into high-dimensional numerical vectors.
3. Explain why neural networks and computers require mathematical representations.
4. Understand semantic similarity and distinguish conceptual intent from literal spelling.
5. Master and dissect the cosine similarity formula: $\cos(\theta) = \frac{A \cdot B}{\|A\| \times \|B\|}$.
6. Differentiate exact keyword matching from vector semantic search.
7. Experiment with semantic search using custom queries and document collections.
8. Understand the 5-step embedding pipeline inside Transformer models (`all-MiniLM-L6-v2`).
9. Identify real-world industry use cases including chatbots, recommendation systems, and deduplication.
10. Explain how embeddings perform the retrieval step in Retrieval-Augmented Generation (RAG).

---

## 🚀 3. Features & Modules Breakdown

The course is structured into a scaffolded 45-minute learning path:

| Module | Name | Duration | Description & Interactivity |
| :--- | :--- | :--- | :--- |
| **Welcome** | **Landing Page** | - | Hero introduction, course syllabus, badges, and interactive feature previews. |
| **Dashboard** | **Student Dashboard** | - | Real-time progress bar, completed lessons count, session timer, and resume button. |
| **Module 1** | **Introduction to Semantic Search** | 3 min | Keyword matching vs semantic intent; live comparison on fitness documents. |
| **Module 2** | **Understanding Embeddings** | 7 min | Analogies (RGB color space, GPS, flavors); illustrative low-D vs real 384D vectors. |
| **Module 3** | **From Text to Vectors** | 8 min | 5-step Transformer pipeline; live 384D coordinate generator and density heatmap. |
| **Module 4** | **Vector Visualization** | 7 min | Interactive 2D coordinate plane via PCA; click points to measure distance & cosine similarity. |
| **Module 5** | **Semantic Search Playground** | 10 min | Real-time AI search engine with live cosine rankings, formula inspector, and custom document upload. |
| **Module 6** | **Real-World AI Applications** | 5 min | 7 industry architectures; interactive visual RAG (Retrieval-Augmented Generation) workflow. |
| **Module 7** | **Hands-on Engineering Challenge** | 5 min | "Become a Semantic Search Engineer"; triage customer support tickets with hints and scoring. |
| **Assessment**| **Final Knowledge Quiz** | 5 min | 10 comprehensive MCQs, 70% passing threshold, detailed answer explanations, and retake option. |
| **Summary** | **Course Completion Record** | - | Celebratory confetti, competency breakdown, non-accreditation transparency notice, and printable summary. |

---

## 🛠️ 4. Technology Stack

### Frontend
- **Framework**: React 18 + Vite + TypeScript
- **Styling**: Tailwind CSS + Custom Dark Navy/Electric Purple glowing gradients
- **Icons**: Lucide React
- **Animations & Visuals**: Canvas Confetti, custom SVG 2D coordinate plot, interactive sliders
- **State & Storage**: Custom `useProgress` React hook with browser `localStorage` persistence

### Backend & AI Engine
- **Framework**: Python 3.13 + Flask + Flask-CORS
- **Embedding Model**: `sentence-transformers/all-MiniLM-L6-v2` (384 dimensions)
- **Mathematical & ML Libraries**: PyTorch, NumPy, Scikit-learn (PCA)
- **Model Loading**: Singleton design pattern (model loaded once into memory upon server boot)
- **Fallback Engine**: Transparent, honestly labeled browser-side fallback simulator if running offline

---

## 📁 5. Project File Structure

```
VectorLab-AI/
├── backend/
│   ├── app.py                  # Flask REST API endpoints (/api/health, /embed, /search, /compare, /visualize)
│   ├── embedding_service.py    # SentenceTransformer inference, Cosine Similarity, PCA projection
│   ├── requirements.txt        # Python backend dependencies
│   ├── test_backend.py         # Automated unit test suite (7 comprehensive test cases)
│   └── README.md               # Backend-specific architecture and API documentation
│
├── src/
│   ├── components/
│   │   ├── common/             # Reusable KnowledgeCheck, FormulaViewer, ModuleHeader, ModuleNavButtons
│   │   └── layout/             # Header (with live AI engine status) and Sidebar navigation
│   ├── data/
│   │   ├── challengeData.ts    # 8 enterprise knowledge base articles and support scenarios
│   │   ├── modules.ts          # 7 learning module metadata, durations, and key takeaways
│   │   ├── playgroundData.ts   # Preset documents, test queries, and coordinate clusters
│   │   └── quizQuestions.ts    # 10 comprehensive MCQs with pedagogical explanations
│   ├── hooks/
│   │   └── useProgress.ts      # Persistent localStorage course progress & timer hook
│   ├── modules/                # Modules 1 through 7 individual interactive components
│   ├── pages/                  # LandingPage, DashboardPage, QuizPage, CompletionPage
│   ├── services/
│   │   └── api.ts              # API client connecting to Flask backend with transparent fallback
│   ├── types/                  # TypeScript interfaces and data models
│   ├── App.tsx                 # Root application container and router
│   ├── main.tsx                # React DOM entrypoint
│   └── index.css               # Tailwind CSS and print stylesheet
│
├── EXPLANATION_VIDEO_SCRIPT.md # 5–7-minute video walkthrough script for assessment
├── package.json
├── tailwind.config.js
├── tsconfig.json
├── vite.config.ts
├── .gitignore
├── LICENSE
└── README.md
```

---

## ⚡ 6. Installation & Execution Guide

### Prerequisites
- **Node.js** (v18.0.0 or higher) and `npm`
- **Python** (v3.10 to v3.13) and `pip`

---

### Step 1: Backend Setup & Execution

Open a terminal in the project directory:

```bash
# Navigate to backend folder (or stay in root)
cd backend

# (Optional) Create and activate a Python virtual environment
python -m venv venv
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate

# Install backend dependencies
pip install -r requirements.txt

# Run automated backend unit tests
python test_backend.py

# Start the Flask backend server
python app.py
```
> The backend server starts at **`http://127.0.0.1:5000`**.  
> The `all-MiniLM-L6-v2` model weights (~80MB) will be cached locally on the first run.

---

### Step 2: Frontend Setup & Execution

Open a second terminal in the project root:

```bash
# Install frontend npm dependencies
npm install

# Start the Vite development server
npm run dev
```
> The frontend application will be live at **`http://127.0.0.1:3000`** (or `http://localhost:5173`).  
> Open this URL in any modern web browser (Chrome, Firefox, Edge, Safari).

---

## 📡 7. API Documentation

| Method | Endpoint | Description | Sample Payload | Sample Response |
| :--- | :--- | :--- | :--- | :--- |
| `GET` | `/api/health` | Check engine status & model readiness | None | `{"status": "healthy", "model_status": {"dimension": 384, "is_loaded": true}}` |
| `POST` | `/api/embed` | Generate 384D vector for single text | `{"text": "Machine learning"}` | `{"dimension": 384, "vector": [...], "sample_slice": [...]}` |
| `POST` | `/api/compare` | Calculate exact cosine similarity between 2 texts | `{"text_a": "I love coding", "text_b": "I enjoy programming"}` | `{"cosine_similarity": 0.8124, "angle_degrees": 35.66, "dot_product": 0.8124}` |
| `POST` | `/api/search` | Rank document list against query | `{"query": "improve fitness", "documents": ["gym workout", "cooking"]}` | `{"results": [{"rank": 1, "document": "gym workout", "score": 0.6721}]}` |
| `POST` | `/api/visualize` | 2D PCA projection of sentences | `{"texts": ["sentence 1", "sentence 2"]}` | `{"points": [{"x": -42.1, "y": 18.3, "text": "sentence 1"}]}` |

---

## 🧪 8. Verification & Testing Results

Before delivery, the platform underwent rigorous testing across both backend and frontend layers:

1. **Automated Backend Tests (`python test_backend.py`)**:
   - `test_01_health_check`: Passed (returns 200, status healthy).
   - `test_02_embed_valid_text`: Passed (generates true 384D float array).
   - `test_03_embed_empty_text_error`: Passed (returns 400 for whitespace inputs).
   - `test_04_compare_texts`: Passed (cosine similarity > 0.6 for synonymous phrases).
   - `test_05_semantic_search_ranking`: Passed (correctly ranks fitness documents above database articles for fitness queries).
   - `test_06_search_validation_errors`: Passed (returns 400 on empty query or empty document array).
   - `test_07_visualize_pca_projection`: Passed (returns 2D coordinates for sentences).
   - **Result**: `Ran 7 tests in 0.505s - OK`.

2. **Frontend Production Build (`npm run build`)**:
   - TypeScript compilation (`tsc`): 0 errors.
   - Vite bundling: 1612 modules transformed cleanly.
   - Responsive design verified across Desktop (1920px), Tablet (768px), and Mobile (375px).

---

## 🚢 9. Deployment Architecture

VectorLab AI is architected for clean, decoupled production deployment:

- **Frontend Deployment (Static SPA)**:
  - Can be deployed to **Vercel**, **Netlify**, or **AWS S3/CloudFront**.
  - Build command: `npm run build`
  - Output directory: `dist/`
  - Set environment variable `VITE_API_BASE` pointing to the backend URL.

- **Backend Deployment (WSGI Service)**:
  - Can be deployed on **Render**, **Railway**, **Fly.io**, **AWS EC2**, or **Google Cloud Run**.
  - Production WSGI command: `gunicorn -w 2 -b 0.0.0.0:5000 app:app`
  - Dependencies: Installed via `requirements.txt`.

---

## 📜 10. License & Credits

- **License**: MIT License
- **Author**: Created for the **Kalvium Instructional Designer Intern (AI Courses)** hiring assessment.
- **Brand**: VectorLab AI — *"Understand Meaning. Explore Intelligence. Build with AI."*
