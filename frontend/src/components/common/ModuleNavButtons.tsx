import React from 'react';
import { ArrowLeft, ArrowRight, CheckCircle2 } from 'lucide-react';
import { ModuleId } from '../../types';

interface ModuleNavButtonsProps {
  prevModuleId?: ModuleId;
  nextModuleId?: ModuleId;
  nextLabel?: string;
  onNavigate: (module: ModuleId) => void;
  onMarkComplete?: () => void;
  isCompleted?: boolean;
}

export function ModuleNavButtons({
  prevModuleId,
  nextModuleId,
  nextLabel = 'Continue to Next Module',
  onNavigate,
  onMarkComplete,
  isCompleted,
}: ModuleNavButtonsProps) {
  const handleNext = () => {
    onMarkComplete?.();
    if (nextModuleId) {
      onNavigate(nextModuleId);
    }
  };

  return (
    <div className="pt-10 pb-6 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-4 mt-12">
      {prevModuleId ? (
        <button
          onClick={() => onNavigate(prevModuleId)}
          className="px-4 py-2.5 rounded-xl border border-slate-800 bg-slate-900/60 text-slate-300 hover:text-white hover:bg-slate-800/60 text-xs font-semibold flex items-center gap-2 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Previous Step</span>
        </button>
      ) : (
        <div />
      )}

      <div className="flex items-center gap-3">
        {onMarkComplete && !isCompleted && (
          <button
            onClick={onMarkComplete}
            className="px-4 py-2.5 rounded-xl border border-emerald-500/30 bg-emerald-950/30 text-emerald-300 hover:bg-emerald-950/60 text-xs font-semibold flex items-center gap-2 transition"
          >
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Mark as Completed</span>
          </button>
        )}

        {nextModuleId && (
          <button
            onClick={handleNext}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white text-xs font-bold flex items-center gap-2 shadow-lg shadow-indigo-600/25 hover:shadow-indigo-600/40 transition group"
          >
            <span>{nextLabel}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </button>
        )}
      </div>
    </div>
  );
}
