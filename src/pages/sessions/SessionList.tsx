import React from 'react';
import { useStore } from '../../store/useStore';
import { Play } from 'lucide-react';
import { useLocation } from 'wouter';

export const SessionList: React.FC = () => {
  const { sessions, startSession } = useStore();
  const [, setLocation] = useLocation();

  const handleStartSession = (sessionId: string) => {
    startSession(sessionId);
    setLocation('/workout');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">Available Sessions</h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {Object.entries(sessions).map(([id, session]) => (
          <div key={id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold mb-2">{session.name}</h3>
            <div className="flex flex-wrap gap-2 mb-4">
              {session.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 text-xs rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              {session.exercises.length} exercises • {session.restDuration}s rest
            </p>
            <button
              onClick={() => handleStartSession(id)}
              className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              <Play className="w-5 h-5" />
              Start Session
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};