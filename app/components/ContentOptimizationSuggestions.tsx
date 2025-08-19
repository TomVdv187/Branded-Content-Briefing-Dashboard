'use client';

import React, { useState, useEffect } from 'react';
import { Zap, TrendingUp, Target, Brain, CheckCircle, AlertCircle, Lightbulb, Hash } from 'lucide-react';
import { GeneratedContent } from '../types';

interface OptimizationSuggestion {
  id: string;
  type: 'seo' | 'engagement' | 'conversion' | 'social';
  priority: 'high' | 'medium' | 'low';
  title: string;
  description: string;
  impact: string;
  action: string;
  applied: boolean;
}

interface OptimizationProps {
  content: GeneratedContent;
  onApplySuggestion?: (suggestionId: string, content: GeneratedContent) => void;
  isVisible: boolean;
}

export default function ContentOptimizationSuggestions({ content, onApplySuggestion, isVisible }: OptimizationProps) {
  const [suggestions, setSuggestions] = useState<OptimizationSuggestion[]>([]);
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'seo' | 'engagement' | 'conversion' | 'social'>('all');
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  useEffect(() => {
    if (isVisible && content) {
      generateOptimizationSuggestions();
    }
  }, [isVisible, content]);

  const generateOptimizationSuggestions = () => {
    setIsAnalyzing(true);
    
    // Simulate AI analysis
    setTimeout(() => {
      const newSuggestions: OptimizationSuggestion[] = [];

      // SEO Optimizations
      if (content.article && content.article.content.length < 1500) {
        newSuggestions.push({
          id: 'seo-1',
          type: 'seo',
          priority: 'high',
          title: 'Increase Content Length',
          description: 'Articles with 1,500+ words rank 73% higher in search results',
          impact: '+35% organic traffic',
          action: 'Expand sections with detailed examples and case studies',
          applied: false
        });
      }

      if (!content.article?.seo.meta_description || content.article.seo.meta_description.length < 120) {
        newSuggestions.push({
          id: 'seo-2',
          type: 'seo',
          priority: 'high',
          title: 'Optimize Meta Description',
          description: 'Meta descriptions under 120 characters reduce click-through rates',
          impact: '+12% CTR from search',
          action: 'Craft compelling 150-160 character description with target keywords',
          applied: false
        });
      }

      // Check for keyword density
      const wordCount = content.article?.content.split(' ').length || 0;
      const keywordMentions = content.article ? content.article.content.toLowerCase().split(content.article.title.toLowerCase() || '').length - 1 : 0;
      const keywordDensity = (keywordMentions / wordCount) * 100;

      if (keywordDensity < 0.5) {
        newSuggestions.push({
          id: 'seo-3',
          type: 'seo',
          priority: 'medium',
          title: 'Increase Keyword Density',
          description: `Current keyword density: ${keywordDensity.toFixed(1)}%. Optimal range: 0.5-1.5%`,
          impact: '+18% search ranking',
          action: 'Naturally incorporate target keywords 3-5 more times',
          applied: false
        });
      }

      // Engagement Optimizations
      const hasQuestions = content.article?.content.includes('?') || false;
      if (!hasQuestions) {
        newSuggestions.push({
          id: 'engagement-1',
          type: 'engagement',
          priority: 'high',
          title: 'Add Interactive Questions',
          description: 'Content with questions increases engagement by 67%',
          impact: '+45% time on page',
          action: 'Add 2-3 thought-provoking questions throughout the article',
          applied: false
        });
      }

      if (!content.article?.content.includes('•') && !content.article?.content.includes('-')) {
        newSuggestions.push({
          id: 'engagement-2',
          type: 'engagement',
          priority: 'medium',
          title: 'Add Bullet Points',
          description: 'Scannable content with bullet points improves readability',
          impact: '+28% engagement rate',
          action: 'Convert dense paragraphs to bullet-point lists',
          applied: false
        });
      }

      // Social Media Optimizations
      if (content.instagram && content.instagram.posts && !content.instagram.posts[0]?.hashtags.length) {
        newSuggestions.push({
          id: 'social-1',
          type: 'social',
          priority: 'high',
          title: 'Add Trending Hashtags',
          description: 'Posts with 5-10 relevant hashtags reach 70% more users',
          impact: '+70% social reach',
          action: 'Research and add trending hashtags for your industry',
          applied: false
        });
      }

      // Conversion Optimizations
      const hasCTA = content.article?.content.toLowerCase().includes('learn more') || 
                    content.article?.content.toLowerCase().includes('get started') ||
                    content.article?.content.toLowerCase().includes('download') ||
                    content.article?.content.toLowerCase().includes('sign up');

      if (!hasCTA) {
        newSuggestions.push({
          id: 'conversion-1',
          type: 'conversion',
          priority: 'high',
          title: 'Add Clear Call-to-Action',
          description: 'Content without CTAs has 40% lower conversion rates',
          impact: '+40% conversions',
          action: 'Add strategic CTAs in the middle and end of the article',
          applied: false
        });
      }

      // Performance-based suggestions
      newSuggestions.push({
        id: 'seo-4',
        type: 'seo',
        priority: 'medium',
        title: 'Optimize for Featured Snippets',
        description: 'Structure content to capture position zero in search results',
        impact: '+200% click-through rate',
        action: 'Add FAQ section with concise Q&A format',
        applied: false
      });

      newSuggestions.push({
        id: 'engagement-3',
        type: 'engagement',
        priority: 'low',
        title: 'Add Visual Break Points',
        description: 'Long text blocks reduce reading completion by 35%',
        impact: '+25% completion rate',
        action: 'Add subheadings every 200-300 words',
        applied: false
      });

      setSuggestions(newSuggestions);
      setIsAnalyzing(false);
    }, 2000);
  };

  const applySuggestion = (suggestionId: string) => {
    setSuggestions(prev => 
      prev.map(s => 
        s.id === suggestionId ? { ...s, applied: true } : s
      )
    );

    if (onApplySuggestion) {
      onApplySuggestion(suggestionId, content);
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'border-red-500/30 bg-red-500/10';
      case 'medium': return 'border-yellow-500/30 bg-yellow-500/10';
      case 'low': return 'border-blue-500/30 bg-blue-500/10';
      default: return 'border-slate-600/30 bg-slate-700/10';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'seo': return <Hash size={16} className="text-blue-600" />;
      case 'engagement': return <TrendingUp size={16} className="text-green-600" />;
      case 'conversion': return <Target size={16} className="text-purple-600" />;
      case 'social': return <Zap size={16} className="text-orange-600" />;
      default: return <Brain size={16} className="text-gray-600" />;
    }
  };

  const filteredSuggestions = selectedFilter === 'all' 
    ? suggestions 
    : suggestions.filter(s => s.type === selectedFilter);

  const appliedCount = suggestions.filter(s => s.applied).length;
  const totalImpactScore = suggestions.reduce((score, s) => {
    const impactMatch = s.impact.match(/\d+/);
    const impact = impactMatch ? parseInt(impactMatch[0]) : 0;
    return score + (s.applied ? impact : 0);
  }, 0);

  if (!isVisible) return null;

  return (
    <div className="bg-slate-800/90 backdrop-blur-xl rounded-xl shadow-lg border border-slate-600/30 p-6 mb-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <Brain className="text-purple-400" size={24} />
          <div>
            <h3 className="text-lg font-semibold text-white">AI Content Optimization</h3>
            <p className="text-sm text-slate-400">
              {appliedCount} of {suggestions.length} optimizations applied • +{totalImpactScore}% potential improvement
            </p>
          </div>
        </div>
        
        {/* AI Status Indicator */}
        <div className="flex items-center space-x-2 bg-green-500/10 border border-green-500/20 px-3 py-2 rounded-lg">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          <span className="text-sm text-green-300 font-medium">AI Active</span>
        </div>

        <div className="flex items-center space-x-2">
          <select
            value={selectedFilter}
            onChange={(e) => setSelectedFilter(e.target.value as typeof selectedFilter)}
            className="bg-slate-700 border border-slate-600 rounded-md px-3 py-1 text-sm text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="all">All Suggestions</option>
            <option value="seo">SEO</option>
            <option value="engagement">Engagement</option>
            <option value="conversion">Conversion</option>
            <option value="social">Social</option>
          </select>
        </div>
      </div>

      {isAnalyzing ? (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-400 mx-auto mb-4"></div>
          <p className="text-slate-300">AI is analyzing your content for optimization opportunities...</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredSuggestions.map((suggestion) => (
            <div
              key={suggestion.id}
              className={`border rounded-lg p-4 transition-all duration-200 ${
                suggestion.applied 
                  ? 'border-green-500/30 bg-green-500/10' 
                  : getPriorityColor(suggestion.priority)
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3 flex-1">
                  <div className="flex-shrink-0 mt-1">
                    {suggestion.applied ? (
                      <CheckCircle size={20} className="text-green-600" />
                    ) : (
                      getTypeIcon(suggestion.type)
                    )}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h4 className={`font-semibold ${
                        suggestion.applied ? 'text-green-800' : 'text-gray-900'
                      }`}>
                        {suggestion.title}
                      </h4>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full capitalize ${
                        suggestion.priority === 'high' ? 'bg-red-100 text-red-800' :
                        suggestion.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {suggestion.priority}
                      </span>
                      <span className="px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-700 capitalize">
                        {suggestion.type}
                      </span>
                    </div>
                    
                    <p className={`text-sm mb-2 ${
                      suggestion.applied ? 'text-green-700' : 'text-gray-600'
                    }`}>
                      {suggestion.description}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-1">
                          <TrendingUp size={14} className="text-blue-600" />
                          <span className="text-sm font-medium text-blue-600">
                            {suggestion.impact}
                          </span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Lightbulb size={14} className="text-gray-500" />
                          <span className="text-sm text-gray-600">
                            {suggestion.action}
                          </span>
                        </div>
                      </div>
                      
                      {!suggestion.applied && (
                        <button
                          onClick={() => applySuggestion(suggestion.id)}
                          className="ml-4 px-3 py-1 bg-purple-600 text-white text-sm font-medium rounded-md hover:bg-purple-700 transition-colors"
                        >
                          Apply
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
          
          {filteredSuggestions.length === 0 && !isAnalyzing && (
            <div className="text-center py-8 text-gray-500">
              <Brain size={48} className="mx-auto mb-4 opacity-50" />
              <p>No optimization suggestions found for the selected filter.</p>
            </div>
          )}
        </div>
      )}

      {/* Performance Summary */}
      {suggestions.length > 0 && (
        <div className="mt-6 p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg border border-purple-200">
          <h4 className="font-semibold text-purple-900 mb-2">Optimization Impact Summary</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div className="text-center">
              <div className="font-bold text-blue-600 text-lg">
                +{Math.round(totalImpactScore * 0.3)}%
              </div>
              <div className="text-gray-600">Traffic Increase</div>
            </div>
            <div className="text-center">
              <div className="font-bold text-green-600 text-lg">
                +{Math.round(totalImpactScore * 0.25)}%
              </div>
              <div className="text-gray-600">Engagement</div>
            </div>
            <div className="text-center">
              <div className="font-bold text-purple-600 text-lg">
                +{Math.round(totalImpactScore * 0.2)}%
              </div>
              <div className="text-gray-600">Conversions</div>
            </div>
            <div className="text-center">
              <div className="font-bold text-orange-600 text-lg">
                +${Math.round(totalImpactScore * 0.15)}
              </div>
              <div className="text-gray-600">Revenue/1K views</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}