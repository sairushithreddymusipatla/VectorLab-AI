import React from 'react';
import { Clock, BookOpen } from 'lucide-react';
import { ModuleMeta } from '../../types';

interface ModuleHeaderProps {
  module: ModuleMeta;
}

export function ModuleHeader({ module }: ModuleHeaderProps) {
  return (
    <div className="mb-8">
      <div className="flex flex-wrap items-center gap-2.5 mb-3">
        <span className="px-2.5 py-1 rounded-md text-xs font-bold uppercase tracking-wider bg-indigo-500/10 text-indigo-400 border border-indigo-500/30">
          Module {module.number} of 7
        </span>
        <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-slate-800/80 text-slate-300 border border-slate-700/60">
          <Clock className="w-3.5 h-3.5 text-cyan-400" />
          <span>{module.durationMinutes} min self-paced</span>
        </span>
        <span className="px-2.5 py-1 rounded-md text-xs font-medium bg-purple-950/40 text-purple-300 border border-purple-800/40">
          {module.badge}
        </span>
      </div>

      <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-2">
        {module.title}
      </h1>
      <p className="text-sm sm:text-base text-slate-400 max-w-3xl leading-relaxed">
        {module.description}
      </p>
    </div>
  );
}
