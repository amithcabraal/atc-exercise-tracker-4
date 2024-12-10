import React from 'react';

export const Home: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4">Welcome to 40s</h2>
      <p className="text-gray-600 dark:text-gray-300">
        Start your workout journey with 40-second exercise intervals.
        Choose a session from the menu to begin.
      </p>
    </div>
  );
};