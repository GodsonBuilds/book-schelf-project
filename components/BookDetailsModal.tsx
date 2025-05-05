'use client';

import { BookForm } from '@/types';
import { X } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';

interface BookDetailsModalProps {
  book: BookForm | null;
  onClose: () => void;
}

export const BookDetailsModal = ({ book, onClose }: BookDetailsModalProps) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (book) {
      setIsOpen(true);
      document.body.style.overflow = 'hidden';
    } else {
      setIsOpen(false);
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [book]);

  const formatPrice = (price: number | string | undefined) => {
    if (typeof price === 'number') {
      return `$${price.toFixed(2)}`;
    }
    if (typeof price === 'string') {
      return `$${parseFloat(price).toFixed(2)}`;
    }
    return 'Non spécifié';
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    // Empêche la propagation du clic au contenu du modal
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!book || !isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      onClick={handleOverlayClick}
    >
      <div className="bg-white dark:bg-slate-900 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-start mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">{book.title}</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="relative aspect-[2/3]  w-full">
              <Image
                src={book.image || 'https://images.pexels.com/photos/1029141/pexels-photo-1029141.jpeg'}
                alt={book.title}
                fill
                className="object-cover rounded-lg"
              />
            </div>

            <div className="md:col-span-2 space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Auteurs</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {book.authors?.map(author => author.name).join(', ') || 'Auteur inconnu'}
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Description</h3>
                <p className="text-gray-600 dark:text-gray-300">{book.description || 'Aucune description disponible'}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Éditeur</h3>
                  <p className="text-gray-600 dark:text-gray-300">{book.publisher || 'Non spécifié'}</p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">ISBN</h3>
                  <p className="text-gray-600 dark:text-gray-300">{book.isbn || 'Non spécifié'}</p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Langue</h3>
                  <p className="text-gray-600 dark:text-gray-300">{book.language || 'Non spécifiée'}</p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Prix</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {book.is_free ? 'Gratuit' : formatPrice(book.price)}
                  </p>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Tags</h3>
                <div className="flex flex-wrap gap-2 mt-2">
                  {book.tags?.map((tag, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 text-sm bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-gray-300 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}; 