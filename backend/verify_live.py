import urllib.request
import json
import sys

def test_api():
    base = 'http://127.0.0.1:5000/api'
    
    # 1. Health
    print('Testing /api/health...')
    health_resp = json.loads(urllib.request.urlopen(f'{base}/health').read().decode())
    assert health_resp['status'] == 'healthy', f'Health status failed: {health_resp}'
    assert health_resp['model_status']['dimension'] == 384, 'Dimension not 384'
    assert health_resp['model_status']['is_loaded'] is True, 'Model not loaded'
    print(f"PASS: /api/health (Model: {health_resp['model_status']['model_name']}, Dim: 384, Status: healthy)")
    
    # 2. Embed
    print('\nTesting /api/embed...')
    req = urllib.request.Request(
        f'{base}/embed',
        data=json.dumps({'text': 'SentenceTransformers all-MiniLM-L6-v2 embedding test'}).encode(),
        headers={'Content-Type': 'application/json'}
    )
    embed_resp = json.loads(urllib.request.urlopen(req).read().decode())
    vec = embed_resp['vector']
    assert len(vec) == 384, f'Vector length is {len(vec)}, expected 384'
    assert embed_resp['dimension'] == 384, 'Reported dimension not 384'
    assert isinstance(vec[0], float), 'Vector components are not floats'
    print(f"PASS: /api/embed (Received vector with exactly {len(vec)} dimensions, norm={embed_resp['vector_norm']})")
    
    # 3. Compare
    print('\nTesting /api/compare...')
    req = urllib.request.Request(
        f'{base}/compare',
        data=json.dumps({
            'text_a': 'I love programming with Python.',
            'text_b': 'I enjoy writing Python code.'
        }).encode(),
        headers={'Content-Type': 'application/json'}
    )
    comp_resp = json.loads(urllib.request.urlopen(req).read().decode())
    sim = comp_resp['cosine_similarity']
    assert 0.6 <= sim <= 1.0, f'Expected high similarity, got {sim}'
    print(f"PASS: /api/compare (Similarity: {sim}, Angle: {comp_resp['angle_degrees']} deg, Interpretation: {comp_resp['interpretation']})")
    
    # 4. Search
    print('\nTesting /api/search...')
    docs = [
        'Tips for exercising daily.',
        'Healthy food habits.',
        'Football match results.',
        'Building muscle through workouts.'
    ]
    req = urllib.request.Request(
        f'{base}/search',
        data=json.dumps({
            'query': 'How can I improve my fitness?',
            'documents': docs
        }).encode(),
        headers={'Content-Type': 'application/json'}
    )
    search_resp = json.loads(urllib.request.urlopen(req).read().decode())
    results = search_resp['results']
    assert len(results) == 4, 'Expected 4 results'
    for r in results:
        print(f"  Rank {r['rank']}: \"{r['document']}\" -> Score: {r['score']} ({r['score_percentage']}%)")
    assert results[0]['score'] >= results[1]['score'] >= results[2]['score'] >= results[3]['score'], 'Not sorted descending'
    print('PASS: /api/search (Correctly ranked by cosine similarity)')

    # 5. Visualize
    print('\nTesting /api/visualize...')
    req = urllib.request.Request(
        f'{base}/visualize',
        data=json.dumps({'texts': docs}).encode(),
        headers={'Content-Type': 'application/json'}
    )
    vis_resp = json.loads(urllib.request.urlopen(req).read().decode())
    pts = vis_resp['points']
    assert len(pts) == 4, 'Expected 4 points'
    assert 'x' in pts[0] and 'y' in pts[0], 'Missing coordinates'
    print(f"PASS: /api/visualize (PCA variance explained: {vis_resp['total_variance_explained']}%)")
    
    print('\n>>> ALL 5 LIVE BACKEND ENDPOINTS PASSED VERIFICATION!')

if __name__ == '__main__':
    test_api()
