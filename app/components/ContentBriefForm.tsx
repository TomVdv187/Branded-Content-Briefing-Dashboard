'use client';

import React, { useState } from 'react';
import { ContentBrief } from '../types';
import { FileText, Target, Palette, Globe, Calendar, Plus, X, Sparkles, Brain } from 'lucide-react';

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
    budget: '5K - 10K',
    guaranteedPageviews: 10000,
  });

  const [keywordInput, setKeywordInput] = useState('');
  const [doNotMentionInput, setDoNotMentionInput] = useState('');
  const [mustIncludeInput, setMustIncludeInput] = useState('');
  const [seoSuggestions, setSeoSuggestions] = useState<string[]>([]);
  const [briefingDocument, setBriefingDocument] = useState('');
  const [isParsingDocument, setIsParsingDocument] = useState(false);

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

  const generateSEOSuggestions = () => {
    // Generate intelligent SEO suggestions based on topic, industry, and content type
    const topicKeywords = generateKeywordsFromTopic(brief.topic, brief.industry, brief.contentType);
    setSeoSuggestions(topicKeywords);
  };

  const generateKeywordsFromTopic = (topic: string, industry: string, contentType: string): string[] => {
    const baseKeywords = [];
    
    // Extract words from topic
    const topicWords = topic.toLowerCase().split(' ').filter(word => word.length > 2);
    
    // Add topic-based keywords
    baseKeywords.push(...topicWords);
    baseKeywords.push(topic.toLowerCase());
    
    // Add industry-specific keywords
    baseKeywords.push(industry.toLowerCase());
    baseKeywords.push(`${industry.toLowerCase()} solutions`);
    baseKeywords.push(`${industry.toLowerCase()} trends`);
    
    // Add content-type specific keywords
    const contentModifiers = {
      'article': ['guide', 'analysis', 'insights', 'review'],
      'blog-post': ['tips', 'how to', 'best practices', 'tutorial'],
      'case-study': ['success story', 'results', 'case study', 'implementation'],
      'press-release': ['announcement', 'news', 'launch', 'update'],
      'landing-page': ['solution', 'service', 'benefits', 'features']
    };
    
    const modifiers = contentModifiers[contentType as keyof typeof contentModifiers] || ['guide', 'tips'];
    modifiers.forEach(modifier => {
      baseKeywords.push(`${topic.toLowerCase()} ${modifier}`);
      baseKeywords.push(`${industry.toLowerCase()} ${modifier}`);
    });
    
    // Add long-tail keywords
    baseKeywords.push(`best ${topic.toLowerCase()} for ${industry.toLowerCase()}`);
    baseKeywords.push(`${topic.toLowerCase()} ${industry.toLowerCase()} 2024`);
    baseKeywords.push(`how to ${topic.toLowerCase()}`);
    baseKeywords.push(`${topic.toLowerCase()} benefits`);
    
    // Remove duplicates and return top suggestions
    return Array.from(new Set(baseKeywords)).filter(keyword => keyword.length > 3).slice(0, 8);
  };

  const addSuggestedKeyword = (keyword: string) => {
    if (!brief.keywords.includes(keyword)) {
      setBrief(prev => ({
        ...prev,
        keywords: [...prev.keywords, keyword]
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
    
    // Simulate parsing time
    setTimeout(() => {
      const parsedData = parseClientBriefing(briefingDocument);
      
      // Auto-fill form fields
      setBrief(prev => ({
        ...prev,
        ...parsedData
      }));
      
      setIsParsingDocument(false);
      
      // Clear the document text area
      setBriefingDocument('');
      
      alert('✅ Briefing parsed successfully! Review and adjust the auto-filled fields.');
    }, 2000);
  };

  const parseClientBriefing = (document: string): Partial<ContentBrief> => {
    const doc = document.toLowerCase();
    const parsed: Partial<ContentBrief> = {};

    // Extract client/brand name
    const brandPatterns = [
      /(?:company|brand|client|organization):\s*([^\n.]+)/i,
      /(?:for|client|brand)\s+([A-Z][a-zA-Z\s]+)(?:\s|,|\.)/,
      /([A-Z][a-zA-Z\s]{2,20})(?:\s+(?:wants|needs|is looking|requires))/i
    ];
    
    for (const pattern of brandPatterns) {
      const match = document.match(pattern);
      if (match && match[1]) {
        const brandName = match[1].trim();
        parsed.clientName = brandName;
        parsed.brandName = brandName;
        
        // Recognize major brands and set defaults
        const brandDefaults = getBrandDefaults(brandName);
        Object.assign(parsed, brandDefaults);
        break;
      }
    }

    // Extract industry
    const industries = [
      'technology', 'healthcare', 'finance', 'automotive', 'retail', 'education', 
      'manufacturing', 'consulting', 'media', 'real estate', 'hospitality',
      'pharmaceuticals', 'energy', 'telecommunications', 'insurance'
    ];
    
    for (const industry of industries) {
      if (doc.includes(industry)) {
        parsed.industry = industry.charAt(0).toUpperCase() + industry.slice(1);
        break;
      }
    }

    // Extract content type
    if (doc.includes('article') || doc.includes('news')) {
      parsed.contentType = 'article';
    } else if (doc.includes('blog') || doc.includes('post')) {
      parsed.contentType = 'blog-post';
    } else if (doc.includes('social') || doc.includes('twitter') || doc.includes('linkedin')) {
      parsed.contentType = 'social-posts';
    } else if (doc.includes('newsletter') || doc.includes('email')) {
      parsed.contentType = 'newsletter';
    } else if (doc.includes('case study')) {
      parsed.contentType = 'case-study';
    } else if (doc.includes('press release') || doc.includes('announcement')) {
      parsed.contentType = 'press-release';
    } else if (doc.includes('product') && doc.includes('description')) {
      parsed.contentType = 'product-description';
    } else if (doc.includes('landing page') || doc.includes('conversion')) {
      parsed.contentType = 'landing-page';
    }

    // Extract topic/subject
    const topicPatterns = [
      /(?:topic|subject|about|regarding):\s*([^\n.]+)/i,
      /(?:writing about|content on|article on)\s+([^\n.]+)/i,
      /(?:focus on|covers?)\s+([^\n.]+)/i
    ];
    
    for (const pattern of topicPatterns) {
      const match = document.match(pattern);
      if (match && match[1]) {
        parsed.topic = match[1].trim().replace(/[.!?]+$/, '');
        break;
      }
    }

    // Extract main message
    const messagePatterns = [
      /(?:main message|key message|message):\s*([^\n]+)/i,
      /(?:communicate|message is|wants to say)\s+([^\n.]+)/i,
      /(?:key point|main point):\s*([^\n]+)/i
    ];
    
    for (const pattern of messagePatterns) {
      const match = document.match(pattern);
      if (match && match[1]) {
        parsed.mainMessage = match[1].trim();
        break;
      }
    }

    // Extract target audience
    const audiencePatterns = [
      /(?:target audience|audience|target):\s*([^\n]+)/i,
      /(?:for|targeting)\s+(executives|professionals|consumers|customers|users|managers|directors|[A-Z][a-z-]+\s+professionals)/i,
      /(?:aimed at|directed at|intended for)\s+([^\n.]+)/i
    ];
    
    for (const pattern of audiencePatterns) {
      const match = document.match(pattern);
      if (match && match[1]) {
        parsed.targetAudience = match[1].trim();
        break;
      }
    }

    // Extract tone
    if (doc.includes('professional') || doc.includes('formal')) {
      parsed.tone = 'professional';
    } else if (doc.includes('casual') || doc.includes('informal')) {
      parsed.tone = 'casual';
    } else if (doc.includes('friendly') || doc.includes('approachable')) {
      parsed.tone = 'friendly';
    } else if (doc.includes('authoritative') || doc.includes('expert')) {
      parsed.tone = 'authoritative';
    } else if (doc.includes('conversational')) {
      parsed.tone = 'conversational';
    } else if (doc.includes('technical') || doc.includes('detailed')) {
      parsed.tone = 'technical';
    } else if (doc.includes('persuasive') || doc.includes('compelling')) {
      parsed.tone = 'persuasive';
    }

    // Extract word count
    const wordCountMatch = document.match(/(\d{3,4})\s*words?/i);
    if (wordCountMatch) {
      parsed.wordCount = parseInt(wordCountMatch[1]);
    } else {
      // Set default based on content type
      const defaultWordCounts = {
        'article': 800,
        'blog-post': 1200,
        'social-posts': 300,
        'newsletter': 600,
        'case-study': 2000,
        'press-release': 400,
        'product-description': 300,
        'landing-page': 600
      };
      parsed.wordCount = defaultWordCounts[parsed.contentType as keyof typeof defaultWordCounts] || 800;
    }

    // Extract budget (look for currency symbols and amounts)
    const budgetMatch = document.match(/(?:budget|cost|price)[\s:]*[€$£]?\s*(\d{1,3}[,.]?\d{0,3})\s*[kK]?/i);
    if (budgetMatch) {
      const amount = parseInt(budgetMatch[1].replace(/[,.]/g, ''));
      if (amount >= 250) {
        parsed.budget = '250K+';
      } else if (amount >= 100) {
        parsed.budget = '100K - 250K';
      } else if (amount >= 50) {
        parsed.budget = '50K - 100K';
      } else if (amount >= 25) {
        parsed.budget = '25K - 50K';
      } else if (amount >= 10) {
        parsed.budget = '10K - 25K';
      } else {
        parsed.budget = '5K - 10K';
      }
    }

    // Extract pageview targets
    const pageviewMatch = document.match(/(\d{1,3})[,.]?(\d{0,3})\s*[kKmM]?\+?\s*(?:pageviews?|views?|traffic)/i);
    if (pageviewMatch) {
      let views = parseInt(pageviewMatch[1] + (pageviewMatch[2] || ''));
      if (document.includes('million') || document.includes('M')) {
        views *= 1000000;
      } else if (document.includes('thousand') || document.includes('K') || document.includes('k')) {
        views *= 1000;
      }
      
      if (views >= 1000000) {
        parsed.guaranteedPageviews = 1000000;
      } else if (views >= 500000) {
        parsed.guaranteedPageviews = 500000;
      } else if (views >= 250000) {
        parsed.guaranteedPageviews = 250000;
      } else if (views >= 100000) {
        parsed.guaranteedPageviews = 100000;
      } else if (views >= 50000) {
        parsed.guaranteedPageviews = 50000;
      } else if (views >= 25000) {
        parsed.guaranteedPageviews = 25000;
      } else {
        parsed.guaranteedPageviews = 10000;
      }
    }

    // Extract social platforms
    const socialPlatforms = [];
    if (doc.includes('linkedin')) socialPlatforms.push('LinkedIn');
    if (doc.includes('twitter') || doc.includes('x.com')) socialPlatforms.push('Twitter/X');
    if (doc.includes('facebook')) socialPlatforms.push('Facebook');
    if (doc.includes('instagram')) socialPlatforms.push('Instagram');
    if (doc.includes('tiktok')) socialPlatforms.push('TikTok');
    if (doc.includes('youtube')) socialPlatforms.push('YouTube');
    if (doc.includes('pinterest')) socialPlatforms.push('Pinterest');
    
    if (socialPlatforms.length > 0) {
      parsed.socialPlatforms = socialPlatforms;
    }

    // Extract keywords
    const keywordMatch = document.match(/(?:keywords?|tags?):\s*([^\n]+)/i);
    if (keywordMatch) {
      const keywords = keywordMatch[1].split(/[,;]/).map(k => k.trim()).filter(k => k.length > 2);
      parsed.keywords = keywords;
    }

    // Extract deadline
    const deadlineMatch = document.match(/(?:deadline|due|by)\s+(\d{4}-\d{2}-\d{2}|\d{1,2}\/\d{1,2}\/\d{4})/i);
    if (deadlineMatch) {
      parsed.deadline = deadlineMatch[1];
    }

    // Set brand voice based on known information
    if (parsed.clientName) {
      parsed.brandVoice = `Professional ${parsed.industry || 'industry'} expertise with clear, authoritative communication that builds trust and drives action.`;
    }

    // Set SEO focus based on topic and industry
    if (parsed.topic && parsed.industry) {
      parsed.seoFocus = `${parsed.topic} in ${parsed.industry}`;
    }

    return parsed;
  };

  const getBrandDefaults = (brandName: string): Partial<ContentBrief> => {
    const brand = brandName.toLowerCase();
    
    // Major tech companies
    if (brand.includes('microsoft')) {
      return {
        industry: 'Technology',
        brandVoice: 'Innovative, trustworthy, and empowering. Focus on productivity and digital transformation.',
        tone: 'professional',
        guaranteedPageviews: 250000,
        budget: '100K - 250K'
      };
    }
    
    if (brand.includes('google')) {
      return {
        industry: 'Technology',
        brandVoice: 'Innovative, accessible, and user-focused. Emphasize simplicity and helpfulness.',
        tone: 'friendly',
        guaranteedPageviews: 500000,
        budget: '250K+'
      };
    }
    
    if (brand.includes('apple')) {
      return {
        industry: 'Technology',
        brandVoice: 'Premium, innovative, and design-focused. Emphasize simplicity and quality.',
        tone: 'authoritative',
        guaranteedPageviews: 500000,
        budget: '250K+'
      };
    }

    // Financial services
    if (brand.includes('bank') || brand.includes('financial')) {
      return {
        industry: 'Finance',
        brandVoice: 'Trustworthy, professional, and secure. Focus on reliability and expertise.',
        tone: 'professional',
        guaranteedPageviews: 100000,
        budget: '50K - 100K'
      };
    }

    // Healthcare
    if (brand.includes('health') || brand.includes('medical') || brand.includes('pharma')) {
      return {
        industry: 'Healthcare',
        brandVoice: 'Caring, professional, and evidence-based. Focus on patient outcomes and trust.',
        tone: 'professional',
        guaranteedPageviews: 100000,
        budget: '50K - 100K'
      };
    }

    // Automotive
    if (brand.includes('bmw') || brand.includes('mercedes') || brand.includes('audi') || brand.includes('toyota')) {
      return {
        industry: 'Automotive',
        brandVoice: 'Premium, performance-focused, and innovative. Emphasize quality and engineering.',
        tone: 'authoritative',
        guaranteedPageviews: 250000,
        budget: '100K - 250K'
      };
    }

    // Default for unknown brands
    return {
      industry: 'Technology',
      brandVoice: 'Professional, trustworthy, and customer-focused.',
      tone: 'professional',
      guaranteedPageviews: 50000,
      budget: '25K - 50K'
    };
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
          
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Project Budget *</label>
              <select
                className="input-field"
                value={brief.budget}
                onChange={(e) => setBrief(prev => ({ ...prev, budget: e.target.value }))}
                required
              >
                <option value="5K - 10K">€5K - €10K</option>
                <option value="10K - 25K">€10K - €25K</option>
                <option value="25K - 50K">€25K - €50K</option>
                <option value="50K - 100K">€50K - €100K</option>
                <option value="100K - 250K">€100K - €250K</option>
                <option value="250K+">€250K+</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Guaranteed Pageviews *</label>
              <select
                className="input-field"
                value={brief.guaranteedPageviews}
                onChange={(e) => setBrief(prev => ({ ...prev, guaranteedPageviews: parseInt(e.target.value) }))}
                required
              >
                <option value={10000}>10,000+ pageviews</option>
                <option value={25000}>25,000+ pageviews</option>
                <option value={50000}>50,000+ pageviews</option>
                <option value={100000}>100,000+ pageviews</option>
                <option value={250000}>250,000+ pageviews</option>
                <option value={500000}>500,000+ pageviews</option>
                <option value={1000000}>1M+ pageviews</option>
              </select>
            </div>
            
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