import React, { useState, useEffect } from 'react';
import {
  Layers,
  ArrowRight,
  Sparkles,
  Cpu,
  Hash,
  Database,
  RefreshCw,
  Sliders,
  CheckCircle2,
  Info,
} from 'lucide-react';
import { ModuleMeta, ModuleId, EmbeddingResult } from '../types';
import { ModuleHeader } from '../components/common/ModuleHeader';
import { ModuleNavButtons } from '../components/common/ModuleNavButtons';
import { KnowledgeCheck } from '../components/common/KnowledgeCheck';
import { generateEmbedding } from '../services/api';

interface Module3PipelineProps {
  module: ModuleMeta;
  onNavigate: (module: ModuleId) => void;
  onComplete: () => void;
  isCompleted: boolean;
}

const PRESET_SENTENCES = [
  'I love machine learning.',
  'Artificial intelligence is interesting.',
  'I enjoy playing cricket.',
  'Deep learning is powerful.',
  'I like studying neural networks.',
];

export function Module3Pipeline({
  module,
  onNavigate,
  onComplete,
  isCompleted,
}: Module3PipelineProps) {
  const [selectedSentence, setSelectedSentence] = useState<string>(PRESET_SENTENCES[0]);
  const [customInput, setCustomInput] = useState<string>('');
  const [activeStep, setActiveStep] = useState<number>(1);
  const [embeddingData, setEmbeddingData] = useState<EmbeddingResult | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isFallback, setIsFallback] = useState<boolean>(false);

  // Compare mode: second sentence
  const [compareSentence, setCompareSentence] = useState<string>(PRESET_SENTENCES[1]);
  const [compareData, setCompareData] = useState<EmbeddingResult | null>(null);

  const fetchEmbedding = async (text: string, isPrimary = true) => {
    setIsLoading(true);
    try {
      const res = await generateEmbedding(text);
      if (isPrimary) {
        setEmbeddingData(res.data);
        setIsFallback(res.isFallback);
      } else {
        setCompareData(res.data);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchEmbedding(selectedSentence, true);
    fetchEmbedding(compareSentence, false);
  }, [selectedSentence, compareSentence]);

  const pipelineSteps = [
    {
      num: 1,
      title: 'Raw Text Input',
      icon: '✍️',
      desc: 'The human sentence enters the system as a raw character string.',
      detail: `Input: "${selectedSentence}"`,
    },
    {
      num: 2,
      title: 'Tokenization',
      icon: '🧩',
      desc: 'The tokenizer breaks the text into subword units and assigns initial dictionary IDs.',
      detail: 'e.g. ["I", "love", "machine", "learning", "."] → IDs: [1045, 2293, 3698, 4083, 1012]',
    },
    {
      num: 3,
      title: 'Transformer Attention',
      icon: '🧠',
      desc: '6 Transformer encoder layers compute self-attention, weighing how each word contextually influences every other word.',
      detail: 'Words like "learning" receive heavy attention from "machine", disambiguating context.',
    },
    {
      num: 4,
      title: 'Mean Pooling',
      icon: '⚖️',
      desc: 'Token vectors are pooled together through a mean-pooling layer into a single unified sentence representation.',
      detail: 'Aggregates all contextual token hidden states into exactly 384 dimensions.',
    },
    {
      num: 5,
      title: '384D Vector Output',
      icon: '📍',
      desc: 'A dense unit-length vector ready for cosine similarity comparison in vector databases.',
      detail: 'Final dense embedding vector in [-1.0, 1.0] coordinate bounds.',
    },
  ];

  return (
    <div className="max-w-4xl mx-auto py-4">
      <ModuleHeader module={module} />

      {/* Section 1: Animated 5-Step Pipeline Flow */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl mb-8">
        <h3 className="text-base font-bold text-white mb-2 flex items-center gap-2">
          <Cpu className="w-5 h-5 text-indigo-400" />
          <span>The 5-Step Embedding Generation Pipeline</span>
        </h3>
        <p className="text-xs text-slate-400 mb-6">
          Click any step to inspect how the embedding model transforms human words into neural geometry.
        </p>

        {/* Pipeline Step Cards with Connecting Flow */}
        <div className="grid grid-cols-1 sm:grid-cols-5 gap-2.5 mb-6">
          {pipelineSteps.map(step => (
            <button
              key={step.num}
              onClick={() => setActiveStep(step.num)}
              className={`p-3 rounded-xl border text-left transition relative ${
                activeStep === step.num
                  ? 'bg-indigo-950/70 border-indigo-500 ring-1 ring-indigo-500/40 shadow-lg'
                  : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-lg">{step.icon}</span>
                <span className="font-mono text-[10px] font-bold text-slate-400">Step {step.num}</span>
              </div>
              <h4 className="text-xs font-semibold text-white truncate">{step.title}</h4>
            </button>
          ))}
        </div>

        {/* Step Inspector Detail Box */}
        <div className="p-4 rounded-xl bg-slate-950/80 border border-indigo-500/30 text-xs">
          <div className="flex items-center gap-2 text-indigo-300 font-semibold mb-1">
            <span>{pipelineSteps[activeStep - 1].icon}</span>
            <span>Step {activeStep}: {pipelineSteps[activeStep - 1].title}</span>
          </div>
          <p className="text-slate-300 mb-2 leading-relaxed">
            {pipelineSteps[activeStep - 1].desc}
          </p>
          <div className="font-mono text-[11px] bg-slate-900/90 p-2.5 rounded-lg border border-slate-800 text-cyan-300">
            {pipelineSteps[activeStep - 1].detail}
          </div>
        </div>
      </div>

      {/* Section 2: Interactive Sentence Vector Generator & Explorer */}
      <div className="bg-slate-900/90 border border-indigo-500/40 rounded-2xl p-6 shadow-2xl mb-8">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-cyan-400" />
              <span>Live Sentence Vector Generator</span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Select or type a sentence to generate its authentic 384-dimensional vector.
            </p>
          </div>

          {isFallback && (
            <span className="px-2 py-0.5 text-[10px] uppercase font-mono rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
              Illustrative Mode
            </span>
          )}
        </div>

        {/* Preset Sentence Buttons */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {PRESET_SENTENCES.map((sent, i) => (
            <button
              key={i}
              onClick={() => setSelectedSentence(sent)}
              className={`text-xs px-3 py-1.5 rounded-xl border transition ${
                selectedSentence === sent
                  ? 'bg-indigo-600 text-white border-indigo-500 shadow'
                  : 'bg-slate-950/60 text-slate-300 border-slate-800 hover:border-slate-700'
              }`}
            >
              {sent}
            </button>
          ))}
        </div>

        {/* Custom Text Input */}
        <div className="flex gap-2 mb-6">
          <input
            type="text"
            value={customInput}
            onChange={e => setCustomInput(e.target.value)}
            onKeyDown={e => {
              if (e.key === 'Enter' && customInput.trim()) {
                setSelectedSentence(customInput.trim());
                setCustomInput('');
              }
            }}
            placeholder="Or type your own custom sentence and press Enter..."
            className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
          />
          <button
            onClick={() => {
              if (customInput.trim()) {
                setSelectedSentence(customInput.trim());
                setCustomInput('');
              }
            }}
            disabled={!customInput.trim()}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 text-white rounded-xl text-xs font-semibold transition"
          >
            Vectorize
          </button>
        </div>

        {/* Vector Inspection Grid */}
        {embeddingData && (
          <div className="space-y-4">
            {/* Metadata Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
              <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
                <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Dimensions</span>
                <span className="font-mono text-sm font-bold text-cyan-400">{embeddingData.dimension} Numbers</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
                <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Vector Norm (||v||)</span>
                <span className="font-mono text-sm font-bold text-indigo-400">{embeddingData.vector_norm}</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
                <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Min Coordinate</span>
                <span className="font-mono text-sm font-bold text-slate-300">{embeddingData.min_val}</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
                <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Max Coordinate</span>
                <span className="font-mono text-sm font-bold text-slate-300">+{embeddingData.max_val}</span>
              </div>
            </div>

            {/* First 8 Coordinates Sample Slice */}
            <div className="p-4 rounded-xl bg-slate-950/80 border border-indigo-500/20">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-slate-300">
                  Vector Coordinate Preview (First 8 of 384 dimensions)
                </span>
                <span className="text-[10px] font-mono text-slate-400">all-MiniLM-L6-v2</span>
              </div>

              <div className="grid grid-cols-4 sm:grid-cols-8 gap-1.5 font-mono text-xs text-center">
                {embeddingData.sample_slice.map((val, idx) => (
                  <div
                    key={idx}
                    className={`p-2 rounded-lg border ${
                      val >= 0
                        ? 'bg-indigo-950/40 border-indigo-500/30 text-indigo-300'
                        : 'bg-purple-950/40 border-purple-500/30 text-purple-300'
                    }`}
                  >
                    <div className="text-[9px] text-slate-400 mb-0.5">d_{idx + 1}</div>
                    <div className="font-bold">{val > 0 ? `+${val}` : val}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Sparkline Heatmap of all 384 dimensions */}
            <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-slate-300">
                  Complete 384-Dimensional Coordinate Density Heatmap
                </span>
                <span className="text-[10px] text-slate-400">Each vertical line = 1 dimension</span>
              </div>
              <div className="h-10 w-full flex items-center gap-[1px] bg-slate-900 p-1.5 rounded-lg overflow-hidden">
                {embeddingData.vector.map((val, idx) => {
                  const intensity = Math.min(1, Math.abs(val) * 8);
                  const isPos = val >= 0;
                  return (
                    <div
                      key={idx}
                      title={`Dimension ${idx + 1}: ${val}`}
                      style={{
                        height: `${Math.max(15, intensity * 100)}%`,
                        backgroundColor: isPos ? `rgba(99, 102, 241, ${intensity})` : `rgba(168, 85, 247, ${intensity})`,
                      }}
                      className="flex-1 rounded-sm transition-all hover:scale-125"
                    />
                  );
                })}
              </div>
              <div className="flex justify-between text-[10px] text-slate-400 mt-1 font-mono">
                <span>Dim 1</span>
                <span>Dim 192</span>
                <span>Dim 384</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Section 3: Concept Check */}
      <div className="mb-8">
        <KnowledgeCheck
          question="Why are modern Transformer embeddings called 'contextual', unlike older fixed dictionary lookups like Word2Vec?"
          options={[
            'They always download current context from Wikipedia before processing text',
            'The embedding of a word is dynamically shaped by the other words in the sentence (e.g. "river bank" vs "money bank")',
            'They can only be run on cloud servers with active internet connections',
            'Contextual embeddings are written in English only',
          ]}
          correctIndex={1}
          explanation="Self-attention allows the model to adjust each word's representation according to its surrounding words. The word 'bank' will produce very different coordinates when surrounded by 'river water stream' versus 'investment finance loan'."
          onCorrect={onComplete}
        />
      </div>

      <ModuleNavButtons
        prevModuleId="module-2"
        nextModuleId="module-4"
        nextLabel="Proceed to Module 4: Vector Visualization"
        onNavigate={onNavigate}
        onMarkComplete={onComplete}
        isCompleted={isCompleted}
      />
    </div>
  );
}
