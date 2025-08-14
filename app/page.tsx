'use client';

import { useState } from 'react';
import ContentBriefForm from './components/ContentBriefForm';
import GeneratedContentDisplay from './components/GeneratedContentDisplay';
import { ContentBrief, GeneratedContent } from './types';
import { generateContent } from './utils/contentGenerator';
import { generateStoryContent } from './utils/storyContentGenerator';
import { Sparkles, ArrowLeft, Brain, Zap, FileText, Target, Rocket } from 'lucide-react';

export default function Home() {
  const [currentStep, setCurrentStep] = useState<'briefing' | 'content'>('briefing');
  const [briefData, setBriefData] = useState<ContentBrief | null>(null);
  const [generatedContent, setGeneratedContent] = useState<GeneratedContent | null>(null);
  const [loading, setLoading] = useState(false);

  const handleBriefSubmit = async (brief: ContentBrief) => {
    setLoading(true);
    setBriefData(brief);
    
    // Simulate AI processing time
    setTimeout(() => {
      const content = generateContent(brief);
      setGeneratedContent(content);
      setCurrentStep('content');
      setLoading(false);
    }, 4000);
  };

  const handleBackToBriefing = () => {
    setCurrentStep('briefing');
  };

  const handleNewBrief = () => {
    setCurrentStep('briefing');
    setBriefData(null);
    setGeneratedContent(null);
  };

  const handleContentEdit = (updatedContent: GeneratedContent) => {
    setGeneratedContent(updatedContent);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg">
                <Rocket className="text-white" size={24} />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Content Production Platform</h1>
                <p className="text-sm text-gray-500">AI-Powered Content Generation for Publishers</p>
              </div>
            </div>
            {currentStep === 'content' && (
              <div className="flex items-center space-x-4">
                <button
                  onClick={handleNewBrief}
                  className="flex items-center space-x-2 btn-secondary"
                >
                  <FileText size={16} />
                  <span>New Content</span>
                </button>
                <button
                  onClick={handleBackToBriefing}
                  className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 transition-colors"
                >
                  <ArrowLeft size={16} />
                  <span>Back to Brief</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {currentStep === 'briefing' && (
          <>
            {/* Hero Section */}
            <div className="text-center mb-12">
              <div className="flex items-center justify-center space-x-3 mb-4">
                <Rocket className="text-blue-600" size={40} />
                <Zap className="text-yellow-500" size={36} />
                <FileText className="text-green-600" size={32} />
              </div>
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Generate Professional Content Instantly
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
                Just paste your client briefing - our AI auto-fills all fields and generates ready-to-publish content. 
                Reduce production costs by 70% and eliminate hours of manual writing work with guaranteed pageview performance.
              </p>
              
              {/* Key Benefits */}
              <div className="grid md:grid-cols-4 gap-6 max-w-5xl mx-auto mb-12">
                <div className="bg-white rounded-lg p-6 shadow-sm border">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <Brain className="text-blue-600" size={24} />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Smart Auto-Fill</h3>
                  <p className="text-sm text-gray-600">Paste client briefs - AI extracts all info and fills forms automatically</p>
                </div>
                
                <div className="bg-white rounded-lg p-6 shadow-sm border">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <Target className="text-green-600" size={24} />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">SEO Optimized</h3>
                  <p className="text-sm text-gray-600">Built-in SEO optimization with keywords and meta descriptions</p>
                </div>
                
                <div className="bg-white rounded-lg p-6 shadow-sm border">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <Brain className="text-purple-600" size={24} />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Multi-Format</h3>
                  <p className="text-sm text-gray-600">Articles, social posts, newsletters, and more from one brief</p>
                </div>
                
                <div className="bg-white rounded-lg p-6 shadow-sm border">
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <Sparkles className="text-orange-600" size={24} />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Guaranteed Performance</h3>
                  <p className="text-sm text-gray-600">10K-1M+ pageviews guaranteed with AI-optimized SEO and keywords</p>
                </div>
              </div>
            </div>

            {/* Content Brief Form */}
            <ContentBriefForm onSubmit={handleBriefSubmit} loading={loading} />
            
            {loading && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white rounded-xl p-8 max-w-md mx-4 text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Generating Your Content
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Our AI is creating professional content based on your brief...
                  </p>
                  <div className="text-sm text-gray-500">
                    <div className="flex items-center justify-center space-x-2 mb-2">
                      <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></div>
                      <span>Analyzing content requirements</span>
                    </div>
                    <div className="flex items-center justify-center space-x-2 mb-2">
                      <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse animation-delay-200"></div>
                      <span>Generating main content</span>
                    </div>
                    <div className="flex items-center justify-center space-x-2 mb-2">
                      <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse animation-delay-400"></div>
                      <span>Optimizing for SEO</span>
                    </div>
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse animation-delay-600"></div>
                      <span>Creating social media posts</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </>
        )}

        {currentStep === 'content' && briefData && generatedContent && (
          <>
            {/* Success Message */}
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-8">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <Sparkles className="text-green-600" size={16} />
                </div>
                <div>
                  <h3 className="text-green-800 font-semibold">Content Generated Successfully!</h3>
                  <p className="text-green-700 text-sm">
                    Your content for {briefData.brand.name} is ready for review and publishing.
                  </p>
                </div>
              </div>
            </div>

            {/* Generated Content Display */}
            <GeneratedContentDisplay 
              content={generatedContent}
              onEdit={handleContentEdit}
              onExport={(format) => console.log(`Exporting as ${format}`)}
            />
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-500">
            <p className="text-sm">
              © 2024 Content Production Platform • AI-Powered Content Generation
            </p>
            <p className="text-xs mt-2">
              Reduce content production costs by 70% - Generate professional articles, blogs, and social posts instantly
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}