import React from 'react';
import { useStore } from '../../store/useStore';
import { Plus } from 'lucide-react';
import { ExerciseForm } from '../../components/exercises/ExerciseForm';
import { ExerciseList } from '../../components/exercises/ExerciseList';
import { Exercise } from '../../types';

export const ExerciseAdmin: React.FC = () => {
  const { exercises, addExercise, updateExercise, deleteExercise } = useStore();
  const [isAdding, setIsAdding] = React.useState(false);
  const [editingExercise, setEditingExercise] = React.useState<Exercise | null>(null);

  const handleSubmit = (exercise: Omit<Exercise, 'id'>) => {
    if (editingExercise) {
      updateExercise(editingExercise.id, exercise);
      setEditingExercise(null);
    } else {
      addExercise(exercise);
      setIsAdding(false);
    }
  };

  const handleCancel = () => {
    setIsAdding(false);
    setEditingExercise(null);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Exercise Management</h1>
        {!isAdding && !editingExercise && (
          <button
            onClick={() => setIsAdding(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <Plus className="w-5 h-5" />
            Add Exercise
          </button>
        )}
      </div>

      {(isAdding || editingExercise) && (
        <div className="mb-8 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">
            {editingExercise ? 'Edit Exercise' : 'Add New Exercise'}
          </h2>
          <ExerciseForm
            initialData={editingExercise || undefined}
            onSubmit={handleSubmit}
            onCancel={handleCancel}
          />
        </div>
      )}

      <ExerciseList
        exercises={exercises}
        onEdit={setEditingExercise}
        onDelete={deleteExercise}
      />
    </div>
  );
};