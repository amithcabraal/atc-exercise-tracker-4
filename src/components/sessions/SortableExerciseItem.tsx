import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Exercise } from '../../types';
import { GripVertical, X } from 'lucide-react';

interface SortableExerciseItemProps {
  exercise: Exercise;
  onRemove: () => void;
}

export const SortableExerciseItem: React.FC<SortableExerciseItemProps> = ({
  exercise,
  onRemove,
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: exercise.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm flex items-center gap-2"
    >
      <button
        type="button"
        className="cursor-grab active:cursor-grabbing p-1 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300"
        {...attributes}
        {...listeners}
      >
        <GripVertical className="w-5 h-5" />
      </button>
      
      <div className="flex-1">
        <h4 className="font-medium">{exercise.name}</h4>
        <p className="text-sm text-gray-500 dark:text-gray-400">{exercise.description}</p>
      </div>

      <button
        type="button"
        onClick={onRemove}
        className="p-1 text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/50 rounded-lg"
      >
        <X className="w-5 h-5" />
      </button>
    </div>
  );
};