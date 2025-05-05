'use client';

import { Bookshelf } from '@/types';
import { BookOpen } from 'lucide-react';
import Link from 'next/link';

interface BookshelfCardProps {
  shelf: Bookshelf;
}

export const BookshelfCard = ({ shelf }: BookshelfCardProps) => {
  // Format last modified date
  const formatDate = (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <Link
      href={`/shelf/${shelf.id}`}
      className="block group transition-all duration-300"
    >
      <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 h-full">
        <div className="p-5 flex flex-col h-full">
          <div className="flex items-center justify-between mb-4">
            <BookOpen className="w-8 h-8 text-primary" />
            <span className="text-xs text-gray-500">
              Updated {formatDate(shelf.last_modified)}
            </span>
          </div>
          
          <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">
            {shelf.title}
          </h3>
          
          <div className="text-sm text-gray-600 flex items-center mt-auto">
            <div className="flex items-center">
              <span> Créée par {shelf.user.name}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};