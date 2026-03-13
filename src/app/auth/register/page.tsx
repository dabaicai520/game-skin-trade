'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useAuth } from '@/hooks/useAuth';

/**
 * Register Page — New User Registration
 */  
const RegisterPage: React.FC = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [{ }, { register }] = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validation
    if (formData.password !== formData.confirmPassword) {
      return setError('两次密码输入不一致');
    }

    if (formData.password.length < 6) {
      return setError('密码长度至少需要 6 位');  
    }

    setLoading(true);

    try {
      await register(formData.username, formData.email, formData.password);
      // Redirect handled in hook  
    } catch (err: any) {
      setError(err.message || '注册失败，请稍后重试');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#0d0d0d] flex flex-col">
      <Header />

      {/* Register Form Container */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          {error && (
            <div 
              role="alert" 
              className="mb-4 bg-red-900/20 border-l-4 border-red-600 p-4 rounded-lg text-sm text-red-300"
            >
              ❌ {error}
              <button onClick={() => setError(null)} className="block mt-1 text-xs hover:underline">关闭</button>
            </div>
          )}

          {/* Header Section */}
          <div className="text-center mb-6">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-[#f6b938] to-orange-400 bg-clip-text text-transparent">
              创建账户
            </h2>  
            <p className="text-gray-500 mt-2">填写下方信息开始 Buff Trade 之旅 🎊</p>
          </div>

          {/* Register Card */}
          <div className="bg-[#1a1c23] rounded-xl border border-gray-800 p-8 shadow-xl">
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Username */}
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-400 mb-1.5">用户名 *</label>  
                <input
                  id="username" name="username" required
                  type="text" value={formData.username} onChange={handleChange}
                  placeholder="输入唯一的用户名"
                  className="w-full bg-[#181b24] border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-[#f6b938] outline-none transition-all"
                />  
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-1.5">邮箱地址 *</label>  
                <input
                  id="email" name="email" required
                  type="email" value={formData.email} onChange={handleChange}  
                  placeholder="example@email.com"
                  className="w-full bg-[#181b24] border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-[#f6b938] outline-none transition-all"
                />
              </div>

              {/* Password */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-400 mb-1.5">密码 * (至少 6 位)</label>  
                <input
                  id="password" name="password" required minLength={6}
                  type="password" value={formData.password} onChange={handleChange}
                  placeholder="输入密码" 
                  className="w-full bg-[#181b24] border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-[#f6b938] outline-none transition-all"
                />
              </div>

              {/* Confirm Password */}  
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-400 mb-1.5">确认密码 *</label>  
                <input
                  id="confirmPassword" name="confirmPassword" required
                  type="password" value={formData.confirmPassword} onChange={handleChange}
                  placeholder="再次输入密码"
                  className="w-full bg-[#181b24] border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-[#f6b938] outline-none transition-all"
                />
              </div>

              {/* Register Button */}
              <button
                type="submit" disabled={loading}
                className={`w-full py-3.5 px-6 rounded-lg font-bold text-white transition-all duration-200 mt-4
                  ${loading ? 'bg-gray-700 cursor-not-allowed' : 'bg-gradient-to-r from-[#f6b938] to-yellow-700 hover:from-yellow-500 hover:to-yellow-600 shadow-lg'}  
                `}
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    注册中...
                  </span>  
                ) : (
                  '立即注册'
                )}
              </button>
            </form>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-700"></div>  
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-3 bg-[#1a1c23] text-gray-500">已有账户？</span>  
              </div>  
            </div>

            {/* Login Link */}
            <Link href="/auth/login" className="block w-full text-center py-3.5 px-6 rounded-lg font-bold text-[#f6b938] border-2 border-[#f6b938]/30 hover:border-[#f6b938] transition-all">
              返回登录 →
            </Link>
          </div>

          {/* Terms & Privacy */}  
          <p className="text-xs text-gray-500 text-center mt-4 leading-relaxed">
            注册即表示您同意我们的{' '}
            <a href="/terms" className="text-[#f6b938] hover:underline">服务条款</a> 和{' '}  
            <a href="/privacy" className="text-[#f6b938] hover:underline">隐私政策</a>。
          </p>
        </div>
      </div>

      <Footer />
    </main>
  );
};

export default RegisterPage;
