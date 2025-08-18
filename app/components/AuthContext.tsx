'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

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
    const savedUser = localStorage.getItem('storyforge_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulate API call - replace with real authentication
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Demo users for different plans
    const demoUsers: Record<string, User> = {
      'demo@storyforge.com': {
        id: '1',
        email: 'demo@storyforge.com',
        name: 'Demo User',
        plan: 'professional'
      },
      'free@storyforge.com': {
        id: '2',
        email: 'free@storyforge.com',
        name: 'Free User',
        plan: 'free'
      },
      'enterprise@storyforge.com': {
        id: '3',
        email: 'enterprise@storyforge.com',
        name: 'Enterprise User',
        plan: 'enterprise'
      }
    };

    const foundUser = demoUsers[email];
    if (foundUser && password === 'demo123') {
      setUser(foundUser);
      localStorage.setItem('storyforge_user', JSON.stringify(foundUser));
      setIsLoading(false);
      return true;
    }
    
    setIsLoading(false);
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('storyforge_user');
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