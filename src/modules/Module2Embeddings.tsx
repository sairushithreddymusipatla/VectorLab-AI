import React, { useState } from 'react';
import {
  Binary,
  Layers,
  Sparkles,
  Info,
  Maximize2,
  ChevronDown,
  ChevronUp,
  Sliders,
  CheckCircle2,
  HelpCircle,
  Eye,
} from 'lucide-react';
import { ModuleMeta, ModuleId } from '../types';
import { ModuleHeader } from '../components/common/ModuleHeader';
import { ModuleNavButtons } from '../components/common/ModuleNavButtons';
import { KnowledgeCheck } from '../components/common/KnowledgeCheck';

interface Module2EmbeddingsProps {
  module: ModuleMeta;
  onNavigate: (module: ModuleId) => void;
  onComplete: () => void;
  isCompleted: boolean;
}

export function Module2Embeddings({
  module,
  onNavigate,
  onComplete,
  isCompleted,
}: Module2EmbeddingsProps) {
  const [selectedDimension, setSelectedDimension] = useState<number>(384);
  const [expandedCard, setExpandedCard] = useState<number | null>(null);

  // Analogies data
  const analogies = [
    {
      title: 'Analogy 1: Colors as 3D Vectors (RGB)',
      icon: '🎨',
      description:
        'A computer cannot "see" teal or crimson. Instead, it describes color using 3 coordinates: Red, Green, and Blue [R, G, B]. Teal is [0, 128, 128]. Turquoise is [64, 224, 208]. Because their coordinates are close in 3D color space, the colors look similar to humans!',
    },
    {
      title: 'Analogy 2: GPS Coordinates on Earth',
      icon: '📍',
      description:
        'You can describe any city on Earth with 2 numbers: Latitude and Longitude [lat, lon]. San Francisco is [37.77, -122.41] and Oakland is [37.80, -122.27]. Their closeness in numbers directly proves their physical proximity.',
    },
    {
      title: 'Analogy 3: Flavor Profiles in Cooking',
      icon: '🍲',
      description:
        'Imagine rating food across 5 flavor dimensions: [Sweet, Salty, Sour, Bitter, Umami]. Dark chocolate is [0.4, 0.1, 0.2, 0.8, 0.3]. An espresso has similar coordinates. Embeddings do the exact same thing for language, but across hundreds of dimensions!',
    },
  ];

  return (
    <div className="max-w-4xl mx-auto py-4">
      <ModuleHeader module={module} />

      {/* Section 1: The Core Question - Why Do Computers Need Vectors? */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl mb-8">
        <h3 className="text-base font-bold text-white mb-3 flex items-center gap-2">
          <Binary className="w-5 h-5 text-indigo-400" />
          <span>The Core Dilemma: Computers Do Not "Read" Words</span>
        </h3>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
          When you read the word <em>"dog"</em>, your brain instantly conjures imagery of paws, barking, loyalty, and fur. A computer silicon chip, however, only understands electrical voltages representing <strong>0s and 1s</strong>.
        </p>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
          To perform machine learning, language models must translate words, sentences, and books into <strong>numerical vectors</strong> — ordered arrays of floating-point numbers — so mathematical calculations (like dot products and matrix multiplications) can measure meaning.
        </p>

        {/* 3 Analogies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-6">
          {analogies.map((a, i) => (
            <div
              key={i}
              className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 hover:border-indigo-500/30 transition"
            >
              <div className="text-2xl mb-2">{a.icon}</div>
              <h4 className="text-xs font-bold text-indigo-300 mb-1">{a.title}</h4>
              <p className="text-[11px] text-slate-400 leading-relaxed">{a.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Section 2: Illustrative Low-Dimensional Vectors vs Real Vectors */}
      <div className="bg-gradient-to-br from-indigo-950/30 via-slate-900/90 to-purple-950/20 border border-indigo-500/40 rounded-2xl p-6 shadow-2xl mb-8">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Layers className="w-5 h-5 text-cyan-400" />
            <span>Illustrative Low-Dimensional Example</span>
          </h3>
          <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase bg-amber-500/20 text-amber-300 border border-amber-500/30 font-semibold">
            Pedagogical Example Only
          </span>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed mb-5">
          Consider these two sentences. They share identical meaning, yet use completely different words:
        </p>

        {/* Sentences & Vectors Comparison */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="p-4 rounded-xl bg-slate-950/80 border border-indigo-500/30">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-indigo-300">Sentence A</span>
              <span className="text-[10px] font-mono text-slate-400">4 Dimensions (Toy Example)</span>
            </div>
            <div className="text-sm font-bold text-white mb-3">
              "I love programming."
            </div>
            <div className="font-mono text-xs text-cyan-300 bg-slate-900/90 p-2.5 rounded-lg border border-slate-800">
              [0.25, 0.71, 0.34, 0.89]
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/80 border border-purple-500/30">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-purple-300">Sentence B</span>
              <span className="text-[10px] font-mono text-slate-400">4 Dimensions (Toy Example)</span>
            </div>
            <div className="text-sm font-bold text-white mb-3">
              "I enjoy coding."
            </div>
            <div className="font-mono text-xs text-purple-300 bg-slate-900/90 p-2.5 rounded-lg border border-slate-800">
              [0.27, 0.69, 0.38, 0.85]
            </div>
          </div>
        </div>

        {/* CRITICAL PEDAGOGICAL WARNING BANNER */}
        <div className="p-4 rounded-xl bg-amber-950/30 border border-amber-500/40 text-amber-200/90 text-xs leading-relaxed flex items-start gap-3">
          <Info className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          <div>
            <strong className="text-amber-300 font-semibold block mb-1">
              Important Distinction: Toy Vectors vs Production AI Models
            </strong>
            The 4 numbers above are simplified <strong>illustrative examples</strong> designed to build intuition. In actual AI models:
            <ul className="list-disc pl-4 mt-1.5 space-y-1 text-slate-300">
              <li>
                <strong>Higher Dimensionality:</strong> Production models use <strong>384 dimensions</strong> (<code className="text-cyan-300">all-MiniLM-L6-v2</code>) or <strong>1536 dimensions</strong> (OpenAI text-embedding-3).
              </li>
              <li>
                <strong>Distributed Representations:</strong> Individual numbers do <em>not</em> correspond to neat human labels (e.g. index 0 is NOT "happiness" and index 1 is NOT "coding"). Instead, concepts are distributed across the entangled geometric direction of all coordinates combined.
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Section 3: Interactive Dimensionality Explorer */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Sliders className="w-4 h-4 text-cyan-400" />
              <span>Interactive Concept: What Does Dimensionality Mean?</span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Adjust the slider to see how increasing dimensions expands the model's capacity to represent nuance.
            </p>
          </div>
          <span className="font-mono text-sm font-bold text-indigo-400 px-3 py-1 bg-indigo-500/10 border border-indigo-500/30 rounded-lg">
            {selectedDimension} Dimensions
          </span>
        </div>

        <input
          type="range"
          min="2"
          max="384"
          step="1"
          value={selectedDimension}
          onChange={e => setSelectedDimension(Number(e.target.value))}
          className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500 mb-6"
        />

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 text-center text-xs mb-4">
          <button
            onClick={() => setSelectedDimension(2)}
            className={`p-2 rounded-lg border transition ${
              selectedDimension <= 3 ? 'bg-indigo-600/30 border-indigo-500 text-white' : 'border-slate-800 text-slate-400'
            }`}
          >
            2D (Flat Plane)
          </button>
          <button
            onClick={() => setSelectedDimension(3)}
            className={`p-2 rounded-lg border transition ${
              selectedDimension === 3 ? 'bg-indigo-600/30 border-indigo-500 text-white' : 'border-slate-800 text-slate-400'
            }`}
          >
            3D (Physical Space)
          </button>
          <button
            onClick={() => setSelectedDimension(64)}
            className={`p-2 rounded-lg border transition ${
              selectedDimension >= 32 && selectedDimension <= 128
                ? 'bg-indigo-600/30 border-indigo-500 text-white'
                : 'border-slate-800 text-slate-400'
            }`}
          >
            64D (Basic NLP)
          </button>
          <button
            onClick={() => setSelectedDimension(384)}
            className={`p-2 rounded-lg border transition ${
              selectedDimension === 384 ? 'bg-indigo-600/30 border-indigo-500 text-white' : 'border-slate-800 text-slate-400'
            }`}
          >
            384D (all-MiniLM-L6-v2)
          </button>
        </div>

        <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 text-xs">
          {selectedDimension <= 3 ? (
            <p className="text-slate-300">
              <strong className="text-indigo-300">Low Dimensionality (2–3D):</strong> Easy for humans to visualize on a screen or 3D cube. However, human language has millions of overlapping concepts; in 2D, unrelated concepts are forced into crowded collisions.
            </p>
          ) : selectedDimension <= 128 ? (
            <p className="text-slate-300">
              <strong className="text-indigo-300">Medium Dimensionality (64–128D):</strong> Capable of separating broad topics (sports, law, medicine, cooking), but struggles with subtle sarcasm, polysemy (words with multiple meanings), or complex syntactic grammar.
            </p>
          ) : (
            <p className="text-slate-300">
              <strong className="text-cyan-300">High Dimensionality (384D — Production Standard):</strong> Provides vast geometric freedom. In 384-dimensional hyperspace, billions of linguistic nuances, tone, context, and domain semantics can peacefully coexist without collapsing into each other.
            </p>
          )}
        </div>
      </div>

      {/* Section 4: Knowledge Check */}
      <div className="mb-8">
        <KnowledgeCheck
          question="Why can’t we understand an AI embedding by simply reading individual coordinate values like [0.25, 0.71, ...]?"
          options={[
            'The numbers are encoded with secret military cryptography',
            'Individual coordinates in high-dimensional neural embeddings do not correspond to single human words or labels; meaning is distributed across the collective vector direction',
            'Floating-point decimals are inherently meaningless in computer science',
            'Coordinates change randomly every time you print them to the screen',
          ]}
          correctIndex={1}
          explanation="Modern neural embedding models distribute semantic representations holistically across hundreds of dimensions. Rather than isolating single coordinates, it is the relative angle and geometry between entire vectors that encodes language meaning."
          onCorrect={onComplete}
        />
      </div>

      <ModuleNavButtons
        prevModuleId="module-1"
        nextModuleId="module-3"
        nextLabel="Proceed to Module 3: From Text to Vectors"
        onNavigate={onNavigate}
        onMarkComplete={onComplete}
        isCompleted={isCompleted}
      />
    </div>
  );
}
