import React, { useState } from 'react';
import { CheckCircle2, XCircle, HelpCircle, ArrowRight } from 'lucide-react';

interface KnowledgeCheckProps {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  onCorrect?: () => void;
}

export function KnowledgeCheck({
  question,
  options,
  correctIndex,
  explanation,
  onCorrect,
}: KnowledgeCheckProps) {
  const [selected, setSelected] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (idx: number) => {
    if (submitted) return;
    setSelected(idx);
    setSubmitted(true);
    if (idx === correctIndex && onCorrect) {
      onCorrect();
    }
  };

  const isCorrect = selected === correctIndex;

  return (
    <div className="bg-slate-900/90 border border-indigo-500/30 rounded-2xl p-6 shadow-xl relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 rounded-full blur-2xl pointer-events-none" />

      <div className="flex items-center gap-2 text-indigo-400 text-xs font-semibold uppercase tracking-wider mb-2">
        <HelpCircle className="w-4 h-4" />
        <span>Quick Concept Check</span>
      </div>

      <h4 className="text-base font-semibold text-white mb-4 leading-snug">
        {question}
      </h4>

      <div className="space-y-2.5">
        {options.map((opt, idx) => {
          let btnStyle = 'border-slate-800 bg-slate-950/60 text-slate-300 hover:border-slate-700 hover:bg-slate-800/40';

          if (submitted) {
            if (idx === correctIndex) {
              btnStyle = 'border-emerald-500/60 bg-emerald-950/40 text-emerald-200 ring-1 ring-emerald-500/30';
            } else if (idx === selected) {
              btnStyle = 'border-rose-500/60 bg-rose-950/40 text-rose-200 ring-1 ring-rose-500/30';
            } else {
              btnStyle = 'border-slate-800/60 bg-slate-950/30 text-slate-400 opacity-60';
            }
          }

          return (
            <button
              key={idx}
              disabled={submitted}
              onClick={() => handleSubmit(idx)}
              className={`w-full text-left p-3.5 rounded-xl border text-sm font-medium transition flex items-start gap-3 ${btnStyle}`}
            >
              <span className="w-5 h-5 rounded-md bg-slate-800 flex items-center justify-center text-xs font-bold shrink-0 text-slate-300 mt-0.5">
                {String.fromCharCode(65 + idx)}
              </span>
              <span className="flex-1">{opt}</span>
              {submitted && idx === correctIndex && (
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
              )}
              {submitted && idx === selected && idx !== correctIndex && (
                <XCircle className="w-5 h-5 text-rose-400 shrink-0" />
              )}
            </button>
          );
        })}
      </div>

      {submitted && (
        <div
          className={`mt-4 p-4 rounded-xl border text-xs leading-relaxed transition-all ${
            isCorrect
              ? 'bg-emerald-950/30 border-emerald-500/30 text-emerald-300'
              : 'bg-amber-950/30 border-amber-500/30 text-amber-200'
          }`}
        >
          <div className="font-semibold mb-1 flex items-center gap-1.5">
            {isCorrect ? (
              <>
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Well done! That is correct.</span>
              </>
            ) : (
              <>
                <XCircle className="w-4 h-4 text-amber-400" />
                <span>Not quite. Let’s break it down:</span>
              </>
            )}
          </div>
          <p>{explanation}</p>
        </div>
      )}
    </div>
  );
}
