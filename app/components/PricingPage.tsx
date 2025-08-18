'use client';

import { Check, Rocket, ArrowLeft, Zap, Crown, Building2 } from 'lucide-react';

interface PricingPageProps {
  onBackToLogin: () => void;
}

export default function PricingPage({ onBackToLogin }: PricingPageProps) {
  const plans = [
    {
      name: 'Free',
      price: '€0',
      period: 'forever',
      icon: Rocket,
      description: 'Perfect for testing and small projects',
      features: [
        '5 content generations per month',
        'Basic article creation',
        'Standard templates',
        'Email support',
        'Dutch, French, English support'
      ],
      limitations: [
        'No advanced analytics',
        'Limited export formats',
        'Basic SEO optimization'
      ],
      buttonText: 'Start Free',
      buttonClass: 'bg-gray-600 hover:bg-gray-700'
    },
    {
      name: 'Professional',
      price: '€99',
      period: 'per month',
      icon: Zap,
      description: 'For content creators and small publishers',
      features: [
        'Unlimited content generation',
        'All content formats (article, social, newsletter)',
        'Advanced storytelling AI',
        'SEO optimization',
        'Performance analytics',
        'Export to all formats',
        'Priority support',
        'Custom voice & tone settings',
        'Multi-language support'
      ],
      limitations: [],
      buttonText: 'Start Professional',
      buttonClass: 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800',
      popular: true
    },
    {
      name: 'Enterprise',
      price: '€399',
      period: 'per month',
      icon: Crown,
      description: 'For large publishers and agencies',
      features: [
        'Everything in Professional',
        'Custom AI model training',
        'Brand voice consistency engine',
        'Advanced collaboration tools',
        'API access',
        'Custom integrations',
        'Dedicated account manager',
        'White-label options',
        'Advanced security features',
        'Custom reporting dashboards',
        'Priority feature requests'
      ],
      limitations: [],
      buttonText: 'Contact Sales',
      buttonClass: 'bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800'
    }
  ];

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
                <p className="text-sm text-gray-500">Choose Your Plan</p>
              </div>
            </div>
            <button
              onClick={onBackToLogin}
              className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 transition-colors"
            >
              <ArrowLeft size={16} />
              <span>Back to Login</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Choose the Perfect Plan for Your Content Creation
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Transform your briefings into compelling stories with AI-powered content generation. 
            Start free or unlock advanced features with our professional plans.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <div 
              key={plan.name} 
              className={`bg-white rounded-2xl shadow-lg border-2 p-8 relative ${
                plan.popular ? 'border-blue-500 scale-105' : 'border-gray-200'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-2 rounded-full text-sm font-medium">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="text-center mb-8">
                <div className="flex items-center justify-center mb-4">
                  <div className={`w-16 h-16 rounded-xl flex items-center justify-center ${
                    plan.name === 'Free' ? 'bg-gray-100' :
                    plan.name === 'Professional' ? 'bg-blue-100' : 'bg-purple-100'
                  }`}>
                    <plan.icon className={
                      plan.name === 'Free' ? 'text-gray-600' :
                      plan.name === 'Professional' ? 'text-blue-600' : 'text-purple-600'
                    } size={32} />
                  </div>
                </div>
                
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                <p className="text-gray-600 mb-4">{plan.description}</p>
                
                <div className="mb-6">
                  <span className="text-5xl font-bold text-gray-900">{plan.price}</span>
                  <span className="text-gray-600 ml-2">/ {plan.period}</span>
                </div>
              </div>

              {/* Features */}
              <div className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-start space-x-3">
                    <Check className="text-green-500 mt-0.5 flex-shrink-0" size={16} />
                    <span className="text-gray-700 text-sm">{feature}</span>
                  </div>
                ))}
                
                {plan.limitations.map((limitation, limitIndex) => (
                  <div key={limitIndex} className="flex items-start space-x-3 opacity-60">
                    <div className="w-4 h-4 mt-0.5 flex-shrink-0 rounded-full border border-gray-300"></div>
                    <span className="text-gray-600 text-sm line-through">{limitation}</span>
                  </div>
                ))}
              </div>

              {/* CTA Button */}
              <button 
                className={`w-full py-3 px-6 rounded-lg font-medium text-white transition-all ${plan.buttonClass}`}
                onClick={() => {
                  if (plan.name === 'Enterprise') {
                    window.open('mailto:sales@storyforge.com?subject=Enterprise Plan Inquiry', '_blank');
                  } else {
                    onBackToLogin();
                  }
                }}
              >
                {plan.buttonText}
              </button>
            </div>
          ))}
        </div>

        {/* Features Comparison */}
        <div className="mt-20">
          <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">
            Why Choose StoryForge?
          </h3>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center p-6">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Rocket className="text-blue-600" size={24} />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">AI-Powered Stories</h4>
              <p className="text-gray-600 text-sm">
                Transform promotional briefings into engaging educational content that readers actually want to read
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Building2 className="text-green-600" size={24} />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Publisher-Focused</h4>
              <p className="text-gray-600 text-sm">
                Built specifically for digital publishers with monetization and audience growth in mind
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Zap className="text-purple-600" size={24} />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Multi-Platform</h4>
              <p className="text-gray-600 text-sm">
                Generate content for articles, social media, newsletters, and more from a single briefing
              </p>
            </div>
          </div>
        </div>
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