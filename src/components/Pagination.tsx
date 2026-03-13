'use client';

import { cn } from '@/lib/utils';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  const getVisiblePages = () => {
    const pages: (number | string)[] = [];
    const showPages = 5;

    if (totalPages <= showPages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) pages.push(i);
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - 3; i <= totalPages; i++) pages.push(i);
      } else {
        pages.push(1);
        pages.push('...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) pages.push(i);
        pages.push('...');
        pages.push(totalPages);
      }
    }

    return pages;
  };

  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-center gap-2 mt-8">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={cn(
          'p-2 rounded-lg border border-gray-300 dark:border-gray-600',
          'hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors',
          currentPage === 1 && 'opacity-50 cursor-not-allowed'
        )}
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      {getVisiblePages().map((page, index) =>
        page === '...' ? (
          <span
            key={`ellipsis-${index}`}
            className="px-3 py-2 text-gray-500 dark:text-gray-400"
          >
            ...
          </span>
        ) : (
          <button
            key={page}
            onClick={() => onPageChange(page as number)}
            className={cn(
              'px-4 py-2 rounded-lg border transition-colors',
              page === currentPage
                ? 'bg-blue-600 border-blue-600 text-white'
                : 'border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300'
            )}
          >
            {page}
          </button>
        )
      )}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={cn(
          'p-2 rounded-lg border border-gray-300 dark:border-gray-600',
          'hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors',
          currentPage === totalPages && 'opacity-50 cursor-not-allowed'
        )}
      >
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  );
}
