'use client';

import React from 'react';

// 通用骨架屏组件（用于加载状态展示，优化用户体验）

/**
 * 商品卡片骨架屏
 * @param count - 显示数量 (默认 12)
 */
interface SkeletonProps {
  count?: number;
  className?: string;
}

export const SkeletonGrid: React.FC<SkeletonProps> = ({ count = 12, className = '' }) => {
  return (
    <div className={`grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-3 sm:gap-4 ${className}`}>
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} index={i} />
      ))}
    </div>
  );
};

// 单个卡片骨架屏
const SkeletonCard: React.FC<{ index: number }> = ({ index }) => {
  // Staggered animation delay for smooth loading effect
  const animationDelay = `${index * 50}ms`;
  
  return (
    <div 
      className="bg-[#1a1c23] rounded-lg overflow-hidden group"
      style={{ animationDelay }}
    >
      {/* Image Skeleton */}
      <div className="aspect-square bg-gradient-to-b from-gray-800 to-gray-900 animate-pulse relative overflow-hidden">
        <div 
          className="absolute inset-2 rounded-md bg-gray-700/50"
          style={{ animationDelay }}
        />
      </div>

      {/* Content Skeleton */}
      <div className="p-3 space-y-2">
        {/* Weapon Type */}
        <div 
          className="h-3 w-16 bg-gray-800 rounded animate-pulse"
          style={{ animationDelay }}
        />

        {/* Product Name (Line 1) */}
        <div 
          className="h-4 w-full bg-gradient-to-r from-gray-800 to-gray-700 rounded animate-pulse line-clamp-2"
          style={{ animationDelay: `${animationDelay} 50ms` }}
        />

        {/* Price & Actions */}
        <div className="flex justify-between items-end pt-1 border-t border-gray-800/50">
          {/* Price Skeleton */}
          <div 
            className="h-5 w-12 bg-gray-700 rounded animate-pulse"
            style={{ animationDelay: `${animationDelay} 100ms` }}
          />
          
          {/* Quality Dot */}
          <div 
            className="w-3 h-3 rounded-full bg-gradient-to-br from-purple-600 to-pink-500 animate-pulse"
            style={{ animationDelay: `${animationDelay} 150ms` }}
          />
        </div>

        {/* Wear Tag (optional) */}
        <div 
          className="pt-1 h-2 w-full bg-gray-800/50 rounded animate-pulse"
          style={{ animationDelay: `${animationDelay} 200ms` }}
        />
      </div>
    </div>
  );
};

/**
 * Loading banner for Hero section
 */
export const HeroSkeleton = () => {
  return (
    <div className="bg-gradient-to-br from-gray-900 to-black rounded-xl p-8 animate-pulse">
      <div className="space-y-6 max-w-screen-xl mx-auto px-8">
        {/* Main Headline */}
        <div className="h-16 md:h-24 bg-gradient-to-r from-gray-700 to-gray-600 rounded-lg" />
        
        {/* Subtitle */}
        <div className="h-6 w-3/4 bg-gray-800 rounded" />
        <div className="h-6 w-1/2 bg-gray-800 rounded" />

        {/* Feature Chips */}
        <div className="flex gap-3 flex-wrap">
          <div className="h-8 w-24 bg-gray-700 rounded animate-pulse" />
          <div className="h-8 w-32 bg-gray-700 rounded animate-pulse delay-75" />
          <div className="h-8 w-28 bg-gray-700 rounded animate-pulse delay-150" />
        </div>

        {/* CTA Buttons */}
        <div className="flex gap-4 mt-6">
          <div className="h-12 w-32 bg-gradient-to-r from-yellow-700 to-yellow-600 rounded-lg animate-pulse" />
          <div className="h-12 w-28 bg-gray-700 rounded-lg animate-pulse delay-75" />
        </div>

        {/* Trust Badges */}
        <div className="flex items-center gap-6 mt-8 border-t border-gray-800 pt-4">
          <div className="h-4 w-20 bg-gray-700 rounded animate-pulse delay-150" />
          <div className="h-6 w-16 bg-gradient-to-r from-yellow-600 to-orange-500 rounded animate-pulse delay-200" />
        </div>
      </div>
    </div>
  );
};

/**
 * Real-time stats loader
 */
export const StatsSkeleton = () => {
  return (
    <div className="max-w-screen-2xl mx-auto md:px-16 lg:px-24 px-8 py-12 animate-pulse">
      {/* Title */}
      <div className="h-7 w-32 bg-gray-700 rounded mx-auto mb-8" />

      {/* Stats Cards Grid */}
      <div className="bg-[#1a1c23] rounded-xl p-4 border border-gray-800">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className={`bg-gradient-to-br from-gray-800/50 to-transparent p-4 rounded-lg ${i % 2 === 0 ? 'animate-pulse' : 'animate-pulse delay-150'}`}>
              {/* Emoji & Label */}
              <div className="flex justify-center gap-2 mb-2">
                <div className="w-8 h-4 bg-gray-700 rounded" />
                <div className="w-20 h-3 bg-gray-600 rounded self-center" />
              </div>

              {/* Number Display */}
              <div className={`h-8 ${i === 2 ? 'w-16' : 'w-12'} bg-gradient-to-r from-yellow-700 to-yellow-600 rounded mx-auto mb-2`} />

              {/* Footer Text */}
              <div className="w-24 h-3 bg-gray-600 rounded mx-auto" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

/**
 * Sidebar filter skeleton (for SearchSidebar loading state)
 */
export const FilterSkeleton = () => {
  return (
    <div className="bg-[#1a1c23] border-r border-gray-800 w-full lg:w-72 space-y-6 p-4">
      {/* Search Input */}
      <div className="h-9 bg-gray-800 rounded animate-pulse" />

      {/* Filter Section - Game */}
      <div className="space-y-3">
        <div className="h-3 w-20 bg-gray-700 rounded animate-pulse" />
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="flex items-center gap-3">
            <div className="w-4 h-4 rounded-full border-2 border-gray-600 flex-shrink-0" />
            <div className="h-3 w-16 bg-gray-700 rounded animate-pulse" style={{ animationDelay: `${i * 50}ms` }} />
          </div>
        ))}
      </div>

      {/* Filter Section - Quality */}
      <div className="space-y-2">
        <div className="h-3 w-24 bg-gray-700 rounded animate-pulse" />
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="flex items-center gap-3 opacity-70">
            <div className="w-4 h-4 border border-gray-600 rounded flex-shrink-0" />
            <div className={`h-2 w-${['10','12','14','8','16'][i]} bg-gradient-to-r from-purple-700 to-pink-600 rounded`} />
          </div>
        ))}
      </div>

      {/* Price Range */}
      <div className="bg-[#181b24] p-3 rounded-lg border border-gray-700">
        <div className="h-3 w-16 bg-gray-600 rounded mb-3 animate-pulse" />
        <div className="flex gap-2">
          <div className="flex-1 h-8 bg-gray-800 rounded animate-pulse" />
          <div className="w-5 h-5 bg-gray-700" />
          <div className="flex-1 h-8 bg-gray-800 rounded animate-pulse delay-75" />
        </div>
      </div>

      {/* Sort */}
      <div className="h-9 bg-gray-800 rounded animate-pulse delay-150" />
    </div>
  );
};

/**
 * Empty state placeholder (for zero results)
 */
interface EmptyStateProps {
  type?: 'search' | 'category' | 'general';
  title?: string;
  description?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ 
  type = 'general',
  title = '暂无数据',
  description = '没有找到匹配的条件，请尝试调整筛选条件或浏览其他分类'
}) => {
  const icons: Record<string, string> = {
    search: '🔍',
    category: '📂',
    general: '💫'
  };

  const icon = icons[type] || icons.general;

  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-gray-500 bg-[#1a1c23]/50 rounded-lg border border-gray-800">
      <div 
        className="text-7xl mb-6 opacity-60" 
        style={{ filter: 'grayscale(0.5)' }}
      >
        {icon}
      </div>
      
      <h3 className="text-xl font-semibold text-gray-400 mb-2">{title}</h3>
      <p className="text-sm max-w-md text-center leading-relaxed opacity-80">
        {description}
      </p>

      {/* Suggested Actions */}
      <div className="mt-8 space-y-3 w-full max-w-xs">
        <button 
          className="w-full bg-gradient-to-r from-[#f6b938] to-yellow-700 hover:from-yellow-500 hover:to-yellow-600 text-black font-semibold py-2 px-4 rounded-lg transition-all duration-150"
          onClick={() => window.location.href = '/skins'}
        >
          浏览所有商品 🛡️
        </button>

        <button 
          className="w-full bg-[#24272e] hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded-lg border border-gray-700 transition-all duration-150"
          onClick={() => window.location.href = '/'}
        >
          返回首页 🏠
        </button>
      </div>

      {/* Decorative pattern */}
      <div 
        className="absolute inset-0 -z-10 opacity-5 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, rgba(246, 185, 56, ${type === 'search' ? 0.3 : 0.1}) 1px, transparent 0)`,
          backgroundSize: '24px 24px',
          maskImage: 'radial-gradient(ellipse at center, black 70%, transparent 100%)'
        }}
      />
    </div>
  );
};

/**
 * Error state component
 */
interface ErrorStateProps {
  error?: string;
  statusCode?: number;
}

export const ErrorState: React.FC<ErrorStateProps> = ({ 
  error = '加载失败',
  statusCode = 500
}) => {
  return (
    <div className="bg-red-900/20 border border-red-800/50 rounded-lg p-6 text-center max-w-md mx-auto w-full">
      <div className="text-7xl mb-4 opacity-60" role="img" aria-label="Error">
        ❌
      </div>

      {statusCode === 404 ? (
        <>
          <h3 className="text-xl font-semibold text-red-400 mb-2">页面未找到</h3>
          <p className="text-sm text-gray-400 mb-6">抱歉，您访问的页面不存在或已被删除。</p>
        </>
      ) : (
        <>
          <h3 className="text-xl font-semibold text-red-400 mb-2">{error}</h3>
          <p className="text-sm text-gray-400 mb-6">系统出现异常，请稍后重试。</p>
        </>
      )}

      <button 
        onClick={() => window.location.reload()}
        className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors duration-150"
      >
        🔁 重试请求
      </button>
    </div>
  );
};

export default { SkeletonGrid, HeroSkeleton, StatsSkeleton, FilterSkeleton, EmptyState, ErrorState };
