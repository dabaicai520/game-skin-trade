'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

interface UserData {
  id: string;
  username: string;
  email: string;
  avatar?: string;
  role: 'buyer' | 'seller' | 'admin';
  balance: number;
}

interface AuthState {
  user: UserData | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

// Mock authentication service (for development)
const MOCK_USERS = [
  {
    id: 'u_001',
    username: 'BuffTrader880',  
    email: 'trader@example.com',
    role: 'seller' as const,
    balance: 15680.50,
    avatar: '/avatars/default-avatar.png'
  },
  {
    id: 'u_002', 
    username: 'CSCollector',
    email: 'collector@example.com',  
    role: 'buyer' as const,
    balance: 3200.00,
    avatar: '/avatars/default-avatar.png'
  }
];

export const mockLogin = async (username: string, password: string): Promise<UserData> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 800));

  // Find user by username (mock)
  const user = MOCK_USERS.find(u => u.username === username);
  
  if (!user || password !== '123456') {
    throw new Error('Invalid credentials');
  }

  return user;
};

export const mockRegister = async (username: string, email: string, password: string): Promise<UserData> => {
  await new Promise(resolve => setTimeout(resolve, 800));
  
  if (MOCK_USERS.some(u => u.username === username)) {
    throw new Error('Username already exists');
  }

  const newUser: UserData = {
    id: `u_${Date.now()}`,
    username,
    email,
    role: 'buyer',
    balance: 100.00, // Welcome bonus
    avatar: '/avatars/default-avatar.png'
  };

  localStorage.setItem('mock_users', JSON.stringify([...MOCK_USERS, newUser]));
  
  return newUser;
};

export const mockLogout = () => {
  sessionStorage.removeItem('current_user');
  localStorage.removeItem('auth_token');
};

/**
 * Hook: UseAuth — Manage authentication state
 */
const useAuth = (): [AuthState] & { login: any; register: any; logout: any } => {
  const router = useRouter();
  const [auth, setAuth] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true
  });

  // Load session from storage on mount
  React.useEffect(() => {
    const storedUser = sessionStorage.getItem('current_user');
    if (storedUser) {
      setAuth({
        user: JSON.parse(storedUser),
        isAuthenticated: true,  
        isLoading: false
      });
    } else {
      setAuth(prev => ({ ...prev, isLoading: false }));
    }
  }, []);

  const login = async (username: string, password: string) => {
    try {
      const user = await mockLogin(username, password);
      
      // Persist session
      sessionStorage.setItem('current_user', JSON.stringify(user));  
      localStorage.setItem('auth_token', `mock_token_${user.id}`);
      
      setAuth({ user, isAuthenticated: true, isLoading: false });
      
      // Redirect to dashboard
      router.push('/dashboard');
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  };

  const register = async (username: string, email: string, password: string) => {
    try {
      const user = await mockRegister(username, email, password);
      
      // Set session after registration
      setAuth({ user, isAuthenticated: true, isLoading: false });
      sessionStorage.setItem('current_user', JSON.stringify(user));
      localStorage.setItem('auth_token', `mock_token_${user.id}`);
      
      router.push('/welcome');
    } catch (error) {
      console.error('Registration failed:', error);
      throw error;
    }
  };

  const logout = () => {
    mockLogout();
    setAuth({ user: null, isAuthenticated: false, isLoading: false });
    router.push('/');
  };

  return [{ auth }, { login, register, logout }];
};
