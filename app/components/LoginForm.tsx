'use client';

import { useState } from 'react';
import { useAuth } from './AuthContext';
import { Mail, Lock, Eye, EyeOff, Rocket, ArrowRight, Sparkles, Zap, Target, Users, ArrowUpRight } from 'lucide-react';

interface LoginFormProps {
  onShowPricing: () => void;
}

export default function LoginForm({ onShowPricing }: LoginFormProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const { login, isLoading } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    // Pass isNewUser flag for registration
    const success = await login(email, password, !isLogin);
    if (!success) {
      setError('Please enter both email and password');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-3/4 left-1/2 w-64 h-64 bg-indigo-500/10 rounded-full blur-2xl animate-pulse delay-500"></div>
      </div>

      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.02)_1px,transparent_1px)] bg-[size:50px_50px]"></div>

      <div className="relative z-10 flex min-h-screen">
        {/* Left Side - Branding & Features */}
        <div className="hidden lg:flex lg:w-1/2 flex-col justify-center px-12 xl:px-16">
          <div className="max-w-lg">
            <div className="flex items-center space-x-3 mb-8">
              <div className="flex items-center justify-center w-14 h-14 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl shadow-lg">
                <Rocket className="text-white" size={32} />
              </div>
              <div>
                <h1 className="text-4xl font-bold text-white">ContentCraft</h1>
                <p className="text-slate-400">AI Content Creation Platform</p>
              </div>
            </div>

            <h2 className="text-3xl font-bold text-white mb-6 leading-tight">
              Transform Briefings into 
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"> Compelling Stories</span>
            </h2>
            
            <p className="text-slate-300 text-lg mb-8 leading-relaxed">
              Join thousands of publishers using ContentCraft to create authentic, engaging content that readers actually want to read.
            </p>

            {/* Feature List */}
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="flex items-center justify-center w-10 h-10 bg-blue-500/20 rounded-lg">
                  <Sparkles className="text-blue-400" size={20} />
                </div>
                <div>
                  <h3 className="text-white font-semibold">AI-Powered Storytelling</h3>
                  <p className="text-slate-400 text-sm">Transform promotional content into engaging narratives</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="flex items-center justify-center w-10 h-10 bg-purple-500/20 rounded-lg">
                  <Zap className="text-purple-400" size={20} />
                </div>
                <div>
                  <h3 className="text-white font-semibold">Multi-Platform Publishing</h3>
                  <p className="text-slate-400 text-sm">Create content for articles, social, newsletters & more</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="flex items-center justify-center w-10 h-10 bg-indigo-500/20 rounded-lg">
                  <Target className="text-indigo-400" size={20} />
                </div>
                <div>
                  <h3 className="text-white font-semibold">SEO-Optimized Content</h3>
                  <p className="text-slate-400 text-sm">Built-in optimization that doesn't sacrifice storytelling</p>
                </div>
              </div>
            </div>

            {/* Social Proof */}
            <div className="mt-12 p-6 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10">
              <div className="flex items-center space-x-3 mb-3">
                <Users className="text-green-400" size={20} />
                <span className="text-white font-semibold">Trusted by Publishers</span>
              </div>
              <p className="text-slate-300 text-sm">
                "ContentCraft transformed how we create content. Our engagement rates increased by 340% in just 3 months."
              </p>
              <p className="text-slate-400 text-xs mt-2">— Editorial Director, Digital Media Group</p>
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
          <div className="max-w-md w-full">
            {/* Mobile Header */}
            <div className="lg:hidden text-center mb-8">
              <div className="flex items-center justify-center space-x-3 mb-4">
                <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl shadow-lg">
                  <Rocket className="text-white" size={28} />
                </div>
                <h1 className="text-3xl font-bold text-white">ContentCraft</h1>
              </div>
              <p className="text-slate-400">AI-Powered Content Creation</p>
            </div>

            {/* Login Card */}
            <div className="bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl p-8 border border-white/20">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-white mb-2">
                  {isLogin ? 'Welcome Back' : 'Create Account'}
                </h2>
                <p className="text-slate-300">
                  {isLogin ? 'Sign in to your ContentCraft account' : 'Join thousands of content creators'}
                </p>
              </div>
              <form onSubmit={handleSubmit} className="space-y-6">
                {!isLogin && (
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-2">
                      Full Name
                    </label>
                    <div className="relative">
                      <input
                        id="name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent backdrop-blur-sm transition-all"
                        placeholder="Enter your full name"
                        required
                      />
                    </div>
                  </div>
                )}

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400" size={18} />
                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent backdrop-blur-sm transition-all"
                      placeholder="Enter your email"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-slate-300 mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400" size={18} />
                    <input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-12 pr-12 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent backdrop-blur-sm transition-all"
                      placeholder="Enter your password"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-white transition-colors"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                {error && (
                  <div className="bg-red-500/20 border border-red-500/30 rounded-xl p-4 backdrop-blur-sm">
                    <p className="text-red-200 text-sm">{error}</p>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-4 rounded-xl font-medium hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-transparent disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center space-x-2 shadow-lg"
                >
                  {isLoading ? (
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  ) : (
                    <>
                      <span>{isLogin ? 'Sign In' : 'Create Account'}</span>
                      <ArrowRight size={18} />
                    </>
                  )}
                </button>

              </form>

              {/* Toggle Login/Register */}
              <div className="mt-8 text-center">
                <p className="text-slate-300">
                  {isLogin ? "Don't have an account?" : "Already have an account?"}{' '}
                  <button
                    onClick={() => setIsLogin(!isLogin)}
                    className="text-blue-400 hover:text-blue-300 font-medium transition-colors"
                  >
                    {isLogin ? 'Sign up' : 'Sign in'}
                  </button>
                </p>
              </div>


              {/* Pricing Link */}
              <div className="mt-6 text-center">
                <button
                  onClick={onShowPricing}
                  className="group inline-flex items-center space-x-2 text-slate-400 hover:text-white transition-colors"
                >
                  <span className="text-sm">View Pricing Plans</span>
                  <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}