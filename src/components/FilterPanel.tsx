'use client';

import { FilterState, SortOption } from '@/types/skin';

interface FilterPanelProps {
  filters: FilterState;
  sort: SortOption;
  onFilterChange: (filters: FilterState) => void;
  onSortChange: (sort: SortOption) => void;
  totalResults: number;
}

const GAMES = ['All', 'CSGO', 'Dota2', 'PUBG', 'Apex'];
const QUALITIES = [
  'All',
  'Consumer Grade',
  'Industrial Grade',
  'Mil-Spec',
  'Restricted',
  'Classified',
  'Covert',
  'Contraband',
  'Common',
  'Uncommon',
  'Rare',
  'Mythical',
  'Legendary',
  'Ancient',
  'Immortal',
];
const WEARS = [
  'All',
  'Factory New',
  'Minimal Wear',
  'Field-Tested',
  'Well-Worn',
  'Battle-Scarred',
];
const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: 'price-asc', label: '价格 ↑' },
  { value: 'price-desc', label: '价格 ↓' },
  { value: 'sales-desc', label: '销量 ↓' },
  { value: 'newest', label: '最新上架' },
];

export function FilterPanel({
  filters,
  sort,
  onFilterChange,
  onSortChange,
  totalResults,
}: FilterPanelProps) {
  const handleFilterChange = (key: keyof FilterState, value: string | number) => {
    onFilterChange({ ...filters, [key]: value });
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 mb-6 border border-gray-200 dark:border-gray-700">
      <div className="flex flex-col lg:flex-row gap-4">
        {/* Search */}
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            搜索饰品
          </label>
          <input
            type="text"
            placeholder="输入饰品名称..."
            value={filters.search}
            onChange={(e) => handleFilterChange('search', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          />
        </div>

        {/* Game Filter */}
        <div className="w-full lg:w-40">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            游戏类型
          </label>
          <select
            value={filters.game}
            onChange={(e) => handleFilterChange('game', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          >
            {GAMES.map((game) => (
              <option key={game} value={game === 'All' ? '' : game}>
                {game}
              </option>
            ))}
          </select>
        </div>

        {/* Quality Filter */}
        <div className="w-full lg:w-40">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            品质
          </label>
          <select
            value={filters.quality}
            onChange={(e) => handleFilterChange('quality', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          >
            {QUALITIES.map((quality) => (
              <option key={quality} value={quality === 'All' ? '' : quality}>
                {quality}
              </option>
            ))}
          </select>
        </div>

        {/* Wear Filter */}
        <div className="w-full lg:w-40">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            磨损度
          </label>
          <select
            value={filters.wear}
            onChange={(e) => handleFilterChange('wear', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          >
            {WEARS.map((wear) => (
              <option key={wear} value={wear === 'All' ? '' : wear}>
                {wear}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Price Range and Sort */}
      <div className="flex flex-col lg:flex-row gap-4 mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-4 flex-1">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              最低价格
            </label>
            <input
              type="number"
              placeholder="0"
              value={filters.priceMin || ''}
              onChange={(e) => handleFilterChange('priceMin', Number(e.target.value))}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              最高价格
            </label>
            <input
              type="number"
              placeholder="无限制"
              value={filters.priceMax || ''}
              onChange={(e) => handleFilterChange('priceMax', Number(e.target.value))}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>
        </div>

        <div className="w-full lg:w-48">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            排序
          </label>
          <select
            value={sort}
            onChange={(e) => onSortChange(e.target.value as SortOption)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          >
            {SORT_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-end">
          <div className="text-sm text-gray-600 dark:text-gray-400">
            <span className="font-semibold text-gray-900 dark:text-white">{totalResults}</span> 个结果
          </div>
        </div>
      </div>
    </div>
  );
}
