export type ModuleId =
  | 'welcome'
  | 'dashboard'
  | 'module-1'
  | 'module-2'
  | 'module-3'
  | 'module-4'
  | 'module-5'
  | 'module-6'
  | 'module-7'
  | 'quiz'
  | 'completion';

export interface ModuleMeta {
  id: ModuleId;
  number: number;
  title: string;
  shortTitle: string;
  durationMinutes: number;
  tagline: string;
  description: string;
  badge: string;
  keyTakeaways: string[];
}

export interface BackendStatus {
  isHealthy: boolean;
  isLoaded: boolean;
  modelName: string;
  dimension: number;
  device: string;
  lastChecked: number;
  usingFallback: boolean;
}

export interface EmbeddingResult {
  text: string;
  dimension: number;
  vector: number[];
  sample_slice: number[];
  vector_norm: number;
  min_val: number;
  max_val: number;
  mean_val: number;
}

export interface ComparisonResult {
  text_a: string;
  text_b: string;
  cosine_similarity: number;
  similarity_percentage: number;
  dot_product: number;
  norm_a: number;
  norm_b: number;
  angle_degrees: number;
  dimension: number;
  sample_slice_a: number[];
  sample_slice_b: number[];
  interpretation: string;
}

export interface SearchItem {
  id: number;
  document: string;
  score: number;
  score_percentage: number;
  rank: number;
  keyword_score: number;
  keyword_matches: string[];
  explanation: string;
}

export interface SearchResponse {
  query: string;
  total_documents: number;
  results: SearchItem[];
  model: string;
  dimension: number;
}

export interface VisPoint {
  id: number;
  text: string;
  x: number;
  y: number;
  category: 'AI & Tech' | 'Fitness & Health' | 'Food & Cooking' | 'Custom';
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  concept: string;
}

export interface UserProgress {
  completedModules: string[];
  currentModule: ModuleId;
  quizScore: number | null;
  quizPassed: boolean;
  challengeCompleted: boolean;
  timeSpentSeconds: number;
  lastActive: string;
}
