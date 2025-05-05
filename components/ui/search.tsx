'use client';

import { ChangeEvent, FormEvent, useState } from 'react';
import { Search as SearchIcon, X } from 'lucide-react';

interface SearchProps {
  onSearch: (query: string) => void;
  placeholder?: string;
}

export const Search = ({ onSearch, placeholder = 'Rechercher des livres...' }: SearchProps) => {
  const [query, setQuery] = useState('');

  // Gestion du changement de la recherche avec mise à jour en temps réel
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value;
    setQuery(newQuery);
    onSearch(newQuery.trim());
  };

  // Réinitialisation de la recherche
  const handleClear = () => {
    setQuery('');
    onSearch('');
  };

  return (
    <div className="relative w-full max-w-md">
      <div className="relative">  
        {/* Champ de recherche */}
        <input
          type="text"
          value={query}
          onChange={handleChange}
          placeholder={placeholder}
          className="w-full py-2 pl-10 pr-10 text-sm text-gray-900 dark:bg-slate-800 dark:text-white dark:placeholder-gray-400 border border-gray-200 dark:border-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
        />

        {/* Icône de recherche */}
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <SearchIcon className="w-4 h-4 text-gray-500 dark:text-gray-200" />
        </div> 
          
        {/* Bouton de suppression de la recherche */}
        {query && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-gray-700 transition-colors"
            aria-label="Effacer la recherche"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};