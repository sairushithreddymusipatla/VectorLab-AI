import React from 'react';
import {
  LayoutDashboard,
  Play,
  CheckCircle2,
  Clock,
  Award,
  BookOpen,
  ArrowRight,
  Sparkles,
  HelpCircle,
  RotateCcw,
  Compass,
} from 'lucide-react';
import { ModuleId, ModuleMeta, UserProgress } from '../types';
import { COURSE_MODULES } from '../data/modules';

interface DashboardPageProps {
  progress: UserProgress;
  progressPercentage: number;
  onNavigate: (module: ModuleId) => void;
  onResetProgress: () => void;
}

export function DashboardPage({
  progress,
  progressPercentage,
  onNavigate,
  onResetProgress,
}: DashboardPageProps) {
  const completedCount = progress.completedModules.filter(m => m.startsWith('module-')).length;
  const remainingCount = COURSE_MODULES.length - completedCount;
  const isQuizPassed = progress.quizPassed;

  // Determine which module to resume: first incomplete module
  const nextIncompleteModule = COURSE_MODULES.find(m => !progress.completedModules.includes(m.id))?.id || 'quiz';

  const formatTimeSpent = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
  };

  return (
    <div className="max-w-5xl mx-auto py-6 px-4">
      {/* Student Welcome Hero */}
      <div className="bg-gradient-to-r from-indigo-950/70 via-purple-950/50 to-slate-900 border border-indigo-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl mb-8 relative overflow-hidden">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="max-w-xl">
            <span className="px-2.5 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
              Student Learning Dashboard
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-2 mb-1">
              Embeddings & Semantic Search
            </h1>
            <p className="text-xs sm:text-sm text-slate-300">
              Self-paced interactive learning track • 45 minutes total curriculum
            </p>
          </div>

          <button
            onClick={() => onNavigate(nextIncompleteModule as ModuleId)}
            className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-xl shadow-indigo-600/30 transition hover:scale-105"
          >
            <Play className="w-4 h-4 fill-white" />
            <span>Resume Learning</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* 4 Quick Stat Tiles */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-6 border-t border-slate-800/80">
          <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800">
            <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Course Progress</span>
            <div className="flex items-center gap-2 mt-0.5">
              <span className="text-lg font-bold text-cyan-400 font-mono">{progressPercentage}%</span>
              <div className="w-16 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-cyan-400 rounded-full"
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>
            </div>
          </div>

          <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800">
            <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Completed Modules</span>
            <span className="text-lg font-bold text-emerald-400 font-mono">
              {completedCount} / {COURSE_MODULES.length}
            </span>
          </div>

          <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800">
            <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Time in Session</span>
            <span className="text-lg font-bold text-indigo-300 font-mono">
              {formatTimeSpent(progress.timeSpentSeconds)}
            </span>
          </div>

          <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800">
            <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Quiz Assessment</span>
            <span className={`text-sm font-bold mt-0.5 block ${isQuizPassed ? 'text-emerald-400' : 'text-amber-400'}`}>
              {isQuizPassed ? `Passed (${progress.quizScore}%)` : 'Not Completed'}
            </span>
          </div>
        </div>
      </div>

      {/* 7 Modules Progress Grid */}
      <div className="mb-10">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-indigo-400" />
            <span>Curriculum Lessons</span>
          </h2>
          <span className="text-xs text-slate-400">
            {remainingCount === 0 ? 'All 7 modules completed!' : `${remainingCount} lessons remaining`}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {COURSE_MODULES.map((mod: ModuleMeta) => {
            const isCompleted = progress.completedModules.includes(mod.id);

            return (
              <div
                key={mod.id}
                onClick={() => onNavigate(mod.id)}
                className={`p-5 rounded-2xl border transition-all cursor-pointer group ${
                  isCompleted
                    ? 'bg-slate-900/60 border-slate-800 hover:border-emerald-500/40'
                    : 'bg-slate-900/90 border-slate-800 hover:border-indigo-500/50 shadow-lg'
                }`}
              >
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div className="flex items-center gap-2.5">
                    <div
                      className={`w-7 h-7 rounded-xl flex items-center justify-center font-bold text-xs shrink-0 ${
                        isCompleted
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                          : 'bg-indigo-600/30 text-indigo-300 border border-indigo-500/30'
                      }`}
                    >
                      {isCompleted ? <CheckCircle2 className="w-4 h-4" /> : mod.number}
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-white group-hover:text-indigo-300 transition">
                        {mod.title}
                      </h3>
                      <span className="text-[11px] text-slate-400 flex items-center gap-1">
                        <Clock className="w-3 h-3 text-cyan-400" />
                        {mod.durationMinutes} minutes
                      </span>
                    </div>
                  </div>

                  <span
                    className={`text-[10px] uppercase font-bold font-mono px-2 py-0.5 rounded ${
                      isCompleted
                        ? 'bg-emerald-500/10 text-emerald-300 border border-emerald-500/30'
                        : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    {isCompleted ? 'Completed' : 'Ready'}
                  </span>
                </div>

                <p className="text-xs text-slate-400 line-clamp-2 mb-3">
                  {mod.description}
                </p>

                <div className="text-[11px] text-indigo-400 font-semibold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  <span>{isCompleted ? 'Review Lesson' : 'Start Lesson'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Evaluation Assessment Card */}
      <div className="p-6 rounded-3xl bg-slate-900/80 border border-purple-500/30 shadow-xl flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-purple-500/20 text-purple-400 flex items-center justify-center shrink-0">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white">Final Knowledge Assessment</h3>
            <p className="text-xs text-slate-400 mt-0.5">
              10 Comprehensive multiple choice questions covering all core concepts. Pass mark: 70%.
            </p>
          </div>
        </div>

        <button
          onClick={() => onNavigate('quiz')}
          className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold transition flex items-center gap-2 shadow"
        >
          <span>{isQuizPassed ? 'Review Quiz Scores' : 'Take Knowledge Quiz'}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
