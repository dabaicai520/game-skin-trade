'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Star, Shield, Truck, ArrowLeft } from 'lucide-react';
import { SkinCard } from '@/components/SkinCard';
import { mockSkins, getSkinById, getRelatedSkins } from '@/data/mockSkins';
import { cn, formatPrice, getWearColor, getQualityColor } from '@/lib/utils';

interface SkinDetailPageProps {
  params: Promise<{ id: string }>;
}

export default function SkinDetailPage({ params }: SkinDetailPageProps) {
  const [resolvedParams] = useState(params);
  const skinId = typeof resolvedParams === 'object' && 'id' in resolvedParams ? resolvedParams.id : String(resolvedParams);
  const skin = getSkinById(skinId);

  if (!skin) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">😢</div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">饰品未找到</h1>
          <Link href="/skins" className="text-blue-600 hover:underline">
            返回饰品列表
          </Link>
        </div>
      </div>
    );
  }

  const relatedSkins = getRelatedSkins(skin);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Link
          href="/skins"
          className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 mb-6 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          返回列表
        </Link>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Image Section */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700">
            <div className="relative aspect-square">
              <Image
                src={skin.image}
                alt={skin.name}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>

          {/* Info Section */}
          <div className="space-y-6">
            {/* Title and Badges */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="px-3 py-1 rounded-full text-sm font-semibold bg-black/80 text-white">
                  {skin.game}
                </span>
                <span className={cn(
                  'px-3 py-1 rounded-full text-sm font-semibold',
                  getQualityColor(skin.quality),
                  'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700'
                )}>
                  {skin.quality}
                </span>
              </div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                {skin.name}
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                {skin.description}
              </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
                <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">磨损度</div>
                <span className={cn('font-semibold', getWearColor(skin.wear))}>
                  {skin.wear}
                </span>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
                <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Float 值</div>
                <div className="font-semibold text-gray-900 dark:text-white">
                  {skin.float.toFixed(6)}
                </div>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
                <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">销量</div>
                <div className="font-semibold text-gray-900 dark:text-white">
                  {skin.sales} 件
                </div>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
                <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">上架时间</div>
                <div className="font-semibold text-gray-900 dark:text-white">
                  {skin.createdAt}
                </div>
              </div>
            </div>

            {/* Price */}
            <div className="bg-gradient-to-r from-red-500 to-red-600 rounded-2xl p-6 text-white">
              <div className="text-sm opacity-80 mb-1">当前价格</div>
              <div className="text-4xl font-bold">{formatPrice(skin.price)}</div>
            </div>

            {/* Seller Info */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg">
                    {skin.seller.name[0]}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                      {skin.seller.name}
                      {skin.seller.verified && (
                        <Shield className="w-4 h-4 text-blue-500" />
                      )}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      已完成 {skin.seller.salesCount} 笔交易
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-yellow-500">
                  <Star className="w-5 h-5 fill-current" />
                  <span className="font-semibold">{skin.seller.rating}</span>
                </div>
              </div>
              <div className="flex gap-3">
                <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-xl transition-colors flex items-center justify-center gap-2">
                  <Truck className="w-5 h-5" />
                  立即购买
                </button>
                <button className="flex-1 border-2 border-blue-600 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 font-semibold py-3 px-6 rounded-xl transition-colors">
                  联系卖家
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Price Chart */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 mb-12 border border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            价格趋势
          </h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={skin.priceHistory}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3} />
                <XAxis
                  dataKey="date"
                  stroke="#6B7280"
                  tickFormatter={(date) => {
                    const d = new Date(date);
                    return `${d.getMonth() + 1}/${d.getDate()}`;
                  }}
                />
                <YAxis
                  stroke="#6B7280"
                  tickFormatter={(value) => `¥${value}`}
                  domain={['dataMin - 100', 'dataMax + 100']}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1F2937',
                    border: 'none',
                    borderRadius: '8px',
                    color: '#fff',
                  }}
                  formatter={(value: number) => [formatPrice(value), '价格']}
                  labelFormatter={(label) => {
                    const d = new Date(label);
                    return `${d.getMonth() + 1}月${d.getDate()}日`;
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="price"
                  stroke="#EF4444"
                  strokeWidth={3}
                  dot={{ fill: '#EF4444', strokeWidth: 2, r: 6 }}
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Related Skins */}
        {relatedSkins.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              相关推荐
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedSkins.map((relatedSkin) => (
                <SkinCard key={relatedSkin.id} skin={relatedSkin} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
