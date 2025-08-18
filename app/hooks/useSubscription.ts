'use client';

import { useState, useEffect } from 'react';
import { emailService } from '../services/emailService';

export interface Subscription {
  plan: 'free' | 'professional' | 'enterprise';
  status: 'active' | 'inactive' | 'expired';
  paymentMethod?: 'card' | 'crypto';
  startDate?: string;
  nextBillingDate?: string;
  transactionId?: string;
}

export function useSubscription() {
  const [subscription, setSubscription] = useState<Subscription>({
    plan: 'free',
    status: 'active'
  });

  useEffect(() => {
    // Load subscription from localStorage on mount
    const stored = localStorage.getItem('contentcraft_subscription');
    if (stored) {
      try {
        const parsedSubscription = JSON.parse(stored);
        setSubscription(parsedSubscription);
      } catch (error) {
        console.error('Error parsing stored subscription:', error);
      }
    }
  }, []);

  const upgradeSubscription = async (
    plan: 'professional' | 'enterprise',
    paymentMethod: 'card' | 'crypto',
    transactionId?: string,
    userInfo?: { userName: string; userEmail: string }
  ) => {
    const now = new Date();
    const nextBilling = new Date();
    nextBilling.setMonth(nextBilling.getMonth() + 1);

    const newSubscription: Subscription = {
      plan,
      status: 'active',
      paymentMethod,
      startDate: now.toISOString(),
      nextBillingDate: nextBilling.toISOString(),
      transactionId: transactionId || `tx_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    };

    setSubscription(newSubscription);
    localStorage.setItem('contentcraft_subscription', JSON.stringify(newSubscription));
    
    // Send admin notification for payment
    if (userInfo) {
      try {
        await emailService.sendAdminNotification('payment', {
          userName: userInfo.userName,
          userEmail: userInfo.userEmail,
          planName: plan.charAt(0).toUpperCase() + plan.slice(1),
          transactionId: newSubscription.transactionId,
          paymentMethod
        });
        console.log('✅ Admin notification sent for payment:', userInfo.userEmail);
      } catch (error) {
        console.error('❌ Failed to send admin payment notification:', error);
      }
    }
    
    return newSubscription;
  };

  const cancelSubscription = () => {
    const updatedSubscription = {
      ...subscription,
      status: 'inactive' as const
    };
    
    setSubscription(updatedSubscription);
    localStorage.setItem('contentcraft_subscription', JSON.stringify(updatedSubscription));
  };

  const isActivePaidPlan = () => {
    return subscription.status === 'active' && subscription.plan !== 'free';
  };

  const getPlanLimits = () => {
    switch (subscription.plan) {
      case 'professional':
        return {
          monthlyGenerations: Infinity,
          features: ['unlimited_generation', 'all_formats', 'analytics', 'priority_support']
        };
      case 'enterprise':
        return {
          monthlyGenerations: Infinity,
          features: ['unlimited_generation', 'all_formats', 'analytics', 'priority_support', 'custom_integration', 'dedicated_support']
        };
      default:
        return {
          monthlyGenerations: 5,
          features: ['basic_generation']
        };
    }
  };

  return {
    subscription,
    upgradeSubscription,
    cancelSubscription,
    isActivePaidPlan,
    getPlanLimits
  };
}