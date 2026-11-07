import { useState, useEffect, useCallback } from 'react';
import { ModuleId, UserProgress } from '../types';

const STORAGE_KEY = 'vectorlab_ai_progress_v1';

const INITIAL_PROGRESS: UserProgress = {
  completedModules: [],
  currentModule: 'welcome',
  quizScore: null,
  quizPassed: false,
  challengeCompleted: false,
  timeSpentSeconds: 0,
  lastActive: new Date().toISOString(),
};

export function useProgress() {
  const [progress, setProgress] = useState<UserProgress>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.warn('Failed to parse progress from localStorage', e);
    }
    return INITIAL_PROGRESS;
  });

  // Persist to localStorage on change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch (e) {
      console.warn('Failed to save progress to localStorage', e);
    }
  }, [progress]);

  // Track active time
  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => ({
        ...prev,
        timeSpentSeconds: prev.timeSpentSeconds + 1,
        lastActive: new Date().toISOString(),
      }));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const markModuleComplete = useCallback((moduleId: string) => {
    setProgress(prev => {
      if (prev.completedModules.includes(moduleId)) return prev;
      return {
        ...prev,
        completedModules: [...prev.completedModules, moduleId],
      };
    });
  }, []);

  const setCurrentModule = useCallback((modId: ModuleId) => {
    setProgress(prev => ({
      ...prev,
      currentModule: modId,
    }));
  }, []);

  const setQuizResult = useCallback((score: number, passed: boolean) => {
    setProgress(prev => ({
      ...prev,
      quizScore: score,
      quizPassed: passed,
      completedModules: passed && !prev.completedModules.includes('quiz')
        ? [...prev.completedModules, 'quiz']
        : prev.completedModules,
    }));
  }, []);

  const setChallengeComplete = useCallback((completed: boolean) => {
    setProgress(prev => ({
      ...prev,
      challengeCompleted: completed,
      completedModules: completed && !prev.completedModules.includes('module-7')
        ? [...prev.completedModules, 'module-7']
        : prev.completedModules,
    }));
  }, []);

  const resetProgress = useCallback(() => {
    const resetState = {
      ...INITIAL_PROGRESS,
      currentModule: 'welcome' as ModuleId,
    };
    setProgress(resetState);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  // Total tracks: 7 modules + Quiz = 8 core components
  const TOTAL_TRACKED_UNITS = 8;
  const completedCount = progress.completedModules.length;
  const progressPercentage = Math.min(
    100,
    Math.round((completedCount / TOTAL_TRACKED_UNITS) * 100)
  );

  return {
    progress,
    progressPercentage,
    markModuleComplete,
    setCurrentModule,
    setQuizResult,
    setChallengeComplete,
    resetProgress,
    isModuleComplete: (modId: string) => progress.completedModules.includes(modId),
  };
}
