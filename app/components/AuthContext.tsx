'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useSubscription } from '../hooks/useSubscription';
import { emailService } from '../services/emailService';

interface User {
  id: string;
  email: string;
  name: string;
  plan: 'free' | 'professional' | 'enterprise';
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, isNewUser?: boolean) => Promise<boolean>;
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

  const login = async (email: string, password: string, isNewUser = false): Promise<boolean> => {
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

      // Log user activity for admin monitoring
      const userActivity = {
        userId: user.id,
        email: user.email,
        name: user.name,
        plan: user.plan,
        action: isNewUser ? 'signup' : 'login',
        timestamp: new Date().toISOString(),
        ipAddress: 'N/A', // Would be populated by server in production
        userAgent: navigator.userAgent
      };

      // Store activity in localStorage (in production, send to server)
      const existingActivity = JSON.parse(localStorage.getItem('contentcraft_admin_activity') || '[]');
      existingActivity.unshift(userActivity); // Add to beginning
      
      // Keep only last 100 activities for demo
      if (existingActivity.length > 100) {
        existingActivity.splice(100);
      }
      
      localStorage.setItem('contentcraft_admin_activity', JSON.stringify(existingActivity));

      // Send welcome email for new users
      if (isNewUser) {
        try {
          await emailService.sendWelcomeEmail({
            userName: name,
            userEmail: email.trim(),
            planName: plan.charAt(0).toUpperCase() + plan.slice(1),
            loginUrl: window.location.origin
          });
          console.log('✅ Welcome email sent successfully to:', email);
        } catch (error) {
          console.error('❌ Failed to send welcome email:', error);
          // Don't block login if email fails
        }
      }

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