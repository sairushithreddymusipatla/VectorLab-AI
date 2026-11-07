import React, { useState } from 'react';
import { Calculator, HelpCircle, Compass, Check, Info } from 'lucide-react';

export function FormulaViewer() {
  const [activeTab, setActiveTab] = useState<'formula' | 'breakdown' | 'interpretation'>('formula');

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-indigo-500/20 text-indigo-400 flex items-center justify-center">
            <Calculator className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-white">Cosine Similarity Mathematical Formula</h4>
            <p className="text-xs text-slate-400">How AI determines directional alignment in vector space</p>
          </div>
        </div>

        {/* Tab switcher */}
        <div className="flex bg-slate-950 p-1 rounded-lg border border-slate-800 text-xs">
          <button
            onClick={() => setActiveTab('formula')}
            className={`px-3 py-1 rounded-md font-medium transition ${
              activeTab === 'formula' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            Formula
          </button>
          <button
            onClick={() => setActiveTab('breakdown')}
            className={`px-3 py-1 rounded-md font-medium transition ${
              activeTab === 'breakdown' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            Parts Breakdown
          </button>
          <button
            onClick={() => setActiveTab('interpretation')}
            className={`px-3 py-1 rounded-md font-medium transition ${
              activeTab === 'interpretation' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            Score Meaning
          </button>
        </div>
      </div>

      {activeTab === 'formula' && (
        <div className="space-y-4">
          <div className="bg-slate-950/80 p-5 rounded-xl border border-indigo-500/30 flex flex-col items-center justify-center text-center">
            <span className="text-xs text-indigo-400 uppercase tracking-wider font-semibold mb-2">
              The Cosine Formula
            </span>
            <div className="font-mono text-lg sm:text-xl text-cyan-300 font-bold tracking-wider py-2">
              cosine_similarity(A, B) = <span className="text-indigo-400">(A · B)</span> / <span className="text-purple-400">(||A|| × ||B||)</span>
            </div>
            <p className="text-xs text-slate-400 mt-2 max-w-lg">
              Measures the cosine of the angle θ between vector <code className="text-indigo-300">A</code> (query) and vector <code className="text-purple-300">B</code> (document).
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-3.5 bg-slate-950/40 border border-slate-800 rounded-xl">
              <span className="font-semibold text-indigo-400 block mb-1">A · B (Dot Product)</span>
              <p className="text-slate-400">
                Sum of coordinate-by-coordinate multiplications: <code className="text-slate-300">∑(A[i] × B[i])</code>. Rewards coordinates that point strongly in the same direction.
              </p>
            </div>
            <div className="p-3.5 bg-slate-950/40 border border-slate-800 rounded-xl">
              <span className="font-semibold text-purple-400 block mb-1">||A|| × ||B|| (Vector Magnitudes)</span>
              <p className="text-slate-400">
                Euclidean lengths of the vectors: <code className="text-slate-300">√(∑A[i]²) × √(∑B[i]²)</code>. Normalizes the calculation so sentence length doesn't artificially inflate the score.
              </p>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'breakdown' && (
        <div className="space-y-3 text-xs">
          <div className="p-3 bg-slate-950/50 border border-slate-800 rounded-xl">
            <h5 className="font-semibold text-cyan-300 mb-1 flex items-center gap-1.5">
              <span className="w-4 h-4 rounded-full bg-cyan-500/20 text-cyan-400 inline-flex items-center justify-center text-[10px]">1</span>
              Why Direction Over Length?
            </h5>
            <p className="text-slate-400 leading-relaxed">
              A short sentence (e.g., "AI is powerful") and a long paragraph explaining AI strength may have different word counts, but their directional vector will point towards the same region of semantic space. Normalization guarantees fair comparison.
            </p>
          </div>

          <div className="p-3 bg-slate-950/50 border border-slate-800 rounded-xl">
            <h5 className="font-semibold text-indigo-300 mb-1 flex items-center gap-1.5">
              <span className="w-4 h-4 rounded-full bg-indigo-500/20 text-indigo-400 inline-flex items-center justify-center text-[10px]">2</span>
              Angular Relationship
            </h5>
            <p className="text-slate-400 leading-relaxed">
              When the angle θ = 0°, cos(0°) = 1.0 (identical direction / maximum similarity). When θ = 90°, cos(90°) = 0.0 (orthogonal / completely unrelated). When θ = 180°, cos(180°) = -1.0 (diametrically opposed).
            </p>
          </div>
        </div>
      )}

      {activeTab === 'interpretation' && (
        <div className="space-y-3 text-xs">
          <div className="p-3 bg-emerald-950/20 border border-emerald-500/30 rounded-xl flex items-start gap-2.5">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 mt-1 shrink-0" />
            <div>
              <span className="font-semibold text-emerald-300">0.70 to 1.00 — Strong Semantic Alignment</span>
              <p className="text-slate-400 mt-0.5">
                The texts convey directly related ideas, synonymous phrasing, or complementary concepts.
              </p>
            </div>
          </div>

          <div className="p-3 bg-indigo-950/20 border border-indigo-500/30 rounded-xl flex items-start gap-2.5">
            <div className="w-2.5 h-2.5 rounded-full bg-indigo-400 mt-1 shrink-0" />
            <div>
              <span className="font-semibold text-indigo-300">0.40 to 0.69 — Moderate Topical Overlap</span>
              <p className="text-slate-400 mt-0.5">
                The texts inhabit the same general domain (e.g. computer science or fitness) but discuss different sub-topics.
              </p>
            </div>
          </div>

          <div className="p-3 bg-slate-950/40 border border-slate-800 rounded-xl flex items-start gap-2.5">
            <div className="w-2.5 h-2.5 rounded-full bg-slate-500 mt-1 shrink-0" />
            <div>
              <span className="font-semibold text-slate-300">Below 0.40 — Low / Unrelated Semantic Proximity</span>
              <p className="text-slate-400 mt-0.5">
                The vectors point in distinct directions; no significant conceptual overlap exists.
              </p>
            </div>
          </div>

          <div className="p-3 bg-amber-950/20 border border-amber-500/30 rounded-xl text-amber-300/90 text-[11px] flex items-start gap-2">
            <Info className="w-4 h-4 shrink-0 text-amber-400 mt-0.5" />
            <span>
              <strong>Crucial Principle:</strong> A high cosine similarity score measures geometric directional affinity in vector space. It is <em>not</em> an automatic probability score or a guarantee of factual truth.
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
