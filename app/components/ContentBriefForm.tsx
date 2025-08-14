'use client';

import React, { useState } from 'react';
import { ContentBrief } from '../types';
import { parseBriefingToStructuredJSON } from '../utils/briefingParser';
import { FileText, Target, Palette, Globe, Calendar, Plus, X, Sparkles, Brain } from 'lucide-react';

interface ContentBriefFormProps {
  onSubmit: (brief: ContentBrief) => void;
  loading: boolean;
}

export default function ContentBriefForm({ onSubmit, loading }: ContentBriefFormProps) {
  const [brief, setBrief] = useState<ContentBrief>({
    brand: {
      name: '',
      voice_tone: ['professional'],
      must_use_phrases: [],
      banned_phrases: []
    },
    audience: {
      primary: '',
      reading_level: 'B2',
      locale: 'en-US'
    },
    storyline: '',
    platforms: ['article', 'facebook', 'instagram', 'linkedin'], // Facebook included by default
    seo: {
      primary_keyword: '',
      secondary_keywords: []
    },
    legal: {
      disclaimer: ''
    },
    angle_hint: 'informative-guide'
  });

  const [keywordInput, setKeywordInput] = useState('');
  const [doNotMentionInput, setDoNotMentionInput] = useState('');
  const [mustIncludeInput, setMustIncludeInput] = useState('');
  const [seoSuggestions, setSeoSuggestions] = useState<string[]>([]);
  const [briefingDocument, setBriefingDocument] = useState('');
  const [isParsingDocument, setIsParsingDocument] = useState(false);


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(brief);
  };

  const addKeyword = () => {
    if (keywordInput.trim() && !brief.seo.secondary_keywords.includes(keywordInput.trim())) {
      setBrief(prev => ({
        ...prev,
        seo: {
          ...prev.seo,
          secondary_keywords: [...prev.seo.secondary_keywords, keywordInput.trim()]
        }
      }));
      setKeywordInput('');
    }
  };

  const removeKeyword = (keyword: string) => {
    setBrief(prev => ({
      ...prev,
      seo: {
        ...prev.seo,
        secondary_keywords: prev.seo.secondary_keywords.filter(k => k !== keyword)
      }
    }));
  };

  const addDoNotMention = () => {
    if (doNotMentionInput.trim() && !brief.brand.banned_phrases.includes(doNotMentionInput.trim())) {
      setBrief(prev => ({
        ...prev,
        brand: {
          ...prev.brand,
          banned_phrases: [...prev.brand.banned_phrases, doNotMentionInput.trim()]
        }
      }));
      setDoNotMentionInput('');
    }
  };

  const removeDoNotMention = (item: string) => {
    setBrief(prev => ({
      ...prev,
      brand: {
        ...prev.brand,
        banned_phrases: prev.brand.banned_phrases.filter(i => i !== item)
      }
    }));
  };

  const addMustInclude = () => {
    if (mustIncludeInput.trim() && !brief.brand.must_use_phrases.includes(mustIncludeInput.trim())) {
      setBrief(prev => ({
        ...prev,
        brand: {
          ...prev.brand,
          must_use_phrases: [...prev.brand.must_use_phrases, mustIncludeInput.trim()]
        }
      }));
      setMustIncludeInput('');
    }
  };

  const removeMustInclude = (item: string) => {
    setBrief(prev => ({
      ...prev,
      brand: {
        ...prev.brand,
        must_use_phrases: prev.brand.must_use_phrases.filter(i => i !== item)
      }
    }));
  };


  const generateSEOSuggestions = () => {
    // Generate intelligent SEO suggestions based on storyline, audience, and angle
    const topicKeywords = generateKeywordsFromTopic(brief.storyline, brief.audience.primary, brief.angle_hint);
    setSeoSuggestions(topicKeywords);
  };

  const generateKeywordsFromTopic = (topic: string, audience: string, angle: string): string[] => {
    const baseKeywords = [];
    
    // Extract words from topic
    const topicWords = topic.toLowerCase().split(' ').filter(word => word.length > 2);
    
    // Add topic-based keywords
    baseKeywords.push(...topicWords);
    baseKeywords.push(topic.toLowerCase());
    
    // Add audience-specific keywords
    baseKeywords.push(audience.toLowerCase());
    baseKeywords.push(`${audience.toLowerCase()} solutions`);
    baseKeywords.push(`${audience.toLowerCase()} trends`);
    
    // Add angle-specific keywords
    const angleModifiers = {
      'how-to': ['guide', 'tutorial', 'step by step', 'implementation'],
      'list': ['top', 'best', 'strategies', 'tips'],
      'comparison': ['vs', 'comparison', 'analysis', 'review'],
      'news': ['announcement', 'news', 'launch', 'update'],
      'informative-guide': ['guide', 'complete guide', 'comprehensive']
    };
    
    const modifiers = angleModifiers[angle as keyof typeof angleModifiers] || ['guide', 'tips'];
    modifiers.forEach(modifier => {
      baseKeywords.push(`${topic.toLowerCase()} ${modifier}`);
      baseKeywords.push(`${audience.toLowerCase()} ${modifier}`);
    });
    
    // Add long-tail keywords
    baseKeywords.push(`best ${topic.toLowerCase()} for ${audience.toLowerCase()}`);
    baseKeywords.push(`${topic.toLowerCase()} ${audience.toLowerCase()} 2024`);
    baseKeywords.push(`how to ${topic.toLowerCase()}`);
    baseKeywords.push(`${topic.toLowerCase()} benefits`);
    
    // Remove duplicates and return top suggestions
    return Array.from(new Set(baseKeywords)).filter(keyword => keyword.length > 3).slice(0, 8);
  };

  const addSuggestedKeyword = (keyword: string) => {
    if (!brief.seo.secondary_keywords.includes(keyword)) {
      setBrief(prev => ({
        ...prev,
        seo: {
          ...prev.seo,
          secondary_keywords: [...prev.seo.secondary_keywords, keyword]
        }
      }));
    }
    // Remove from suggestions
    setSeoSuggestions(prev => prev.filter(s => s !== keyword));
  };

  const parseBriefingDocument = async () => {
    if (!briefingDocument.trim()) {
      alert('Please paste or upload a briefing document first');
      return;
    }

    setIsParsingDocument(true);
    
    // Simulate parsing time for better UX
    setTimeout(() => {
      try {
        // Use the new CLAUDE.md compliant parser
        const parsedBrief = parseBriefingToStructuredJSON(briefingDocument);
        
        // Set the parsed brief data
        setBrief(parsedBrief);
        
        setIsParsingDocument(false);
        
        // Clear the document text area
        setBriefingDocument('');
        
        alert('✅ Briefing parsed successfully! Review and adjust the auto-filled fields.');
      } catch (error) {
        console.error('Parsing error:', error);
        setIsParsingDocument(false);
        alert('⚠️ Parsing encountered an issue. Please check your briefing format and try again.');
      }
    }, 2000);
  };



  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        setBriefingDocument(content);
      };
      reader.readAsText(file);
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
        {/* Smart Briefing Upload */}
        <div className="border-l-4 border-indigo-500 pl-4 bg-gradient-to-r from-indigo-50 to-purple-50 p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-indigo-900 mb-4 flex items-center">
            <Sparkles className="mr-2 text-indigo-600" size={20} />
            🚀 Smart Briefing Parser - Auto-Fill Form Fields
          </h3>
          <p className="text-indigo-700 mb-4 text-sm">
            Upload or paste your client's briefing document. Our AI will automatically extract and fill most form fields, 
            including client info, industry, content type, budget, and requirements.
          </p>
          
          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-indigo-800 mb-2">
                📄 Upload Briefing Document
              </label>
              <input
                type="file"
                accept=".txt,.doc,.docx,.pdf"
                onChange={handleFileUpload}
                className="input-field text-sm"
              />
            </div>
            <div className="flex items-end">
              <span className="text-indigo-600 text-sm">OR</span>
            </div>
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-indigo-800 mb-2">
              📋 Paste Briefing Content
            </label>
            <textarea
              className="textarea-field"
              value={briefingDocument}
              onChange={(e) => setBriefingDocument(e.target.value)}
              placeholder="Paste your client briefing here... 

Example:
Client: Microsoft
Industry: Technology  
Topic: AI in productivity software
Content Type: Blog post
Target Audience: Business executives
Budget: €100K
Pageviews: 250K
Message: How AI transforms workplace productivity..."
              rows={6}
            />
          </div>
          
          <button
            type="button"
            onClick={parseBriefingDocument}
            disabled={!briefingDocument.trim() || isParsingDocument}
            className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {isParsingDocument ? (
              <>
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Parsing Document...
              </>
            ) : (
              <>
                <Brain size={18} />
                🎯 Parse & Auto-Fill Form Fields
              </>
            )}
          </button>
          
          <div className="mt-3 text-xs text-indigo-600">
            <p>✅ Recognizes major brands (Microsoft, Google, Apple, BMW, etc.) with smart defaults</p>
            <p>✅ Extracts: Client info, industry, content type, budget, pageviews, keywords, deadlines</p>
            <p>✅ Auto-suggests tone, brand voice, and SEO settings based on content analysis</p>
          </div>
        </div>
        {/* Client Information */}
        <div className="border-l-4 border-blue-500 pl-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Target className="mr-2 text-blue-600" size={20} />
            Client & Brand Information
          </h3>
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Brand Name *</label>
              <input
                type="text"
                className="input-field"
                value={brief.brand.name}
                onChange={(e) => setBrief(prev => ({ ...prev, brand: { ...prev.brand, name: e.target.value } }))}
                required
                placeholder="Acme Corporation"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Primary Audience *</label>
              <input
                type="text"
                className="input-field"
                value={brief.audience.primary}
                onChange={(e) => setBrief(prev => ({ ...prev, audience: { ...prev.audience, primary: e.target.value } }))}
                required
                placeholder="C-level executives, Marketing professionals..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Storyline/Topic *</label>
              <input
                type="text"
                className="input-field"
                value={brief.storyline}
                onChange={(e) => setBrief(prev => ({ ...prev, storyline: e.target.value }))}
                required
                placeholder="AI in Digital Marketing Transformation"
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
              <label className="block text-sm font-medium text-gray-700 mb-2">Platforms *</label>
              <div className="grid grid-cols-2 gap-2">
                {['article', 'instagram', 'facebook', 'linkedin', 'tiktok', 'youtube', 'newsletter'].map(platform => (
                  <label key={platform} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={brief.platforms.includes(platform as any)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setBrief(prev => ({ ...prev, platforms: [...prev.platforms, platform as any] }));
                        } else {
                          setBrief(prev => ({ ...prev, platforms: prev.platforms.filter(p => p !== platform) }));
                        }
                      }}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700 capitalize">{platform}</span>
                  </label>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Language/Locale</label>
              <select
                className="input-field"
                value={brief.audience.locale}
                onChange={(e) => setBrief(prev => ({ ...prev, audience: { ...prev.audience, locale: e.target.value } }))}
              >
                <option value="en-US">English (US)</option>
                <option value="en-GB">English (UK)</option>
                <option value="es-ES">Spanish</option>
                <option value="fr-FR">French</option>
                <option value="de-DE">German</option>
                <option value="nl-NL">Dutch</option>
                <option value="it-IT">Italian</option>
              </select>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Primary Keyword/SEO Focus *</label>
              <input
                type="text"
                className="input-field"
                value={brief.seo.primary_keyword}
                onChange={(e) => setBrief(prev => ({ ...prev, seo: { ...prev.seo, primary_keyword: e.target.value } }))}
                required
                placeholder="AI marketing automation"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Brand Voice & Tone</label>
              <select
                className="input-field"
                value={brief.brand.voice_tone[0] || 'professional'}
                onChange={(e) => setBrief(prev => ({ ...prev, brand: { ...prev.brand, voice_tone: [e.target.value] } }))}
              >
                <option value="professional">Professional</option>
                <option value="friendly">Friendly</option>
                <option value="authoritative">Authoritative</option>
                <option value="conversational">Conversational</option>
                <option value="technical">Technical</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Content Angle</label>
              <select
                className="input-field"
                value={brief.angle_hint}
                onChange={(e) => setBrief(prev => ({ ...prev, angle_hint: e.target.value }))}
              >
                <option value="informative-guide">Informative Guide</option>
                <option value="how-to">How-to Guide</option>
                <option value="list">List Article</option>
                <option value="comparison">Comparison</option>
                <option value="news">News/Announcement</option>
                <option value="case-study">Case Study</option>
                <option value="trend">Trend Analysis</option>
                <option value="research">Research & Data</option>
                <option value="opinion">Opinion Piece</option>
              </select>
            </div>
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
              <label className="block text-sm font-medium text-gray-700 mb-2">Reading Level</label>
              <select
                className="input-field"
                value={brief.audience.reading_level}
                onChange={(e) => setBrief(prev => ({ ...prev, audience: { ...prev.audience, reading_level: e.target.value as any } }))}
              >
                <option value="A2">Basic (A2)</option>
                <option value="B1">Intermediate (B1)</option>
                <option value="B2">Upper Intermediate (B2)</option>
                <option value="C1">Advanced (C1)</option>
              </select>
            </div>
          </div>

          <div className="mt-4">
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium text-gray-700">Keywords</label>
              <button
                type="button"
                onClick={() => generateSEOSuggestions()}
                className="btn-secondary text-sm flex items-center gap-2"
              >
                <Globe size={14} />
                Get SEO Suggestions
              </button>
            </div>
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
            
            {/* SEO Keyword Suggestions */}
            {seoSuggestions.length > 0 && (
              <div className="mb-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
                <h4 className="text-sm font-medium text-blue-900 mb-2">🎯 Suggested Keywords (High Performance)</h4>
                <div className="flex flex-wrap gap-2">
                  {seoSuggestions.map((suggestion, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => addSuggestedKeyword(suggestion)}
                      className="bg-blue-100 hover:bg-blue-200 text-blue-800 px-3 py-1 rounded-full text-sm transition-colors flex items-center gap-1"
                    >
                      <Plus size={12} />
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            )}
            
            <div className="flex flex-wrap gap-2">
              {brief.seo.secondary_keywords.map((keyword, index) => (
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
                {brief.brand.must_use_phrases.map((item, index) => (
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
                {brief.brand.banned_phrases.map((item, index) => (
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

        {/* Legal & Compliance */}
        <div className="border-l-4 border-purple-500 pl-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Palette className="mr-2 text-purple-600" size={20} />
            Legal & Compliance
          </h3>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Legal Disclaimer (Optional)</label>
            <textarea
              className="textarea-field"
              value={brief.legal.disclaimer}
              onChange={(e) => setBrief(prev => ({ ...prev, legal: { ...prev.legal, disclaimer: e.target.value } }))}
              placeholder="Any legal disclaimers, compliance notes, or regulatory requirements..."
              rows={2}
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