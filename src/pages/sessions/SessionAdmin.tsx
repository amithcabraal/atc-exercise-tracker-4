import React from 'react';
import { useStore } from '../../store/useStore';
import { Plus } from 'lucide-react';
import { SessionForm } from '../../components/sessions/SessionForm';
import { Session } from '../../types';

export const SessionAdmin: React.FC = () => {
  const { sessions, exercises, addSession, updateSession, deleteSession } = useStore();
  const [isAdding, setIsAdding] = React.useState(false);
  const [editingSession, setEditingSession] = React.useState<Session | null>(null);

  const handleSubmit = (session: Omit<Session, 'id'>) => {
    if (editingSession) {
      updateSession(editingSession.id, session);
      setEditingSession(null);
    } else {
      addSession(session);
      setIsAdding(false);
    }
  };

  const handleCancel = () => {
    setIsAdding(false);
    setEditingSession(null);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Session Management</h1>
        {!isAdding && !editingSession && (
          <button
            onClick={() => setIsAdding(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <Plus className="w-5 h-5" />
            Add Session
          </button>
        )}
      </div>

      {(isAdding || editingSession) && (
        <div className="mb-8 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">
            {editingSession ? 'Edit Session' : 'Add New Session'}
          </h2>
          <SessionForm
            exercises={exercises}
            initialData={editingSession || undefined}
            onSubmit={handleSubmit}
            onCancel={handleCancel}
          />
        </div>
      )}

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
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setEditingSession(session)}
                className="px-4 py-2 text-blue-600 hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-blue-900/50 rounded-lg"
              >
                Edit
              </button>
              <button
                onClick={() => deleteSession(id)}
                className="px-4 py-2 text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/50 rounded-lg"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};