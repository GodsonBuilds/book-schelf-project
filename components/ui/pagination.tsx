'use client';

import { useRouter } from 'next/navigation';
import { PaginationProps } from '@/types';

export function Pagination({
  totalItems,
  itemsPerPage,
  currentPage,
}: Omit<PaginationProps, 'onPageChange'>) {
  const router = useRouter();
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  
  const handlePageChange = (page: number) => {
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.set('page', page.toString());
    router.push(`${window.location.pathname}?${searchParams.toString()}`);
  };

  if (totalPages <= 1) return null;

  return (
    <nav className="flex justify-center mt-8" aria-label="Pagination">
      <ul className="flex space-x-2">
        <li>
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage <= 1}
            className="px-2 py-1.5 rounded-md border border-gray-300   disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 
            dark:border-gray-600 dark:hover:bg-gray-700 dark:text-gray-100   "
            aria-label="Previous page"
          >
            Précédent
          </button>
        </li>
        {[...Array(totalPages)].map((_, index) => (
          <li key={index + 1}>
            <button
              onClick={() => handlePageChange(index + 1)}
              className={`px-3 py-1.5 rounded-md border ${
                currentPage === index + 1
                  ? 'bg-primary text-primary-foreground border-primary'
                  : 'border-gray-300 hover:bg-gray-50 dark:border-gray-600  dark:text-gray-100  dark:hover:bg-gray-700'
              }`}
              aria-label={`Page ${index + 1}`}
              aria-current={currentPage === index + 1 ? 'page' : undefined}
            >
              {index + 1}
            </button>
          </li>
        ))}
        <li>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage >= totalPages}
            className="px-2 py-1.5 rounded-md border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50
            dark:border-gray-600  dark:text-gray-100 dark:hover:border-gray-600 dark:hover:bg-gray-700"
            aria-label="Next page"
          >
            Suivant
          </button>
        </li>
      </ul>
    </nav>
  );
}