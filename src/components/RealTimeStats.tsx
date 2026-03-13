'use client';

import React, { useState, useEffect } from 'react';

// 实时统计卡片组件（用于首页展示平台数据）
interface RealTimeStatsProps {
  onlineUsers?: number;        // 在线用户数
  totalTrades?: number;         // 今日交易笔数  
  totalVolume?: number;         // 今日交易额 (CNY)
  newListings?: number;         // 今日新增商品数
}

export const RealTimeStats: React.FC<RealTimeStatsProps> = ({ 
  onlineUsers = 1247,
  totalTrades = 3856,
  totalVolume = 1286420.00,
  newListings = 892
}) => {
  // 模拟实时数据刷新（每 3 秒更新一次）
  const [stats, setStats] = useState({ onlineUsers, totalTrades, totalVolume, newListings });

  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prev => ({
        onlineUsers: prev.onlineUsers + (Math.random() > 0.5 ? Math.floor(Math.random() * 50) : -Math.floor(Math.random() * 30)),
        totalTrades: prev.totalTrades + Math.floor(Math.random() * 5),
        totalVolume: prev.totalVolume + Math.random() * 500,
        newListings: prev.newListings + Math.floor(Math.random() * 3)
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const formatNumber = (num: number): string => {
    if (num >= 100000) {
      return `¥${(num / 10000).toFixed(1)}万`;
    }
    return `¥${num.toLocaleString('zh-CN', { maximumFractionDigits: 0 })}`;
  };

  const formatK = (num: number): string => {
    if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}K`;
    }
    return num.toLocaleString();
  };

  return (
    <div className="w-full bg-[#1a1c23]/80 backdrop-blur-md border border-gray-700/50 rounded-xl p-4 shadow-xl">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-center">
        {/* Online Users */}
        <div className="space-y-1.5 p-3 rounded-lg bg-gradient-to-br from-green-900/20 to-emerald-900/10 border border-green-800/30">
          <div className="flex items-center justify-center gap-2 text-sm text-green-400 font-medium">
            <span>👥</span>
            <span>在线用户</span>
          </div>
          <p className="text-2xl font-bold text-white animate-pulse">
            {formatK(stats.onlineUsers)}
          </p>
          <p className="text-xs text-gray-500">实时活跃中</p>
        </div>

        {/* Total Trades Today */}
        <div className="space-y-1.5 p-3 rounded-lg bg-gradient-to-br from-blue-900/20 to-indigo-900/10 border border-blue-800/30">
          <div className="flex items-center justify-center gap-2 text-sm text-blue-400 font-medium">
            <span>🔄</span>
            <span>今日交易</span>
          </div>
          <p className="text-2xl font-bold text-white">
            {formatK(stats.totalTrades)}
          </p>
          <p className="text-xs text-gray-500">笔数统计</p>
        </div>

        {/* Total Volume Today */}
        <div className="space-y-1.5 p-3 rounded-lg bg-gradient-to-br from-purple-900/20 to-pink-900/10 border border-purple-800/30">
          <div className="flex items-center justify-center gap-2 text-sm text-purple-400 font-medium">
            <span>💰</span>
            <span>交易金额</span>
          </div>
          <p className="text-xl md:text-2xl font-bold text-[#f6b938]">
            {formatNumber(stats.totalVolume)}
          </p>
          <p className="text-xs text-gray-500">今日累计</p>
        </div>

        {/* New Listings */}
        <div className="space-y-1.5 p-3 rounded-lg bg-gradient-to-br from-orange-900/20 to-yellow-900/10 border border-orange-800/30">
          <div className="flex items-center justify-center gap-2 text-sm text-orange-400 font-medium">
            <span>🆕</span>
            <span>新增商品</span>
          </div>
          <p className="text-2xl font-bold text-white">
            {formatK(stats.newListings)}
          </p>
          <p className="text-xs text-gray-500">新鲜上架</p>
        </div>
      </div>

      {/* Real-time Indicator */}
      <div className="mt-3 pt-3 border-t border-gray-700/50 flex items-center justify-between text-xs text-gray-500">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 bg-green-400 rounded-full animate-ping"></span>
          <span>数据实时同步 • 每 3 秒更新</span>
        </div>
        <button 
          onClick={() => {}}
          className="text-gray-600 hover:text-[#f6b938] transition-colors"
          title="刷新数据"
        >
          🔄
        </button>
      </div>
    </div>
  );
};

export default RealTimeStats;
