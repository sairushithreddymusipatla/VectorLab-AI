import React, { useState } from 'react';
import {
  Cpu,
  Search,
  MessageSquare,
  FileText,
  Sparkles,
  GitMerge,
  Layers,
  ArrowRight,
  Database,
  Bot,
  CheckCircle2,
  HelpCircle,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { ModuleMeta, ModuleId } from '../types';
import { ModuleHeader } from '../components/common/ModuleHeader';
import { ModuleNavButtons } from '../components/common/ModuleNavButtons';
import { KnowledgeCheck } from '../components/common/KnowledgeCheck';

interface Module6ApplicationsProps {
  module: ModuleMeta;
  onNavigate: (module: ModuleId) => void;
  onComplete: () => void;
  isCompleted: boolean;
}

export function Module6Applications({
  module,
  onNavigate,
  onComplete,
  isCompleted,
}: Module6ApplicationsProps) {
  const [selectedApp, setSelectedApp] = useState<number>(0);
  const [activeRagStep, setActiveRagStep] = useState<number>(1);

  const applications = [
    {
      id: 1,
      title: 'AI-Powered Search Engines',
      icon: Search,
      color: 'text-indigo-400',
      problem: 'Users search using vague, natural queries (e.g. "phone that takes great night sky photos"), while product specs say "f/1.8 aperture sensor". Traditional keyword search misses these.',
      solution: 'Embeddings map both the user description and technical specs into camera-related semantic space, immediately retrieving the exact phone model.',
      example: 'Google Search, Amazon product catalog semantic matching.',
      behindScenes: 'User query is vectorized via an embedding model; approximate nearest neighbor (ANN) search scans billions of indexed item vectors in under 15 milliseconds.',
    },
    {
      id: 2,
      title: 'Customer Support Chatbots',
      icon: MessageSquare,
      color: 'text-cyan-400',
      problem: 'Customers ask the same question in 500 different ways ("cancel my card", "lost plastic", "deactivate stolen debit"). Rule-based bots fail on varied phrasings.',
      solution: 'All variations map to the same high-dimensional cluster, instantly pointing to the card deactivation policy.',
      example: 'Zendesk, Intercom automated support triage bots.',
      behindScenes: 'Inbound message embedding is compared to a database of verified solution vectors; if similarity > 0.85, the automated answer is returned instantly without human intervention.',
    },
    {
      id: 3,
      title: 'Enterprise Document Search',
      icon: FileText,
      color: 'text-purple-400',
      problem: 'Law firms and hospitals possess millions of unstructured PDFs, medical records, and legal briefs where keyword search produces thousands of irrelevant hits.',
      solution: 'Dense semantic retrieval understands legal terminology and case precedents to retrieve only the 3 most pertinent clauses.',
      example: 'Harvey AI for legal contracts, medical literature search.',
      behindScenes: 'Long documents are split into 500-token chunks with overlapping windows; each chunk is vectorized and stored in a vector database like Pinecone or Chroma.',
    },
    {
      id: 4,
      title: 'Recommendation Engines',
      icon: Sparkles,
      color: 'text-amber-400',
      problem: 'Recommending music, podcasts, or videos based purely on genre tags leads to repetitive, uninspired suggestions.',
      solution: 'User listening histories and song acoustic/lyric embeddings are combined into taste profiles. Songs in adjacent vector clusters get recommended.',
      example: 'Spotify Discover Weekly, Netflix recommendation carousel.',
      behindScenes: 'Two-tower neural networks compute user preference vectors and item vectors, calculating dot products to rank candidate tracks in real time.',
    },
    {
      id: 5,
      title: 'Retrieval-Augmented Generation (RAG)',
      icon: Database,
      color: 'text-emerald-400',
      problem: 'Large Language Models (LLMs) hallucinate or lack access to private, real-time company knowledge.',
      solution: 'Embeddings find relevant private documentation and inject it directly into the prompt context window before the LLM generates an answer.',
      example: 'Custom enterprise ChatGPT assistants answering internal company policies.',
      behindScenes: 'Embeddings act as the retrieval librarian; the LLM acts as the synthesizing writer.',
    },
    {
      id: 6,
      title: 'Duplicate Question Detection',
      icon: GitMerge,
      color: 'text-rose-400',
      problem: 'Communities like Stack Overflow or Quora receive thousands of duplicate questions daily, splitting community discussions.',
      solution: 'When a new question is typed, its embedding is checked against existing posts. If cosine similarity > 0.88, the system flags it as a duplicate.',
      example: 'Stack Overflow duplicate detection, Quora related questions.',
      behindScenes: 'Cosine similarity between the draft title vector and indexed question vectors alerts the author before posting.',
    },
    {
      id: 7,
      title: 'Content Discovery & Clustering',
      icon: Layers,
      color: 'text-blue-400',
      problem: 'News organizations need to automatically cluster thousands of breaking articles from across the globe into unified topic stories without manual tagging.',
      solution: 'Unsupervised clustering algorithms (like K-Means or DBSCAN) group articles by their vector proximity.',
      example: 'Google News topic clustering, Feedly automated intelligence feeds.',
      behindScenes: 'Vectors are clustered geometrically; the centroid of each cluster represents the top breaking headline story.',
    },
  ];

  const ragSteps = [
    {
      step: 1,
      title: 'User Asks Question',
      actor: 'Human User',
      desc: 'The user submits a question: "What is our company refund policy for damaged goods?"',
      icon: MessageSquare,
      color: 'border-blue-500/40 bg-blue-950/20 text-blue-300',
    },
    {
      step: 2,
      title: 'Query Embedding',
      actor: 'Embedding Model',
      desc: 'SentenceTransformer converts the question into a 384-dimensional dense vector.',
      icon: Cpu,
      color: 'border-indigo-500/40 bg-indigo-950/20 text-indigo-300',
    },
    {
      step: 3,
      title: 'Vector Search Retrieval',
      actor: 'Vector Database',
      desc: 'Cosine similarity matches the query vector against millions of internal policy chunks, retrieving the top 3 relevant paragraphs.',
      icon: Database,
      color: 'border-purple-500/40 bg-purple-950/20 text-purple-300',
    },
    {
      step: 4,
      title: 'Prompt Augmentation',
      actor: 'RAG Orchestrator',
      desc: 'Retrieved text chunks are injected into the LLM prompt: "Context: [Policy Doc] Answer question: [User Query]"',
      icon: Layers,
      color: 'border-amber-500/40 bg-amber-950/20 text-amber-300',
    },
    {
      step: 5,
      title: 'LLM Generates Answer',
      actor: 'Generative Model (LLM)',
      desc: 'The LLM reads the verified retrieved facts and writes a clear, hallucination-free response grounded in enterprise truth.',
      icon: Bot,
      color: 'border-emerald-500/40 bg-emerald-950/20 text-emerald-300',
    },
  ];

  return (
    <div className="max-w-4xl mx-auto py-4">
      <ModuleHeader module={module} />

      {/* Section 1: The 7 Real-World Applications Explorer */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl mb-8">
        <h3 className="text-base font-bold text-white mb-2 flex items-center gap-2">
          <Cpu className="w-5 h-5 text-indigo-400" />
          <span>7 Major Real-World Applications of Embeddings</span>
        </h3>
        <p className="text-xs text-slate-400 mb-6">
          Click an application tab to explore the real-world problem, embedding solution, and behind-the-scenes mechanics.
        </p>

        {/* Tab Buttons */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-1.5 mb-6">
          {applications.map((app, i) => {
            const Icon = app.icon;
            const isSelected = selectedApp === i;

            return (
              <button
                key={app.id}
                onClick={() => setSelectedApp(i)}
                className={`p-2 rounded-xl border text-center transition flex flex-col items-center gap-1.5 ${
                  isSelected
                    ? 'bg-indigo-600/30 border-indigo-500 text-white shadow-lg'
                    : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                <Icon className={`w-4 h-4 ${app.color}`} />
                <span className="text-[10px] font-semibold truncate w-full">{app.title.split(' ')[0]}</span>
              </button>
            );
          })}
        </div>

        {/* Selected Application Card */}
        {(() => {
          const cur = applications[selectedApp];
          const Icon = cur.icon;

          return (
            <div className="p-5 rounded-xl bg-slate-950/80 border border-indigo-500/30 space-y-4">
              <div className="flex items-center gap-2.5 pb-3 border-b border-slate-800">
                <div className="w-8 h-8 rounded-lg bg-indigo-500/20 flex items-center justify-center">
                  <Icon className={`w-4 h-4 ${cur.color}`} />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">{cur.title}</h4>
                  <span className="text-[11px] text-slate-400">Industry Architecture & Use Case</span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="p-3.5 bg-slate-900/60 rounded-xl border border-slate-800">
                  <span className="text-rose-400 font-semibold block mb-1">The Problem:</span>
                  <p className="text-slate-300 leading-relaxed">{cur.problem}</p>
                </div>

                <div className="p-3.5 bg-indigo-950/30 rounded-xl border border-indigo-500/30">
                  <span className="text-cyan-400 font-semibold block mb-1">How Embeddings Solve It:</span>
                  <p className="text-slate-200 leading-relaxed">{cur.solution}</p>
                </div>
              </div>

              <div className="p-3.5 bg-slate-900/40 rounded-xl border border-slate-800 text-xs">
                <span className="text-amber-400 font-semibold block mb-1">Practical Real-World Example:</span>
                <p className="text-slate-300 mb-2">{cur.example}</p>
                <span className="text-indigo-400 font-semibold block mb-0.5">Behind the Scenes:</span>
                <p className="text-slate-400 font-mono text-[11px]">{cur.behindScenes}</p>
              </div>
            </div>
          );
        })()}
      </div>

      {/* Section 2: Visual RAG (Retrieval-Augmented Generation) Architecture */}
      <div className="bg-gradient-to-br from-indigo-950/40 to-purple-950/30 border border-indigo-500/40 rounded-2xl p-6 shadow-2xl mb-8">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Database className="w-5 h-5 text-emerald-400" />
              <span>Interactive RAG Workflow: Embeddings + LLM</span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              How modern AI systems avoid hallucinations by pairing vector retrieval with generative synthesis.
            </p>
          </div>
          <span className="text-[10px] font-mono font-semibold uppercase px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
            Industry Standard
          </span>
        </div>

        {/* 5-Step RAG Interactive Pipeline */}
        <div className="grid grid-cols-1 sm:grid-cols-5 gap-2 my-6">
          {ragSteps.map(step => {
            const Icon = step.icon;
            const isActive = activeRagStep === step.step;

            return (
              <button
                key={step.step}
                onClick={() => setActiveRagStep(step.step)}
                className={`p-3 rounded-xl border text-left transition flex flex-col justify-between ${
                  isActive ? 'ring-2 ring-emerald-400 shadow-lg scale-105 ' + step.color : 'bg-slate-950/60 border-slate-800 text-slate-400'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <Icon className="w-4 h-4" />
                    <span className="font-mono text-[9px] font-bold">Step {step.step}</span>
                  </div>
                  <h4 className="text-[11px] font-bold text-white truncate">{step.title}</h4>
                </div>
                <span className="text-[9px] text-slate-400 mt-2 block font-medium">{step.actor}</span>
              </button>
            );
          })}
        </div>

        {/* Active Step Details */}
        <div className="p-4 rounded-xl bg-slate-950/90 border border-slate-800 text-xs">
          <div className="flex items-center gap-2 text-emerald-400 font-semibold mb-1">
            <span>Step {activeRagStep}: {ragSteps[activeRagStep - 1].title}</span>
            <span className="text-slate-400 text-[10px]">({ragSteps[activeRagStep - 1].actor})</span>
          </div>
          <p className="text-slate-300 leading-relaxed mb-3">
            {ragSteps[activeRagStep - 1].desc}
          </p>

          <div className="p-3 bg-indigo-950/30 border border-indigo-500/20 rounded-lg text-[11px] text-indigo-200">
            <strong className="text-cyan-300 block mb-0.5">The Crucial Division of Responsibility:</strong>
            Embeddings do <strong>NOT</strong> generate text; they act as the precision retrieval engine. The LLM does <strong>NOT</strong> remember every company policy; it reads the retrieved text and crafts the final human response.
          </div>
        </div>
      </div>

      {/* Section 3: Concept Check */}
      <div className="mb-8">
        <KnowledgeCheck
          question="In a Retrieval-Augmented Generation (RAG) system, what is the exact function of text embeddings?"
          options={[
            'They write the final answer and correct user grammatical spelling errors',
            'They convert the user query and document chunks into vectors to retrieve the most contextually relevant snippets from a vector database',
            'They host the website on a cloud server',
            'They generate synthetic training images for computer vision algorithms',
          ]}
          correctIndex={1}
          explanation="Embeddings are the retrieval bridge in RAG. They index knowledge chunks and calculate cosine similarity against the user query, providing the LLM with grounded facts to prevent hallucinations."
          onCorrect={onComplete}
        />
      </div>

      <ModuleNavButtons
        prevModuleId="module-5"
        nextModuleId="module-7"
        nextLabel="Proceed to Module 7: Hands-on Challenge"
        onNavigate={onNavigate}
        onMarkComplete={onComplete}
        isCompleted={isCompleted}
      />
    </div>
  );
}
