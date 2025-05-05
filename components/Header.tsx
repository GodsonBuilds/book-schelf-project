'use client';

import Link from 'next/link';
import { BookOpen, Sun, Moon } from 'lucide-react';
import { MobileMenu } from './MobileMenu';
import { useTheme } from '@/contexts/ThemeContext';

export const Header = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link 
            href="/" 
            className="flex items-center gap-2 text-xl font-semibold text-gray-900 dark:text-white hover:text-primary dark:hover:text-primary transition-colors"
          >
            <BookOpen className="h-6 w-6" />
            <span>BookShelf</span>
          </Link>
          
          {/* Menu desktop */}
          <nav className="hidden md:flex space-x-6">
            <Link 
              href="/" 
              className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors"
            >
              Accueil
            </Link>
            <Link 
              href="/about" 
              className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors"
            >
              À propos
            </Link>
          </nav>

          <div className="flex items-center gap-4">
            {/* Bouton de thème */}
            <button
              onClick={toggleTheme}
              className="p-2 text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors"
              aria-label={`Basculer en mode ${theme === 'light' ? 'sombre' : 'clair'}`}
            >
              {theme === 'light' ? (
                <Moon className="w-5 h-5" />
              ) : (
                <Sun className="w-5 h-5" />
              )}
            </button>

            {/* Menu mobile */}
            <MobileMenu />
          </div>
        </div>
      </div>
    </header>
  );
};