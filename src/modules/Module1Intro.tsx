import React, { useState } from 'react';
import {
  Search,
  Zap,
  AlertTriangle,
  CheckCircle2,
  HelpCircle,
  ArrowRight,
  Sparkles,
  RefreshCw,
} from 'lucide-react';
import { ModuleMeta, ModuleId } from '../types';
import { ModuleHeader } from '../components/common/ModuleHeader';
import { ModuleNavButtons } from '../components/common/ModuleNavButtons';
import { KnowledgeCheck } from '../components/common/KnowledgeCheck';
import { MODULE_1_DOCS, MODULE_1_DEFAULT_QUERY, MODULE_1_PRESET_QUERIES } from '../data/playgroundData';
import { searchDocuments } from '../services/api';

interface Module1IntroProps {
  module: ModuleMeta;
  onNavigate: (module: ModuleId) => void;
  onComplete: () => void;
  isCompleted: boolean;
}

export function Module1Intro({
  module,
  onNavigate,
  onComplete,
  isCompleted,
}: Module1IntroProps) {
  const [query, setQuery] = useState(MODULE_1_DEFAULT_QUERY);
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<{
    keywordResults: { doc: string; matches: string[]; score: number }[];
    semanticResults: { doc: string; score: number; scorePct: number; explanation: string }[];
  } | null>(null);

  const runComparison = async (searchQuery: string) => {
    setIsSearching(true);
    const qWords = new Set(searchQuery.toLowerCase().split(/\s+/).filter(w => w.length > 2));

    // Keyword matching logic: exact word match
    const kw = MODULE_1_DOCS.map(doc => {
      const docWords = new Set(doc.toLowerCase().replace(/[^a-z0-9 ]/g, '').split(/\s+/));
      const matches = [...qWords].filter(w => docWords.has(w));
      const score = matches.length / Math.max(1, qWords.size);
      return { doc, matches, score };
    }).sort((a, b) => b.score - a.score);

    // Live Semantic Search through backend/fallback
    try {
      const res = await searchDocuments(searchQuery, MODULE_1_DOCS);
      const sem = res.data.results.map(r => ({
        doc: r.document,
        score: r.score,
        scorePct: r.score_percentage,
        explanation: r.explanation,
      }));

      setSearchResults({
        keywordResults: kw,
        semanticResults: sem,
      });
    } catch (e) {
      console.error(e);
    } finally {
      setIsSearching(false);
    }
  };

  React.useEffect(() => {
    runComparison(MODULE_1_DEFAULT_QUERY);
  }, []);

  return (
    <div className="max-w-4xl mx-auto py-4">
      <ModuleHeader module={module} />

      {/* Section 1: Conceptual Foundation */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-lg">
          <div className="flex items-center gap-2.5 text-indigo-400 font-semibold text-sm mb-2">
            <Search className="w-4 h-4 text-slate-400" />
            <span>Keyword Search (Traditional)</span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            Acts like a strict spellchecker: it searches documents for the exact letters and words in your query. If a document uses synonyms (e.g., "workout" instead of "fitness"), traditional keyword search scores it zero.
          </p>
          <div className="mt-3 p-2.5 bg-slate-950/60 rounded-xl border border-slate-800 text-[11px] text-slate-400">
            <span className="text-amber-400 font-semibold block mb-0.5">Limitation:</span>
            "Fails whenever users express the same intent using different vocabulary."
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-gradient-to-br from-indigo-950/40 to-purple-950/30 border border-indigo-500/30 shadow-lg relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-500/10 rounded-full blur-xl pointer-events-none" />
          <div className="flex items-center gap-2.5 text-cyan-300 font-semibold text-sm mb-2">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span>Semantic Search (AI-Powered)</span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            Converts queries and documents into mathematical meaning-vectors. It compares the underlying concepts so "exercising daily" and "building muscle" are recognized as top answers for "improving fitness".
          </p>
          <div className="mt-3 p-2.5 bg-indigo-950/60 rounded-xl border border-indigo-500/30 text-[11px] text-indigo-200">
            <span className="text-cyan-400 font-semibold block mb-0.5">Superpower:</span>
            "Understands intent, contextual synonyms, and natural human questions."
          </div>
        </div>
      </div>

      {/* Section 2: Interactive Live Comparison Experiment */}
      <div className="bg-slate-900/90 border border-indigo-500/30 rounded-2xl p-6 shadow-2xl mb-8">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Zap className="w-4 h-4 text-amber-400" />
              <span>Interactive Experiment: Keyword Match vs Semantic Search</span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Type or select a query to test how traditional and AI engines interpret the same documents.
            </p>
          </div>

          <div className="flex items-center gap-1.5 text-xs text-slate-400">
            <span>Sample size:</span>
            <span className="font-mono text-indigo-400 font-semibold">4 Documents</span>
          </div>
        </div>

        {/* Query Input & Presets */}
        <div className="space-y-3 mb-6">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <input
                type="text"
                value={query}
                onChange={e => setQuery(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && runComparison(query)}
                placeholder="Enter a test question or search phrase..."
                className="w-full bg-slate-950 border border-slate-700/80 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition"
              />
            </div>
            <button
              onClick={() => runComparison(query)}
              disabled={isSearching}
              className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 transition shadow"
            >
              {isSearching ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Search className="w-3.5 h-3.5" />}
              <span>Compare</span>
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-[11px] text-slate-400 font-medium mr-1">Presets:</span>
            {MODULE_1_PRESET_QUERIES.map((preset, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setQuery(preset);
                  runComparison(preset);
                }}
                className={`text-[11px] px-2.5 py-1 rounded-lg border transition ${
                  query === preset
                    ? 'bg-indigo-500/20 text-indigo-300 border-indigo-500/40'
                    : 'bg-slate-950/60 text-slate-400 border-slate-800 hover:text-slate-200 hover:border-slate-700'
                }`}
              >
                {preset}
              </button>
            ))}
          </div>
        </div>

        {/* Side-by-Side Results Display */}
        {searchResults && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Keyword Results */}
            <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800">
              <div className="flex items-center justify-between pb-2.5 mb-3 border-b border-slate-800/80">
                <span className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                  <Search className="w-3.5 h-3.5 text-slate-400" />
                  <span>Keyword Matching Results</span>
                </span>
                <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 bg-slate-800 text-slate-400 rounded">
                  Lexical Match
                </span>
              </div>

              <div className="space-y-2">
                {searchResults.keywordResults.map((item, i) => (
                  <div
                    key={i}
                    className="p-2.5 rounded-lg bg-slate-900/60 border border-slate-800 text-xs flex items-start justify-between gap-2"
                  >
                    <div>
                      <div className="text-slate-200 font-medium">{item.doc}</div>
                      <div className="text-[10px] text-slate-400 mt-1">
                        Matching tokens:{' '}
                        {item.matches.length > 0 ? (
                          <span className="text-emerald-400 font-mono">
                            {item.matches.join(', ')}
                          </span>
                        ) : (
                          <span className="text-rose-400 font-mono">0 overlapping words</span>
                        )}
                      </div>
                    </div>
                    <span
                      className={`text-[11px] font-mono font-bold px-2 py-0.5 rounded ${
                        item.score > 0
                          ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                          : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      {Math.round(item.score * 100)}%
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Semantic Results */}
            <div className="p-4 rounded-xl bg-gradient-to-b from-indigo-950/30 to-purple-950/20 border border-indigo-500/30">
              <div className="flex items-center justify-between pb-2.5 mb-3 border-b border-indigo-500/20">
                <span className="text-xs font-semibold text-cyan-300 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Semantic Search Results</span>
                </span>
                <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 bg-indigo-500/20 text-indigo-300 rounded border border-indigo-500/30">
                  Cosine Similarity
                </span>
              </div>

              <div className="space-y-2">
                {searchResults.semanticResults.map((item, i) => (
                  <div
                    key={i}
                    className={`p-2.5 rounded-lg border text-xs transition ${
                      i === 0
                        ? 'bg-indigo-950/50 border-indigo-500/40 text-white shadow-sm'
                        : 'bg-slate-900/60 border-slate-800/80 text-slate-300'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="w-4 h-4 rounded-full bg-indigo-500/20 text-indigo-300 text-[10px] font-mono font-bold flex items-center justify-center shrink-0">
                          #{i + 1}
                        </span>
                        <span className="font-medium text-slate-200">{item.doc}</span>
                      </div>
                      <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded bg-cyan-950/60 text-cyan-300 border border-cyan-500/30 shrink-0">
                        {item.scorePct}%
                      </span>
                    </div>
                    <p className="text-[10px] text-slate-400 mt-1 pl-6">
                      {item.explanation}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Pedagogical Key Insight Callout */}
        <div className="mt-5 p-4 rounded-xl bg-indigo-950/40 border border-indigo-500/30 text-xs text-indigo-200 flex items-start gap-3">
          <CheckCircle2 className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
          <div>
            <span className="font-semibold text-white block mb-0.5">Instructional Takeaway:</span>
            Notice that for the query <em>"How can I improve my fitness?"</em>, the best documents (daily exercising, healthy food habits, building muscle) share almost <strong>zero exact keywords</strong> with the question! Keyword search fails completely, whereas Semantic Search instantly identifies them as top solutions because of conceptual proximity.
          </div>
        </div>
      </div>

      {/* Section 3: Concept Check */}
      <div className="mb-8">
        <KnowledgeCheck
          question="Why can semantic search identify relevant documents even when they contain none of the exact words in the user query?"
          options={[
            'It guesses randomly based on document length and character count',
            'It maps words and sentences into a multi-dimensional vector space where related concepts are placed close together',
            'It automatically opens Google and copies the top result ranking',
            'It checks an alphabetical index of all dictionary words',
          ]}
          correctIndex={1}
          explanation="Semantic search translates both query and documents into numerical vectors using a trained neural network. Because concepts like 'workout', 'exercise', and 'fitness' inhabit the same neighborhood in semantic space, the model identifies high similarity without needing exact spelling matches."
          onCorrect={onComplete}
        />
      </div>

      <ModuleNavButtons
        nextModuleId="module-2"
        nextLabel="Proceed to Module 2: Understanding Embeddings"
        onNavigate={onNavigate}
        onMarkComplete={onComplete}
        isCompleted={isCompleted}
      />
    </div>
  );
}
