import React from 'react';
import {
  Sparkles,
  ArrowRight,
  Compass,
  Clock,
  GraduationCap,
  Play,
  CheckCircle2,
  Cpu,
  Layers,
  Search,
  Zap,
  ScatterChart,
} from 'lucide-react';
import { ModuleId } from '../types';
import { COURSE_MODULES } from '../data/modules';

interface LandingPageProps {
  onNavigate: (module: ModuleId) => void;
}

export function LandingPage({ onNavigate }: LandingPageProps) {
  const learningOutcomes = [
    'Explain what text embeddings are and how they represent conceptual meaning.',
    'Understand how text is transformed into high-dimensional numerical vectors.',
    'Explain why neural networks require mathematical vector representations.',
    'Understand semantic similarity and distinguish meaning from spelling.',
    'Master the cosine similarity formula: cos(θ) = (A · B) / (||A|| × ||B||).',
    'Differentiate traditional exact keyword search from semantic vector search.',
    'Experiment with semantic search using custom queries and real embedding models.',
    'Understand how modern Transformer embedding models (all-MiniLM-L6-v2) work.',
    'Identify real-world industry use cases including chatbots and recommendation systems.',
    'Explain how vector embeddings power Retrieval-Augmented Generation (RAG).',
  ];

  return (
    <div className="max-w-6xl mx-auto py-8 px-4 sm:px-6">
      {/* Hero Section */}
      <div className="relative text-center py-12 sm:py-20 overflow-hidden">
        {/* Glowing background ambient lights */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-gradient-to-tr from-indigo-600/20 via-purple-600/15 to-cyan-500/15 rounded-full blur-3xl pointer-events-none" />

        {/* Badges Bar */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 mb-6">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-300 border border-indigo-500/30">
            <Clock className="w-3.5 h-3.5 text-cyan-400" />
            <span>45-Minute Lesson</span>
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-300 border border-emerald-500/30">
            <GraduationCap className="w-3.5 h-3.5 text-emerald-400" />
            <span>Beginner Friendly (Zero AI Math Prereq)</span>
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-purple-500/10 text-purple-300 border border-purple-500/30">
            <Sparkles className="w-3.5 h-3.5 text-purple-400" />
            <span>Interactive Labs & Real AI</span>
          </span>
        </div>

        {/* Hero Title & Subtitle */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-6 max-w-4xl mx-auto leading-tight">
          Discover How AI Understands{' '}
          <span className="bg-gradient-to-r from-indigo-400 via-purple-300 to-cyan-400 bg-clip-text text-transparent">
            Meaning
          </span>
        </h1>

        <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed mb-8">
          Explore embeddings and semantic search through interactive experiments, real AI demonstrations, and hands-on challenges.
        </p>

        {/* Hero Action CTAs */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={() => onNavigate('module-1')}
            className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 text-white font-bold text-sm flex items-center gap-2.5 shadow-xl shadow-indigo-600/30 transition group hover:scale-[1.02]"
          >
            <Play className="w-4 h-4 fill-white" />
            <span>Start Learning (Module 1)</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            onClick={() => onNavigate('module-5')}
            className="px-6 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 font-semibold text-sm flex items-center gap-2 transition hover:border-slate-600"
          >
            <Compass className="w-4 h-4 text-cyan-400" />
            <span>Explore Playground</span>
          </button>
        </div>
      </div>

      {/* Interactive Feature Previews Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-12">
        {/* Preview 1: Vector Visualization Preview */}
        <div
          onClick={() => onNavigate('module-4')}
          className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-indigo-500/50 cursor-pointer transition group shadow-xl relative overflow-hidden"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center">
                <ScatterChart className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white group-hover:text-indigo-300 transition">
                  Interactive 2D Vector Space
                </h3>
                <span className="text-[11px] text-slate-400">PCA Coordinate Plane Projection</span>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-indigo-400 group-hover:translate-x-1 transition" />
          </div>

          <p className="text-xs text-slate-300 mb-4 leading-relaxed">
            Witness how high-dimensional vectors form thematic semantic clusters. Measure Euclidean distances and angular cosine similarities between real sentences.
          </p>

          <div className="h-32 bg-slate-950 rounded-xl border border-slate-800 p-3 flex items-center justify-center relative overflow-hidden">
            <div className="w-full h-full flex items-center justify-around font-mono text-[10px]">
              <div className="text-center p-2 rounded-lg bg-indigo-950/40 border border-indigo-500/30 text-indigo-300">
                AI & Tech Cluster<br />
                <span className="text-[9px] text-slate-400">[-50, +40]</span>
              </div>
              <div className="text-center p-2 rounded-lg bg-emerald-950/40 border border-emerald-500/30 text-emerald-300">
                Fitness Cluster<br />
                <span className="text-[9px] text-slate-400">[+50, +30]</span>
              </div>
              <div className="text-center p-2 rounded-lg bg-amber-950/40 border border-amber-500/30 text-amber-300">
                Food Cluster<br />
                <span className="text-[9px] text-slate-400">[+10, -50]</span>
              </div>
            </div>
          </div>
        </div>

        {/* Preview 2: Semantic Search Preview */}
        <div
          onClick={() => onNavigate('module-5')}
          className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-cyan-500/50 cursor-pointer transition group shadow-xl relative overflow-hidden"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center">
                <Search className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white group-hover:text-cyan-300 transition">
                  Real AI Semantic Search Engine
                </h3>
                <span className="text-[11px] text-slate-400">Sentence Transformers MiniLM Engine</span>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-cyan-400 group-hover:translate-x-1 transition" />
          </div>

          <p className="text-xs text-slate-300 mb-4 leading-relaxed">
            Test custom queries against indexed documents. Calculate authentic 384D vectors, cosine similarity scores, and inspect why results rank where they do.
          </p>

          <div className="h-32 bg-slate-950 rounded-xl border border-slate-800 p-3 space-y-1.5 flex flex-col justify-center font-mono text-[11px]">
            <div className="p-2 rounded bg-indigo-950/60 border border-indigo-500/30 flex justify-between items-center text-white">
              <span>#1 Machine Learning for Beginners</span>
              <span className="text-cyan-300 font-bold">+0.7842</span>
            </div>
            <div className="p-2 rounded bg-slate-900 border border-slate-800 flex justify-between items-center text-slate-300">
              <span>#2 Deep Learning & Neural Networks</span>
              <span className="text-indigo-300">+0.6914</span>
            </div>
          </div>
        </div>
      </div>

      {/* Course Outline Section */}
      <div className="my-16">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-white mb-2">Complete 45-Minute Course Syllabus</h2>
          <p className="text-xs text-slate-400">
            A carefully architected pedagogical progression from fundamental principles to real-world engineering.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {COURSE_MODULES.map(m => (
            <div
              key={m.id}
              onClick={() => onNavigate(m.id)}
              className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 cursor-pointer transition group"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono text-xs font-bold text-indigo-400">
                  Module 0{m.number}
                </span>
                <span className="text-[11px] text-slate-400 flex items-center gap-1 font-mono">
                  <Clock className="w-3 h-3" />
                  {m.durationMinutes} min
                </span>
              </div>
              <h3 className="text-sm font-bold text-white group-hover:text-indigo-300 transition mb-1">
                {m.title}
              </h3>
              <p className="text-xs text-slate-400 line-clamp-2 mb-3">
                {m.description}
              </p>
              <div className="text-[10px] text-cyan-400 font-semibold flex items-center gap-1">
                <span>Start Lesson</span>
                <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Expected Learning Outcomes (10 Items) */}
      <div className="my-16 p-8 rounded-3xl bg-slate-900/80 border border-indigo-500/30 shadow-2xl">
        <div className="max-w-2xl mb-8">
          <span className="text-xs font-bold uppercase tracking-wider text-cyan-400 block mb-1">
            Core Competencies
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-white">
            10 Key Outcomes You Will Master
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {learningOutcomes.map((outcome, idx) => (
            <div
              key={idx}
              className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 text-xs text-slate-300 flex items-start gap-3"
            >
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>{outcome}</span>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center pt-6 border-t border-slate-800">
          <button
            onClick={() => onNavigate('module-1')}
            className="px-8 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-indigo-600/30 transition"
          >
            Begin Your 45-Minute Journey Now
          </button>
        </div>
      </div>
    </div>
  );
}
