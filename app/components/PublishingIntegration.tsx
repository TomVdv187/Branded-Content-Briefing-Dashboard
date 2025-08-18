'use client';

import React, { useState } from 'react';
import { GeneratedContent } from '../types';
import { 
  Globe, 
  Send, 
  Calendar, 
  Settings, 
  CheckCircle, 
  Clock, 
  AlertCircle,
  Facebook,
  Instagram,
  Linkedin,
  Twitter,
  Youtube,
  Mail
} from 'lucide-react';

interface PublishingPlatform {
  id: string;
  name: string;
  icon: any;
  connected: boolean;
  status: 'ready' | 'pending' | 'error' | 'published';
  lastPublished?: string;
  engagement?: {
    views: number;
    likes: number;
    shares: number;
  };
}

interface PublishingIntegrationProps {
  content: GeneratedContent;
  onPublish?: (platforms: string[]) => void;
  isVisible: boolean;
}

export default function PublishingIntegration({ content, onPublish, isVisible }: PublishingIntegrationProps) {
  const [platforms, setPlatforms] = useState<PublishingPlatform[]>([
    {
      id: 'wordpress',
      name: 'WordPress CMS',
      icon: Globe,
      connected: true,
      status: 'ready'
    },
    {
      id: 'facebook',
      name: 'Facebook Page',
      icon: Facebook,
      connected: true,
      status: 'ready',
      engagement: { views: 12500, likes: 234, shares: 67 }
    },
    {
      id: 'instagram',
      name: 'Instagram Business',
      icon: Instagram,
      connected: true,
      status: 'ready',
      engagement: { views: 8900, likes: 445, shares: 89 }
    },
    {
      id: 'linkedin',
      name: 'LinkedIn Company',
      icon: Linkedin,
      connected: true,
      status: 'ready',
      engagement: { views: 5600, likes: 123, shares: 34 }
    },
    {
      id: 'twitter',
      name: 'Twitter/X Account',
      icon: Twitter,
      connected: false,
      status: 'error'
    },
    {
      id: 'newsletter',
      name: 'Email Newsletter',
      icon: Mail,
      connected: true,
      status: 'pending',
      lastPublished: '2024-01-10'
    }
  ]);

  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>(['wordpress']);
  const [scheduleOption, setScheduleOption] = useState<'now' | 'schedule' | 'draft'>('now');
  const [scheduledDate, setScheduledDate] = useState('');
  const [scheduledTime, setScheduledTime] = useState('');
  const [isPublishing, setIsPublishing] = useState(false);
  const [publishingQueue, setPublishingQueue] = useState<Array<{
    id: string;
    platforms: string[];
    scheduledFor: string;
    status: 'pending' | 'published' | 'failed';
    title: string;
  }>>([]);
  const [showQueue, setShowQueue] = useState(false);

  const handlePlatformToggle = (platformId: string) => {
    const platform = platforms.find(p => p.id === platformId);
    if (!platform?.connected) return;

    setSelectedPlatforms(prev => 
      prev.includes(platformId) 
        ? prev.filter(id => id !== platformId)
        : [...prev, platformId]
    );
  };

  const handlePublish = async () => {
    if (selectedPlatforms.length === 0) return;

    if (scheduleOption === 'draft') {
      // Save as draft
      alert('Content saved as draft. You can access it from your drafts folder.');
      return;
    }

    setIsPublishing(true);

    if (scheduleOption === 'schedule') {
      // Schedule for later
      const scheduledDateTime = `${scheduledDate}T${scheduledTime}`;
      const newQueueItem = {
        id: `scheduled-${Date.now()}`,
        platforms: selectedPlatforms,
        scheduledFor: scheduledDateTime,
        status: 'pending' as const,
        title: content.article?.title || 'Untitled Content'
      };
      
      setPublishingQueue(prev => [...prev, newQueueItem]);
      setIsPublishing(false);
      alert(`Content scheduled for ${new Date(scheduledDateTime).toLocaleString()}`);
      return;
    }

    // Publish immediately
    // Update platform statuses to 'pending'
    setPlatforms(prev => prev.map(p => 
      selectedPlatforms.includes(p.id) 
        ? { ...p, status: 'pending' as const }
        : p
    ));

    // Simulate publishing process
    setTimeout(() => {
      setPlatforms(prev => prev.map(p => 
        selectedPlatforms.includes(p.id) 
          ? { 
              ...p, 
              status: 'published' as const,
              lastPublished: new Date().toISOString().split('T')[0]
            }
          : p
      ));
      
      setIsPublishing(false);
      
      if (onPublish) {
        onPublish(selectedPlatforms);
      }
    }, 3000);
  };

  const handleCancelScheduled = (queueId: string) => {
    setPublishingQueue(prev => prev.filter(item => item.id !== queueId));
  };

  const getMinDateTime = () => {
    const now = new Date();
    now.setMinutes(now.getMinutes() + 10); // Minimum 10 minutes from now
    return now.toISOString().slice(0, 16);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'ready': return <CheckCircle className="text-green-500" size={16} />;
      case 'pending': return <Clock className="text-yellow-500" size={16} />;
      case 'error': return <AlertCircle className="text-red-500" size={16} />;
      case 'published': return <Send className="text-blue-500" size={16} />;
      default: return null;
    }
  };

  const getStatusText = (platform: PublishingPlatform) => {
    if (!platform.connected) return 'Not Connected';
    
    switch (platform.status) {
      case 'ready': return 'Ready to Publish';
      case 'pending': return 'Publishing...';
      case 'error': return 'Connection Error';
      case 'published': 
        return platform.lastPublished 
          ? `Published ${platform.lastPublished}` 
          : 'Published';
      default: return 'Unknown Status';
    }
  };

  if (!isVisible) return null;

  return (
    <div className="bg-slate-800/90 backdrop-blur-xl rounded-xl shadow-lg border border-slate-600/30 p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <Send className="text-blue-400" size={24} />
          <div>
            <h3 className="text-lg font-semibold text-white">Publishing & Distribution</h3>
            <p className="text-sm text-slate-400">Publish to multiple platforms simultaneously</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <div className="text-sm text-slate-300">
            {selectedPlatforms.length} platform{selectedPlatforms.length !== 1 ? 's' : ''} selected
          </div>
        </div>
      </div>

      {/* Platform Selection */}
      <div className="mb-6">
        <h4 className="font-medium text-white mb-3">Select Publishing Platforms</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {platforms.map(platform => {
            const IconComponent = platform.icon;
            const isSelected = selectedPlatforms.includes(platform.id);
            
            return (
              <div
                key={platform.id}
                className={`border rounded-lg p-4 cursor-pointer transition-all ${
                  !platform.connected 
                    ? 'border-gray-200 bg-gray-50 cursor-not-allowed' 
                    : isSelected
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 bg-white hover:border-gray-300'
                }`}
                onClick={() => handlePlatformToggle(platform.id)}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-3">
                    <IconComponent 
                      size={20} 
                      className={!platform.connected ? 'text-gray-400' : 'text-gray-700'} 
                    />
                    <span className={`font-medium ${
                      !platform.connected ? 'text-gray-400' : 'text-gray-900'
                    }`}>
                      {platform.name}
                    </span>
                  </div>
                  {isSelected && platform.connected && (
                    <CheckCircle className="text-blue-600" size={20} />
                  )}
                </div>
                
                <div className="flex items-center space-x-2 text-sm">
                  {getStatusIcon(platform.status)}
                  <span className={`${
                    !platform.connected ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    {getStatusText(platform)}
                  </span>
                </div>
                
                {platform.engagement && platform.connected && (
                  <div className="mt-2 text-xs text-gray-500 space-x-4">
                    <span>{platform.engagement.views.toLocaleString()} views</span>
                    <span>{platform.engagement.likes} likes</span>
                    <span>{platform.engagement.shares} shares</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Publishing Schedule */}
      <div className="mb-6">
        <h4 className="font-medium text-gray-900 mb-3">Publishing Schedule</h4>
        <div className="space-y-3">
          <label className="flex items-center space-x-2">
            <input
              type="radio"
              name="schedule"
              value="now"
              checked={scheduleOption === 'now'}
              onChange={(e) => setScheduleOption(e.target.value as 'now')}
              className="text-blue-600"
            />
            <span className="text-gray-700">Publish immediately</span>
          </label>
          
          <label className="flex items-center space-x-2">
            <input
              type="radio"
              name="schedule"
              value="schedule"
              checked={scheduleOption === 'schedule'}
              onChange={(e) => setScheduleOption(e.target.value as 'schedule')}
              className="text-blue-600"
            />
            <span className="text-gray-700">Schedule for later</span>
          </label>
          
          <label className="flex items-center space-x-2">
            <input
              type="radio"
              name="schedule"
              value="draft"
              checked={scheduleOption === 'draft'}
              onChange={(e) => setScheduleOption(e.target.value as 'draft')}
              className="text-blue-600"
            />
            <span className="text-gray-700">Save as draft</span>
          </label>
          
          {scheduleOption === 'schedule' && (
            <div className="ml-6 flex items-center space-x-3">
              <input
                type="date"
                value={scheduledDate}
                onChange={(e) => setScheduledDate(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-1 text-sm"
                min={new Date().toISOString().split('T')[0]}
              />
              <input
                type="time"
                value={scheduledTime}
                onChange={(e) => setScheduledTime(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-1 text-sm"
              />
            </div>
          )}
        </div>
      </div>

      {/* Content Preview Summary */}
      <div className="mb-6 p-4 bg-gray-50 rounded-lg">
        <h4 className="font-medium text-gray-900 mb-2">Content Summary</h4>
        <div className="text-sm text-gray-600 space-y-1">
          <div><strong>Title:</strong> {content.article?.title}</div>
          <div><strong>Word Count:</strong> {content.article?.content.split(' ').length || 0} words</div>
          <div><strong>SEO Score:</strong> 
            <span className="ml-2 px-2 py-1 bg-green-100 text-green-800 rounded text-xs">
              Optimized
            </span>
          </div>
          <div><strong>Platforms:</strong> Article, {[content.instagram, content.facebook, content.linkedin, content.tiktok, content.youtube, content.newsletter].filter(Boolean).length} social formats</div>
        </div>
      </div>

      {/* Publishing Queue */}
      {publishingQueue.length > 0 && (
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-medium text-gray-900">Publishing Queue</h4>
            <button
              onClick={() => setShowQueue(!showQueue)}
              className="text-blue-600 hover:text-blue-700 text-sm font-medium"
            >
              {showQueue ? 'Hide' : 'Show'} ({publishingQueue.length})
            </button>
          </div>
          
          {showQueue && (
            <div className="space-y-2">
              {publishingQueue.map(item => (
                <div key={item.id} className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-gray-900 text-sm">{item.title}</div>
                      <div className="text-xs text-gray-600">
                        Scheduled for {new Date(item.scheduledFor).toLocaleString()}
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        Platforms: {item.platforms.map(p => platforms.find(platform => platform.id === p)?.name).join(', ')}
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        item.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        item.status === 'published' ? 'bg-green-100 text-green-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {item.status}
                      </span>
                      {item.status === 'pending' && (
                        <button
                          onClick={() => handleCancelScheduled(item.id)}
                          className="text-red-600 hover:text-red-700 text-xs underline"
                        >
                          Cancel
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Publish Button */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-500">
          {scheduleOption === 'draft'
            ? 'Content will be saved as draft'
            : selectedPlatforms.length === 0 
              ? 'Select at least one platform to publish'
              : scheduleOption === 'schedule' && (!scheduledDate || !scheduledTime)
                ? 'Please set date and time for scheduled publishing'
                : `Ready to publish to ${selectedPlatforms.length} platform${selectedPlatforms.length !== 1 ? 's' : ''}`
          }
        </div>
        
        <button
          onClick={handlePublish}
          disabled={
            (scheduleOption !== 'draft' && selectedPlatforms.length === 0) || 
            isPublishing ||
            (scheduleOption === 'schedule' && (!scheduledDate || !scheduledTime))
          }
          className={`flex items-center space-x-2 px-6 py-2 rounded-md font-medium transition-colors ${
            ((scheduleOption !== 'draft' && selectedPlatforms.length === 0) || 
             isPublishing ||
             (scheduleOption === 'schedule' && (!scheduledDate || !scheduledTime)))
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : scheduleOption === 'draft'
                ? 'bg-green-600 text-white hover:bg-green-700'
                : 'bg-blue-600 text-white hover:bg-blue-700'
          }`}
        >
          {isPublishing ? (
            <>
              <Clock size={16} className="animate-spin" />
              <span>Publishing...</span>
            </>
          ) : (
            <>
              <Send size={16} />
              <span>
                {scheduleOption === 'now' ? 'Publish Now' : 
                 scheduleOption === 'schedule' ? 'Schedule Publish' : 
                 'Save Draft'}
              </span>
            </>
          )}
        </button>
      </div>

      {/* Publishing Status */}
      {isPublishing && (
        <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
          <div className="text-sm text-blue-800">
            <div className="font-medium mb-1">Publishing in progress...</div>
            <div className="space-y-1">
              {selectedPlatforms.map(platformId => {
                const platform = platforms.find(p => p.id === platformId);
                return (
                  <div key={platformId} className="flex items-center space-x-2">
                    <Clock size={14} className="text-blue-600 animate-pulse" />
                    <span>Publishing to {platform?.name}...</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}