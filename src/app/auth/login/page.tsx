'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useAuth } from '@/hooks/useAuth';

export const AuthContext = React.createContext<{ 
  user: any; login: any; register: any; logout: any, isLoading: boolean; isAuthenticated: boolean
}>({} as any);

/**
 * Login Page — User Authentication Entry
 */
const LoginPage: React.FC = () => {
  const [username, setUsername] = useState('CSCollector');
  const [password, setPassword] = useState('123456');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const [{ }, { login }] = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await login(username, password);
      // Redirect handled in hook
    } catch (err: any) {
      setError(err.message || '登录失败，请检查账号密码');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#0d0d0d] flex flex-col">
      {/* Navigation */}
      <Header />

      {/* Login Form Container */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          {/* Logo Section */}
          <div className="text-center mb-8">
            <h1 
              className="text-4xl font-bold bg-gradient-to-r from-[#f6b938] to-orange-500 bg-clip-text text-transparent"
              style={{ WebkitBackgroundClip: 'text' }}
            >
              BUFF TRADE
            </h1>
            <p className="text-gray-400 mt-2">登录交易平台，开始你的 CS 皮肤之旅 🛡️</p>
          </div>

          {/* Login Card */}
          <div className="bg-[#1a1c23] rounded-xl border border-gray-800 p-8 shadow-2xl">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Username Input */}
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-400 mb-2">
                  用户名
                </label>
                <input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="输入用户名（测试账号：CSCollector）"  
                  className="w-full bg-[#181b24] border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-[#f6b938] focus:ring-1 focus:ring-[#f6b938] outline-none transition-all"
                  required
                />
              </div>

              {/* Password Input */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-400 mb-2">
                  密码
                </label>
                <input
                  id="password"
                  type="password"  
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="输入密码（测试密码：123456）"
                  className="w-full bg-[#181b24] border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-[#f6b938] outline-none transition-all"
                  required
                />

                {/* Demo Credentials Hint */}
                <p className="text-xs text-gray-500 mt-2 flex items-start gap-1">
                  <span>💡 测试账号：CSCollector / 123456</span>
                </p>
              </div>

              {/* Error Message */}  
              {error && (
                <div className="bg-red-900/20 border border-red-800 rounded-lg p-3 text-sm text-red-400">
                  ⚠️ {error}
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className={`w-full py-3.5 px-6 rounded-lg font-bold text-white transition-all duration-200 
                  ${loading ? 'bg-gray-700 cursor-not-allowed' : 'bg-gradient-to-r from-[#f6b938] to-yellow-700 hover:from-yellow-500 hover:to-yellow-600'}
                `}
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    登录中...
                  </span>
                ) : (
                  '立即登录 👉'
                )}
              </button>

              {/* Social Login (Mock) */}
              <div className="flex items-center justify-between text-sm">
                <button type="button" className="text-gray-400 hover:text-[#f6b938] transition-colors flex items-center gap-1">
                  🟢 QQ 登录
                </button>
                <span className="text-gray-700">|</span>
                <Link href="/register" className="text-[#f6b938] hover:underline transition-all">
                  创建新账户 👈
                </Link>
              </div>
            </form>
          </div>

          {/* Footer Links */}
          <div className="mt-6 text-center text-xs text-gray-500 space-y-1">
            <p>登录即表示同意我们的</p>  
            <div className="flex items-center justify-center gap-4">
              <Link href="/terms" className="hover:text-[#f6b938] transition-colors">服务条款</Link>
              <span>|</span>
              <Link href="/privacy" className="hover:text-[#f6b938] transition-colors">隐私政策</Link>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}  
      <Footer />
    </main>
  );
};

export default LoginPage;
