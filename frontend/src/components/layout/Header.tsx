import React from 'react';
import {
  Sparkles,
  Cpu,
  Compass,
  CheckCircle2,
  BookOpen,
  Menu,
  RotateCcw,
} from 'lucide-react';
import { ModuleId, BackendStatus } from '../../types';

interface HeaderProps {
  currentModule: ModuleId;
  progressPercentage: number;
  backendStatus: BackendStatus;
  onNavigate: (module: ModuleId) => void;
  onToggleSidebar?: () => void;
}

export function Header({
  currentModule,
  progressPercentage,
  backendStatus,
  onNavigate,
  onToggleSidebar,
}: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 bg-slate-950/80 backdrop-blur-md border-b border-slate-800/80 px-4 lg:px-8 py-3 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Brand & Mobile Hamburger */}
        <div className="flex items-center gap-3">
          {onToggleSidebar && (
            <button
              onClick={onToggleSidebar}
              className="lg:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
              aria-label="Toggle navigation menu"
            >
              <Menu className="w-5 h-5" />
            </button>
          )}

          <div
            onClick={() => onNavigate('welcome')}
            className="flex items-center gap-2.5 cursor-pointer group"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-cyan-400 flex items-center justify-center shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-transform">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="font-bold text-lg tracking-tight bg-gradient-to-r from-white via-slate-100 to-indigo-200 bg-clip-text text-transparent">
                VECTORLAB
              </span>
              <span className="ml-1 px-1.5 py-0.5 text-[10px] font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 rounded uppercase tracking-wider">
                AI
              </span>
            </div>
          </div>
        </div>

        {/* Center: Live AI Engine Status & Progress */}
        <div className="hidden md:flex items-center gap-6">
          {/* AI Backend Status */}
          <div
            className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs border ${
              backendStatus.isHealthy && !backendStatus.usingFallback
                ? 'bg-emerald-950/40 border-emerald-500/30 text-emerald-300'
                : 'bg-amber-950/40 border-amber-500/30 text-amber-300'
            }`}
          >
            <span
              className={`w-2 h-2 rounded-full ${
                backendStatus.isHealthy && !backendStatus.usingFallback
                  ? 'bg-emerald-400 animate-pulse'
                  : 'bg-amber-400'
              }`}
            />
            <Cpu className="w-3.5 h-3.5 opacity-80" />
            <span className="font-mono text-[11px]">
              {backendStatus.isHealthy && !backendStatus.usingFallback
                ? 'all-MiniLM-L6-v2 (384D Real AI)'
                : 'Illustrative Fallback Simulator'}
            </span>
          </div>

          {/* Progress Meter */}
          <div className="flex items-center gap-2.5">
            <span className="text-xs text-slate-400 font-medium">Lesson Progress</span>
            <div className="w-32 h-2 bg-slate-800 rounded-full overflow-hidden border border-slate-700/50">
              <div
                className="h-full bg-gradient-to-r from-indigo-500 to-cyan-400 rounded-full transition-all duration-500"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
            <span className="text-xs font-semibold text-indigo-300">{progressPercentage}%</span>
          </div>
        </div>

        {/* Right Navigation CTAs */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => onNavigate('dashboard')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition flex items-center gap-1.5 ${
              currentModule === 'dashboard'
                ? 'bg-indigo-600/30 text-indigo-300 border border-indigo-500/40'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Dashboard</span>
          </button>

          <button
            onClick={() => onNavigate('module-5')}
            className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition flex items-center gap-1.5 shadow-sm ${
              currentModule === 'module-5'
                ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-indigo-500/25 ring-1 ring-purple-400/40'
                : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700'
            }`}
          >
            <Compass className="w-3.5 h-3.5 text-cyan-400" />
            <span>Playground</span>
          </button>
        </div>
      </div>
    </header>
  );
}
