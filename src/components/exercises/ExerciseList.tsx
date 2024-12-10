import React from 'react';
import { Exercise } from '../../types';
import { Pencil, Trash2 } from 'lucide-react';

interface ExerciseListProps {
  exercises: Exercise[];
  onEdit: (exercise: Exercise) => void;
  onDelete: (id: string) => void;
}

export const ExerciseList: React.FC<ExerciseListProps> = ({
  exercises,
  onEdit,
  onDelete,
}) => {
  if (!exercises || exercises.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500 dark:text-gray-400">
        No exercises available. Add your first exercise to get started.
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {exercises.map((exercise) => (
        <div
          key={exercise.id}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden"
        >
          <img
            src={exercise.imageUrl}
            alt={exercise.name}
            className="w-full h-48 object-cover"
          />
          <div className="p-4">
            <h3 className="text-lg font-semibold mb-2">{exercise.name}</h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm mb-2">
              {exercise.description}
            </p>
            <div className="flex flex-wrap gap-1 mb-2">
              {exercise.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 text-xs rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
            <div className="flex flex-wrap gap-1 mb-4">
              {exercise.targetBodyParts.map((part) => (
                <span
                  key={part}
                  className="px-2 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-100 text-xs rounded-full"
                >
                  {part}
                </span>
              ))}
            </div>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => onEdit(exercise)}
                className="p-2 text-blue-600 hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-blue-900/50 rounded-lg"
              >
                <Pencil className="w-5 h-5" />
              </button>
              <button
                onClick={() => onDelete(exercise.id)}
                className="p-2 text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/50 rounded-lg"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};