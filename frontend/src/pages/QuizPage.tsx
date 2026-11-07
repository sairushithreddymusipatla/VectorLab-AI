import React, { useState } from 'react';
import {
  HelpCircle,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Award,
  Sparkles,
  ShieldCheck,
  ChevronRight,
} from 'lucide-react';
import { ModuleId, QuizQuestion } from '../types';
import { QUIZ_QUESTIONS } from '../data/quizQuestions';

interface QuizPageProps {
  onNavigate: (module: ModuleId) => void;
  onQuizComplete: (score: number, passed: boolean) => void;
}

export function QuizPage({ onNavigate, onQuizComplete }: QuizPageProps) {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [isFinished, setIsFinished] = useState<boolean>(false);

  const currentQ: QuizQuestion = QUIZ_QUESTIONS[currentIndex];
  const totalQuestions = QUIZ_QUESTIONS.length;
  const currentAnswer = selectedAnswers[currentQ.id];
  const hasAnsweredCurrent = currentAnswer !== undefined;

  const handleSelectOption = (optIndex: number) => {
    if (hasAnsweredCurrent) return; // Prevent changing after selection
    setSelectedAnswers(prev => ({
      ...prev,
      [currentQ.id]: optIndex,
    }));
  };

  const handleNext = () => {
    if (currentIndex < totalQuestions - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      // Calculate final score
      let correct = 0;
      QUIZ_QUESTIONS.forEach(q => {
        if (selectedAnswers[q.id] === q.correctAnswer) {
          correct++;
        }
      });
      const pct = Math.round((correct / totalQuestions) * 100);
      const passed = pct >= 70;
      setIsFinished(true);
      onQuizComplete(pct, passed);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  };

  const handleRetake = () => {
    setSelectedAnswers({});
    setCurrentIndex(0);
    setIsFinished(false);
  };

  // If Quiz is finished, display comprehensive scorecard
  if (isFinished) {
    let correctCount = 0;
    QUIZ_QUESTIONS.forEach(q => {
      if (selectedAnswers[q.id] === q.correctAnswer) {
        correctCount++;
      }
    });
    const percentage = Math.round((correctCount / totalQuestions) * 100);
    const passed = percentage >= 70;

    return (
      <div className="max-w-3xl mx-auto py-8">
        <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-8 shadow-2xl text-center relative overflow-hidden">
          <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-400" />

          <div
            className={`w-20 h-20 rounded-full mx-auto flex items-center justify-center mb-4 shadow-xl ${
              passed
                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 ring-4 ring-emerald-500/10'
                : 'bg-amber-500/20 text-amber-400 border border-amber-500/40 ring-4 ring-amber-500/10'
            }`}
          >
            {passed ? <Award className="w-10 h-10" /> : <RotateCcw className="w-10 h-10" />}
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-2">
            {passed ? 'Congratulations! Assessment Passed' : 'Quiz Attempt Complete'}
          </h2>
          <p className="text-sm text-slate-400 max-w-md mx-auto mb-6">
            {passed
              ? 'You have successfully proven mastery of embeddings, cosine similarity, and semantic retrieval.'
              : 'You scored below the 70% threshold. Review the explanations below and feel free to retake.'}
          </p>

          <div className="grid grid-cols-3 gap-3 max-w-sm mx-auto mb-8 font-mono">
            <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800">
              <span className="text-[10px] text-slate-400 block uppercase">Score</span>
              <span className="text-xl font-bold text-cyan-400">{percentage}%</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800">
              <span className="text-[10px] text-slate-400 block uppercase">Correct</span>
              <span className="text-xl font-bold text-emerald-400">{correctCount}/{totalQuestions}</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800">
              <span className="text-[10px] text-slate-400 block uppercase">Status</span>
              <span className={`text-base font-bold ${passed ? 'text-emerald-400' : 'text-amber-400'}`}>
                {passed ? 'PASS' : 'RETRY'}
              </span>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={handleRetake}
              className="px-5 py-2.5 rounded-xl border border-slate-700 bg-slate-800/80 hover:bg-slate-700 text-white text-xs font-semibold flex items-center gap-2 transition"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Retake Quiz</span>
            </button>

            {passed && (
              <button
                onClick={() => onNavigate('completion')}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white text-xs font-bold flex items-center gap-2 shadow-lg shadow-indigo-600/25 transition"
              >
                <span>View Course Completion Record</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Question-by-Question Review Breakdown */}
        <div className="mt-8 space-y-4">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 px-2">
            Detailed Question Explanations & Review
          </h3>

          {QUIZ_QUESTIONS.map((q, idx) => {
            const userAns = selectedAnswers[q.id];
            const isCorrect = userAns === q.correctAnswer;

            return (
              <div
                key={q.id}
                className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 text-xs"
              >
                <div className="flex items-start justify-between gap-3 mb-2">
                  <span className="font-semibold text-white">
                    {idx + 1}. {q.question}
                  </span>
                  <span
                    className={`font-mono text-[10px] px-2 py-0.5 rounded font-bold shrink-0 ${
                      isCorrect
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                        : 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                    }`}
                  >
                    {isCorrect ? 'CORRECT' : 'INCORRECT'}
                  </span>
                </div>

                <div className="text-slate-400 mb-2">
                  <span className="text-slate-500">Your choice: </span>
                  <span className={isCorrect ? 'text-emerald-300' : 'text-rose-300 font-semibold'}>
                    {userAns !== undefined ? q.options[userAns] : 'Not answered'}
                  </span>
                </div>

                {!isCorrect && (
                  <div className="text-slate-400 mb-2">
                    <span className="text-slate-500">Correct answer: </span>
                    <span className="text-emerald-300 font-medium">{q.options[q.correctAnswer]}</span>
                  </div>
                )}

                <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800/80 text-[11px] text-slate-300 leading-relaxed mt-2">
                  <strong className="text-indigo-400 block mb-0.5">Instructional Explanation:</strong>
                  {q.explanation}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // Active Single-Question View
  return (
    <div className="max-w-3xl mx-auto py-4">
      {/* Quiz Progress & Topic Header */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <span className="px-2.5 py-1 rounded-md text-xs font-bold uppercase tracking-wider bg-purple-500/10 text-purple-400 border border-purple-500/30">
            Final Knowledge Assessment
          </span>
          <h2 className="text-xl sm:text-2xl font-extrabold text-white mt-1">
            Question {currentIndex + 1} of {totalQuestions}
          </h2>
          <span className="text-xs text-indigo-300 font-medium">Concept: {currentQ.concept}</span>
        </div>

        {/* Progress Bar */}
        <div className="w-36 text-right">
          <div className="text-xs text-slate-400 mb-1 font-mono">
            Progress: {Math.round(((currentIndex + 1) / totalQuestions) * 100)}%
          </div>
          <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-300"
              style={{ width: `${((currentIndex + 1) / totalQuestions) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Question Card */}
      <div className="bg-slate-900/90 border border-indigo-500/30 rounded-2xl p-6 sm:p-8 shadow-2xl mb-6 relative">
        <h3 className="text-base sm:text-lg font-bold text-white mb-6 leading-relaxed">
          {currentQ.question}
        </h3>

        {/* 4 Options */}
        <div className="space-y-3">
          {currentQ.options.map((option, idx) => {
            const isSelected = currentAnswer === idx;
            const isCorrect = idx === currentQ.correctAnswer;

            let btnStyle = 'border-slate-800 bg-slate-950/60 text-slate-300 hover:border-slate-700 hover:bg-slate-800/40';

            if (hasAnsweredCurrent) {
              if (isCorrect) {
                btnStyle = 'border-emerald-500/60 bg-emerald-950/40 text-emerald-200 ring-1 ring-emerald-500/30';
              } else if (isSelected) {
                btnStyle = 'border-rose-500/60 bg-rose-950/40 text-rose-200 ring-1 ring-rose-500/30';
              } else {
                btnStyle = 'border-slate-800/60 bg-slate-950/30 text-slate-500 opacity-60';
              }
            }

            return (
              <button
                key={idx}
                disabled={hasAnsweredCurrent}
                onClick={() => handleSelectOption(idx)}
                className={`w-full text-left p-4 rounded-xl border text-xs sm:text-sm font-medium transition flex items-start gap-3.5 ${btnStyle}`}
              >
                <span className="w-6 h-6 rounded-lg bg-slate-800 flex items-center justify-center text-xs font-bold shrink-0 text-slate-300">
                  {String.fromCharCode(65 + idx)}
                </span>
                <span className="flex-1 pt-0.5">{option}</span>
                {hasAnsweredCurrent && isCorrect && (
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                )}
                {hasAnsweredCurrent && isSelected && !isCorrect && (
                  <XCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                )}
              </button>
            );
          })}
        </div>

        {/* Immediate Pedagogical Explanation once answered */}
        {hasAnsweredCurrent && (
          <div
            className={`mt-6 p-4 rounded-xl border text-xs leading-relaxed transition-all ${
              currentAnswer === currentQ.correctAnswer
                ? 'bg-emerald-950/30 border-emerald-500/30 text-emerald-200'
                : 'bg-amber-950/30 border-amber-500/30 text-amber-200'
            }`}
          >
            <div className="font-semibold mb-1 flex items-center gap-1.5">
              {currentAnswer === currentQ.correctAnswer ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Correct!</span>
                </>
              ) : (
                <>
                  <XCircle className="w-4 h-4 text-amber-400" />
                  <span>Explanation:</span>
                </>
              )}
            </div>
            <p>{currentQ.explanation}</p>
          </div>
        )}
      </div>

      {/* Navigation Controls */}
      <div className="flex items-center justify-between gap-4">
        <button
          onClick={handlePrev}
          disabled={currentIndex === 0}
          className="px-4 py-2.5 rounded-xl border border-slate-800 bg-slate-900/60 disabled:opacity-40 text-slate-300 hover:text-white text-xs font-semibold flex items-center gap-1.5 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Previous Question</span>
        </button>

        <button
          onClick={handleNext}
          disabled={!hasAnsweredCurrent}
          className="px-6 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 disabled:opacity-40 text-white text-xs font-bold rounded-xl flex items-center gap-2 shadow-lg transition"
        >
          <span>{currentIndex === totalQuestions - 1 ? 'Finish Assessment' : 'Next Question'}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
