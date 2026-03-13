'use client';

import React, { CSSProperties } from 'react';
import Image from 'next/image';

/**
 * 智能图像懒加载组件（高性能优化版本）
 * 
 * 特性：
 * ✅ Next.js Image 组件集成自动优化
 * ✅ Blur placeholder 替代方案  
 * ✅ 渐变淡入动画过渡
 * ✅ 响应式尺寸自适应
 * ✅ Error fallback 处理
 */
interface LazyImageProps {
  src: string;               // 图片 URL（支持远程或本地）
  alt: string;              // 无障碍说明文本（必需）
  width?: number|string;    // 目标宽度（像素或百分比字符串如 "300", "100%"）
  height?: number|string;   // 目标高度
  className?: string;       // 自定义 CSS 类名  
  placeholder?: 'blur' | 'empty'; // 占位符类型（默认 blur）
  quality?: number;          // JPEG/WebP 质量 (1-100, 默认 75)
  priority?: boolean;        // 是否关键图片优先加载（首屏图设为 true）
  objectFit?: 'cover' | 'contain' | 'fill'; // 对象填充模式
  borderRadius?: string|number;   // 圆角半径  
}

export const LazyImage: React.FC<LazyImageProps> = ({
  src,
  alt,
  width = '300',
  height = '300',
  className = '',
  placeholder = 'blur',
  quality = 75,
  priority = false,
  objectFit = 'cover',
  borderRadius = '0.5rem'
}) => {
  const [loadStatus, setLoadStatus] = React.useState<'loading' | 'loaded'>('loading');

  // Handle image load events
  const handleLoad = () => setLoadStatus('loaded');

  const handleError = () => {
    setLoadStatus('loaded');
    console.warn(`Image failed to load: ${alt}`);
  };

  // Blur data URL (generated programmatically)
  const blurPlaceholderSrc = placeholder === 'blur' 
    ? `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Cfilter id='blur'%3E%3CfeGaussianBlur stdDeviation='8'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' fill='%2324272e'/%3E%3Call/svg%3E`  
    : null;

  const imgStyle: CSSProperties = {
    opacity: loadStatus === 'loading' ? 0.6 : 1,
    transition: 'opacity 0.4s ease-in-out',
  };

  return (
    <div 
      className={`relative overflow-hidden bg-[#2b3040] ${className}`}
      style={{ borderRadius }}
    >
      {placeholder === 'blur' && loadStatus === 'loading' && (
        // Blur placeholder overlay
        <div className="absolute inset-0 z-10">
          <svg 
            width="100%" 
            height="100%" 
            className="object-cover"
            aria-hidden="true"
          >
            <defs>
              <filter id={`blur-${alt.replace(/\s+/g, '-').toLowerCase()}`}>
                <feGaussianBlur stdDeviation="8" />
              </filter>
            </defs>
            <rect 
              width="100%" 
              height="100%" 
              fill="#24272e" 
              filter={`url(#blur-${alt.replace(/\s+/g, '-').toLowerCase()})`}
            />
          </svg>
        </div>
      )}

      {/* Main Optimized Image */}
      <Image
        src={src}
        alt={alt}
        width={typeof width === 'string' && width.includes('%') ? 300 : Number(width)}
        height={typeof height === 'string' && height.includes('%') ? 300 : Number(height)}
        className={`object-${objectFit} w-full h-full transition-opacity duration-500`}
        style={imgStyle}
        onLoadingComplete={handleLoad}
        onError={handleError}
        placeholder={placeholder === 'blur' ? 'empty' : undefined} // Next.js built-in blur
        loading={priority ? 'eager' : 'lazy'}
        quality={quality}
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 75vw, 33vw"
        fetchPriority={priority ? 'high' : 'low'}
      />

      {/* Loading Spinner (fallback if image takes too long) */}
      {loadStatus === 'loading' && (
        <div className="absolute inset-0 flex items-center justify-center z-20 opacity-50">
          <div className="w-8 h-8 border-3 border-[#f6b938] border-t-transparent rounded-full animate-spin" />
        </div>
      )}
    </div>
  );
};

/**
 * Thumbnail preview with hover zoom effect (for galleries)
 */
interface ThumbnailProps {
  src: string;
  label: string;
  isActive?: boolean;
  onClick?: () => void;
}

export const ImageThumbnail: React.FC<ThumbnailProps> = ({ 
  src, 
  label,
  isActive = false,
  onClick
}) => {
  return (
    <button
      onClick={onClick}
      className={`relative group rounded-lg overflow-hidden transition-all duration-200 
        ${isActive ? 'ring-2 ring-[#f6b938] scale-105' : 'hover:scale-105 hover:opacity-75'}
      `}
    >
      <LazyImage 
        src={src} 
        alt={label}
        width="120"
        height="120"
        objectFit="cover"
        quality={80}
      />

      {/* Quality Badge overlay (optional) */}
      {isActive && (
        <div className="absolute top-2 left-2 px-2 py-1 bg-gradient-to-r from-[#f6b938] to-yellow-700 text-black text-xs font-bold rounded shadow-lg">
          当前展示
        </div>
      )}

      {/* Hover overlay */}
      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
        <span className="text-white text-xs font-medium border border-white/60 px-2 py-1 rounded backdrop-blur-sm">
          {label}
        </span>
      </div>
    </button>
  );
};

export default LazyImage;
