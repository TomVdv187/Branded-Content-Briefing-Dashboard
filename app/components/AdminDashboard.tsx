'use client';

import React, { useState, useEffect } from 'react';
import { Shield, Users, Activity, Eye, Clock, Globe, UserCheck, UserPlus, BarChart3, X, Filter } from 'lucide-react';

interface UserActivity {
  userId: string;
  email: string;
  name: string;
  plan: 'free' | 'professional' | 'enterprise';
  action: 'signup' | 'login' | 'logout';
  timestamp: string;
  ipAddress: string;
  userAgent: string;
}

interface AdminDashboardProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AdminDashboard({ isOpen, onClose }: AdminDashboardProps) {
  const [activities, setActivities] = useState<UserActivity[]>([]);
  const [filter, setFilter] = useState<'all' | 'signup' | 'login'>('all');
  const [stats, setStats] = useState({
    totalUsers: 0,
    todaySignups: 0,
    todayLogins: 0,
    planBreakdown: { free: 0, professional: 0, enterprise: 0 }
  });

  useEffect(() => {
    if (isOpen) {
      loadAdminData();
    }
  }, [isOpen]);

  const loadAdminData = () => {
    // Load activity data
    const activityData = JSON.parse(localStorage.getItem('contentcraft_admin_activity') || '[]');
    setActivities(activityData);

    // Calculate stats
    const today = new Date().toDateString();
    const uniqueUsers = new Set();
    let todaySignups = 0;
    let todayLogins = 0;
    const planCounts = { free: 0, professional: 0, enterprise: 0 };

    activityData.forEach((activity: UserActivity) => {
      uniqueUsers.add(activity.userId);
      const activityDate = new Date(activity.timestamp).toDateString();
      
      if (activityDate === today) {
        if (activity.action === 'signup') todaySignups++;
        if (activity.action === 'login') todayLogins++;
      }

      // Count unique users per plan (latest activity determines current plan)
      const userActivities = activityData.filter((a: UserActivity) => a.userId === activity.userId);
      const latestActivity = userActivities[0]; // Activities are stored with newest first
      if (latestActivity.userId === activity.userId) {
        planCounts[latestActivity.plan as keyof typeof planCounts]++;
      }
    });

    // Adjust for unique users per plan
    const uniquePlanCounts = { free: 0, professional: 0, enterprise: 0 };
    const userPlans = new Map();
    
    activityData.forEach((activity: UserActivity) => {
      if (!userPlans.has(activity.userId)) {
        userPlans.set(activity.userId, activity.plan);
        uniquePlanCounts[activity.plan as keyof typeof uniquePlanCounts]++;
      }
    });

    setStats({
      totalUsers: uniqueUsers.size,
      todaySignups,
      todayLogins,
      planBreakdown: uniquePlanCounts
    });
  };

  const filteredActivities = activities.filter(activity => 
    filter === 'all' || activity.action === filter
  );

  const formatDate = (timestamp: string) => {
    return new Date(timestamp).toLocaleString();
  };

  const getActionIcon = (action: string) => {
    switch (action) {
      case 'signup': return <UserPlus className="text-green-400" size={16} />;
      case 'login': return <UserCheck className="text-blue-400" size={16} />;
      default: return <Activity className="text-slate-400" size={16} />;
    }
  };

  const getPlanColor = (plan: string) => {
    switch (plan) {
      case 'enterprise': return 'text-purple-400 bg-purple-500/10 border-purple-500/30';
      case 'professional': return 'text-blue-400 bg-blue-500/10 border-blue-500/30';
      default: return 'text-slate-400 bg-slate-500/10 border-slate-500/30';
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-slate-800/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-slate-600/40 w-full max-w-6xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-orange-600/20 to-red-600/20 backdrop-blur-sm text-white p-6 border-b border-slate-600/40">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-orange-500/20 rounded-xl flex items-center justify-center">
                <Shield className="text-orange-400" size={28} />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">Admin Dashboard</h2>
                <p className="text-orange-200">User Activity & Analytics</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-white transition-colors p-2 rounded-lg hover:bg-white/10"
            >
              <X size={24} />
            </button>
          </div>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          {/* Stats Cards */}
          <div className="grid md:grid-cols-4 gap-4 mb-8">
            <div className="bg-slate-700/50 rounded-xl p-4 border border-slate-600/30">
              <div className="flex items-center space-x-3">
                <Users className="text-blue-400" size={24} />
                <div>
                  <p className="text-slate-400 text-sm">Total Users</p>
                  <p className="text-2xl font-bold text-white">{stats.totalUsers}</p>
                </div>
              </div>
            </div>

            <div className="bg-slate-700/50 rounded-xl p-4 border border-slate-600/30">
              <div className="flex items-center space-x-3">
                <UserPlus className="text-green-400" size={24} />
                <div>
                  <p className="text-slate-400 text-sm">Today's Signups</p>
                  <p className="text-2xl font-bold text-white">{stats.todaySignups}</p>
                </div>
              </div>
            </div>

            <div className="bg-slate-700/50 rounded-xl p-4 border border-slate-600/30">
              <div className="flex items-center space-x-3">
                <UserCheck className="text-blue-400" size={24} />
                <div>
                  <p className="text-slate-400 text-sm">Today's Logins</p>
                  <p className="text-2xl font-bold text-white">{stats.todayLogins}</p>
                </div>
              </div>
            </div>

            <div className="bg-slate-700/50 rounded-xl p-4 border border-slate-600/30">
              <div className="flex items-center space-x-3">
                <BarChart3 className="text-purple-400" size={24} />
                <div>
                  <p className="text-slate-400 text-sm">Total Activities</p>
                  <p className="text-2xl font-bold text-white">{activities.length}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Plan Breakdown */}
          <div className="bg-slate-700/50 rounded-xl p-6 border border-slate-600/30 mb-8">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
              <BarChart3 className="mr-2 text-blue-400" size={20} />
              Plan Distribution
            </h3>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-slate-400 mb-1">{stats.planBreakdown.free}</div>
                <div className="text-sm text-slate-400">Free Plan</div>
                <div className="w-full bg-slate-600/50 rounded-full h-2 mt-2">
                  <div 
                    className="bg-slate-400 h-2 rounded-full" 
                    style={{ width: `${stats.totalUsers ? (stats.planBreakdown.free / stats.totalUsers) * 100 : 0}%` }}
                  ></div>
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-400 mb-1">{stats.planBreakdown.professional}</div>
                <div className="text-sm text-slate-400">Professional</div>
                <div className="w-full bg-slate-600/50 rounded-full h-2 mt-2">
                  <div 
                    className="bg-blue-400 h-2 rounded-full" 
                    style={{ width: `${stats.totalUsers ? (stats.planBreakdown.professional / stats.totalUsers) * 100 : 0}%` }}
                  ></div>
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-400 mb-1">{stats.planBreakdown.enterprise}</div>
                <div className="text-sm text-slate-400">Enterprise</div>
                <div className="w-full bg-slate-600/50 rounded-full h-2 mt-2">
                  <div 
                    className="bg-purple-400 h-2 rounded-full" 
                    style={{ width: `${stats.totalUsers ? (stats.planBreakdown.enterprise / stats.totalUsers) * 100 : 0}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>

          {/* Activity Filter */}
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white flex items-center">
              <Activity className="mr-2 text-green-400" size={20} />
              Recent Activity
            </h3>
            <div className="flex items-center space-x-2">
              <Filter className="text-slate-400" size={16} />
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value as any)}
                className="bg-slate-700/80 border border-slate-600/40 rounded-lg px-3 py-1 text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                <option value="all">All Activities</option>
                <option value="signup">Signups Only</option>
                <option value="login">Logins Only</option>
              </select>
            </div>
          </div>

          {/* Activity List */}
          <div className="bg-slate-700/50 rounded-xl border border-slate-600/30 overflow-hidden">
            <div className="max-h-96 overflow-y-auto">
              {filteredActivities.length === 0 ? (
                <div className="p-8 text-center text-slate-400">
                  <Activity size={48} className="mx-auto mb-4 opacity-50" />
                  <p>No activity data available</p>
                  <p className="text-sm mt-1">User activities will appear here once users sign up or log in</p>
                </div>
              ) : (
                filteredActivities.map((activity, index) => (
                  <div key={index} className={`p-4 border-b border-slate-600/30 ${index === filteredActivities.length - 1 ? 'border-b-0' : ''}`}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        {getActionIcon(activity.action)}
                        <div>
                          <div className="flex items-center space-x-2">
                            <span className="font-medium text-white">{activity.name}</span>
                            <span className="text-slate-400 text-sm">({activity.email})</span>
                            <span className={`px-2 py-1 text-xs rounded-full border ${getPlanColor(activity.plan)}`}>
                              {activity.plan}
                            </span>
                          </div>
                          <div className="flex items-center space-x-4 mt-1 text-sm text-slate-400">
                            <span className="flex items-center space-x-1">
                              <Clock size={12} />
                              <span>{formatDate(activity.timestamp)}</span>
                            </span>
                            <span className="flex items-center space-x-1">
                              <Globe size={12} />
                              <span>{activity.ipAddress}</span>
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className={`px-2 py-1 text-xs rounded-full font-medium ${
                          activity.action === 'signup' 
                            ? 'bg-green-500/20 text-green-300 border border-green-500/30' 
                            : 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                        }`}>
                          {activity.action}
                        </span>
                      </div>
                    </div>
                    
                    {/* User Agent (collapsed by default) */}
                    <details className="mt-2">
                      <summary className="text-xs text-slate-500 cursor-pointer hover:text-slate-400">
                        View User Agent
                      </summary>
                      <p className="text-xs text-slate-500 mt-1 font-mono bg-slate-800/50 p-2 rounded">
                        {activity.userAgent}
                      </p>
                    </details>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Admin Notes */}
          <div className="mt-6 p-4 bg-orange-500/10 rounded-xl border border-orange-500/30">
            <h4 className="text-orange-300 font-semibold mb-2 flex items-center">
              <Shield size={16} className="mr-2" />
              Admin Notes
            </h4>
            <div className="text-sm text-orange-200 space-y-1">
              <p>• Activity data is stored locally for demo purposes</p>
              <p>• In production, this would be connected to your backend analytics</p>
              <p>• Welcome emails are automatically sent to new signups</p>
              <p>• User plans can be upgraded through the payment system</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}