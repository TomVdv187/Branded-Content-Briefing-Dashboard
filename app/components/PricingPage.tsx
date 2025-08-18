'use client';

import { Check, Rocket, ArrowLeft, Zap, Crown, Building2, Star, Users, TrendingUp, Shield, Sparkles } from 'lucide-react';

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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-3/4 left-1/2 w-64 h-64 bg-indigo-500/10 rounded-full blur-2xl animate-pulse delay-500"></div>
        <div className="absolute top-1/2 right-1/3 w-80 h-80 bg-pink-500/10 rounded-full blur-3xl animate-pulse delay-700"></div>
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
                <p className="text-sm text-slate-400">Choose Your Plan</p>
              </div>
            </div>
            <button
              onClick={onBackToLogin}
              className="flex items-center space-x-2 text-slate-300 hover:text-white transition-colors bg-white/10 backdrop-blur-sm px-4 py-2 rounded-xl border border-white/20"
            >
              <ArrowLeft size={18} />
              <span>Back to Login</span>
            </button>
          </div>
        </div>
      </header>

      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Hero Section */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center space-x-2 bg-blue-500/10 backdrop-blur-sm px-4 py-2 rounded-full border border-blue-500/20 mb-8">
            <Star className="text-yellow-400" size={16} />
            <span className="text-blue-300 text-sm font-medium">Premium AI Content Creation</span>
          </div>
          
          <h2 className="text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Choose Your 
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent"> Creative Power</span>
          </h2>
          
          <p className="text-xl text-slate-300 max-w-4xl mx-auto leading-relaxed">
            Transform briefings into compelling stories with AI that understands your brand. 
            Join thousands of publishers creating authentic content that drives real engagement.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <div 
              key={plan.name} 
              className={`bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl border p-8 relative transition-all duration-300 hover:scale-105 hover:bg-white/15 ${
                plan.popular 
                  ? 'border-2 border-blue-500/50 shadow-blue-500/25 scale-105' 
                  : 'border-white/20 hover:border-white/30'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded-full text-sm font-medium shadow-lg">
                    <Sparkles className="inline w-4 h-4 mr-1" />
                    Most Popular
                  </div>
                </div>
              )}

              <div className="text-center mb-8">
                <div className="flex items-center justify-center mb-6">
                  <div className={`w-20 h-20 rounded-2xl flex items-center justify-center shadow-lg ${
                    plan.name === 'Free' ? 'bg-slate-800/50' :
                    plan.name === 'Professional' ? 'bg-blue-500/20' : 'bg-purple-500/20'
                  }`}>
                    <plan.icon className={
                      plan.name === 'Free' ? 'text-slate-300' :
                      plan.name === 'Professional' ? 'text-blue-400' : 'text-purple-400'
                    } size={36} />
                  </div>
                </div>
                
                <h3 className="text-3xl font-bold text-white mb-3">{plan.name}</h3>
                <p className="text-slate-300 mb-6 text-sm leading-relaxed">{plan.description}</p>
                
                <div className="mb-8">
                  <span className="text-6xl font-bold text-white">{plan.price}</span>
                  <span className="text-slate-400 ml-2 text-lg">/ {plan.period}</span>
                </div>
              </div>

              {/* Features */}
              <div className="space-y-3 mb-10">
                {plan.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-start space-x-3">
                    <div className="w-5 h-5 bg-green-500/20 rounded-full flex items-center justify-center mt-0.5 flex-shrink-0">
                      <Check className="text-green-400" size={12} />
                    </div>
                    <span className="text-slate-200 text-sm leading-relaxed">{feature}</span>
                  </div>
                ))}
                
                {plan.limitations.map((limitation, limitIndex) => (
                  <div key={limitIndex} className="flex items-start space-x-3 opacity-50">
                    <div className="w-5 h-5 mt-0.5 flex-shrink-0 rounded-full border border-slate-600"></div>
                    <span className="text-slate-500 text-sm line-through">{limitation}</span>
                  </div>
                ))}
              </div>

              {/* CTA Button */}
              <button 
                className={`w-full py-4 px-6 rounded-xl font-medium text-white transition-all transform hover:scale-105 active:scale-95 shadow-lg ${
                  plan.name === 'Free' 
                    ? 'bg-slate-700 hover:bg-slate-600 shadow-slate-900/25' :
                  plan.name === 'Professional' 
                    ? 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 shadow-blue-500/25' 
                    : 'bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 shadow-purple-500/25'
                }`}
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
        <div className="mt-24">
          <div className="text-center mb-16">
            <h3 className="text-3xl font-bold text-white mb-4">
              Why Choose ContentCraft?
            </h3>
            <p className="text-slate-300 max-w-2xl mx-auto">
              Join thousands of publishers who've transformed their content strategy with AI-powered storytelling
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center p-8 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10">
              <div className="w-16 h-16 bg-blue-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Rocket className="text-blue-400" size={28} />
              </div>
              <h4 className="text-xl font-bold text-white mb-4">AI-Powered Stories</h4>
              <p className="text-slate-300 leading-relaxed">
                Transform promotional briefings into engaging educational content that readers actually want to read
              </p>
            </div>
            
            <div className="text-center p-8 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10">
              <div className="w-16 h-16 bg-green-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <TrendingUp className="text-green-400" size={28} />
              </div>
              <h4 className="text-xl font-bold text-white mb-4">Publisher-Focused</h4>
              <p className="text-slate-300 leading-relaxed">
                Built specifically for digital publishers with monetization and audience growth in mind
              </p>
            </div>
            
            <div className="text-center p-8 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10">
              <div className="w-16 h-16 bg-purple-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Zap className="text-purple-400" size={28} />
              </div>
              <h4 className="text-xl font-bold text-white mb-4">Multi-Platform</h4>
              <p className="text-slate-300 leading-relaxed">
                Generate content for articles, social media, newsletters, and more from a single briefing
              </p>
            </div>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="mt-24 text-center">
          <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-12 border border-white/10 max-w-4xl mx-auto">
            <div className="flex items-center justify-center space-x-2 mb-6">
              <Shield className="text-green-400" size={24} />
              <span className="text-xl font-bold text-white">Trusted by Publishers Worldwide</span>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div>
                <div className="text-3xl font-bold text-blue-400 mb-2">10,000+</div>
                <div className="text-slate-300">Content pieces generated</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-purple-400 mb-2">500+</div>
                <div className="text-slate-300">Active publishers</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-green-400 mb-2">340%</div>
                <div className="text-slate-300">Average engagement increase</div>
              </div>
            </div>
          </div>
        </div>
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
              <p className="mt-2">Built for publishers who value authentic storytelling</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}