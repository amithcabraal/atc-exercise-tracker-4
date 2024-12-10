import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { AppState, Exercise, Session, JournalEntry } from '../types';
import { v4 as uuidv4 } from 'uuid';

interface AppStore extends AppState {
  // Exercise actions
  addExercise: (exercise: Omit<Exercise, 'id'>) => void;
  updateExercise: (id: string, exercise: Partial<Exercise>) => void;
  deleteExercise: (id: string) => void;
  
  // Session actions
  addSession: (session: Omit<Session, 'id'>) => void;
  updateSession: (id: string, session: Partial<Session>) => void;
  deleteSession: (id: string) => void;
  
  // Playback actions
  startSession: (sessionId: string) => void;
  stopSession: () => void;
  nextExercise: () => void;
  
  // Journal actions
  addJournalEntry: (entry: Omit<JournalEntry, 'id' | 'date'>) => void;
  
  // UI actions
  toggleTheme: () => void;
  toggleFullscreen: () => void;
  toggleMenu: () => void;
  
  // Data actions
  exportData: () => string;
  importData: (data: string) => void;
}

const initialState: AppState = {
  exercises: [],
  sessions: {},
  journal: [],
  currentExerciseIndex: 0,
  isPlaying: false,
  theme: 'light',
  isFullscreen: false,
  menuOpen: false,
};

export const useStore = create<AppStore>()(
  persist(
    (set, get) => ({
      ...initialState,

      addExercise: (exercise) => {
        const id = uuidv4();
        set((state) => ({
          exercises: [...state.exercises, { ...exercise, id }]
        }));
      },

      updateExercise: (id, exercise) => {
        set((state) => ({
          exercises: state.exercises.map(ex => 
            ex.id === id ? { ...ex, ...exercise } : ex
          )
        }));
      },

      deleteExercise: (id) => {
        set((state) => ({
          exercises: state.exercises.filter(ex => ex.id !== id)
        }));
      },

      addSession: (session) => {
        const id = uuidv4();
        set((state) => ({
          sessions: {
            ...state.sessions,
            [id]: { ...session, id }
          }
        }));
      },

      updateSession: (id, session) => {
        set((state) => ({
          sessions: {
            ...state.sessions,
            [id]: { ...state.sessions[id], ...session }
          }
        }));
      },

      deleteSession: (id) => {
        set((state) => {
          const { [id]: _, ...sessions } = state.sessions;
          return { sessions };
        });
      },

      startSession: (sessionId) => {
        set({
          currentSession: sessionId,
          isPlaying: true,
          currentExerciseIndex: 0
        });
      },

      stopSession: () => {
        set({
          currentSession: undefined,
          isPlaying: false,
          currentExerciseIndex: 0
        });
      },

      nextExercise: () => {
        const state = get();
        if (!state.currentSession) return;
        
        const session = state.sessions[state.currentSession];
        if (state.currentExerciseIndex >= session.exercises.length - 1) {
          get().stopSession();
        } else {
          set((state) => ({
            currentExerciseIndex: state.currentExerciseIndex + 1
          }));
        }
      },

      addJournalEntry: (entry) => {
        const id = uuidv4();
        set((state) => ({
          journal: [...state.journal, {
            ...entry,
            id,
            date: new Date().toISOString()
          }]
        }));
      },

      toggleTheme: () => {
        set((state) => ({
          theme: state.theme === 'light' ? 'dark' : 'light'
        }));
      },

      toggleFullscreen: () => {
        set((state) => ({
          isFullscreen: !state.isFullscreen
        }));
      },

      toggleMenu: () => {
        set((state) => ({
          menuOpen: !state.menuOpen
        }));
      },

      exportData: () => {
        const state = get();
        return JSON.stringify({
          exercises: state.exercises,
          sessions: state.sessions,
          journal: state.journal
        });
      },

      importData: (data) => {
        try {
          const parsed = JSON.parse(data);
          set({
            exercises: Array.isArray(parsed.exercises) ? parsed.exercises : [],
            sessions: parsed.sessions || {},
            journal: parsed.journal || []
          });
        } catch (error) {
          console.error('Failed to import data:', error);
        }
      }
    }),
    {
      name: '40s-storage'
    }
  )
);