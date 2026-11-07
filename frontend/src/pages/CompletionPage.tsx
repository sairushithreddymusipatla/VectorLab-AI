import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  Award,
  CheckCircle2,
  Printer,
  RotateCcw,
  BookOpen,
  Compass,
  ArrowRight,
  Sparkles,
  ShieldAlert,
} from 'lucide-react';
import { ModuleId, UserProgress } from '../types';
import { COURSE_MODULES } from '../data/modules';

interface CompletionPageProps {
  progress: UserProgress;
  onNavigate: (module: ModuleId) => void;
  onResetProgress: () => void;
}

export function CompletionPage({
  progress,
  onNavigate,
  onResetProgress,
}: CompletionPageProps) {
  useEffect(() => {
    // Trigger celebratory confetti on mount
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
      });
    } catch (e) {
      // Ignored if canvas unavailable
    }
  }, []);

  const completedCount = progress.completedModules.filter(m => m.startsWith('module-')).length;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      {/* Printable Completion Card */}
      <div className="bg-slate-900/90 border border-indigo-500/40 rounded-3xl p-8 sm:p-12 shadow-2xl relative overflow-hidden mb-8 print:border-none print:shadow-none print:p-0">
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Header Ribbon */}
        <div className="text-center max-w-2xl mx-auto mb-8">
          <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-indigo-500 via-purple-500 to-cyan-400 mx-auto flex items-center justify-center shadow-xl shadow-indigo-500/25 mb-4">
            <Award className="w-10 h-10 text-white" />
          </div>
          <span className="text-xs font-bold uppercase tracking-widest text-cyan-400 block mb-1">
            Course Completion Summary
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            VectorLab AI Masterclass
          </h1>
          <p className="text-sm text-slate-300 mt-2">
            "Understand Meaning. Explore Intelligence. Build with AI."
          </p>
        </div>

        {/* Verification Summary Box */}
        <div className="p-6 rounded-2xl bg-slate-950/80 border border-slate-800 mb-8 font-mono text-xs text-slate-300 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
          <div>
            <span className="text-[10px] text-slate-400 block uppercase">Modules Finished</span>
            <span className="text-lg font-bold text-white mt-1 block">{completedCount} / 7 Modules</span>
          </div>
          <div>
            <span className="text-[10px] text-slate-400 block uppercase">Quiz Score</span>
            <span className="text-lg font-bold text-cyan-400 mt-1 block">
              {progress.quizScore !== null ? `${progress.quizScore}%` : 'Pending'}
            </span>
          </div>
          <div>
            <span className="text-[10px] text-slate-400 block uppercase">Practical Challenge</span>
            <span className="text-lg font-bold text-emerald-400 mt-1 block">
              {progress.challengeCompleted ? 'Mastered' : 'Completed'}
            </span>
          </div>
          <div>
            <span className="text-[10px] text-slate-400 block uppercase">Embedding Engine</span>
            <span className="text-xs font-bold text-indigo-300 mt-1 block truncate">
              MiniLM-L6-v2
            </span>
          </div>
        </div>

        {/* Core Competencies Gained */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8 text-xs">
          <div className="p-4 rounded-xl bg-slate-950/50 border border-slate-800">
            <h4 className="font-bold text-white mb-2 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Key Concepts Learned</span>
            </h4>
            <ul className="space-y-1.5 text-slate-400">
              <li>• What high-dimensional vectors are and why neural networks require numbers.</li>
              <li>• The geometric difference between keyword matching and semantic search.</li>
              <li>• The exact Cosine Similarity formula: cos(θ) = (A · B) / (||A|| × ||B||).</li>
              <li>• How PCA projects 384-dimensional spaces onto 2D coordinate planes.</li>
            </ul>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/50 border border-slate-800">
            <h4 className="font-bold text-white mb-2 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span>Practical Skills Mastered</span>
            </h4>
            <ul className="space-y-1.5 text-slate-400">
              <li>• Running custom queries against vector-indexed document stores.</li>
              <li>• Interpreting similarity scores and directional vector angles.</li>
              <li>• Engineering knowledge retrieval pipelines for support ticket triage.</li>
              <li>• Architecting Retrieval-Augmented Generation (RAG) workflows.</li>
            </ul>
          </div>
        </div>

        {/* Non-Accreditation Transparency Notice */}
        <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-[11px] text-slate-400 flex items-start gap-2.5">
          <ShieldAlert className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
          <span>
            <strong>Educational Transparency Notice:</strong> This summary verifies successful completion of the 45-minute VectorLab AI interactive learning experience developed for the Kalvium Instructional Designer hiring assessment. It is an instructional record, not an accredited university diploma or certified credential.
          </span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap items-center justify-between gap-4 print:hidden">
        <button
          onClick={handlePrint}
          className="px-5 py-2.5 rounded-xl border border-slate-700 bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold flex items-center gap-2 transition"
        >
          <Printer className="w-4 h-4 text-cyan-400" />
          <span>Print / Save as PDF Summary</span>
        </button>

        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              if (window.confirm('Do you want to reset all progress and restart the course?')) {
                onResetProgress();
                onNavigate('welcome');
              }
            }}
            className="px-4 py-2.5 rounded-xl border border-slate-800 bg-slate-900 text-slate-400 hover:text-white text-xs font-medium flex items-center gap-1.5 transition"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Restart Course</span>
          </button>

          <button
            onClick={() => onNavigate('dashboard')}
            className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold flex items-center gap-2 transition shadow-lg"
          >
            <BookOpen className="w-4 h-4" />
            <span>Return to Dashboard</span>
          </button>
        </div>
      </div>
    </div>
  );
}
