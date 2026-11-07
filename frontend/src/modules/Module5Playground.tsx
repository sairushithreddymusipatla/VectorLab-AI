import React, { useState, useEffect } from 'react';
import {
  Compass,
  Search,
  Sparkles,
  Zap,
  RefreshCw,
  Plus,
  Trash2,
  HelpCircle,
  Calculator,
  Sliders,
  CheckCircle2,
  AlertCircle,
  FileText,
  BarChart2,
} from 'lucide-react';
import { ModuleMeta, ModuleId, SearchResponse, SearchItem } from '../types';
import { ModuleHeader } from '../components/common/ModuleHeader';
import { ModuleNavButtons } from '../components/common/ModuleNavButtons';
import { FormulaViewer } from '../components/common/FormulaViewer';
import { KnowledgeCheck } from '../components/common/KnowledgeCheck';
import { PLAYGROUND_DEFAULT_DOCS, PLAYGROUND_PRESET_QUERIES } from '../data/playgroundData';
import { searchDocuments } from '../services/api';

interface Module5PlaygroundProps {
  module: ModuleMeta;
  onNavigate: (module: ModuleId) => void;
  onComplete: () => void;
  isCompleted: boolean;
}

export function Module5Playground({
  module,
  onNavigate,
  onComplete,
  isCompleted,
}: Module5PlaygroundProps) {
  const [documents, setDocuments] = useState<string[]>(PLAYGROUND_DEFAULT_DOCS);
  const [query, setQuery] = useState<string>('I want to learn how computers think.');
  const [newDocText, setNewDocText] = useState<string>('');
  const [searchResponse, setSearchResponse] = useState<SearchResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isFallbackMode, setIsFallbackMode] = useState<boolean>(false);
  const [viewTab, setViewTab] = useState<'semantic' | 'comparison' | 'formula'>('semantic');

  const executeSearch = async (searchQuery: string, docList = documents) => {
    if (!searchQuery.trim()) {
      setErrorMessage('Search query cannot be empty.');
      return;
    }
    if (docList.length === 0) {
      setErrorMessage('Document collection cannot be empty.');
      return;
    }

    setIsLoading(true);
    setErrorMessage(null);

    try {
      const res = await searchDocuments(searchQuery.trim(), docList);
      setSearchResponse(res.data);
      setIsFallbackMode(res.isFallback);
    } catch (e: any) {
      setErrorMessage(e.message || 'An error occurred during search.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    executeSearch(query, documents);
  }, []);

  const handleAddDocument = () => {
    if (!newDocText.trim()) return;
    const updated = [...documents, newDocText.trim()];
    setDocuments(updated);
    setNewDocText('');
    executeSearch(query, updated);
  };

  const handleRemoveDocument = (index: number) => {
    if (documents.length <= 2) {
      alert('Please keep at least 2 documents in the collection.');
      return;
    }
    const updated = documents.filter((_, i) => i !== index);
    setDocuments(updated);
    executeSearch(query, updated);
  };

  const handleResetDocs = () => {
    setDocuments(PLAYGROUND_DEFAULT_DOCS);
    executeSearch(query, PLAYGROUND_DEFAULT_DOCS);
  };

  const handleClear = () => {
    setQuery('');
    setSearchResponse(null);
  };

  return (
    <div className="max-w-4xl mx-auto py-4">
      <ModuleHeader module={module} />

      {/* Main Interactive Search Engine Interface */}
      <div className="bg-slate-900/90 border border-indigo-500/40 rounded-2xl p-6 shadow-2xl mb-8">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Compass className="w-5 h-5 text-cyan-400" />
              <span>Real-Time Semantic Search Engine</span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Powered by SentenceTransformer <code className="text-cyan-300">all-MiniLM-L6-v2</code> & Cosine Similarity.
            </p>
          </div>

          {/* View Tab Selector */}
          <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs">
            <button
              onClick={() => setViewTab('semantic')}
              className={`px-3 py-1 rounded-lg font-medium transition ${
                viewTab === 'semantic' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              Semantic Rankings
            </button>
            <button
              onClick={() => setViewTab('comparison')}
              className={`px-3 py-1 rounded-lg font-medium transition ${
                viewTab === 'comparison' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              Keyword vs Semantic
            </button>
            <button
              onClick={() => setViewTab('formula')}
              className={`px-3 py-1 rounded-lg font-medium transition ${
                viewTab === 'formula' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              Cosine Formula
            </button>
          </div>
        </div>

        {/* Search Input Bar */}
        <div className="space-y-3 mb-6">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <input
                type="text"
                value={query}
                onChange={e => setQuery(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && executeSearch(query)}
                placeholder="Ask a question or enter a search query..."
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
              />
              {query && (
                <button
                  onClick={handleClear}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 text-xs font-semibold px-1.5 py-0.5"
                >
                  Clear
                </button>
              )}
            </div>

            <button
              onClick={() => executeSearch(query)}
              disabled={isLoading || !query.trim()}
              className="px-5 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 disabled:opacity-50 text-white text-xs sm:text-sm font-bold rounded-xl flex items-center gap-2 shadow-lg shadow-indigo-600/25 transition"
            >
              {isLoading ? (
                <RefreshCw className="w-4 h-4 animate-spin" />
              ) : (
                <Search className="w-4 h-4" />
              )}
              <span>Search</span>
            </button>
          </div>

          {/* Preset Queries */}
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-[11px] text-slate-400 font-medium mr-1">Presets:</span>
            {PLAYGROUND_PRESET_QUERIES.map((preset, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setQuery(preset);
                  executeSearch(preset);
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

        {/* Error message if any */}
        {errorMessage && (
          <div className="p-3 mb-4 rounded-xl bg-rose-950/40 border border-rose-500/40 text-rose-300 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Loading Spinner */}
        {isLoading && (
          <div className="py-12 flex flex-col items-center justify-center gap-2 text-indigo-400 text-xs">
            <RefreshCw className="w-6 h-6 animate-spin text-cyan-400" />
            <span>Calculating 384D embeddings and computing cosine similarities...</span>
          </div>
        )}

        {/* TAB 1: Semantic Rankings */}
        {!isLoading && viewTab === 'semantic' && searchResponse && (
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs text-slate-400 pb-2 border-b border-slate-800">
              <span>
                Ranked <strong className="text-white">{searchResponse.results.length}</strong> documents for: "<em>{searchResponse.query}</em>"
              </span>
              <span className="font-mono text-[11px] text-indigo-300">
                Sorted by Cosine Similarity (High → Low)
              </span>
            </div>

            {searchResponse.results.map((res: SearchItem) => {
              const isTop = res.rank === 1;
              const isHigh = res.score >= 0.45;

              return (
                <div
                  key={res.id}
                  className={`p-4 rounded-xl border transition-all ${
                    isTop
                      ? 'bg-gradient-to-r from-indigo-950/60 via-purple-950/40 to-slate-900 border-indigo-500/50 shadow-md ring-1 ring-indigo-500/30'
                      : 'bg-slate-950/70 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div className="flex items-center gap-2.5">
                      <span
                        className={`w-6 h-6 rounded-lg text-xs font-bold font-mono flex items-center justify-center shrink-0 ${
                          isTop
                            ? 'bg-indigo-600 text-white shadow'
                            : 'bg-slate-800 text-slate-400'
                        }`}
                      >
                        #{res.rank}
                      </span>
                      <h4 className="text-xs sm:text-sm font-bold text-white">
                        {res.document}
                      </h4>
                    </div>

                    {/* Exact Similarity Score Badge */}
                    <div className="text-right shrink-0">
                      <div className="font-mono text-xs sm:text-sm font-bold text-cyan-300">
                        {res.score > 0 ? `+${res.score.toFixed(4)}` : res.score.toFixed(4)}
                      </div>
                      <div className="text-[10px] text-slate-400">
                        {res.score_percentage}% alignment
                      </div>
                    </div>
                  </div>

                  {/* Progress Meter Bar */}
                  <div className="w-full h-1.5 bg-slate-900 rounded-full overflow-hidden mb-2">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        isTop
                          ? 'bg-gradient-to-r from-cyan-400 to-indigo-500'
                          : isHigh
                          ? 'bg-indigo-500'
                          : 'bg-slate-700'
                      }`}
                      style={{ width: `${Math.max(4, Math.min(100, res.score_percentage))}%` }}
                    />
                  </div>

                  <p className="text-[11px] text-slate-400 pl-8">
                    <span className="font-semibold text-indigo-300">Rationale: </span>
                    {res.explanation}
                  </p>
                </div>
              );
            })}
          </div>
        )}

        {/* TAB 2: Side-by-Side Comparison */}
        {!isLoading && viewTab === 'comparison' && searchResponse && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800">
              <h4 className="text-xs font-bold text-slate-300 mb-2 flex items-center gap-1.5 pb-2 border-b border-slate-800">
                <Search className="w-3.5 h-3.5 text-slate-400" />
                <span>Keyword Exact Match Ranking</span>
              </h4>
              <div className="space-y-2">
                {[...searchResponse.results]
                  .sort((a, b) => b.keyword_score - a.keyword_score)
                  .map((r, i) => (
                    <div key={i} className="p-2.5 rounded-lg bg-slate-900/60 border border-slate-800 text-xs">
                      <div className="flex justify-between items-start gap-2">
                        <span className="text-slate-200 font-medium">{r.document}</span>
                        <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-amber-300">
                          {Math.round(r.keyword_score * 100)}%
                        </span>
                      </div>
                      <div className="text-[10px] text-slate-400 mt-1">
                        Matches: {r.keyword_matches.length > 0 ? r.keyword_matches.join(', ') : 'none'}
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            <div className="p-4 rounded-xl bg-indigo-950/30 border border-indigo-500/30">
              <h4 className="text-xs font-bold text-cyan-300 mb-2 flex items-center gap-1.5 pb-2 border-b border-indigo-500/20">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                <span>Semantic Search (Cosine Ranking)</span>
              </h4>
              <div className="space-y-2">
                {searchResponse.results.map((r, i) => (
                  <div key={i} className="p-2.5 rounded-lg bg-indigo-950/40 border border-indigo-500/30 text-xs">
                    <div className="flex justify-between items-start gap-2">
                      <span className="text-white font-medium">{r.document}</span>
                      <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-500/30">
                        {r.score.toFixed(4)}
                      </span>
                    </div>
                    <div className="text-[10px] text-indigo-300 mt-1">
                      Rank #{r.rank} • {r.score_percentage}% directional match
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: Formula Breakdown */}
        {!isLoading && viewTab === 'formula' && (
          <FormulaViewer />
        )}
      </div>

      {/* Section 2: Manage Document Collection (Custom Docs) */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl mb-8">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <FileText className="w-4 h-4 text-indigo-400" />
              <span>Document Collection ({documents.length} Items Indexed)</span>
            </h3>
            <p className="text-xs text-slate-400">
              Add your own documents to test how the AI model ranks custom texts.
            </p>
          </div>

          <button
            onClick={handleResetDocs}
            className="px-2.5 py-1 text-xs text-slate-400 hover:text-white rounded-lg border border-slate-800 hover:bg-slate-800 transition"
          >
            Reset to Defaults
          </button>
        </div>

        {/* Add doc input */}
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            value={newDocText}
            onChange={e => setNewDocText(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleAddDocument()}
            placeholder="Type a new document sentence and click Add..."
            className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
          />
          <button
            onClick={handleAddDocument}
            disabled={!newDocText.trim()}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 transition"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Document</span>
          </button>
        </div>

        {/* Document list tags */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
          {documents.map((doc, idx) => (
            <div
              key={idx}
              className="p-2.5 rounded-lg bg-slate-950/60 border border-slate-800/80 flex items-center justify-between gap-2 group"
            >
              <span className="text-slate-300 truncate">
                <span className="text-indigo-400 font-mono text-[10px] mr-1.5">[{idx + 1}]</span>
                {doc}
              </span>
              <button
                onClick={() => handleRemoveDocument(idx)}
                className="opacity-0 group-hover:opacity-100 text-slate-500 hover:text-rose-400 transition p-1"
                title="Remove document"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Section 3: Concept Check */}
      <div className="mb-8">
        <KnowledgeCheck
          question="What does a high cosine similarity score (e.g. 0.82) between a user query and a document signify?"
          options={[
            'The document is guaranteed to be 100% factually true and verified by scientists',
            'The document vector shares strong directional alignment with the query vector in multi-dimensional semantic space',
            'The document contains 82% of the exact letters typed in the search bar',
            'The query took 0.82 seconds to execute on the CPU',
          ]}
          correctIndex={1}
          explanation="Cosine similarity measures the geometric angle between high-dimensional vectors. A high score means the document points in almost the same conceptual direction as the query, indicating strong semantic relevance, not an empirical truth guarantee."
          onCorrect={onComplete}
        />
      </div>

      <ModuleNavButtons
        prevModuleId="module-4"
        nextModuleId="module-6"
        nextLabel="Proceed to Module 6: Real-World Applications"
        onNavigate={onNavigate}
        onMarkComplete={onComplete}
        isCompleted={isCompleted}
      />
    </div>
  );
}
