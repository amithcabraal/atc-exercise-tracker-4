export interface Exercise {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  videoUrl?: string;
  tags: string[];
  targetBodyParts: string[];
  duration: number;
}

export interface Session {
  id: string;
  name: string;
  tags: string[];
  exercises: Exercise[];
  restDuration: number;
}

export interface JournalEntry {
  id: string;
  sessionId: string;
  sessionName: string;
  date: string;
  completedExercises: Exercise[];
}

export type Theme = 'light' | 'dark';

export interface AppState {
  exercises: Exercise[];
  sessions: Record<string, Session>;
  journal: JournalEntry[];
  currentSession?: string;
  currentExerciseIndex: number;
  isPlaying: boolean;
  theme: Theme;
  isFullscreen: boolean;
  menuOpen: boolean;
}