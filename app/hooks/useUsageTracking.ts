'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '../components/AuthContext';
import { PLAN_LIMITS } from '../components/PlanGate';

interface UsageData {
  monthlyGenerations: number;
  lastResetDate: string;
}

export function useUsageTracking() {
  const { user } = useAuth();
  const [usage, setUsage] = useState<UsageData>({
    monthlyGenerations: 0,
    lastResetDate: new Date().toISOString()
  });

  useEffect(() => {
    if (user) {
      // Load usage from localStorage
      const storageKey = `contentcraft_usage_${user.id}`;
      const storedUsage = localStorage.getItem(storageKey);
      
      if (storedUsage) {
        const parsedUsage = JSON.parse(storedUsage);
        
        // Check if we need to reset monthly count
        const lastReset = new Date(parsedUsage.lastResetDate);
        const now = new Date();
        const daysSinceReset = (now.getTime() - lastReset.getTime()) / (1000 * 60 * 60 * 24);
        
        if (daysSinceReset >= 30) {
          // Reset monthly count
          const resetUsage = {
            monthlyGenerations: 0,
            lastResetDate: now.toISOString()
          };
          setUsage(resetUsage);
          localStorage.setItem(storageKey, JSON.stringify(resetUsage));
        } else {
          setUsage(parsedUsage);
        }
      }
    }
  }, [user]);

  const incrementUsage = () => {
    if (!user) return;
    
    const newUsage = {
      ...usage,
      monthlyGenerations: usage.monthlyGenerations + 1
    };
    
    setUsage(newUsage);
    localStorage.setItem(`contentcraft_usage_${user.id}`, JSON.stringify(newUsage));
  };

  const canGenerate = () => {
    if (!user) return false;
    
    const limits = PLAN_LIMITS[user.plan];
    return usage.monthlyGenerations < limits.monthlyGenerations;
  };

  const getRemainingGenerations = () => {
    if (!user) return 0;
    
    const limits = PLAN_LIMITS[user.plan];
    if (limits.monthlyGenerations === Infinity) return Infinity;
    
    return Math.max(0, limits.monthlyGenerations - usage.monthlyGenerations);
  };

  const getUsagePercentage = () => {
    if (!user) return 0;
    
    const limits = PLAN_LIMITS[user.plan];
    if (limits.monthlyGenerations === Infinity) return 0;
    
    return (usage.monthlyGenerations / limits.monthlyGenerations) * 100;
  };

  return {
    usage,
    incrementUsage,
    canGenerate,
    getRemainingGenerations,
    getUsagePercentage
  };
}