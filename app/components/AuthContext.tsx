'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useSubscription } from '../hooks/useSubscription';

interface User {
  id: string;
  email: string;
  name: string;
  plan: 'free' | 'professional' | 'enterprise';
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is already logged in (from localStorage)
    const savedUser = localStorage.getItem('contentcraft_user'); // Updated key
    const savedSubscription = localStorage.getItem('contentcraft_subscription');
    
    if (savedUser) {
      let userData = JSON.parse(savedUser);
      
      // Sync user plan with subscription if available
      if (savedSubscription) {
        try {
          const subscription = JSON.parse(savedSubscription);
          if (subscription.status === 'active' && subscription.plan !== userData.plan) {
            userData.plan = subscription.plan;
            localStorage.setItem('contentcraft_user', JSON.stringify(userData));
          }
        } catch (error) {
          console.error('Error parsing subscription:', error);
        }
      }
      
      setUser(userData);
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulate API call - replace with real authentication
    await new Promise(resolve => setTimeout(resolve, 1200));
    
    // For demo purposes, accept any non-empty email/password combination
    // In production, this would make a real API call to authenticate
    if (email.trim() && password.trim()) {
      // Extract name from email (before @)
      const name = email.split('@')[0]
        .split('.')
        .map(part => part.charAt(0).toUpperCase() + part.slice(1))
        .join(' ');
      
      // Determine plan based on email domain or default to professional
      let plan: 'free' | 'professional' | 'enterprise' = 'professional';
      if (email.toLowerCase().includes('enterprise') || email.toLowerCase().includes('business')) {
        plan = 'enterprise';
      } else if (email.toLowerCase().includes('free') || email.toLowerCase().includes('trial')) {
        plan = 'free';
      }

      const user: User = {
        id: Math.random().toString(36).substr(2, 9),
        email: email.trim(),
        name,
        plan
      };

      setUser(user);
      localStorage.setItem('contentcraft_user', JSON.stringify(user));
      setIsLoading(false);
      return true;
    }
    
    setIsLoading(false);
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('contentcraft_user');
    // Note: We keep subscription data in case user logs back in
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}