'use client';

import React, { useState } from 'react';
import { ContentBrief } from '../types';
import { FileText, Target, Palette, Globe, Calendar, Plus, X } from 'lucide-react';

interface ContentBriefFormProps {
  onSubmit: (brief: ContentBrief) => void;
  loading: boolean;
}

export default function ContentBriefForm({ onSubmit, loading }: ContentBriefFormProps) {
  const [brief, setBrief] = useState<ContentBrief>({
    clientName: '',
    brandName: '',
    industry: '',
    contentType: 'article',
    topic: '',
    mainMessage: '',
    targetAudience: '',
    keywords: [],
    tone: 'professional',
    wordCount: 800,
    language: 'English',
    seoFocus: '',
    includeImages: true,
    socialPlatforms: [],
    brandVoice: '',
    doNotMention: [],
    mustInclude: [],
    deadline: '',
  });

  const [keywordInput, setKeywordInput] = useState('');
  const [doNotMentionInput, setDoNotMentionInput] = useState('');
  const [mustIncludeInput, setMustIncludeInput] = useState('');

  const contentTypes = [
    { value: 'article', label: 'News Article', description: 'Professional news or industry article' },
    { value: 'blog-post', label: 'Blog Post', description: 'Engaging blog content with personal touch' },
    { value: 'social-posts', label: 'Social Media Posts', description: 'Multi-platform social media content' },
    { value: 'newsletter', label: 'Newsletter', description: 'Email newsletter content' },
    { value: 'product-description', label: 'Product Description', description: 'E-commerce product content' },
    { value: 'press-release', label: 'Press Release', description: 'Official company announcements' },
    { value: 'case-study', label: 'Case Study', description: 'Detailed customer success stories' },
    { value: 'landing-page', label: 'Landing Page', description: 'Conversion-focused web page content' }
  ];

  const toneOptions = [
    { value: 'professional', label: 'Professional', description: 'Formal, business-appropriate' },
    { value: 'casual', label: 'Casual', description: 'Relaxed, informal approach' },
    { value: 'friendly', label: 'Friendly', description: 'Warm, approachable tone' },
    { value: 'authoritative', label: 'Authoritative', description: 'Expert, commanding presence' },
    { value: 'conversational', label: 'Conversational', description: 'Natural, dialogue-like' },
    { value: 'technical', label: 'Technical', description: 'Detailed, specification-focused' },
    { value: 'persuasive', label: 'Persuasive', description: 'Compelling, action-oriented' }
  ];

  const socialPlatformOptions = [
    'LinkedIn', 'Twitter/X', 'Facebook', 'Instagram', 'TikTok', 'YouTube', 'Pinterest'
  ];

  const wordCountOptions = [
    { value: 300, label: '300 words (Short)' },
    { value: 600, label: '600 words (Medium)' },
    { value: 800, label: '800 words (Standard)' },
    { value: 1200, label: '1,200 words (Long)' },
    { value: 2000, label: '2,000 words (In-depth)' },
    { value: 3000, label: '3,000+ words (Comprehensive)' }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(brief);
  };

  const addKeyword = () => {
    if (keywordInput.trim() && !brief.keywords.includes(keywordInput.trim())) {
      setBrief(prev => ({
        ...prev,
        keywords: [...prev.keywords, keywordInput.trim()]
      }));
      setKeywordInput('');
    }
  };

  const removeKeyword = (keyword: string) => {
    setBrief(prev => ({
      ...prev,
      keywords: prev.keywords.filter(k => k !== keyword)
    }));
  };

  const addDoNotMention = () => {
    if (doNotMentionInput.trim() && !brief.doNotMention.includes(doNotMentionInput.trim())) {
      setBrief(prev => ({
        ...prev,
        doNotMention: [...prev.doNotMention, doNotMentionInput.trim()]
      }));
      setDoNotMentionInput('');
    }
  };

  const removeDoNotMention = (item: string) => {
    setBrief(prev => ({
      ...prev,
      doNotMention: prev.doNotMention.filter(i => i !== item)
    }));
  };

  const addMustInclude = () => {
    if (mustIncludeInput.trim() && !brief.mustInclude.includes(mustIncludeInput.trim())) {
      setBrief(prev => ({
        ...prev,
        mustInclude: [...prev.mustInclude, mustIncludeInput.trim()]
      }));
      setMustIncludeInput('');
    }
  };

  const removeMustInclude = (item: string) => {
    setBrief(prev => ({
      ...prev,
      mustInclude: prev.mustInclude.filter(i => i !== item)
    }));
  };

  const handleSocialPlatformChange = (platform: string, checked: boolean) => {
    if (checked) {
      setBrief(prev => ({
        ...prev,
        socialPlatforms: [...prev.socialPlatforms, platform]
      }));
    } else {
      setBrief(prev => ({
        ...prev,
        socialPlatforms: prev.socialPlatforms.filter(p => p !== platform)
      }));
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg">
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6 rounded-t-xl">
        <div className="flex items-center space-x-3">
          <FileText size={28} />
          <div>
            <h2 className="text-2xl font-bold">Content Production Brief</h2>
            <p className="text-blue-100">Generate professional content instantly</p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="p-6 space-y-8">
        {/* Client Information */}
        <div className="border-l-4 border-blue-500 pl-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Target className="mr-2 text-blue-600" size={20} />
            Client & Brand Information
          </h3>
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Client Name *</label>
              <input
                type="text"
                className="input-field"
                value={brief.clientName}
                onChange={(e) => setBrief(prev => ({ ...prev, clientName: e.target.value }))}
                required
                placeholder="Acme Corporation"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Brand Name *</label>
              <input
                type="text"
                className="input-field"
                value={brief.brandName}
                onChange={(e) => setBrief(prev => ({ ...prev, brandName: e.target.value }))}
                required
                placeholder="Acme Solutions"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Industry *</label>
              <input
                type="text"
                className="input-field"
                value={brief.industry}
                onChange={(e) => setBrief(prev => ({ ...prev, industry: e.target.value }))}
                required
                placeholder="Technology, Healthcare, Finance..."
              />
            </div>
          </div>
        </div>

        {/* Content Requirements */}
        <div className="border-l-4 border-green-500 pl-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <FileText className="mr-2 text-green-600" size={20} />
            Content Requirements
          </h3>
          
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Content Type *</label>
              <select
                className="input-field"
                value={brief.contentType}
                onChange={(e) => setBrief(prev => ({ ...prev, contentType: e.target.value as ContentBrief['contentType'] }))}
                required
              >
                {contentTypes.map(type => (
                  <option key={type.value} value={type.value}>
                    {type.label} - {type.description}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Word Count</label>
              <select
                className="input-field"
                value={brief.wordCount}
                onChange={(e) => setBrief(prev => ({ ...prev, wordCount: parseInt(e.target.value) }))}
              >
                {wordCountOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Topic/Subject *</label>
              <input
                type="text"
                className="input-field"
                value={brief.topic}
                onChange={(e) => setBrief(prev => ({ ...prev, topic: e.target.value }))}
                required
                placeholder="The Future of AI in Healthcare Technology"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Main Message *</label>
              <textarea
                className="textarea-field"
                value={brief.mainMessage}
                onChange={(e) => setBrief(prev => ({ ...prev, mainMessage: e.target.value }))}
                required
                placeholder="What is the key message you want to communicate to your audience?"
                rows={3}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Target Audience *</label>
              <textarea
                className="textarea-field"
                value={brief.targetAudience}
                onChange={(e) => setBrief(prev => ({ ...prev, targetAudience: e.target.value }))}
                required
                placeholder="C-level executives in healthcare, age 35-55, interested in digital transformation..."
                rows={2}
              />
            </div>
          </div>
        </div>

        {/* Content Style & Tone */}
        <div className="border-l-4 border-purple-500 pl-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Palette className="mr-2 text-purple-600" size={20} />
            Style & Tone
          </h3>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Tone *</label>
              <select
                className="input-field"
                value={brief.tone}
                onChange={(e) => setBrief(prev => ({ ...prev, tone: e.target.value as ContentBrief['tone'] }))}
                required
              >
                {toneOptions.map(tone => (
                  <option key={tone.value} value={tone.value}>
                    {tone.label} - {tone.description}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Language</label>
              <select
                className="input-field"
                value={brief.language}
                onChange={(e) => setBrief(prev => ({ ...prev, language: e.target.value }))}
              >
                <option value="English">English</option>
                <option value="Spanish">Spanish</option>
                <option value="French">French</option>
                <option value="German">German</option>
                <option value="Dutch">Dutch</option>
                <option value="Italian">Italian</option>
              </select>
            </div>
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Brand Voice & Style</label>
            <textarea
              className="textarea-field"
              value={brief.brandVoice}
              onChange={(e) => setBrief(prev => ({ ...prev, brandVoice: e.target.value }))}
              placeholder="Describe your brand's voice: innovative, trustworthy, cutting-edge, approachable..."
              rows={2}
            />
          </div>
        </div>

        {/* SEO & Keywords */}
        <div className="border-l-4 border-orange-500 pl-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Globe className="mr-2 text-orange-600" size={20} />
            SEO & Keywords
          </h3>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Primary SEO Focus</label>
              <input
                type="text"
                className="input-field"
                value={brief.seoFocus}
                onChange={(e) => setBrief(prev => ({ ...prev, seoFocus: e.target.value }))}
                placeholder="AI healthcare solutions"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Meta Description</label>
              <input
                type="text"
                className="input-field"
                value={brief.metaDescription || ''}
                onChange={(e) => setBrief(prev => ({ ...prev, metaDescription: e.target.value }))}
                placeholder="Brief description for search engines (150-160 chars)"
              />
            </div>
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Keywords</label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                className="input-field"
                value={keywordInput}
                onChange={(e) => setKeywordInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addKeyword())}
                placeholder="Add keyword and press Enter"
              />
              <button
                type="button"
                onClick={addKeyword}
                className="btn-secondary px-3"
              >
                <Plus size={16} />
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {brief.keywords.map((keyword, index) => (
                <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm flex items-center gap-2">
                  {keyword}
                  <button type="button" onClick={() => removeKeyword(keyword)}>
                    <X size={14} />
                  </button>
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Social Media Distribution */}
        <div className="border-l-4 border-pink-500 pl-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Social Media Distribution</h3>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="flex items-center space-x-2 mb-3">
                <input
                  type="checkbox"
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  checked={brief.includeImages}
                  onChange={(e) => setBrief(prev => ({ ...prev, includeImages: e.target.checked }))}
                />
                <span className="text-sm font-medium text-gray-700">Include Image Suggestions</span>
              </label>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">Target Social Platforms</label>
            <div className="grid md:grid-cols-2 gap-2">
              {socialPlatformOptions.map((platform) => (
                <label key={platform} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    checked={brief.socialPlatforms.includes(platform)}
                    onChange={(e) => handleSocialPlatformChange(platform, e.target.checked)}
                  />
                  <span className="text-sm text-gray-700">{platform}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Content Guidelines */}
        <div className="border-l-4 border-red-500 pl-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Content Guidelines</h3>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Must Include</label>
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  className="input-field"
                  value={mustIncludeInput}
                  onChange={(e) => setMustIncludeInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addMustInclude())}
                  placeholder="Company name, contact info, etc."
                />
                <button
                  type="button"
                  onClick={addMustInclude}
                  className="btn-secondary px-3"
                >
                  <Plus size={16} />
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {brief.mustInclude.map((item, index) => (
                  <span key={index} className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm flex items-center gap-2">
                    {item}
                    <button type="button" onClick={() => removeMustInclude(item)}>
                      <X size={14} />
                    </button>
                  </span>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Do Not Mention</label>
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  className="input-field"
                  value={doNotMentionInput}
                  onChange={(e) => setDoNotMentionInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addDoNotMention())}
                  placeholder="Competitors, sensitive topics..."
                />
                <button
                  type="button"
                  onClick={addDoNotMention}
                  className="btn-secondary px-3"
                >
                  <Plus size={16} />
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {brief.doNotMention.map((item, index) => (
                  <span key={index} className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm flex items-center gap-2">
                    {item}
                    <button type="button" onClick={() => removeDoNotMention(item)}>
                      <X size={14} />
                    </button>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Project Details */}
        <div className="border-l-4 border-gray-500 pl-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Calendar className="mr-2 text-gray-600" size={20} />
            Project Details
          </h3>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Deadline</label>
              <input
                type="date"
                className="input-field"
                value={brief.deadline}
                onChange={(e) => setBrief(prev => ({ ...prev, deadline: e.target.value }))}
              />
            </div>
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Additional Notes</label>
            <textarea
              className="textarea-field"
              value={brief.revisionNotes || ''}
              onChange={(e) => setBrief(prev => ({ ...prev, revisionNotes: e.target.value }))}
              placeholder="Any specific requirements, style preferences, or additional context..."
              rows={3}
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="btn-primary w-full text-lg py-4 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Generating Content...
            </span>
          ) : (
            '🚀 Generate Professional Content'
          )}
        </button>
      </form>
    </div>
  );
}