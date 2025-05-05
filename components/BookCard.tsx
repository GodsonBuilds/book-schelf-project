'use client';

import { BookForm } from '@/types';
import Image from 'next/image';
import { useState } from 'react';
import { Star } from 'lucide-react';

interface BookCardProps {
  book: BookForm;
  viewMode?: 'grid' | 'list';
}

export const BookCard = ({ book, viewMode = 'grid' }: BookCardProps) => {
  const [imageError, setImageError] = useState(false);
  
  // Récupération de l'URL de l'image avec fallback en cas d'erreur
  const getImageUrl = () => {
    if (imageError || !book.image) {
      return 'https://images.pexels.com/photos/1029141/pexels-photo-1029141.jpeg?auto=compress&cs=tinysrgb&w=300';
    }
    return book.image;
  };
 
  // Formatage du prix avec gestion des cas spéciaux
  const formatPrice = () => {
    if (book.is_free) return 'Gratuit';
    if (typeof book.price === 'number') return `$${book.price.toFixed(2)}`;
    return 'N/A';
  };

  // Vue en liste
  if (viewMode === 'list') {
    return (
      <div className="flex bg-white dark:bg-slate-900 border border-gray-200 dark:border-gray-800 max-w-2xl mx-auto rounded-lg overflow-hidden shadow-md transition-all duration-300 hover:shadow-xl">
        {/* Image du livre */}
        <div className="relative w-24  flex-shrink-0">
          <Image
            src={getImageUrl()}
            alt={book.title}
            fill
            className="object-cover"
            onError={() => setImageError(true)}
            priority={false}
          />
          
          {/* Badge "Gratuit" */}
          {book.is_free && (
            <div className="absolute top-1 right-1">
              <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                Gratuit
              </span>
            </div>
          )}
        </div>
        
        {/* Informations du livre */}
        <div className="flex flex-col flex-grow p-4">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-lg font-semibold hover:text-primary transition-colors">
                {book.title}
              </h3>
              
              <div className="mt-1 text-sm text-gray-600">
                {book.authors && book.authors.length > 0 
                  ? book.authors.map(author => author.name).join(', ')
                  : 'Auteur inconnu'}
              </div>
            </div>
            
            <div className="text-sm font-semibold">
              {formatPrice()}
            </div>
          </div>
          
          {/* Note et éditeur */}
          <div className="mt-2 flex items-center gap-4">
            {book.rating && (
              <div className="flex items-center">
                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                <span className="ml-1 text-sm font-medium">{book.rating.toFixed(1)}</span>
              </div>
            )}
            
            <div className="text-xs text-gray-500">
              {book.publisher}
            </div>
          </div>
          
          {/* Description */}
          {book.description && (
            <p className="mt-2 text-sm text-gray-600 line-clamp-2">
              {book.description}
            </p>
          )}
        </div>
      </div>
    );
  }

  // Vue en grille (par défaut)
  return (
    <div className="group relative flex flex-col bg-white dark:bg-slate-900 border border-gray-200 dark:border-gray-800 rounded-lg overflow-hidden shadow-md transition-all duration-300 hover:shadow-xl h-full">
      {/* Image du livre */}
      <div className="relative aspect-[2/3] w-full overflow-hidden bg-gray-100">
        <Image
          src={getImageUrl()} 
          alt={book.title}
          fill 
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 18vw, 18vw"
          className="object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
          onError={() => setImageError(true)}
          priority={false}
        />
        
        {/* Badge "Gratuit" */}
        {book.is_free && (
          <div className="absolute top-2 right-2">
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
              Gratuit
            </span>
          </div>
        )}
      </div>
      
      {/* Informations du livre */}
      <div className="flex flex-col flex-grow p-4">
        <h3 className="text-lg font-semibold line-clamp-1 group-hover:text-primary transition-colors">
          {book.title}
        </h3>
        
        <div className="mt-1 text-sm text-gray-600 line-clamp-1">
          {book.authors && book.authors.length > 0 
            ? book.authors.map(author => author.name).join(', ')
            : 'Auteur inconnu'}
        </div>
        
        {/* Note */}
        {book.rating && (
          <div className="flex items-center mt-2">
            <Star className="w-4 h-4 text-yellow-400 fill-current" />
            <span className="ml-1 text-sm font-medium">{book.rating.toFixed(1)}</span>
          </div>
        )}
        
        {/* Prix et éditeur */}
        <div className="mt-auto pt-3 flex items-center justify-between">
          <div className="text-sm font-semibold">
            {formatPrice()}
          </div>
          <div className="text-xs text-gray-500">
            {book.publisher}
          </div>
        </div>
      </div>
    </div>
  );
};