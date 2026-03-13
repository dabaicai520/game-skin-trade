'use client';

import { useState, useMemo } from 'react';
import { SkinCard } from '@/components/SkinCard';
import { FilterPanel } from '@/components/FilterPanel';
import { Pagination } from '@/components/Pagination';
import { mockSkins } from '@/data/mockSkins';
import { FilterState, SortOption } from '@/types/skin';

const ITEMS_PER_PAGE = 12;

export default function SkinsPage() {
  const [filters, setFilters] = useState<FilterState>({
    game: '',
    quality: '',
    wear: '',
    priceMin: 0,
    priceMax: 0,
    search: '',
  });
  const [sort, setSort] = useState<SortOption>('newest');
  const [currentPage, setCurrentPage] = useState(1);

  const filteredAndSortedSkins = useMemo(() => {
    let result = [...mockSkins];

    // Apply filters
    if (filters.game) {
      result = result.filter((skin) => skin.game === filters.game);
    }
    if (filters.quality) {
      result = result.filter((skin) => skin.quality === filters.quality);
    }
    if (filters.wear) {
      result = result.filter((skin) => skin.wear === filters.wear);
    }
    if (filters.priceMin > 0) {
      result = result.filter((skin) => skin.price >= filters.priceMin);
    }
    if (filters.priceMax > 0) {
      result = result.filter((skin) => skin.price <= filters.priceMax);
    }
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      result = result.filter((skin) =>
        skin.name.toLowerCase().includes(searchLower)
      );
    }

    // Apply sorting
    result.sort((a, b) => {
      switch (sort) {
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        case 'sales-desc':
          return b.sales - a.sales;
        case 'newest':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        default:
          return 0;
      }
    });

    return result;
  }, [filters, sort]);

  // Pagination
  const totalPages = Math.ceil(filteredAndSortedSkins.length / ITEMS_PER_PAGE);
  const paginatedSkins = filteredAndSortedSkins.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  // Reset to page 1 when filters change
  const handleFilterChange = (newFilters: FilterState) => {
    setFilters(newFilters);
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            饰品市场
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            浏览和购买来自 CSGO、Dota2、PUBG、Apex 等游戏的精美饰品
          </p>
        </div>

        {/* Filter Panel */}
        <FilterPanel
          filters={filters}
          sort={sort}
          onFilterChange={handleFilterChange}
          onSortChange={setSort}
          totalResults={filteredAndSortedSkins.length}
        />

        {/* Skins Grid */}
        {paginatedSkins.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {paginatedSkins.map((skin) => (
                <SkinCard key={skin.id} skin={skin} />
              ))}
            </div>

            {/* Pagination */}
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </>
        ) : (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              未找到饰品
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              尝试调整筛选条件或搜索关键词
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
