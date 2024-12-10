import React from 'react';
import { Menu, Sun, Moon, Maximize, Minimize } from 'lucide-react';
import { useStore } from '../store/useStore';
import { BurgerMenu } from './BurgerMenu';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { theme, isFullscreen, menuOpen, toggleTheme, toggleFullscreen, toggleMenu } = useStore();

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'dark bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      <header className="fixed top-0 left-0 right-0 h-16 bg-blue-600 dark:bg-blue-800 shadow-lg z-50">
        <div className="flex items-center justify-between h-full px-4">
          <button
            onClick={toggleMenu}
            className="p-2 hover:bg-blue-700 dark:hover:bg-blue-900 rounded-lg transition-colors"
          >
            <Menu className="w-6 h-6 text-white" />
          </button>
          
          <h1 className="text-2xl font-bold text-white">40s</h1>
          
          <div className="flex gap-2">
            <button
              onClick={toggleTheme}
              className="p-2 hover:bg-blue-700 dark:hover:bg-blue-900 rounded-lg transition-colors"
            >
              {theme === 'dark' ? (
                <Sun className="w-6 h-6 text-white" />
              ) : (
                <Moon className="w-6 h-6 text-white" />
              )}
            </button>
            
            <button
              onClick={toggleFullscreen}
              className="p-2 hover:bg-blue-700 dark:hover:bg-blue-900 rounded-lg transition-colors"
            >
              {isFullscreen ? (
                <Minimize className="w-6 h-6 text-white" />
              ) : (
                <Maximize className="w-6 h-6 text-white" />
              )}
            </button>
          </div>
        </div>
      </header>

      <BurgerMenu />

      <main className="pt-16 min-h-screen">
        {children}
      </main>
    </div>
  );
};