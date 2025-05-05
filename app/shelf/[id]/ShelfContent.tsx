'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import { BookGrid } from '@/components/BookGrid';
import { Pagination } from '@/components/ui/pagination';

interface ShelfContentProps {
  currentShelf: {
    id: string;
    title: string;
    user: {
      name: string;
    };
  };
  booksWithRatings: any[];
  estimatedTotal: number;
  currentPage: number;
  BOOKS_PER_PAGE: number;
}

export function ShelfContent({
  currentShelf,
  booksWithRatings,
  estimatedTotal,
  currentPage,
  BOOKS_PER_PAGE,
}: ShelfContentProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mb-8"
      >
        <Link 
          href="/"
          className="inline-flex items-center text-primary hover:text-primary/80 dark:text-primary-400 dark:hover:text-primary-300 transition-colors mb-4"
        >
          <ChevronLeft className="w-4 h-4 mr-1" />
          Retour aux étagères
        </Link>
        
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">{currentShelf.title}</h1>
        <p className="text-gray-600 dark:text-gray-300 mt-2">
           Créée par {currentShelf.user.name}
        </p>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <BookGrid books={booksWithRatings} title="Livres dans cette étagère" />
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <Pagination
          totalItems={estimatedTotal}
          itemsPerPage={BOOKS_PER_PAGE}
          currentPage={currentPage}
        />
      </motion.div>
    </motion.div>
  );
} 