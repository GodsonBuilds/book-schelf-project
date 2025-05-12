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

  const renderPageNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = 5;
    const halfVisiblePages = Math.floor(maxVisiblePages / 2);

    let startPage = Math.max(1, currentPage - halfVisiblePages);
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    // Première page
    if (startPage > 1) {
      pageNumbers.push(
        <li key={1}>
          <button
            onClick={() => handlePageChange(1)}
            className="px-3 py-1.5 rounded-md border border-gray-300 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-100 dark:hover:bg-gray-700"
          >
            1
          </button>
        </li>
      );
      if (startPage > 2) {
        pageNumbers.push(
          <li key="start-ellipsis" className="px-2 py-1.5 text-gray-700 dark:text-gray-200">
            ...
          </li>
        );
      }
    }

    // Pages du milieu
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <li key={i}>
          <button
            onClick={() => handlePageChange(i)}
            className={`px-3 py-1.5 rounded-md border ${
              currentPage === i
                ? 'bg-primary text-primary-foreground border-primary'
                : 'border-gray-300 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-100 dark:hover:bg-gray-700'
            }`}
            aria-current={currentPage === i ? 'page' : undefined}
          >
            {i}
          </button>
        </li>
      );
    }

    // Dernière page
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pageNumbers.push(
          <li key="end-ellipsis" className="px-2 py-1.5 text-gray-700 dark:text-gray-200">
            ...
          </li>
        );
      }
      pageNumbers.push(
        <li key={totalPages}>
          <button
            onClick={() => handlePageChange(totalPages)}
            className="px-3 py-1.5 rounded-md border border-gray-300 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-100 dark:hover:bg-gray-700"
          >
            {totalPages}
          </button>
        </li>
      );
    }

    return pageNumbers;
  };

  return (
    <nav className="flex justify-center mt-8" aria-label="Pagination">
      <ul className="flex flex-wrap gap-2 justify-center">
        <li>
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage <= 1}
            className="px-2 py-1.5 rounded-md border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 
            dark:border-gray-600 dark:hover:bg-gray-700 dark:text-gray-100"
            aria-label="Previous page"
          >
            Précédent
          </button>
        </li>
        {renderPageNumbers()}
        <li>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage >= totalPages}
            className="px-2 py-1.5 rounded-md border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50
            dark:border-gray-600 dark:text-gray-100 dark:hover:border-gray-600 dark:hover:bg-gray-700"
            aria-label="Next page"
          >
            Suivant
          </button>
        </li>
      </ul>
    </nav>
  );
}