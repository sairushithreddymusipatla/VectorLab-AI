# VectorLab AI – Frontend Application

Interactive React + Vite + TypeScript frontend for **VectorLab AI**.

---

## Features
- **Welcome / Landing Page**: Course syllabus, 10 learning objectives, badges, and interactive feature previews.
- **Student Dashboard**: Progress tracking, session timer, curriculum cards, and resume button.
- **Module 1**: Keyword search vs semantic search comparison on fitness queries.
- **Module 2**: Intuitive analogies (RGB, GPS, flavors), toy vectors vs real 384D vectors, and interactive dimensionality slider.
- **Module 3**: 5-step Transformer pipeline, live 384D coordinate generator, and coordinate density heatmap.
- **Module 4**: 2D coordinate plane via PCA; point selection to measure Euclidean distance & angular cosine similarity.
- **Module 5**: Semantic Search Playground with real calculated cosine similarities, formula explorer, keyword vs semantic comparison, and custom document upload.
- **Module 6**: 7 industry applications and an interactive step-by-step visual RAG pipeline.
- **Module 7**: "Become a Semantic Search Engineer" support routing challenge with progressive hints and automated grading.
- **Knowledge Assessment**: 10 MCQs with immediate feedback, detailed pedagogical explanations, 70% passing threshold, and retake support.
- **Completion Record**: Celebratory confetti, competency record, transparency disclaimer, and printable PDF summary.

---

## Local Setup

```bash
# 1. Install dependencies
npm install

# 2. Start Vite dev server
npm run dev

# 3. Build for production
npm run build
```

---

## Deployment (Vercel / Netlify / Cloudflare Pages)
- **Build command**: `npm run build`
- **Output directory**: `dist`
- **API Base**: Defaults to `http://127.0.0.1:5000/api`. To configure for remote production, set the environment variable:
```env
VITE_API_BASE=https://your-backend-api-url.com/api
```
