import React, { useState, useEffect } from 'react';
import {
  ScatterChart,
  Plus,
  RefreshCw,
  Info,
  Sparkles,
  Layers,
  ArrowRight,
  ZoomIn,
  ZoomOut,
} from 'lucide-react';
import { ModuleMeta, ModuleId, VisPoint } from '../types';
import { ModuleHeader } from '../components/common/ModuleHeader';
import { ModuleNavButtons } from '../components/common/ModuleNavButtons';
import { KnowledgeCheck } from '../components/common/KnowledgeCheck';
import { VISUALIZATION_DEFAULT_TEXTS } from '../data/playgroundData';
import { get2DProjection, compareSentences } from '../services/api';

interface Module4VisualizationProps {
  module: ModuleMeta;
  onNavigate: (module: ModuleId) => void;
  onComplete: () => void;
  isCompleted: boolean;
}

export function Module4Visualization({
  module,
  onNavigate,
  onComplete,
  isCompleted,
}: Module4VisualizationProps) {
  const [sentences, setSentences] = useState<string[]>(VISUALIZATION_DEFAULT_TEXTS);
  const [points, setPoints] = useState<VisPoint[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [selectedPointA, setSelectedPointA] = useState<VisPoint | null>(null);
  const [selectedPointB, setSelectedPointB] = useState<VisPoint | null>(null);
  const [comparisonInfo, setComparisonInfo] = useState<any | null>(null);
  const [isComparing, setIsComparing] = useState<boolean>(false);
  const [newSentence, setNewSentence] = useState<string>('');
  const [filterCategory, setFilterCategory] = useState<string>('All');

  const fetchProjection = async (textList: string[]) => {
    setIsLoading(true);
    try {
      const res = await get2DProjection(textList);
      setPoints(res.points);
      if (res.points.length >= 2) {
        setSelectedPointA(res.points[0]);
        setSelectedPointB(res.points[1]);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProjection(sentences);
  }, [sentences]);

  // Compute live comparison between selected Point A and Point B
  useEffect(() => {
    if (selectedPointA && selectedPointB && selectedPointA.id !== selectedPointB.id) {
      setIsComparing(true);
      compareSentences(selectedPointA.text, selectedPointB.text)
        .then(res => {
          setComparisonInfo(res.data);
        })
        .finally(() => setIsComparing(false));
    } else {
      setComparisonInfo(null);
    }
  }, [selectedPointA, selectedPointB]);

  const handlePointClick = (pt: VisPoint) => {
    if (!selectedPointA || (selectedPointA && selectedPointB)) {
      setSelectedPointA(pt);
      setSelectedPointB(null);
    } else if (selectedPointA && !selectedPointB) {
      if (selectedPointA.id === pt.id) {
        setSelectedPointA(null);
      } else {
        setSelectedPointB(pt);
      }
    }
  };

  const handleAddSentence = () => {
    if (!newSentence.trim()) return;
    if (sentences.includes(newSentence.trim())) return;
    const updated = [...sentences, newSentence.trim()];
    setSentences(updated);
    setNewSentence('');
  };

  const getCategoryColor = (cat: string) => {
    switch (cat) {
      case 'AI & Tech':
        return '#818cf8'; // Indigo
      case 'Fitness & Health':
        return '#34d399'; // Emerald
      case 'Food & Cooking':
        return '#fb923c'; // Orange
      default:
        return '#38bdf8'; // Sky
    }
  };

  const filteredPoints = filterCategory === 'All'
    ? points
    : points.filter(p => p.category === filterCategory);

  return (
    <div className="max-w-4xl mx-auto py-4">
      <ModuleHeader module={module} />

      {/* Section 1: The 2D Coordinate Plane Visualization Canvas */}
      <div className="bg-slate-900/90 border border-indigo-500/30 rounded-2xl p-6 shadow-2xl mb-8">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <ScatterChart className="w-5 h-5 text-indigo-400" />
              <span>Interactive 2D Vector Space (PCA Projection)</span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Click any two points to measure their Euclidean distance and Cosine similarity.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-1.5 text-xs bg-slate-950 p-1 rounded-xl border border-slate-800">
            {['All', 'AI & Tech', 'Fitness & Health', 'Food & Cooking'].map(cat => (
              <button
                key={cat}
                onClick={() => setFilterCategory(cat)}
                className={`px-2.5 py-1 rounded-lg font-medium transition ${
                  filterCategory === cat
                    ? 'bg-indigo-600 text-white'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* The Coordinate Plane SVG Canvas */}
        <div className="relative w-full aspect-[16/10] bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden shadow-inner flex items-center justify-center">
          {/* Subtle Coordinate Grid Lines */}
          <div className="absolute inset-0 grid grid-cols-6 grid-rows-4 pointer-events-none opacity-20">
            {Array.from({ length: 24 }).map((_, i) => (
              <div key={i} className="border-r border-b border-indigo-500/20" />
            ))}
          </div>

          {/* Axis Lines (X and Y centered) */}
          <div className="absolute inset-y-0 left-1/2 w-[1px] bg-indigo-500/30" />
          <div className="absolute inset-x-0 top-1/2 h-[1px] bg-indigo-500/30" />

          {/* Canvas Labels */}
          <div className="absolute top-2 right-3 text-[10px] font-mono text-slate-400">
            PCA Component 1 →
          </div>
          <div className="absolute bottom-2 left-3 text-[10px] font-mono text-slate-400">
            ↑ PCA Component 2
          </div>

          {isLoading ? (
            <div className="flex items-center gap-2 text-indigo-400 text-xs">
              <RefreshCw className="w-4 h-4 animate-spin" />
              <span>Projecting high-dimensional embeddings via PCA...</span>
            </div>
          ) : (
            <svg className="w-full h-full" viewBox="-100 -70 200 140">
              {/* Connecting line between Point A and Point B if both selected */}
              {selectedPointA && selectedPointB && (
                <line
                  x1={selectedPointA.x}
                  y1={-selectedPointA.y}
                  x2={selectedPointB.x}
                  y2={-selectedPointB.y}
                  stroke="#818cf8"
                  strokeWidth="1.5"
                  strokeDasharray="3 3"
                  className="animate-pulse"
                />
              )}

              {/* Data points */}
              {filteredPoints.map(pt => {
                const isA = selectedPointA?.id === pt.id;
                const isB = selectedPointB?.id === pt.id;
                const color = getCategoryColor(pt.category);

                return (
                  <g
                    key={pt.id}
                    onClick={() => handlePointClick(pt)}
                    className="cursor-pointer group"
                    transform={`translate(${pt.x}, ${-pt.y})`}
                  >
                    {/* Pulsing ring for selected points */}
                    {(isA || isB) && (
                      <circle
                        r="8"
                        fill="none"
                        stroke={isA ? '#38bdf8' : '#c084fc'}
                        strokeWidth="1.5"
                        className="animate-ping opacity-75"
                      />
                    )}

                    {/* Point Circle */}
                    <circle
                      r={isA || isB ? 6 : 4}
                      fill={color}
                      stroke="#0f172a"
                      strokeWidth="1.5"
                      className="transition-transform group-hover:scale-150"
                    />

                    {/* Hover text / point badge */}
                    <text
                      y={-8}
                      textAnchor="middle"
                      fill="#e2e8f0"
                      fontSize="4"
                      className="font-medium pointer-events-none select-none opacity-80 group-hover:opacity-100"
                    >
                      {isA ? 'Point A' : isB ? 'Point B' : pt.text.slice(0, 18) + '...'}
                    </text>
                  </g>
                );
              })}
            </svg>
          )}
        </div>

        {/* Legend */}
        <div className="flex flex-wrap items-center justify-between gap-3 mt-4 pt-3 border-t border-slate-800 text-xs">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-indigo-300">
              <span className="w-2.5 h-2.5 rounded-full bg-indigo-400" />
              <span>AI & Technology</span>
            </span>
            <span className="flex items-center gap-1.5 text-emerald-300">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
              <span>Fitness & Sports</span>
            </span>
            <span className="flex items-center gap-1.5 text-amber-300">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
              <span>Food & Cooking</span>
            </span>
          </div>

          <div className="text-[11px] text-slate-400">
            Tip: Click a point to set <strong>Point A</strong>, then click another to set <strong>Point B</strong>.
          </div>
        </div>
      </div>

      {/* Section 2: Selected Points Inspector & Distance Analyzer */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl mb-8">
        <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
          <Layers className="w-4 h-4 text-cyan-400" />
          <span>Vector Distance & Similarity Inspector</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="p-4 rounded-xl bg-slate-950/80 border border-cyan-500/40">
            <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-400 block mb-1">
              Selected Point A
            </span>
            {selectedPointA ? (
              <div>
                <p className="text-xs font-semibold text-white mb-1.5">{selectedPointA.text}</p>
                <div className="text-[11px] font-mono text-slate-400">
                  Category: <span className="text-cyan-300">{selectedPointA.category}</span> | 2D Coordinates: [{selectedPointA.x}, {selectedPointA.y}]
                </div>
              </div>
            ) : (
              <p className="text-xs text-slate-400 italic">Click any point on the plane above to select Point A.</p>
            )}
          </div>

          <div className="p-4 rounded-xl bg-slate-950/80 border border-purple-500/40">
            <span className="text-[10px] font-bold uppercase tracking-wider text-purple-400 block mb-1">
              Selected Point B
            </span>
            {selectedPointB ? (
              <div>
                <p className="text-xs font-semibold text-white mb-1.5">{selectedPointB.text}</p>
                <div className="text-[11px] font-mono text-slate-400">
                  Category: <span className="text-purple-300">{selectedPointB.category}</span> | 2D Coordinates: [{selectedPointB.x}, {selectedPointB.y}]
                </div>
              </div>
            ) : (
              <p className="text-xs text-slate-400 italic">Click a second point on the plane to calculate similarity.</p>
            )}
          </div>
        </div>

        {/* Live Comparison Output */}
        {comparisonInfo && (
          <div className="p-4 rounded-xl bg-gradient-to-r from-indigo-950/40 to-purple-950/30 border border-indigo-500/30 space-y-3">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800">
                <span className="text-[10px] text-slate-400 block">Cosine Similarity</span>
                <span className="font-mono text-base font-bold text-cyan-400">{comparisonInfo.cosine_similarity}</span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800">
                <span className="text-[10px] text-slate-400 block">Similarity %</span>
                <span className="font-mono text-base font-bold text-indigo-300">{comparisonInfo.similarity_percentage}%</span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800">
                <span className="text-[10px] text-slate-400 block">Angle (θ)</span>
                <span className="font-mono text-base font-bold text-purple-300">{comparisonInfo.angle_degrees}°</span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800">
                <span className="text-[10px] text-slate-400 block">Dot Product (A · B)</span>
                <span className="font-mono text-base font-bold text-slate-200">{comparisonInfo.dot_product}</span>
              </div>
            </div>

            <div className="p-3 bg-slate-900/60 rounded-lg text-xs text-slate-300">
              <strong className="text-indigo-400 block mb-0.5">Semantic Interpretation:</strong>
              {comparisonInfo.interpretation}
            </div>
          </div>
        )}

        {/* Add Custom Sentence Form */}
        <div className="mt-6 pt-4 border-t border-slate-800 flex gap-2">
          <input
            type="text"
            value={newSentence}
            onChange={e => setNewSentence(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleAddSentence()}
            placeholder="Plot your own custom sentence into the 2D coordinate space..."
            className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
          />
          <button
            onClick={handleAddSentence}
            disabled={!newSentence.trim()}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 transition"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Point</span>
          </button>
        </div>
      </div>

      {/* Section 3: Instructional Note on Dimensionality Reduction */}
      <div className="p-4 rounded-xl bg-indigo-950/30 border border-indigo-500/30 text-xs text-indigo-200 leading-relaxed mb-8 flex items-start gap-3">
        <Info className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
        <div>
          <strong className="text-white block mb-0.5">Instructional Designer Note on 2D Projections:</strong>
          Our true embedding model operates in <strong>384 dimensions</strong>. A 2D visualization is a <em>mathematical shadow</em> produced via Principal Component Analysis (PCA). PCA finds the 2 axes that capture the greatest variance, making clusters visible. However, subtle multi-dimensional angles are compressed, which is why actual search ranking is computed across all 384 dimensions, not just the flat 2D screen!
        </div>
      </div>

      {/* Section 4: Concept Check */}
      <div className="mb-8">
        <KnowledgeCheck
          question="Why do sentences about 'baking artisan bread' and 'cooking organic dinner' appear near each other on the coordinate plane?"
          options={[
            'Both sentences start with the exact same grammatical letters',
            'Their high-dimensional embedding vectors point in similar directions, so PCA projects them into the same cluster',
            'The software has an explicit hardcoded list of food words',
            'Points are placed randomly on the coordinate plane',
          ]}
          correctIndex={1}
          explanation="The embedding model learns during training that culinary concepts are strongly correlated. Thus, their vectors share directional alignment in 384D space, and PCA preserves this dominant topical variance on the 2D plane."
          onCorrect={onComplete}
        />
      </div>

      <ModuleNavButtons
        prevModuleId="module-3"
        nextModuleId="module-5"
        nextLabel="Proceed to Module 5: Semantic Search Playground"
        onNavigate={onNavigate}
        onMarkComplete={onComplete}
        isCompleted={isCompleted}
      />
    </div>
  );
}
