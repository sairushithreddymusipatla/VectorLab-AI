import React from 'react';
import {
  LayoutDashboard,
  Search,
  Binary,
  Layers,
  ScatterChart,
  Compass,
  Cpu,
  Trophy,
  HelpCircle,
  Award,
  CheckCircle2,
  ChevronRight,
  Clock,
  RotateCcw,
  Sparkles,
} from 'lucide-react';
import { ModuleId, ModuleMeta } from '../../types';
import { COURSE_MODULES } from '../../data/modules';

interface SidebarProps {
  currentModule: ModuleId;
  completedModules: string[];
  quizPassed: boolean;
  onNavigate: (module: ModuleId) => void;
  onResetProgress: () => void;
  isOpen?: boolean;
  onClose?: () => void;
}

export function Sidebar({
  currentModule,
  completedModules,
  quizPassed,
  onNavigate,
  onResetProgress,
  isOpen = true,
  onClose,
}: SidebarProps) {
  const getModuleIcon = (number: number) => {
    switch (number) {
      case 1:
        return Search;
      case 2:
        return Binary;
      case 3:
        return Layers;
      case 4:
        return ScatterChart;
      case 5:
        return Compass;
      case 6:
        return Cpu;
      case 7:
        return Trophy;
      default:
        return Search;
    }
  };

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm z-40 lg:hidden"
        />
      )}

      <aside
        className={`fixed top-14 bottom-0 left-0 z-50 w-72 bg-slate-950/95 lg:bg-slate-950/80 backdrop-blur-md border-r border-slate-800/80 flex flex-col transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="p-4 border-b border-slate-800/60">
          <div className="text-xs uppercase tracking-wider font-semibold text-slate-400">
            Course Navigation
          </div>
          <div className="text-sm font-medium text-slate-200 mt-0.5">
            Embeddings & Semantic Search
          </div>
        </div>

        {/* Scrollable Navigation List */}
        <div className="flex-1 overflow-y-auto p-3 space-y-1 scrollbar-thin scrollbar-thumb-slate-800">
          {/* Dashboard Item */}
          <button
            onClick={() => {
              onNavigate('dashboard');
              onClose?.();
            }}
            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-left text-xs font-medium transition ${
              currentModule === 'dashboard'
                ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <LayoutDashboard className="w-4 h-4 text-indigo-400" />
              <span>Student Dashboard</span>
            </div>
          </button>

          <div className="pt-3 pb-1 px-3 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
            Learning Modules (45 Min)
          </div>

          {/* 7 Modules */}
          {COURSE_MODULES.map((mod: ModuleMeta) => {
            const Icon = getModuleIcon(mod.number);
            const isCompleted = completedModules.includes(mod.id);
            const isActive = currentModule === mod.id;

            return (
              <button
                key={mod.id}
                onClick={() => {
                  onNavigate(mod.id);
                  onClose?.();
                }}
                className={`w-full group flex items-center justify-between px-3 py-2.5 rounded-xl text-left transition ${
                  isActive
                    ? 'bg-gradient-to-r from-indigo-950/80 to-purple-950/50 text-white border border-indigo-500/40 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
                }`}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <div
                    className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 text-[11px] font-bold ${
                      isCompleted
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                        : isActive
                        ? 'bg-indigo-600 text-white shadow'
                        : 'bg-slate-800 text-slate-400 group-hover:text-slate-300'
                    }`}
                  >
                    {isCompleted ? <CheckCircle2 className="w-3.5 h-3.5" /> : mod.number}
                  </div>
                  <div className="truncate">
                    <div className="text-xs font-medium truncate text-slate-200">
                      {mod.shortTitle}
                    </div>
                    <div className="text-[10px] text-slate-400 flex items-center gap-1">
                      <Clock className="w-2.5 h-2.5" />
                      <span>{mod.durationMinutes} min</span>
                    </div>
                  </div>
                </div>

                {isActive && <ChevronRight className="w-4 h-4 text-indigo-400 shrink-0" />}
              </button>
            );
          })}

          <div className="pt-3 pb-1 px-3 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
            Evaluation & Rewards
          </div>

          {/* Final Quiz */}
          <button
            onClick={() => {
              onNavigate('quiz');
              onClose?.();
            }}
            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-left text-xs font-medium transition ${
              currentModule === 'quiz'
                ? 'bg-purple-950/60 text-purple-200 border border-purple-500/40 shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <div
                className={`w-6 h-6 rounded-lg flex items-center justify-center text-[11px] font-bold ${
                  quizPassed
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                    : 'bg-purple-900/40 text-purple-300'
                }`}
              >
                {quizPassed ? <CheckCircle2 className="w-3.5 h-3.5" /> : <HelpCircle className="w-3.5 h-3.5" />}
              </div>
              <div>
                <span className="text-slate-200">Knowledge Quiz</span>
                <span className="block text-[10px] text-slate-400">10 MCQs (70% to pass)</span>
              </div>
            </div>
            {quizPassed && (
              <span className="text-[10px] font-semibold px-1.5 py-0.5 bg-emerald-500/20 text-emerald-300 rounded border border-emerald-500/30">
                PASSED
              </span>
            )}
          </button>

          {/* Completion Page */}
          <button
            onClick={() => {
              onNavigate('completion');
              onClose?.();
            }}
            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-left text-xs font-medium transition ${
              currentModule === 'completion'
                ? 'bg-cyan-950/60 text-cyan-200 border border-cyan-500/40 shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Award className="w-5 h-5 text-amber-400" />
              <div>
                <span className="text-slate-200">Course Summary</span>
                <span className="block text-[10px] text-slate-400">Printable Record</span>
              </div>
            </div>
          </button>
        </div>

        {/* Footer actions */}
        <div className="p-3 border-t border-slate-800/60 bg-slate-950/60">
          <button
            onClick={() => {
              if (window.confirm('Reset all course progress and quiz answers?')) {
                onResetProgress();
              }
            }}
            className="w-full py-1.5 px-3 text-[11px] text-slate-400 hover:text-rose-300 hover:bg-rose-950/30 rounded-lg flex items-center justify-center gap-1.5 transition border border-transparent hover:border-rose-900/40"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset Lesson Progress</span>
          </button>
        </div>
      </aside>
    </>
  );
}
