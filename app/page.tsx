'use client';

import { useState } from 'react';
import ContentBriefForm from './components/ContentBriefForm';
import GeneratedContentDisplay from './components/GeneratedContentDisplay';
import LoginForm from './components/LoginForm';
import PricingPage from './components/PricingPage';
import PlanGate from './components/PlanGate';
import { AuthProvider, useAuth } from './components/AuthContext';
import { useUsageTracking } from './hooks/useUsageTracking';
import { ContentBrief, GeneratedContent } from './types';
import { generateContent } from './utils/contentGenerator';
import { generateStoryContent } from './utils/storyContentGenerator';
import { Sparkles, ArrowLeft, Brain, Zap, FileText, Target, Rocket, LogOut, User, BarChart3, AlertCircle } from 'lucide-react';

function MainApp() {
  const { user, logout } = useAuth();
  const { usage, incrementUsage, canGenerate, getRemainingGenerations, getUsagePercentage } = useUsageTracking();
  const [currentStep, setCurrentStep] = useState<'briefing' | 'content'>('briefing');
  const [briefData, setBriefData] = useState<ContentBrief | null>(null);
  const [generatedContent, setGeneratedContent] = useState<GeneratedContent | null>(null);
  const [loading, setLoading] = useState(false);

  const handleBriefSubmit = async (brief: ContentBrief) => {
    // Check if user can generate content
    if (!canGenerate()) {
      alert(`You've reached your monthly generation limit. Upgrade to Professional for unlimited generations!`);
      return;
    }

    setLoading(true);
    setBriefData(brief);
    
    // Simulate AI processing time
    setTimeout(() => {
      const content = generateContent(brief);
      setGeneratedContent(content);
      setCurrentStep('content');
      setLoading(false);
      
      // Increment usage after successful generation
      incrementUsage();
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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-gray-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-slate-600/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-3/4 left-1/2 w-64 h-64 bg-indigo-500/5 rounded-full blur-2xl animate-pulse delay-500"></div>
        <div className="absolute top-1/2 right-1/3 w-80 h-80 bg-gray-500/5 rounded-full blur-3xl animate-pulse delay-700"></div>
      </div>

      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.02)_1px,transparent_1px)] bg-[size:50px_50px]"></div>

      {/* Header */}
      <header className="relative z-10 bg-white/5 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center space-x-4">
              <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl shadow-lg">
                <Rocket className="text-white" size={28} />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">ContentCraft</h1>
                <p className="text-sm text-slate-400">AI-Powered Content Creation for Publishers</p>
              </div>
            </div>
            
            {/* User Menu */}
            <div className="flex items-center space-x-4">
              {/* Usage Indicator */}
              {user?.plan === 'free' && (
                <div className="flex items-center space-x-2 bg-yellow-500/10 backdrop-blur-sm px-3 py-2 rounded-lg border border-yellow-500/20">
                  <BarChart3 className="text-yellow-400" size={16} />
                  <span className="text-yellow-300 text-sm font-medium">
                    {getRemainingGenerations()} left
                  </span>
                </div>
              )}
              
              <div className="flex items-center space-x-3 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-xl border border-white/20">
                <div className="flex items-center justify-center w-8 h-8 bg-white/20 rounded-lg">
                  <User className="text-white" size={16} />
                </div>
                <div>
                  <span className="text-white text-sm font-medium">{user?.name}</span>
                  <span className={`ml-2 px-2 py-1 text-xs rounded-full font-medium ${
                    user?.plan === 'enterprise' ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30' :
                    user?.plan === 'professional' ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30' :
                    'bg-slate-500/20 text-slate-300 border border-slate-500/30'
                  }`}>
                    {user?.plan}
                  </span>
                </div>
              </div>
              <button
                onClick={logout}
                className="flex items-center space-x-2 text-slate-300 hover:text-white transition-colors bg-white/10 backdrop-blur-sm px-4 py-2 rounded-xl border border-white/20 hover:border-white/30"
              >
                <LogOut size={18} />
                <span className="text-sm font-medium">Logout</span>
              </button>
            </div>
            
            {currentStep === 'content' && (
              <div className="flex items-center space-x-3">
                <button
                  onClick={handleNewBrief}
                  className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-xl border border-white/20 text-slate-300 hover:text-white hover:border-white/30 transition-all"
                >
                  <FileText size={16} />
                  <span className="text-sm font-medium">New Content</span>
                </button>
                <button
                  onClick={handleBackToBriefing}
                  className="flex items-center space-x-2 bg-blue-500/20 backdrop-blur-sm px-4 py-2 rounded-xl border border-blue-500/30 text-blue-300 hover:text-blue-200 hover:border-blue-400/30 transition-all"
                >
                  <ArrowLeft size={16} />
                  <span className="text-sm font-medium">Back to Brief</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {currentStep === 'briefing' && (
          <>
            {/* Hero Section */}
            <div className="text-center mb-16">
              <div className="flex items-center justify-center space-x-4 mb-6">
                <div className="w-16 h-16 bg-blue-500/20 rounded-2xl flex items-center justify-center">
                  <Rocket className="text-blue-400" size={32} />
                </div>
                <div className="w-16 h-16 bg-yellow-500/20 rounded-2xl flex items-center justify-center">
                  <Zap className="text-yellow-400" size={32} />
                </div>
                <div className="w-16 h-16 bg-green-500/20 rounded-2xl flex items-center justify-center">
                  <FileText className="text-green-400" size={32} />
                </div>
              </div>
              <h2 className="text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                Transform Briefings into 
                <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent"> Compelling Stories</span>
              </h2>
              <p className="text-xl text-slate-300 max-w-4xl mx-auto mb-12 leading-relaxed">
                Paste any campaign briefing and watch ContentCraft create engaging, educational articles that readers actually want to read. 
                Our AI transforms promotional content into authentic storytelling that builds trust and drives engagement.
              </p>
              
              {/* Key Benefits */}
              <div className="grid md:grid-cols-4 gap-6 max-w-6xl mx-auto mb-16">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 hover:bg-white/15 transition-all">
                  <div className="w-14 h-14 bg-blue-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Brain className="text-blue-400" size={28} />
                  </div>
                  <h3 className="font-bold text-white mb-3 text-lg">Instant Brief Analysis</h3>
                  <p className="text-slate-300 text-sm leading-relaxed">Paste any briefing - ContentCraft extracts key insights and builds story angles automatically</p>
                </div>
                
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 hover:bg-white/15 transition-all">
                  <div className="w-14 h-14 bg-green-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Target className="text-green-400" size={28} />
                  </div>
                  <h3 className="font-bold text-white mb-3 text-lg">Story-First SEO</h3>
                  <p className="text-slate-300 text-sm leading-relaxed">SEO optimization that doesn't sacrifice storytelling - rank higher with engaging content</p>
                </div>
                
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 hover:bg-white/15 transition-all">
                  <div className="w-14 h-14 bg-purple-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Brain className="text-purple-400" size={28} />
                  </div>
                  <h3 className="font-bold text-white mb-3 text-lg">Multi-Platform Stories</h3>
                  <p className="text-slate-300 text-sm leading-relaxed">Adapt your story for articles, social media, newsletters - all with consistent narrative</p>
                </div>
                
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 hover:bg-white/15 transition-all">
                  <div className="w-14 h-14 bg-orange-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Sparkles className="text-orange-400" size={28} />
                  </div>
                  <h3 className="font-bold text-white mb-3 text-lg">Authentic Engagement</h3>
                  <p className="text-slate-300 text-sm leading-relaxed">Stories people actually want to read - build trust and long-term audience relationships</p>
                </div>
              </div>
            </div>

            {/* Content Brief Form */}
            <ContentBriefForm onSubmit={handleBriefSubmit} loading={loading} />
            
            {loading && (
              <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
                <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-12 max-w-md mx-4 text-center border border-white/20 shadow-2xl">
                  <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-400 mx-auto mb-6"></div>
                  <h3 className="text-2xl font-bold text-white mb-4">
                    Generating Your Content
                  </h3>
                  <p className="text-slate-300 mb-8 leading-relaxed">
                    ContentCraft is crafting your educational story from the briefing...
                  </p>
                  <div className="text-sm text-slate-400 space-y-3">
                    <div className="flex items-center justify-center space-x-3">
                      <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                      <span className="text-slate-300">Finding the human story angle</span>
                    </div>
                    <div className="flex items-center justify-center space-x-3">
                      <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse animation-delay-200"></div>
                      <span className="text-slate-300">Crafting educational narrative</span>
                    </div>
                    <div className="flex items-center justify-center space-x-3">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse animation-delay-400"></div>
                      <span className="text-slate-300">Adding authentic character voices</span>
                    </div>
                    <div className="flex items-center justify-center space-x-3">
                      <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse animation-delay-600"></div>
                      <span className="text-slate-300">Weaving in brand context naturally</span>
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
            <div className="bg-green-500/10 backdrop-blur-sm border border-green-500/30 rounded-2xl p-6 mb-8">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-green-500/20 rounded-2xl flex items-center justify-center">
                  <Sparkles className="text-green-400" size={24} />
                </div>
                <div>
                  <h3 className="text-green-300 font-bold text-lg">Content Generated Successfully!</h3>
                  <p className="text-green-200/80">
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
      <footer className="relative z-10 bg-white/5 backdrop-blur-xl border-t border-white/10 mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl">
                <Rocket className="text-white" size={20} />
              </div>
              <span className="text-xl font-bold text-white">ContentCraft</span>
            </div>
            <p className="text-slate-400 mb-6 max-w-2xl mx-auto leading-relaxed">
              Transform promotional content into authentic stories that build trust and drive genuine engagement
            </p>
            <div className="text-slate-500 text-sm">
              <p>© 2024 ContentCraft • AI-Powered Content Creation Platform</p>
              <p className="mt-2 text-slate-500">Built for publishers who value authentic storytelling</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default function Home() {
  const [showPricing, setShowPricing] = useState(false);
  
  return (
    <AuthProvider>
      <AuthenticatedApp 
        showPricing={showPricing} 
        setShowPricing={setShowPricing}
      />
    </AuthProvider>
  );
}

function AuthenticatedApp({ 
  showPricing, 
  setShowPricing 
}: { 
  showPricing: boolean; 
  setShowPricing: (show: boolean) => void; 
}) {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-slate-300">Loading ContentCraft...</p>
        </div>
      </div>
    );
  }

  // Show pricing page if requested
  if (showPricing && !user) {
    return <PricingPage onBackToLogin={() => setShowPricing(false)} />;
  }

  // Show login if not authenticated
  if (!user) {
    return <LoginForm onShowPricing={() => setShowPricing(true)} />;
  }

  // Show main app if authenticated
  return <MainApp />;
}