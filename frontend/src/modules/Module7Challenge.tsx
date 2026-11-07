import React, { useState } from 'react';
import {
  Trophy,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Search,
  Sparkles,
  Lightbulb,
  ArrowRight,
  ShieldCheck,
  Send,
  RefreshCw,
} from 'lucide-react';
import { ModuleMeta, ModuleId, SearchItem } from '../types';
import { ModuleHeader } from '../components/common/ModuleHeader';
import { ModuleNavButtons } from '../components/common/ModuleNavButtons';
import { CHALLENGE_DOCUMENTS, CHALLENGE_SCENARIOS, ChallengeScenario } from '../data/challengeData';
import { searchDocuments } from '../services/api';

interface Module7ChallengeProps {
  module: ModuleMeta;
  onNavigate: (module: ModuleId) => void;
  onComplete: () => void;
  isCompleted: boolean;
}

export function Module7Challenge({
  module,
  onNavigate,
  onComplete,
  isCompleted,
}: Module7ChallengeProps) {
  const [selectedScenarioIndex, setSelectedScenarioIndex] = useState<number>(0);
  const scenario = CHALLENGE_SCENARIOS[selectedScenarioIndex];

  const [queryInput, setQueryInput] = useState<string>(scenario.customerQuery);
  const [retrievedDocs, setRetrievedDocs] = useState<SearchItem[]>([]);
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [selectedDocId, setSelectedDocId] = useState<number | null>(null);
  const [studentRationale, setStudentRationale] = useState<string>('');
  const [revealedHints, setRevealedHints] = useState<number>(0);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [evaluation, setEvaluation] = useState<{ isCorrect: boolean; feedback: string } | null>(null);

  const runChallengeSearch = async (q: string) => {
    setIsSearching(true);
    try {
      const res = await searchDocuments(q, CHALLENGE_DOCUMENTS, 3);
      setRetrievedDocs(res.data.results);
      // Reset submission state when query changes
      setIsSubmitted(false);
      setEvaluation(null);
      setSelectedDocId(null);
    } catch (e) {
      console.error(e);
    } finally {
      setIsSearching(false);
    }
  };

  React.useEffect(() => {
    setQueryInput(scenario.customerQuery);
    setRevealedHints(0);
    setIsSubmitted(false);
    setEvaluation(null);
    setSelectedDocId(null);
    setStudentRationale('');
    runChallengeSearch(scenario.customerQuery);
  }, [selectedScenarioIndex]);

  const handleRevealNextHint = () => {
    if (revealedHints < scenario.hints.length) {
      setRevealedHints(prev => prev + 1);
    }
  };

  const handleSubmitChallenge = () => {
    if (selectedDocId === null) {
      alert('Please select which of the retrieved documents is the most relevant resolution.');
      return;
    }

    const selectedDoc = retrievedDocs.find(d => d.id === selectedDocId);
    const expectedDocText = CHALLENGE_DOCUMENTS[scenario.expectedDocIndex];
    const isCorrect = selectedDoc?.document.trim() === expectedDocText.trim();

    setIsSubmitted(true);
    setEvaluation({
      isCorrect,
      feedback: isCorrect
        ? `Outstanding engineering analysis! You correctly identified "${expectedDocText}" as the prime resolution.`
        : `Not the optimal choice. Your selected document does not address the core issue as directly as "${expectedDocText}". Inspect the similarity scores and rationale below.`,
    });

    if (isCorrect) {
      onComplete();
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-4">
      <ModuleHeader module={module} />

      {/* Challenge Hero Banner */}
      <div className="bg-gradient-to-r from-purple-950/60 via-indigo-950/60 to-slate-900 border border-purple-500/40 rounded-2xl p-6 shadow-2xl mb-8">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
          <div className="flex items-center gap-2 text-purple-300 font-bold text-sm">
            <Trophy className="w-5 h-5 text-amber-400" />
            <span>Mission: Become a Semantic Search Engineer</span>
          </div>
          <span className="px-2.5 py-0.5 text-xs font-mono font-bold bg-purple-500/20 text-purple-200 border border-purple-500/30 rounded-full">
            Enterprise Support Routing Scenario
          </span>
        </div>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          An enterprise SaaS platform receives hundreds of ambiguous user inquiries daily. Your task is to use the semantic embedding model to retrieve the top 3 documents, evaluate the calculated cosine similarities, select the single most relevant resolution, and validate your rationale.
        </p>

        {/* Scenario Switcher Tabs */}
        <div className="flex flex-wrap items-center gap-2 mt-4 pt-4 border-t border-slate-800">
          <span className="text-xs text-slate-400 font-medium">Select Ticket Scenario:</span>
          {CHALLENGE_SCENARIOS.map((sc, idx) => (
            <button
              key={sc.id}
              onClick={() => setSelectedScenarioIndex(idx)}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition ${
                selectedScenarioIndex === idx
                  ? 'bg-purple-600 text-white shadow'
                  : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              Case #{idx + 1}
            </button>
          ))}
        </div>
      </div>

      {/* Step 1: Query Formulation & Embedding Search */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl mb-6">
        <h3 className="text-sm font-bold text-white mb-2 flex items-center gap-2">
          <Search className="w-4 h-4 text-cyan-400" />
          <span>Step 1: Test Inbound Customer Ticket Query</span>
        </h3>
        <p className="text-xs text-slate-400 mb-3">
          You can use the real customer inquiry or edit it to test variations before generating vectors:
        </p>

        <div className="flex gap-2">
          <input
            type="text"
            value={queryInput}
            onChange={e => setQueryInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && runChallengeSearch(queryInput)}
            className="flex-1 bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-indigo-500"
          />
          <button
            onClick={() => runChallengeSearch(queryInput)}
            disabled={isSearching}
            className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 transition"
          >
            {isSearching ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
            <span>Run Retrieval</span>
          </button>
        </div>
      </div>

      {/* Step 2: Evaluate Top 3 Retrieved Documents */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl mb-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Step 2: Top 3 Retrieved Articles from Knowledge Base</span>
          </h3>
          <span className="text-[11px] font-mono text-indigo-300">
            Selected from {CHALLENGE_DOCUMENTS.length} candidate documents
          </span>
        </div>

        <p className="text-xs text-slate-400 mb-4">
          Click to select which document represents the single most accurate resolution:
        </p>

        {isSearching ? (
          <div className="py-8 text-center text-xs text-indigo-400 flex items-center justify-center gap-2">
            <RefreshCw className="w-4 h-4 animate-spin" />
            <span>Calculating embeddings across enterprise corpus...</span>
          </div>
        ) : (
          <div className="space-y-2.5">
            {retrievedDocs.map((item, idx) => {
              const isSelected = selectedDocId === item.id;

              return (
                <div
                  key={item.id}
                  onClick={() => setSelectedDocId(item.id)}
                  className={`p-4 rounded-xl border text-xs cursor-pointer transition flex items-start justify-between gap-3 ${
                    isSelected
                      ? 'bg-indigo-950/70 border-indigo-500 ring-2 ring-indigo-500/50 shadow-lg text-white'
                      : 'bg-slate-950/60 border-slate-800 hover:border-slate-700 text-slate-300'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`w-5 h-5 rounded-full flex items-center justify-center font-mono text-[10px] font-bold mt-0.5 shrink-0 ${
                        isSelected ? 'bg-indigo-500 text-white' : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      {idx + 1}
                    </div>
                    <div>
                      <h4 className="font-semibold text-white mb-1">{item.document}</h4>
                      <p className="text-[11px] text-slate-400">{item.explanation}</p>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <span className="font-mono text-xs font-bold text-cyan-300 block">
                      +{item.score.toFixed(4)}
                    </span>
                    <span className="text-[10px] text-slate-400">
                      {item.score_percentage}% similarity
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Step 3: Progressive Hints & Engineering Rationale */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl mb-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Lightbulb className="w-4 h-4 text-amber-400" />
            <span>Engineering Hints ({revealedHints}/{scenario.hints.length} Revealed)</span>
          </h3>
          {revealedHints < scenario.hints.length && (
            <button
              onClick={handleRevealNextHint}
              className="px-3 py-1 text-xs text-amber-300 hover:text-white rounded-lg bg-amber-950/30 border border-amber-500/30 transition"
            >
              Reveal Next Hint
            </button>
          )}
        </div>

        {revealedHints === 0 ? (
          <p className="text-xs text-slate-500 italic">
            Hints are hidden to encourage your own independent vector analysis. Click "Reveal Next Hint" if you get stuck.
          </p>
        ) : (
          <div className="space-y-2">
            {scenario.hints.slice(0, revealedHints).map((h, i) => (
              <div
                key={i}
                className="p-3 bg-amber-950/20 border border-amber-500/20 rounded-xl text-xs text-amber-200/90 flex items-start gap-2"
              >
                <span className="font-mono font-bold text-amber-400 shrink-0">#{i + 1}:</span>
                <span>{h}</span>
              </div>
            ))}
          </div>
        )}

        {/* Student Rationale input */}
        <div className="mt-4 pt-4 border-t border-slate-800">
          <label className="text-xs font-semibold text-slate-300 block mb-1.5">
            Brief Engineering Rationale (Why is your selected document the best match?):
          </label>
          <textarea
            rows={2}
            value={studentRationale}
            onChange={e => setStudentRationale(e.target.value)}
            placeholder="e.g., Even though the query uses different words, the semantic intent aligns with duplicate billing..."
            className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
          />
        </div>

        {/* Submit Challenge Button */}
        <div className="mt-4 flex justify-end">
          <button
            onClick={handleSubmitChallenge}
            disabled={selectedDocId === null}
            className="px-5 py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 disabled:opacity-40 text-white text-xs font-bold rounded-xl flex items-center gap-2 shadow-lg transition"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Submit Engineering Decision</span>
          </button>
        </div>
      </div>

      {/* Step 4: Submission Evaluation & Solution */}
      {isSubmitted && evaluation && (
        <div
          className={`p-6 rounded-2xl border text-xs mb-8 transition-all shadow-xl ${
            evaluation.isCorrect
              ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-200'
              : 'bg-rose-950/30 border-rose-500/40 text-rose-200'
          }`}
        >
          <div className="flex items-center gap-2 text-sm font-bold mb-2">
            {evaluation.isCorrect ? (
              <>
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                <span className="text-white">Challenge Completed Successfully!</span>
              </>
            ) : (
              <>
                <XCircle className="w-5 h-5 text-rose-400" />
                <span className="text-white">Review Required</span>
              </>
            )}
          </div>
          <p className="mb-4 leading-relaxed">{evaluation.feedback}</p>

          <div className="p-4 bg-slate-950/80 rounded-xl border border-slate-800 text-slate-300 space-y-2">
            <h5 className="font-semibold text-cyan-300">Authoritative Solution Breakdown:</h5>
            <p>{scenario.explanation}</p>
          </div>
        </div>
      )}

      <ModuleNavButtons
        prevModuleId="module-6"
        nextModuleId="quiz"
        nextLabel="Proceed to Final Knowledge Assessment"
        onNavigate={onNavigate}
        onMarkComplete={onComplete}
        isCompleted={isCompleted}
      />
    </div>
  );
}
