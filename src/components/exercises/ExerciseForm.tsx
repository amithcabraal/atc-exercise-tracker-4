import React from 'react';
import { Exercise } from '../../types';
import { useStore } from '../../store/useStore';

interface ExerciseFormProps {
  initialData?: Exercise;
  onSubmit: (exercise: Omit<Exercise, 'id'>) => void;
  onCancel: () => void;
}

export const ExerciseForm: React.FC<ExerciseFormProps> = ({
  initialData,
  onSubmit,
  onCancel,
}) => {
  const [formData, setFormData] = React.useState({
    name: initialData?.name || '',
    description: initialData?.description || '',
    imageUrl: initialData?.imageUrl || '',
    videoUrl: initialData?.videoUrl || '',
    tags: initialData?.tags.join(', ') || '',
    targetBodyParts: initialData?.targetBodyParts.join(', ') || '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      name: formData.name,
      description: formData.description,
      imageUrl: formData.imageUrl,
      videoUrl: formData.videoUrl || undefined,
      tags: formData.tags.split(',').map(tag => tag.trim()).filter(Boolean),
      targetBodyParts: formData.targetBodyParts.split(',').map(part => part.trim()).filter(Boolean),
      duration: 40, // Fixed duration for all exercises
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">Name</label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
          className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Description</label>
        <textarea
          value={formData.description}
          onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
          className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
          rows={3}
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Image URL</label>
        <input
          type="url"
          value={formData.imageUrl}
          onChange={(e) => setFormData(prev => ({ ...prev, imageUrl: e.target.value }))}
          className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Video URL (optional)</label>
        <input
          type="url"
          value={formData.videoUrl}
          onChange={(e) => setFormData(prev => ({ ...prev, videoUrl: e.target.value }))}
          className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Tags (comma-separated)</label>
        <input
          type="text"
          value={formData.tags}
          onChange={(e) => setFormData(prev => ({ ...prev, tags: e.target.value }))}
          className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
          placeholder="core, bodyweight, endurance"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Target Body Parts (comma-separated)</label>
        <input
          type="text"
          value={formData.targetBodyParts}
          onChange={(e) => setFormData(prev => ({ ...prev, targetBodyParts: e.target.value }))}
          className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
          placeholder="abs, chest, core"
          required
        />
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
          {initialData ? 'Update' : 'Create'} Exercise
        </button>
      </div>
    </form>
  );
};