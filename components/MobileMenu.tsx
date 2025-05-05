'use client';

import { Menu, X, Sun, Moon } from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';
import { useTheme } from '@/contexts/ThemeContext';

export function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="md:hidden">
      {/* Bouton du menu */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 text-gray-600 hover:text-primary transition-colors"
        aria-label="Menu"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Menu mobile */}
      <div
        className={`fixed inset-0 z-50 bg-white dark:bg-gray-900 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full p-6">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Menu</h2>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors"
              aria-label="Fermer le menu"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <nav className="flex-1 space-y-4">
            <Link
              href="/"
              className="block text-lg text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Accueil
            </Link>
            <Link
              href="/about"
              className="block text-lg text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors"
              onClick={() => setIsOpen(false)}
            >
              À propos
            </Link>
          </nav>

          <div className="mt-8">
            <button
              onClick={toggleTheme}
              className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors"
              aria-label={`Basculer en mode ${theme === 'light' ? 'sombre' : 'clair'}`}
            >
              {theme === 'light' ? (
                <>
                  <Moon className="w-5 h-5" />
                  <span>Mode sombre</span>
                </>
              ) : (
                <>
                  <Sun className="w-5 h-5" />
                  <span>Mode clair</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 