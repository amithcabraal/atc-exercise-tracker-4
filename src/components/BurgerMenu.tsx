import React from 'react';
import { X, Settings, List, Book, Download, Upload, RotateCcw } from 'lucide-react';
import { useStore } from '../store/useStore';
import { useLocation } from 'wouter';

export const BurgerMenu: React.FC = () => {
  const { menuOpen, toggleMenu, exportData, importData } = useStore();
  const [, setLocation] = useLocation();
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      importData(content);
    };
    reader.readAsText(file);
  };

  const handleExport = () => {
    const data = exportData();
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = '40s-backup.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleNavigation = (path: string) => {
    setLocation(path);
    toggleMenu();
  };

  return (
    <>
      <div
        className={`fixed inset-0 bg-black/50 z-40 transition-opacity ${
          menuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={toggleMenu}
      />
      
      <div
        className={`fixed top-0 left-0 w-64 h-full bg-white dark:bg-gray-800 z-50 transform transition-transform ${
          menuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-4">
          <button
            onClick={toggleMenu}
            className="absolute top-4 right-4 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
          >
            <X className="w-6 h-6" />
          </button>

          <nav className="mt-8 space-y-2">
            <MenuItem
              icon={List}
              text="Choose Session"
              onClick={() => handleNavigation('/sessions')}
            />
            <MenuItem
              icon={Settings}
              text="Session Admin"
              onClick={() => handleNavigation('/admin/sessions')}
            />
            <MenuItem
              icon={Book}
              text="Exercise Journal"
              onClick={() => handleNavigation('/journal')}
            />
            <MenuItem
              icon={Settings}
              text="Exercise Admin"
              onClick={() => handleNavigation('/admin/exercises')}
            />
            
            <div className="pt-4 border-t dark:border-gray-700">
              <button
                onClick={handleExport}
                className="w-full flex items-center gap-2 px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
              >
                <Download className="w-5 h-5" />
                Export Data
              </button>
              
              <button
                onClick={() => fileInputRef.current?.click()}
                className="w-full flex items-center gap-2 px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
              >
                <Upload className="w-5 h-5" />
                Import Data
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept=".json"
                onChange={handleImport}
                className="hidden"
              />
            </div>
          </nav>
        </div>
      </div>
    </>
  );
};

interface MenuItemProps {
  icon: React.FC<any>;
  text: string;
  onClick: () => void;
}

const MenuItem: React.FC<MenuItemProps> = ({ icon: Icon, text, onClick }) => (
  <button
    onClick={onClick}
    className="w-full flex items-center gap-2 px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
  >
    <Icon className="w-5 h-5" />
    {text}
  </button>
);