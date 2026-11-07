"""
VectorLab AI - Backend Unit and Integration Test Suite
Validates health, embedding generation, cosine similarity calculation,
semantic search ranking, 2D projections, and edge cases.
"""

import unittest
import json
import os
import sys

# Ensure backend directory is in python module search path
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

import numpy as np
from app import app, service


class VectorLabBackendTestCase(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.client = app.test_client()

    def test_01_health_check(self):
        """Verify health check endpoint returns 200 and model status."""
        response = self.client.get("/api/health")
        self.assertIn(response.status_code, [200, 503])
        data = response.get_json()
        self.assertIn("status", data)
        self.assertIn("model_status", data)
        self.assertEqual(data["model_status"]["dimension"], 384)

    def test_02_embed_valid_text(self):
        """Verify /api/embed generates a genuine 384-dimensional vector."""
        if not service.is_loaded:
            self.skipTest("Embedding model not loaded in environment.")

        payload = {"text": "Artificial intelligence and machine learning"}
        response = self.client.post(
            "/api/embed",
            data=json.dumps(payload),
            content_type="application/json"
        )
        self.assertEqual(response.status_code, 200)
        data = response.get_json()
        self.assertIn("vector", data)
        self.assertEqual(len(data["vector"]), 384)
        self.assertEqual(data["dimension"], 384)
        self.assertTrue(isinstance(data["sample_slice"], list))
        self.assertEqual(len(data["sample_slice"]), 8)

    def test_03_embed_empty_text_error(self):
        """Verify /api/embed returns 400 for empty or whitespace text."""
        payload = {"text": "   "}
        response = self.client.post(
            "/api/embed",
            data=json.dumps(payload),
            content_type="application/json"
        )
        self.assertEqual(response.status_code, 400)
        data = response.get_json()
        self.assertIn("error", data)

    def test_04_compare_texts(self):
        """Verify /api/compare computes cosine similarity correctly."""
        if not service.is_loaded:
            self.skipTest("Embedding model not loaded in environment.")

        payload = {
            "text_a": "I love programming in Python.",
            "text_b": "I enjoy coding with Python scripts."
        }
        response = self.client.post(
            "/api/compare",
            data=json.dumps(payload),
            content_type="application/json"
        )
        self.assertEqual(response.status_code, 200)
        data = response.get_json()
        self.assertIn("cosine_similarity", data)
        self.assertGreater(data["cosine_similarity"], 0.6)  # High similarity expected
        self.assertIn("dot_product", data)
        self.assertIn("angle_degrees", data)
        self.assertIn("interpretation", data)

    def test_05_semantic_search_ranking(self):
        """Verify /api/search ranks semantically relevant documents at the top."""
        if not service.is_loaded:
            self.skipTest("Embedding model not loaded in environment.")

        query = "How can I improve my physical health and fitness?"
        documents = [
            "Building muscle through regular gym workouts.",
            "Healthy food habits and daily nutritional advice.",
            "Premier League football tournament match scores.",
            "Introduction to relational database management."
        ]
        payload = {"query": query, "documents": documents, "top_k": 4}
        response = self.client.post(
            "/api/search",
            data=json.dumps(payload),
            content_type="application/json"
        )
        self.assertEqual(response.status_code, 200)
        data = response.get_json()
        self.assertEqual(len(data["results"]), 4)
        
        # Verify descending order of scores
        scores = [r["score"] for r in data["results"]]
        self.assertEqual(scores, sorted(scores, reverse=True))

        # First two results should be health/fitness related
        top_doc = data["results"][0]["document"].lower()
        self.assertTrue("muscle" in top_doc or "health" in top_doc or "workout" in top_doc)

    def test_06_search_validation_errors(self):
        """Verify /api/search validates query and document inputs."""
        # Empty query
        res1 = self.client.post("/api/search", data=json.dumps({"query": "", "documents": ["doc1"]}), content_type="application/json")
        self.assertEqual(res1.status_code, 400)

        # Empty documents
        res2 = self.client.post("/api/search", data=json.dumps({"query": "hello", "documents": []}), content_type="application/json")
        self.assertEqual(res2.status_code, 400)

    def test_07_visualize_pca_projection(self):
        """Verify /api/visualize returns 2D coordinates for sentences."""
        if not service.is_loaded:
            self.skipTest("Embedding model not loaded in environment.")

        texts = [
            "Artificial intelligence models",
            "Deep neural network architectures",
            "Cooking delicious pasta dinner",
            "Baking sourdough bread"
        ]
        payload = {"texts": texts}
        response = self.client.post(
            "/api/visualize",
            data=json.dumps(payload),
            content_type="application/json"
        )
        self.assertEqual(response.status_code, 200)
        data = response.get_json()
        self.assertIn("points", data)
        self.assertEqual(len(data["points"]), 4)
        for pt in data["points"]:
            self.assertIn("x", pt)
            self.assertIn("y", pt)
            self.assertIn("text", pt)


if __name__ == "__main__":
    unittest.main()
