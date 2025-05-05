'use client';

import { BookForm } from '@/types';
import { BookCard } from './BookCard';
import { Search } from './ui/search';
import { useEffect, useState } from 'react';
import { Grid, List } from 'lucide-react';
import { BookDetailsModal } from './BookDetailsModal';
import Loading  from '../app/shelf/[id]/loading';


interface BookGridProps {
  books: BookForm[];
  title: string;
}

export const BookGrid = ({ books, title }: BookGridProps) => {
  // États pour la gestion des livres filtrés, de la recherche et du mode d'affichage
  const [filteredBooks, setFilteredBooks] = useState(books);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBook, setSelectedBook] = useState<BookForm | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [isLoading, setIsLoading] = useState(true);


  // Réinitialisation des livres filtrés lorsque les livres de base changent
  useEffect(() => {
    setIsLoading(true);
    
    const timer = setTimeout(() => {
      if (searchQuery) {
        handleSearch(searchQuery);
      } else {
        setFilteredBooks(books);
      }
      setIsLoading(false);
    }, 1000); // simulation de chargement 1s
  
    return () => clearTimeout(timer);
  }, [books, searchQuery]);
  

  // Fonction de recherche de livres
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    
    if (!query.trim()) {
      setFilteredBooks(books);
      return;
    }
    
    const lowercaseQuery = query.toLowerCase();
    const filtered = books.filter((book) => {
      const titleMatch = book.title.toLowerCase().includes(lowercaseQuery);
      const authorMatch = book.authors?.some(author => 
        author.name.toLowerCase().includes(lowercaseQuery)
      );
      
      return titleMatch || authorMatch;
    });
    
    setFilteredBooks(filtered);
  };

  // Gestion du clic sur un livre pour afficher ses détails
  const handleBookClick = (book: BookForm) => {
    setSelectedBook(book);
  };

  if (books.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <h3 className="text-xl font-medium text-gray-700">Aucun livre trouvé</h3>
        <p className="mt-2 text-gray-500">Cette étagère est vide.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
        <div className="flex items-center gap-4 w-full sm:w-auto">
          <Search onSearch={handleSearch} />
          <div className="flex items-center gap-2">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-md transition-colors ${
                viewMode === 'grid' ? 'bg-primary text-white' : 'text-gray-500 hover:bg-gray-100'
              }`}
              aria-label="Vue en grille"
            >
              <Grid className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-md transition-colors ${
                viewMode === 'list' ? 'bg-primary text-white' : 'text-gray-500 hover:bg-gray-100'
              }`}
              aria-label="Vue en liste"
            >
              <List className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
      
      {/* Affichage des livres filtrés ou message si aucun résultat */}
      {isLoading ? (
        <div className="py-12 text-center">
          <p className="text-gray-600">Chargement...</p>
        </div>
      ) : filteredBooks.length === 0 ? (
        <div className="py-12 text-center">
          <p className="text-gray-600">Aucun livre ne correspond à votre recherche.</p>
        </div>
      ) : (
        <div className={viewMode === 'grid' 
          ? "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6"
          : "space-y-4"
        }>
          {filteredBooks.map((book) => (
            <div 
              key={book.id} 
              onClick={() => handleBookClick(book)}
              className="cursor-pointer"
            >
              <BookCard book={book} viewMode={viewMode} />
            </div>
          ))}
        </div>
      )}


      {/* Modal des détails du livre */}
      <BookDetailsModal 
        book={selectedBook} 
        onClose={() => setSelectedBook(null)} 
      />
    </div>
  );
};