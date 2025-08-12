'use client';

import { useState } from 'react';
import BriefingForm from './components/BriefingForm';
import BlueprintDisplay from './components/BlueprintDisplay';
import { BriefingData, GeneratedBlueprint } from './types';
import { generateBlueprint } from './utils/blueprintGenerator';
import { Sparkles, ArrowLeft, Brain, Zap } from 'lucide-react';

export default function Home() {
  const [currentStep, setCurrentStep] = useState<'briefing' | 'blueprint'>('briefing');
  const [briefingData, setBriefingData] = useState<BriefingData | null>(null);
  const [blueprint, setBlueprint] = useState<GeneratedBlueprint | null>(null);
  const [loading, setLoading] = useState(false);

  const handleBriefingSubmit = async (data: BriefingData) => {
    setLoading(true);
    setBriefingData(data);
    
    // Simulate AI processing time
    setTimeout(() => {
      const generatedBlueprint = generateBlueprint(data);
      setBlueprint(generatedBlueprint);
      setCurrentStep('blueprint');
      setLoading(false);
    }, 3000);
  };

  const handleBackToBriefing = () => {
    setCurrentStep('briefing');
  };

  const handleNewBriefing = () => {
    setCurrentStep('briefing');
    setBriefingData(null);
    setBlueprint(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-primary-600 to-primary-700 rounded-lg">
                <Sparkles className="text-white" size={24} />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Branded Content Briefing</h1>
                <p className="text-sm text-gray-500">AI-Powered Publisher Strategy Generator</p>
              </div>
            </div>
            {currentStep === 'blueprint' && (
              <button
                onClick={handleBackToBriefing}
                className="flex items-center space-x-2 text-primary-600 hover:text-primary-700 transition-colors"
              >
                <ArrowLeft size={16} />
                <span>Back to Briefing</span>
              </button>
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
                <Brain className="text-primary-600" size={32} />
                <Zap className="text-yellow-500" size={28} />
              </div>
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Transform Your Content Strategy
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
                Generate a comprehensive, AI-powered content creation blueprint tailored specifically for your publishing business. 
                From ideation to monetization, get a strategic roadmap that maximizes speed, quality, and revenue.
              </p>
              
              {/* Key Benefits */}
              <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12">
                <div className="bg-white rounded-lg p-6 shadow-sm border">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <Zap className="text-blue-600" size={24} />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Instant Strategy</h3>
                  <p className="text-sm text-gray-600">Generate comprehensive content blueprints in minutes, not weeks</p>
                </div>
                
                <div className="bg-white rounded-lg p-6 shadow-sm border">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <Brain className="text-green-600" size={24} />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">AI-Powered Insights</h3>
                  <p className="text-sm text-gray-600">Leverage advanced algorithms for data-driven content optimization</p>
                </div>
                
                <div className="bg-white rounded-lg p-6 shadow-sm border">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <Sparkles className="text-purple-600" size={24} />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Sales-Ready Output</h3>
                  <p className="text-sm text-gray-600">Professional blueprints ready for client presentations and proposals</p>
                </div>
              </div>
            </div>

            {/* Briefing Form */}
            <BriefingForm onSubmit={handleBriefingSubmit} loading={loading} />
            
            {loading && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white rounded-xl p-8 max-w-md mx-4 text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Generating Your Blueprint
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Our AI is analyzing your requirements and creating a comprehensive content strategy...
                  </p>
                  <div className="text-sm text-gray-500">
                    <div className="flex items-center justify-center space-x-2 mb-2">
                      <div className="w-2 h-2 bg-primary-600 rounded-full animate-pulse"></div>
                      <span>Analyzing publisher requirements</span>
                    </div>
                    <div className="flex items-center justify-center space-x-2 mb-2">
                      <div className="w-2 h-2 bg-primary-600 rounded-full animate-pulse animation-delay-200"></div>
                      <span>Generating technical architecture</span>
                    </div>
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-2 h-2 bg-primary-600 rounded-full animate-pulse animation-delay-400"></div>
                      <span>Calculating ROI projections</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </>
        )}

        {currentStep === 'blueprint' && briefingData && blueprint && (
          <>
            {/* Success Message */}
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-8">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <Sparkles className="text-green-600" size={16} />
                </div>
                <div>
                  <h3 className="text-green-800 font-semibold">Blueprint Generated Successfully!</h3>
                  <p className="text-green-700 text-sm">
                    Your comprehensive content strategy blueprint for {briefingData.publisherName} is ready.
                  </p>
                </div>
                <button
                  onClick={handleNewBriefing}
                  className="ml-auto btn-secondary text-sm"
                >
                  New Briefing
                </button>
              </div>
            </div>

            {/* Blueprint Display */}
            <BlueprintDisplay 
              blueprint={blueprint} 
              publisherName={briefingData.publisherName}
            />
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-500">
            <p className="text-sm">
              © 2024 Branded Content Briefing Dashboard • AI-Powered Digital Publishing Strategy
            </p>
            <p className="text-xs mt-2">
              Built for sales teams to generate professional content creation blueprints instantly
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}