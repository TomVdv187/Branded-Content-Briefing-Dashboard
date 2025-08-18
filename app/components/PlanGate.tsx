'use client';

import { ReactNode } from 'react';
import { useAuth } from './AuthContext';
import { Crown, Zap, Lock } from 'lucide-react';

interface PlanGateProps {
  requiredPlan: 'free' | 'professional' | 'enterprise';
  children: ReactNode;
  fallback?: ReactNode;
  feature?: string;
}

const planHierarchy = {
  'free': 1,
  'professional': 2,
  'enterprise': 3
};

export default function PlanGate({ requiredPlan, children, fallback, feature }: PlanGateProps) {
  const { user, isAdmin } = useAuth();
  
  if (!user) {
    return null;
  }

  // ADMIN OVERRIDE: Admins have access to all features regardless of plan
  if (isAdmin()) {
    console.log('🔓 Admin access granted - bypassing plan restrictions for:', feature || 'feature');
    return <>{children}</>;
  }

  const userPlanLevel = planHierarchy[user.plan];
  const requiredPlanLevel = planHierarchy[requiredPlan];
  
  // If user has the required plan or higher, show content
  if (userPlanLevel >= requiredPlanLevel) {
    return <>{children}</>;
  }

  // Show fallback or upgrade prompt
  if (fallback) {
    return <>{fallback}</>;
  }

  return (
    <div className="bg-yellow-500/10 backdrop-blur-sm border border-yellow-500/30 rounded-2xl p-6 text-center">
      <div className="w-16 h-16 bg-yellow-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
        {requiredPlan === 'enterprise' ? (
          <Crown className="text-yellow-400" size={32} />
        ) : requiredPlan === 'professional' ? (
          <Zap className="text-yellow-400" size={32} />
        ) : (
          <Lock className="text-yellow-400" size={32} />
        )}
      </div>
      <h3 className="text-xl font-bold text-white mb-2">
        {requiredPlan === 'enterprise' ? 'Enterprise' : 'Professional'} Feature
      </h3>
      <p className="text-slate-300 mb-4">
        {feature || 'This feature'} requires a {requiredPlan === 'enterprise' ? 'Enterprise' : 'Professional'} plan.
      </p>
      <div className="text-slate-400 text-sm">
        <p>Your current plan: <span className="font-medium text-white capitalize">{user.plan}</span></p>
        <p className="mt-2">
          <a href="#pricing" className="text-blue-400 hover:text-blue-300 font-medium">
            Upgrade your plan →
          </a>
        </p>
      </div>
    </div>
  );
}

// Usage limits for different plans
export const PLAN_LIMITS = {
  free: {
    monthlyGenerations: 5,
    platforms: ['article'],
    analytics: false,
    exportFormats: ['txt'],
    seoOptimization: 'basic',
    support: 'email',
    customVoiceTone: false,
    apiAccess: false
  },
  professional: {
    monthlyGenerations: Infinity,
    platforms: ['article', 'facebook', 'instagram', 'linkedin', 'newsletter', 'tiktok'],
    analytics: true,
    exportFormats: ['txt', 'md', 'docx', 'pdf'],
    seoOptimization: 'advanced',
    support: 'priority',
    customVoiceTone: true,
    apiAccess: false
  },
  enterprise: {
    monthlyGenerations: Infinity,
    platforms: ['article', 'facebook', 'instagram', 'linkedin', 'newsletter', 'tiktok', 'youtube'],
    analytics: true,
    exportFormats: ['txt', 'md', 'docx', 'pdf', 'html', 'json'],
    seoOptimization: 'enterprise',
    support: 'dedicated',
    customVoiceTone: true,
    apiAccess: true,
    whiteLabel: true,
    customIntegrations: true
  }
};

export function getPlanLimits(plan: 'free' | 'professional' | 'enterprise') {
  return PLAN_LIMITS[plan];
}