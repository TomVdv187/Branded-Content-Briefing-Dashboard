'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useSubscription } from '../hooks/useSubscription';
import { emailService } from '../services/emailService';

interface User {
  id: string;
  email: string;
  name: string;
  plan: 'free' | 'professional' | 'enterprise';
  role: 'user' | 'admin' | 'super_admin';
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, isNewUser?: boolean) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
  isAdmin: () => boolean;
  isSuperAdmin: () => boolean;
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
      
      // Ensure userData has all required properties
      if (!userData.role) {
        userData.role = 'user';
      }
      
      // SECURITY: Revalidate role on every app load to prevent unauthorized access
      let role: 'user' | 'admin' | 'super_admin' = 'user';
      try {
        const adminUsers = JSON.parse(localStorage.getItem('contentcraft_admin_users') || '[]');
        const adminUser = adminUsers.find((admin: any) => admin.email === userData.email.toLowerCase().trim());
        
        if (adminUser) {
          role = adminUser.role;
        } else if (userData.email.toLowerCase().trim() === 'tomvdvenne@gmail.com') {
          // Fallback: ensure primary admin always has super_admin access
          role = 'super_admin';
        }
        // If no admin user found and not primary admin, role stays 'user' (default)
      } catch (error) {
        // Fallback for primary admin if localStorage fails
        if (userData.email.toLowerCase().trim() === 'tomvdvenne@gmail.com') {
          role = 'super_admin';
        }
        // For all other users, role stays 'user' on error
      }
      
      // Always update role to current validated role
      userData.role = role;
      
      // Sync user plan with subscription if available
      if (savedSubscription) {
        try {
          const subscription = JSON.parse(savedSubscription);
          if (subscription.status === 'active' && subscription.plan !== userData.plan) {
            userData.plan = subscription.plan;
          }
        } catch (error) {
          console.error('Error parsing subscription:', error);
        }
      }
      
      // Save updated userData back to localStorage
      localStorage.setItem('contentcraft_user', JSON.stringify(userData));
      
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

      // Determine role - load from admin user management system
      let role: 'user' | 'admin' | 'super_admin' = 'user';
      
      try {
        const adminUsers = JSON.parse(localStorage.getItem('contentcraft_admin_users') || '[]');
        const adminUser = adminUsers.find((admin: any) => admin.email === email.toLowerCase().trim());
        
        if (adminUser) {
          role = adminUser.role;
        } else if (email.toLowerCase().trim() === 'tomvdvenne@gmail.com') {
          // Fallback: ensure primary admin always has super_admin access
          role = 'super_admin';
        }
      } catch (error) {
        // Fallback for primary admin if localStorage fails
        if (email.toLowerCase().trim() === 'tomvdvenne@gmail.com') {
          role = 'super_admin';
        }
      }

      const user: User = {
        id: Math.random().toString(36).substr(2, 9),
        email: email.trim(),
        name,
        plan,
        role
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
          const emailData = {
            userName: name,
            userEmail: email.trim(),
            planName: plan.charAt(0).toUpperCase() + plan.slice(1),
            loginUrl: window.location.origin
          };
          
          // Send welcome email to user
          await emailService.sendWelcomeEmail(emailData);
          console.log('✅ Welcome email sent successfully to:', email);
          
          // Send admin notification
          await emailService.sendAdminNotification('new_signup', emailData);
          console.log('✅ Admin notification sent for new signup:', email);
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

  const isAdmin = () => {
    return user?.role === 'admin' || user?.role === 'super_admin';
  };

  const isSuperAdmin = () => {
    return user?.role === 'super_admin';
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading, isAdmin, isSuperAdmin }}>
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