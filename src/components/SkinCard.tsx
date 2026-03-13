'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Skin } from '@/types/skin';
import { cn, formatPrice, getWearColor, getQualityColor } from '@/lib/utils';

interface SkinCardProps {
  skin: Skin;
}

export function SkinCard({ skin }: SkinCardProps) {
  return (
    <Link href={`/skins/${skin.id}`}>
      <div className={cn(
        'group relative bg-white dark:bg-gray-800 rounded-xl overflow-hidden',
        'shadow-md hover:shadow-xl transition-all duration-300',
        'hover:-translate-y-1 cursor-pointer border border-gray-200 dark:border-gray-700'
      )}>
        {/* Image Container */}
        <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800">
          <Image
            src={skin.image}
            alt={skin.name}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-300"
            loading="lazy"
            sizes="(max-width: 768px) 50vw, 25vw"
          />
          {/* Quality Badge */}
          <div className="absolute top-2 left-2">
            <span className={cn(
              'px-2 py-1 rounded-md text-xs font-semibold',
              getQualityColor(skin.quality),
              'bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm'
            )}>
              {skin.quality}
            </span>
          </div>
          {/* Game Badge */}
          <div className="absolute top-2 right-2">
            <span className="px-2 py-1 rounded-md text-xs font-semibold bg-black/70 text-white backdrop-blur-sm">
              {skin.game}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-2 line-clamp-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            {skin.name}
          </h3>
          
          <div className="flex items-center justify-between mb-3">
            <span className={cn(
              'px-2 py-0.5 rounded text-xs font-medium',
              getWearColor(skin.wear)
            )}>
              {skin.wear}
            </span>
            <span className="text-xs text-gray-500 dark:text-gray-400">
              Float: {skin.float.toFixed(4)}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-lg font-bold text-red-600 dark:text-red-400">
              {formatPrice(skin.price)}
            </span>
            <span className="text-xs text-gray-500 dark:text-gray-400">
              {skin.sales} 售出
            </span>
          </div>
        </div>

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      </div>
    </Link>
  );
}
