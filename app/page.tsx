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
                <h1 className="text-xl font-bold text-gray-900">StoryForge</h1>
                <p className="text-sm text-gray-500">AI-Powered Content Creation for Publishers</p>
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
                Transform Briefings into Compelling Stories
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
                Paste any campaign briefing and watch StoryForge create engaging, educational articles that readers actually want to read. 
                Our AI transforms promotional content into authentic storytelling that builds trust and drives engagement.
              </p>
              
              {/* Key Benefits */}
              <div className="grid md:grid-cols-4 gap-6 max-w-5xl mx-auto mb-12">
                <div className="bg-white rounded-lg p-6 shadow-sm border">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <Brain className="text-blue-600" size={24} />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Instant Brief Analysis</h3>
                  <p className="text-sm text-gray-600">Paste any briefing - StoryForge extracts key insights and builds story angles automatically</p>
                </div>
                
                <div className="bg-white rounded-lg p-6 shadow-sm border">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <Target className="text-green-600" size={24} />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Story-First SEO</h3>
                  <p className="text-sm text-gray-600">SEO optimization that doesn't sacrifice storytelling - rank higher with engaging content</p>
                </div>
                
                <div className="bg-white rounded-lg p-6 shadow-sm border">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <Brain className="text-purple-600" size={24} />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Multi-Platform Stories</h3>
                  <p className="text-sm text-gray-600">Adapt your story for articles, social media, newsletters - all with consistent narrative</p>
                </div>
                
                <div className="bg-white rounded-lg p-6 shadow-sm border">
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <Sparkles className="text-orange-600" size={24} />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Authentic Engagement</h3>
                  <p className="text-sm text-gray-600">Stories people actually want to read - build trust and long-term audience relationships</p>
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
                    StoryForge is crafting your educational story from the briefing...
                  </p>
                  <div className="text-sm text-gray-500">
                    <div className="flex items-center justify-center space-x-2 mb-2">
                      <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></div>
                      <span>Finding the human story angle</span>
                    </div>
                    <div className="flex items-center justify-center space-x-2 mb-2">
                      <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse animation-delay-200"></div>
                      <span>Crafting educational narrative</span>
                    </div>
                    <div className="flex items-center justify-center space-x-2 mb-2">
                      <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse animation-delay-400"></div>
                      <span>Adding authentic character voices</span>
                    </div>
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse animation-delay-600"></div>
                      <span>Weaving in brand context naturally</span>
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
              © 2024 StoryForge • AI-Powered Content Creation Platform
            </p>
            <p className="text-xs mt-2">
              Transform promotional content into authentic stories that build trust and drive genuine engagement
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}