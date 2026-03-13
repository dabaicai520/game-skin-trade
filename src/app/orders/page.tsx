'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { getOrdersByUser, getOrderSummary } from '@/data/mock-orders';
import type { Order } from '@/data/mock-orders';

/**
 * Order History Page — 用户交易历史追踪展示 (v1.2.0 Feature)
 */
export default function OrderHistoryPage() {
  const [currentUsername] = useState('CSCollector'); // Current logged-in user (from session)
  const [statusFilter, setStatusFilter] = useState<Order['status'] | 'all'>('all');

  const userOrders = getOrdersByUser(currentUsername, statusFilter !== 'all' ? statusFilter : undefined);
  const stats = getOrderSummary(currentUsername);

  // Format time helper (similar to lib/utils.ts)  
  const formatTimeAgo = (isoString: string): string => {
    const date = new Date(isoString);
    const now = new Date();
    const hoursDiff = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (hoursDiff < 1) return `${Math.floor((now - date) / 60000)}分钟前`;
    if (hoursDiff < 24) return `${hoursDiff}小时前`;
    const days = Math.floor(hoursDiff / 24);
    return `${days}天前`;
  };

  // Status badges configuration
  const statusConfig: Record<string, { label: string; color: string }> = {
    pending: { label: '处理中', color: 'text-orange-400' },
    completed: { label: '已完成', color: 'text-green-400' },
    cancelled: { label: '已取消', color: 'text-gray-400' },
    refunded: { label: '已退款', color: 'text-red-400' }
  };

  return (
    <main className="min-h-screen bg-[#0d0d0d] flex flex-col">
      {/* Navigation */}
      <Header />

      {/* Order History Container */}
      <div className="max-w-screen-2xl mx-auto md:px-16 lg:px-24 px-8 py-8 w-full max-w-7xl">
        {/* Page Title & Stats Summary */}  
        <section className="mb-8">
          <nav className="flex items-center gap-2 mb-6 text-sm text-gray-500" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-white transition-colors">首页</Link>
            <span className="text-gray-700">›</span>
            <Link href="/dashboard" className="hover:text-white transition-colors">账户中心</Link>  
            <span className="text-gray-700">›</span>
            <span className="text-gray-300 font-medium">交易历史</span>
          </nav>

          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl md:text-3xl font-bold text-white leading-tight">
              我的交易记录  
              <span className="ml-2 text-base text-gray-400 font-normal">(共 {stats.totalCount} 笔订单)</span>
            </h1>

            {/* Filter Status Tabs */}
            <div className="flex gap-2 text-sm">
              {(['all', 'completed', 'pending', 'refunded'] as const).map((status) => (
                <button
                  key={status}
                  onClick={() => setStatusFilter(status)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors border ${  
                    statusFilter === status 
                      ? 'bg-[#f6b938] text-black border-[#f6b938]' 
                      : 'bg-[#1a1c23] text-gray-400 border-gray-700 hover:border-gray-500'
                  }`}
                >
                  {status === 'all' ? '全部' : status === 'completed' ? '已完成' : status === 'pending' ? '待处理' : '已退款'}
                </button>
              ))}  
            </div>
          </div>

          {/* User Spending Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            {/* Total Orders Card */}
            <div className="bg-[#1a1c23] border border-gray-800 rounded-xl p-6 space-y-2 shadow-lg">
              <p className="text-sm text-gray-400">总订单数</p>  
              <p className="text-3xl font-bold text-white">{stats.totalCount} 笔</p>
            </div>

            {/* Total Spent Card */}
            <div className="bg-[#1a1c23] border border-gray-800 rounded-xl p-6 space-y-2 shadow-lg">  
              <p className="text-sm text-gray-400">已消费金额</p>
              <p className="text-3xl font-bold text-green-400">¥{stats.totalSpent.toLocaleString('zh-CN', { maximumFractionDigits: 2 })}</p>
            </div>

            {/* Pending Orders Card */}
            <div className="bg-[#1a1c23] border border-gray-800 rounded-xl p-6 space-y-2 shadow-lg">
              <p className="text-sm text-gray-400">待处理订单</p>  
              <p className="text-3xl font-bold text-orange-400">{stats.pendingOrders === 0 ? '无' : stats.pendingOrders + '笔'} </p>  
            </div>
          </div>
        </section>

        {/* Main Order List Section */}
        {userOrders.length === 0 ? (
          // Empty State
          <div className="flex flex-col items-center justify-center py-16 px-4 text-gray-500 bg-[#1a1c23]/50 rounded-lg border border-gray-800">
            <svg className="w-24 h-24 mb-6 opacity-30" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>

            <h2 className="text-xl font-semibold text-gray-400 mb-3">没有匹配的交易记录</h2>  
            <p className="text-sm max-w-md text-center leading-relaxed opacity-80">
              {statusFilter === 'all' 
                ? '你还没有任何交易记录。开始浏览商品并完成首次购买吧！' 
                : `没有找到${statusFilter === 'completed' ? '已完成' : statusFilter === 'pending' ? '待处理' : '已退款'}的交易`}
            </p>

            <Link href="/skins" className="mt-6 inline-block bg-gradient-to-r from-[#f6b938] to-yellow-700 hover:from-yellow-500 hover:to-yellow-600 text-black font-semibold py-2.5 px-8 rounded-lg transition-all duration-150 shadow-lg">
              🛡️ 浏览商品开始交易
            </Link>
          </div>
        ) : (
          // Order List Table/Grid
          <section className="space-y-4 mb-8">
            {/* Mobile Card View */}
            <div className="md:hidden space-y-3">
              {userOrders.map((order) => (
                <OrderCard mobile order={order} key={order.id} statusConfig={statusConfig} formatTimeAgo={formatTimeAgo} />  
              ))}
            </div>

            {/* Desktop Table View */}
            <div className="hidden md:block bg-[#1a1c23] border border-gray-800 rounded-xl overflow-hidden shadow-lg">
              {/* Table Header */}
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-gray-700/50 bg-[#181b24] text-xs uppercase tracking-wide">
                    <th className="px-6 py-4 font-semibold text-gray-300">商品信息</th>  
                    <th className="px-6 py-4 font-semibold text-gray-300">状态</th>
                    <th className="px-6 py-4 font-semibold text-gray-300 text-right">金额 (¥)</th>
                    <th className="px-6 py-4 font-semibold text-gray-300 text-right">时间</th>
                  </tr>
                </thead>

                {/* Table Body */}
                <tbody className="divide-y divide-gray-800/50">
                  {userOrders.map((order) => (
                    <tr key={order.id} className="hover:bg-[#181b24]/50 transition-colors group">
                      {/* Product Info Cell */}
                      <td className="px-6 py-4 align-top">
                        <div className="flex gap-3 items-start">
                          {/* Thumbnail Image Placeholder */}
                          <div className="w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden bg-gray-800 border border-gray-700 group-hover:border-[#f6b938] transition-colors">
                            {order.skinImageUrl ? (
                              <img 
                                src={order.skinImageUrl} 
                                alt={order.skinName.split(' ')[0]}
                                className="w-full h-full object-cover"  
                                onError={(e) => { e.currentTarget.src = '/images/no-image-placeholder.png'; }}
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-xs text-gray-500">图标</div>  
                            )}
                          </div>

                          {/* Product Details */}
                          <div className="flex-1 min-w-0">
                            {/* Game Category Tag */}
                            <span className={`inline-block px-2 py-0.5 text-xs font-medium rounded bg-opacity-15 mb-1 ${  
                              order.game === 'cs2' ? 'bg-blue-700 text-blue-300' :  
                              order.game === 'dota2' ? 'bg-purple-700 text-purple-300' : 'bg-green-700 text-green-300'
                            }`}>
                              {order.game?.toUpperCase() || '未知'}
                            </span>

                            {/* Product Name */}
                            <p className="font-medium text-[#c9d3da] truncate" title={order.skinName}>{order.skinName}</p>

                            {/* Transaction IDs */}
                            <div className="text-xs text-gray-500 mt-1">
                              <Link 
                                href={`/orders/${order.id}`}  
                                className="hover:underline hover:text-[#f6b938] transition-colors truncate block"  
                              >
                                交易号：{order.id}
                              </Link>
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Status Cell */}
                      <td className="px-6 py-4 align-top">
                        <span className={`inline-flex items-center px-3 py-1.5 text-xs font-medium rounded-md border ${  
                          order.status === 'completed' ? 'bg-green-900/20 text-green-400 border-green-800/50' : 
                          order.status === 'pending' ? 'bg-orange-900/20 text-orange-400 border-orange-800/50' : 
                          order.status === 'refunded' ? 'bg-red-900/20 text-red-400 border-red-800/50' : 'bg-gray-900/20 text-gray-400 border-gray-800/50'
                        }`}>
                          <span className="mr-1.5" role="img" aria-label={order.status}>
                            {order.status === 'completed' ? '✅' : order.status === 'pending' ? '⏳' : '❌'}  
                          </span>
                          {statusConfig[order.status].label}  
                        </span>
                      </td>

                      {/* Amount Cell */}
                      <td className="px-6 py-4 align-top text-right">
                        <div className="space-y-0.5">
                          <p className="font-bold text-green-400 tracking-tight">¥{order.totalAmount.toLocaleString('zh-CN', { maximumFractionDigits: 2 })}</p>  
                          <p className="text-xs text-gray-500 leading-tight">商品价款：¥{order.price.toFixed(2)}</p>
                          <p className="text-xs text-gray-600 leading-tight">手续费 + 保险费：¥{(order.platformFee + order.insuranceFee).toFixed(2)}</p>  
                        </div>
                      </td>

                      {/* Time Cell */}
                      <td className="px-6 py-4 align-top text-right text-xs text-gray-500 whitespace-nowrap">
                        <div className="space-y-1">
                          <p className="text-gray-400">{formatTimeAgo(order.createdAt)}</p>  
                          {order.completedAt && (
                            <p className="text-gray-600">完成：{formatTimeAgo(order.completedAt)}</p>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Table Footer Summary */}
              <tfoot className="border-t border-gray-700 bg-[#181b24]">  
                <tr>
                  <td colSpan={4} className="px-6 py-4 text-sm text-gray-500 text-right">
                    共显示 <span className="font-semibold text-white">{userOrders.length}</span> 笔交易记录 · {stats.totalCount - userOrders.length > 0 && `还有 ${stats.totalCount - userOrders.length} 条在其他筛选条件下`}  
                  </td>
                </tr>  
              </tfoot>  
            </div>
          </section>
        )}

        {/* Spacer for mobile bottom nav */}
        <div className="h-20 md:hidden w-full" />  
      </div>

      {/* Footer */}
      <Footer />
    </main>
  );
}

// Mobile Card Component Helper
const OrderCard = React.memo(({ 
  order, 
  statusConfig, 
  formatTimeAgo 
}: { 
  order: Order; 
  statusConfig: Record<string, { label: string; color: string }>  
  formatTimeAgo: (isoString: string) => string 
}) => {
  return (
    <div className="bg-[#1a1c23] rounded-lg border border-gray-800 p-4 space-y-4 shadow-lg group">
      {/* Header Image Row */}  
      <div className="flex items-start gap-3">
        <div 
          className="w-16 h-16 flex-shrink-0 rounded-md overflow-hidden bg-gray-800 border border-gray-700"
          style={{ borderLeft: `3px solid ${order.status === 'completed' ? '#4ade80' : order.status === 'pending' ? '#fb923c' : '#ef4444'}` }}  
        >
          {order.skinImageUrl ? (
            <img 
              src={order.skinImageUrl}
              alt={order.skinName.split(' ')[0]}
              className="w-full h-full object-cover"
              onError={(e) => { e.currentTarget.src = '/images/no-image-placeholder.png'; }}  
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-xs text-gray-500">图标</div>
          )}
        </div>

        {/* Product Info */}
        <div className="flex-1 min-w-0 space-y-1.5">
          {/* Game Tag */}
          <span className={`inline-block px-2 py-0.5 text-xs font-medium rounded bg-opacity-15 ${
            order.game === 'cs2' ? 'bg-blue-700 text-blue-300' :
            order.game === 'dota2' ? 'bg-purple-700 text-purple-300' : 'bg-green-700 text-green-300'
          }`}>
            {order.game?.toUpperCase() || '未知'}  
          </span>

          {/* Name */}
          <h3 className="font-medium text-[#c9d3da] line-clamp-1" title={order.skinName}>{order.skinName}</h3>

          {/* Status Badge */}
          <span className={`inline-flex items-center px-2 py-0.5 text-xs font-medium rounded-full border ${
            order.status === 'completed' ? 'bg-green-900/20 text-green-400 border-green-800/50' :
            order.status === 'pending' ? 'bg-orange-900/20 text-orange-400 border-orange-800/50' :
            'bg-red-900/20 text-red-400 border-red-800/50'
          }`}>
            {statusConfig[order.status].label}
          </span>
        </div>
      </div>

      {/* Divider */}
      <hr className="border-gray-700" />  

      {/* Footer: Amount + Time Actions */}  
      <div className="flex items-end justify-between">
        {/* Price Breakdown */}
        <div className="text-right flex-1">
          <p className="font-bold text-green-400 tracking-tight">¥{order.totalAmount.toLocaleString('zh-CN', { maximumFractionDigits: 2 })}</p>  
          <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">
            商品：¥{order.price.toFixed(2)} · 费：¥{(order.platformFee + order.insuranceFee).toFixed(2)}
          </p>
        </div>

        {/* Time & Action */}
        <div className="text-right text-xs text-gray-500 flex-shrink-0">
          <p>{formatTimeAgo(order.createdAt)}</p>  
          <Link href={`/orders/${order.id}`} className="block mt-1 text-[#f6b938] hover:underline transition-colors">查看详情的 ></span></Link>
        </div>  
      </div>
    </div>  
  );
});
