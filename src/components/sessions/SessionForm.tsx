import React from 'react';
import { Session, Exercise } from '../../types';
import { DndContext, DragEndEvent, closestCenter } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { SortableExerciseItem } from './SortableExerciseItem';
import { Plus } from 'lucide-react';

interface SessionFormProps {
  initialData?: Session;
  exercises: Exercise[];
  onSubmit: (session: Omit<Session, 'id'>) => void;
  onCancel: () => void;
}

export const SessionForm: React.FC<SessionFormProps> = ({
  initialData,
  exercises,
  onSubmit,
  onCancel,
}) => {
  const [formData, setFormData] = React.useState({
    name: initialData?.name || '',
    tags: initialData?.tags.join(', ') || '',
    exercises: initialData?.exercises || [],
    restDuration: initialData?.restDuration || 20,
  });

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = formData.exercises.findIndex((ex) => ex.id === active.id);
    const newIndex = formData.exercises.findIndex((ex) => ex.id === over.id);

    const newExercises = [...formData.exercises];
    const [removed] = newExercises.splice(oldIndex, 1);
    newExercises.splice(newIndex, 0, removed);

    setFormData((prev) => ({ ...prev, exercises: newExercises }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      name: formData.name,
      tags: formData.tags.split(',').map((tag) => tag.trim()).filter(Boolean),
      exercises: formData.exercises,
      restDuration: formData.restDuration,
    });
  };

  const addExercise = (exercise: Exercise) => {
    setFormData((prev) => ({
      ...prev,
      exercises: [...prev.exercises, exercise],
    }));
  };

  const removeExercise = (exerciseId: string) => {
    setFormData((prev) => ({
      ...prev,
      exercises: prev.exercises.filter((ex) => ex.id !== exerciseId),
    }));
  };

  const availableExercises = exercises.filter(
    (exercise) => !formData.exercises.some((selected) => selected.id === exercise.id)
  );

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium mb-1">Session Name</label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
          className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Tags (comma-separated)</label>
        <input
          type="text"
          value={formData.tags}
          onChange={(e) => setFormData((prev) => ({ ...prev, tags: e.target.value }))}
          className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
          placeholder="morning, intense, recovery"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Rest Duration (seconds)</label>
        <input
          type="number"
          value={formData.restDuration}
          onChange={(e) => setFormData((prev) => ({ ...prev, restDuration: parseInt(e.target.value) }))}
          className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
          min="5"
          max="60"
          required
        />
      </div>

      <div>
        <h3 className="text-lg font-medium mb-2">Available Exercises</h3>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mb-4">
          {availableExercises.map((exercise) => (
            <div
              key={exercise.id}
              className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm flex items-center justify-between"
            >
              <span>{exercise.name}</span>
              <button
                type="button"
                onClick={() => addExercise(exercise)}
                className="p-1 text-blue-600 hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-blue-900/50 rounded-lg"
              >
                <Plus className="w-5 h-5" />
              </button>
            </div>
          ))}
        </div>

        <h3 className="text-lg font-medium mb-2">Selected Exercises</h3>
        <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={formData.exercises} strategy={verticalListSortingStrategy}>
            <div className="space-y-2">
              {formData.exercises.map((exercise) => (
                <SortableExerciseItem
                  key={exercise.id}
                  exercise={exercise}
                  onRemove={() => removeExercise(exercise.id)}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      </div>

      <div className="flex justify-end gap-2">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          {initialData ? 'Update' : 'Create'} Session
        </button>
      </div>
    </form>
  );
};