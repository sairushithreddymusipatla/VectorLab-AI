import React, { useState, useEffect } from 'react';
import { Header } from './components/layout/Header';
import { Sidebar } from './components/layout/Sidebar';
import { LandingPage } from './pages/LandingPage';
import { DashboardPage } from './pages/DashboardPage';
import { QuizPage } from './pages/QuizPage';
import { CompletionPage } from './pages/CompletionPage';

import { Module1Intro } from './modules/Module1Intro';
import { Module2Embeddings } from './modules/Module2Embeddings';
import { Module3Pipeline } from './modules/Module3Pipeline';
import { Module4Visualization } from './modules/Module4Visualization';
import { Module5Playground } from './modules/Module5Playground';
import { Module6Applications } from './modules/Module6Applications';
import { Module7Challenge } from './modules/Module7Challenge';

import { ModuleId, BackendStatus } from './types';
import { COURSE_MODULES } from './data/modules';
import { useProgress } from './hooks/useProgress';
import { checkBackendHealth } from './services/api';

export function App() {
  const {
    progress,
    progressPercentage,
    markModuleComplete,
    setCurrentModule,
    setQuizResult,
    setChallengeComplete,
    resetProgress,
    isModuleComplete,
  } = useProgress();

  const [backendStatus, setBackendStatus] = useState<BackendStatus>({
    isHealthy: false,
    isLoaded: false,
    modelName: 'Checking...',
    dimension: 384,
    device: 'cpu',
    lastChecked: 0,
    usingFallback: false,
  });

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Poll backend health on mount and periodically
  useEffect(() => {
    const checkHealth = async () => {
      const status = await checkBackendHealth();
      setBackendStatus(status);
    };

    checkHealth();
    const interval = setInterval(checkHealth, 8000);
    return () => clearInterval(interval);
  }, []);

  const handleNavigate = (targetModule: ModuleId) => {
    setCurrentModule(targetModule);
    setIsSidebarOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentModuleMeta = COURSE_MODULES.find(m => m.id === progress.currentModule);

  return (
    <div className="min-h-screen flex flex-col bg-[#070B14] text-slate-100 selection:bg-indigo-500 selection:text-white">
      {/* Top Persistent Header */}
      <Header
        currentModule={progress.currentModule}
        progressPercentage={progressPercentage}
        backendStatus={backendStatus}
        onNavigate={handleNavigate}
        onToggleSidebar={() => setIsSidebarOpen(prev => !prev)}
      />

      <div className="flex-1 flex max-w-7xl w-full mx-auto">
        {/* Navigation Sidebar (hidden on Landing page for clean immersion, or available via header) */}
        {progress.currentModule !== 'welcome' && (
          <Sidebar
            currentModule={progress.currentModule}
            completedModules={progress.completedModules}
            quizPassed={progress.quizPassed}
            onNavigate={handleNavigate}
            onResetProgress={resetProgress}
            isOpen={isSidebarOpen}
            onClose={() => setIsSidebarOpen(false)}
          />
        )}

        {/* Main Content Area */}
        <main
          className={`flex-1 px-4 sm:px-6 py-6 transition-all duration-300 ${
            progress.currentModule !== 'welcome' ? 'lg:pl-80' : ''
          }`}
        >
          {progress.currentModule === 'welcome' && (
            <LandingPage onNavigate={handleNavigate} />
          )}

          {progress.currentModule === 'dashboard' && (
            <DashboardPage
              progress={progress}
              progressPercentage={progressPercentage}
              onNavigate={handleNavigate}
              onResetProgress={resetProgress}
            />
          )}

          {progress.currentModule === 'module-1' && currentModuleMeta && (
            <Module1Intro
              module={currentModuleMeta}
              onNavigate={handleNavigate}
              onComplete={() => markModuleComplete('module-1')}
              isCompleted={isModuleComplete('module-1')}
            />
          )}

          {progress.currentModule === 'module-2' && currentModuleMeta && (
            <Module2Embeddings
              module={currentModuleMeta}
              onNavigate={handleNavigate}
              onComplete={() => markModuleComplete('module-2')}
              isCompleted={isModuleComplete('module-2')}
            />
          )}

          {progress.currentModule === 'module-3' && currentModuleMeta && (
            <Module3Pipeline
              module={currentModuleMeta}
              onNavigate={handleNavigate}
              onComplete={() => markModuleComplete('module-3')}
              isCompleted={isModuleComplete('module-3')}
            />
          )}

          {progress.currentModule === 'module-4' && currentModuleMeta && (
            <Module4Visualization
              module={currentModuleMeta}
              onNavigate={handleNavigate}
              onComplete={() => markModuleComplete('module-4')}
              isCompleted={isModuleComplete('module-4')}
            />
          )}

          {progress.currentModule === 'module-5' && currentModuleMeta && (
            <Module5Playground
              module={currentModuleMeta}
              onNavigate={handleNavigate}
              onComplete={() => markModuleComplete('module-5')}
              isCompleted={isModuleComplete('module-5')}
            />
          )}

          {progress.currentModule === 'module-6' && currentModuleMeta && (
            <Module6Applications
              module={currentModuleMeta}
              onNavigate={handleNavigate}
              onComplete={() => markModuleComplete('module-6')}
              isCompleted={isModuleComplete('module-6')}
            />
          )}

          {progress.currentModule === 'module-7' && currentModuleMeta && (
            <Module7Challenge
              module={currentModuleMeta}
              onNavigate={handleNavigate}
              onComplete={() => {
                markModuleComplete('module-7');
                setChallengeComplete(true);
              }}
              isCompleted={isModuleComplete('module-7')}
            />
          )}

          {progress.currentModule === 'quiz' && (
            <QuizPage
              onNavigate={handleNavigate}
              onQuizComplete={(score, passed) => {
                setQuizResult(score, passed);
              }}
            />
          )}

          {progress.currentModule === 'completion' && (
            <CompletionPage
              progress={progress}
              onNavigate={handleNavigate}
              onResetProgress={resetProgress}
            />
          )}
        </main>
      </div>

      {/* Persistent Footer */}
      <footer className="border-t border-slate-900 bg-slate-950/80 py-6 px-4 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-300">VECTORLAB AI</span>
            <span>•</span>
            <span>"Understand Meaning. Explore Intelligence. Build with AI."</span>
          </div>
          <div className="text-[11px] text-slate-400">
            Kalvium Instructional Designer Intern Hiring Assessment • Embeddings & Semantic Search
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
