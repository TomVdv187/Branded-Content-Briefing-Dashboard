'use client';

import React, { useState, useEffect } from 'react';
import { BarChart3, TrendingUp, Eye, Users, DollarSign, Clock, Target, Zap } from 'lucide-react';

interface PerformanceMetrics {
  pageviews: number;
  engagement_rate: number;
  conversion_rate: number;
  revenue_per_mille: number;
  social_shares: number;
  avg_time_on_page: number;
  bounce_rate: number;
  seo_score: number;
}

interface AnalyticsProps {
  contentId?: string;
  isVisible: boolean;
}

export default function PerformanceAnalytics({ contentId, isVisible }: AnalyticsProps) {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    pageviews: 0,
    engagement_rate: 0,
    conversion_rate: 0,
    revenue_per_mille: 0,
    social_shares: 0,
    avg_time_on_page: 0,
    bounce_rate: 0,
    seo_score: 0
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [timeframe, setTimeframe] = useState<'24h' | '7d' | '30d'>('24h');

  useEffect(() => {
    if (isVisible && contentId) {
      simulateMetricsLoad();
    }
  }, [isVisible, contentId, timeframe]);

  const simulateMetricsLoad = () => {
    setIsLoading(true);
    
    // Simulate API call for real metrics
    setTimeout(() => {
      const mockMetrics: PerformanceMetrics = {
        pageviews: Math.floor(Math.random() * 150000) + 25000,
        engagement_rate: Math.floor(Math.random() * 40) + 45, // 45-85%
        conversion_rate: Math.floor(Math.random() * 8) + 2, // 2-10%
        revenue_per_mille: Math.floor(Math.random() * 15) + 8, // $8-23 RPM
        social_shares: Math.floor(Math.random() * 5000) + 1500,
        avg_time_on_page: Math.floor(Math.random() * 180) + 120, // 2-5 minutes
        bounce_rate: Math.floor(Math.random() * 25) + 25, // 25-50%
        seo_score: Math.floor(Math.random() * 15) + 85 // 85-100
      };
      
      setMetrics(mockMetrics);
      setIsLoading(false);
    }, 1500);
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getPerformanceStatus = (metric: string, value: number) => {
    const thresholds = {
      pageviews: { excellent: 100000, good: 50000, poor: 10000 },
      engagement_rate: { excellent: 70, good: 50, poor: 30 },
      conversion_rate: { excellent: 5, good: 3, poor: 1 },
      revenue_per_mille: { excellent: 15, good: 10, poor: 5 },
      seo_score: { excellent: 90, good: 75, poor: 60 }
    };

    const threshold = thresholds[metric as keyof typeof thresholds];
    if (!threshold) return 'neutral';

    if (value >= threshold.excellent) return 'excellent';
    if (value >= threshold.good) return 'good';
    if (value >= threshold.poor) return 'fair';
    return 'poor';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'excellent': return 'text-green-600 bg-green-50 border-green-200';
      case 'good': return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'fair': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'poor': return 'text-red-600 bg-red-50 border-red-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  if (!isVisible) return null;

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <BarChart3 className="text-blue-600" size={24} />
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Performance Analytics</h3>
            <p className="text-sm text-gray-500">Real-time content performance metrics</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <select
            value={timeframe}
            onChange={(e) => setTimeframe(e.target.value as typeof timeframe)}
            className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="24h">Last 24 hours</option>
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
          </select>
        </div>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Array(8).fill(0).map((_, i) => (
            <div key={i} className="bg-gray-50 rounded-lg p-4 animate-pulse">
              <div className="h-4 bg-gray-200 rounded mb-2"></div>
              <div className="h-6 bg-gray-200 rounded mb-1"></div>
              <div className="h-3 bg-gray-200 rounded"></div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {/* Pageviews */}
          <div className={`border rounded-lg p-4 ${getStatusColor(getPerformanceStatus('pageviews', metrics.pageviews))}`}>
            <div className="flex items-center justify-between mb-2">
              <Eye size={20} className="opacity-75" />
              <span className="text-xs font-medium uppercase tracking-wide">
                {getPerformanceStatus('pageviews', metrics.pageviews)}
              </span>
            </div>
            <div className="text-2xl font-bold mb-1">{formatNumber(metrics.pageviews)}</div>
            <div className="text-sm opacity-75">Pageviews</div>
          </div>

          {/* Engagement Rate */}
          <div className={`border rounded-lg p-4 ${getStatusColor(getPerformanceStatus('engagement_rate', metrics.engagement_rate))}`}>
            <div className="flex items-center justify-between mb-2">
              <Users size={20} className="opacity-75" />
              <span className="text-xs font-medium uppercase tracking-wide">
                {getPerformanceStatus('engagement_rate', metrics.engagement_rate)}
              </span>
            </div>
            <div className="text-2xl font-bold mb-1">{metrics.engagement_rate}%</div>
            <div className="text-sm opacity-75">Engagement</div>
          </div>

          {/* Revenue Per Mille */}
          <div className={`border rounded-lg p-4 ${getStatusColor(getPerformanceStatus('revenue_per_mille', metrics.revenue_per_mille))}`}>
            <div className="flex items-center justify-between mb-2">
              <DollarSign size={20} className="opacity-75" />
              <span className="text-xs font-medium uppercase tracking-wide">
                {getPerformanceStatus('revenue_per_mille', metrics.revenue_per_mille)}
              </span>
            </div>
            <div className="text-2xl font-bold mb-1">${metrics.revenue_per_mille}</div>
            <div className="text-sm opacity-75">RPM</div>
          </div>

          {/* SEO Score */}
          <div className={`border rounded-lg p-4 ${getStatusColor(getPerformanceStatus('seo_score', metrics.seo_score))}`}>
            <div className="flex items-center justify-between mb-2">
              <Target size={20} className="opacity-75" />
              <span className="text-xs font-medium uppercase tracking-wide">
                {getPerformanceStatus('seo_score', metrics.seo_score)}
              </span>
            </div>
            <div className="text-2xl font-bold mb-1">{metrics.seo_score}</div>
            <div className="text-sm opacity-75">SEO Score</div>
          </div>

          {/* Conversion Rate */}
          <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
            <div className="flex items-center justify-between mb-2">
              <Zap size={20} className="text-gray-600" />
              <TrendingUp size={14} className="text-green-500" />
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">{metrics.conversion_rate.toFixed(1)}%</div>
            <div className="text-sm text-gray-600">Conversion</div>
          </div>

          {/* Social Shares */}
          <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
            <div className="flex items-center justify-between mb-2">
              <Users size={20} className="text-gray-600" />
              <TrendingUp size={14} className="text-blue-500" />
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">{formatNumber(metrics.social_shares)}</div>
            <div className="text-sm text-gray-600">Shares</div>
          </div>

          {/* Time on Page */}
          <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
            <div className="flex items-center justify-between mb-2">
              <Clock size={20} className="text-gray-600" />
              <TrendingUp size={14} className="text-purple-500" />
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">{formatTime(metrics.avg_time_on_page)}</div>
            <div className="text-sm text-gray-600">Avg. Time</div>
          </div>

          {/* Bounce Rate */}
          <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
            <div className="flex items-center justify-between mb-2">
              <Target size={20} className="text-gray-600" />
              <div className="text-xs text-gray-500">BOUNCE</div>
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">{metrics.bounce_rate}%</div>
            <div className="text-sm text-gray-600">Bounce Rate</div>
          </div>
        </div>
      )}

      {/* Performance Insights */}
      <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
        <h4 className="font-semibold text-blue-900 mb-2">AI Performance Insights</h4>
        <div className="space-y-2 text-sm text-blue-800">
          {metrics.pageviews > 75000 && (
            <div className="flex items-center space-x-2">
              <TrendingUp size={14} className="text-green-600" />
              <span>Excellent traffic performance - consider expanding similar content</span>
            </div>
          )}
          {metrics.engagement_rate > 65 && (
            <div className="flex items-center space-x-2">
              <Users size={14} className="text-green-600" />
              <span>High engagement - optimize for social sharing to amplify reach</span>
            </div>
          )}
          {metrics.revenue_per_mille > 12 && (
            <div className="flex items-center space-x-2">
              <DollarSign size={14} className="text-green-600" />
              <span>Strong monetization - consider premium placement strategies</span>
            </div>
          )}
          {metrics.seo_score > 90 && (
            <div className="flex items-center space-x-2">
              <Target size={14} className="text-green-600" />
              <span>Outstanding SEO optimization - track keyword rankings for scaling</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}