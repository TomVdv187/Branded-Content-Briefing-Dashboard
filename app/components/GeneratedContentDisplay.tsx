'use client';

import React, { useState, useRef } from 'react';
import { GeneratedContent } from '../types';
import { FileText, Download, Edit3, Copy, Share2, Eye, Hash, Clock, BarChart3, Globe, Image, Play, MessageCircle, Camera, Brain, Zap, Send, Lock } from 'lucide-react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import PerformanceAnalytics from './PerformanceAnalytics';
import ContentOptimizationSuggestions from './ContentOptimizationSuggestions';
import PublishingIntegration from './PublishingIntegration';
import PlanGate from './PlanGate';
import { useUsageTracking } from '../hooks/useUsageTracking';

interface GeneratedContentDisplayProps {
  content: GeneratedContent;
  onEdit?: (content: GeneratedContent) => void;
  onExport?: (format: 'pdf' | 'docx' | 'html') => void;
}

export default function GeneratedContentDisplay({ content, onEdit, onExport }: GeneratedContentDisplayProps) {
  const { getPlanFeatures, getEffectivePlan } = useUsageTracking();
  const [activeTab, setActiveTab] = useState<'article' | 'social' | 'seo' | 'analytics' | 'optimize' | 'publish' | 'images'>('article');
  const [isEditing, setIsEditing] = useState(false);
  const [socialPlatform, setSocialPlatform] = useState<'instagram' | 'facebook' | 'linkedin' | 'tiktok' | 'youtube' | 'newsletter'>('instagram');
  const contentRef = useRef<HTMLDivElement>(null);
  
  const planFeatures = getPlanFeatures();
  const effectivePlan = getEffectivePlan();

  const formatContent = (text: string) => {
    return text.split('\n').map((line, index) => {
      if (line.startsWith('# ')) {
        return <h1 key={index} className="text-3xl font-bold text-white mt-8 mb-4">{line.substring(2)}</h1>;
      }
      if (line.startsWith('## ')) {
        return <h2 key={index} className="text-2xl font-bold text-white mt-6 mb-3">{line.substring(3)}</h2>;
      }
      if (line.startsWith('### ')) {
        return <h3 key={index} className="text-xl font-semibold text-slate-200 mt-4 mb-2">{line.substring(4)}</h3>;
      }
      if (line.startsWith('**') && line.endsWith('**')) {
        return <p key={index} className="font-semibold text-white mt-3 mb-1">{line.slice(2, -2)}</p>;
      }
      if (line.startsWith('• ')) {
        return (
          <div key={index} className="flex items-start space-x-2 mt-1 ml-4">
            <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></span>
            <p className="text-slate-300">{line.substring(2)}</p>
          </div>
        );
      }
      if (line.trim()) {
        return <p key={index} className="text-slate-300 mt-2 leading-relaxed">{line}</p>;
      }
      return <div key={index} className="mt-2"></div>;
    });
  };

  const handleSaveEdit = () => {
    if (onEdit && content.article) {
      const updatedContent = {
        ...content,
        article: {
          ...content.article,
          title: content.article.title,
          content: content.article.content
        }
      };
      onEdit(updatedContent);
    }
    setIsEditing(false);
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    // You could add a toast notification here
  };

  const exportToPDF = async () => {
    // Check if PDF export is available in current plan
    if (!planFeatures.exportFormats.includes('pdf')) {
      alert(`PDF export is available in ${effectivePlan === 'free' ? 'Professional' : 'Enterprise'} plans. Please upgrade to access this feature.`);
      return;
    }

    if (contentRef.current) {
      const canvas = await html2canvas(contentRef.current);
      const imgData = canvas.toDataURL('image/png');
      
      const pdf = new jsPDF();
      const imgWidth = 210;
      const pageHeight = 295;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;

      let position = 0;

      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save(`${content.article?.title || 'content'}.pdf`);
    }
  };

  const TabButton = ({ id, label, icon: Icon }: { id: string, label: string, icon: React.ComponentType<any> }) => {
    // Check if this feature is available for the current plan
    const isRestricted = (id === 'analytics' && !planFeatures.analytics) || 
                        (id === 'optimize' && effectivePlan === 'free') || 
                        (id === 'publish' && effectivePlan === 'free');
    
    return (
      <button
        onClick={() => !isRestricted && setActiveTab(id as any)}
        disabled={isRestricted}
        className={`flex items-center space-x-2 px-4 py-3 font-medium rounded-lg transition-colors ${
          activeTab === id
            ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
            : isRestricted
            ? 'text-slate-500 cursor-not-allowed opacity-60'
            : 'text-slate-300 hover:text-white hover:bg-white/10'
        }`}
      >
        <Icon size={18} />
        <span className="text-white">{label}</span>
        {isRestricted && <Lock size={14} className="text-yellow-400" />}
      </button>
    );
  };

  const renderSocialContent = () => {
    const platforms = [
      { id: 'instagram', name: 'Instagram', icon: Camera },
      { id: 'facebook', name: 'Facebook', icon: Share2 },
      { id: 'linkedin', name: 'LinkedIn', icon: Share2 },
      { id: 'tiktok', name: 'TikTok', icon: Play },
      { id: 'youtube', name: 'YouTube', icon: Play },
      { id: 'newsletter', name: 'Newsletter', icon: MessageCircle }
    ];

    const selectedContent = content[socialPlatform as keyof typeof content];

    return (
      <div className="space-y-6">
        {/* Platform Selector */}
        <div className="flex flex-wrap gap-2">
          {platforms.map(platform => (
            <button
              key={platform.id}
              onClick={() => setSocialPlatform(platform.id as any)}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors text-sm ${
                socialPlatform === platform.id
                  ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                  : 'bg-white/10 text-slate-300 hover:bg-white/20'
              }`}
            >
              <platform.icon size={16} />
              <span className="text-white">{platform.name}</span>
            </button>
          ))}
        </div>

        {/* Content Display */}
        <div className="bg-slate-700/50 rounded-lg p-6 border border-slate-600/30">
          {selectedContent ? (
            <div className="space-y-4">
              {/* Instagram Content */}
              {socialPlatform === 'instagram' && content.instagram && (
                <div className="space-y-6">
                  {content.instagram.posts?.map((post, index) => (
                    <div key={index} className="bg-slate-700/60 rounded-lg p-4 border border-slate-600/40">
                      <h4 className="font-semibold mb-2 text-white">Instagram Post {index + 1}</h4>
                      <div className="bg-slate-600/50 p-3 rounded mb-3 border border-slate-500/30">
                        <pre className="whitespace-pre-wrap text-sm text-slate-300">{post.caption}</pre>
                      </div>
                      <div className="text-xs text-slate-400">
                        Hashtags: {post.hashtags.map(tag => `#${tag}`).join(' ')}
                      </div>
                      <button
                        onClick={() => handleCopy(post.caption + '\n\n' + post.hashtags.map(tag => `#${tag}`).join(' '))}
                        className="mt-2 text-blue-400 hover:text-blue-300 text-sm flex items-center gap-1"
                      >
                        <Copy size={14} /> Copy Post
                      </button>
                    </div>
                  ))}
                  {content.instagram.stories && (
                    <div className="bg-slate-700/60 rounded-lg p-4 border border-slate-600/40">
                      <h4 className="font-semibold mb-2 text-white">Instagram Story</h4>
                      <div className="bg-slate-600/50 p-3 rounded border border-slate-500/30">
                        <pre className="whitespace-pre-wrap text-sm text-slate-300">{content.instagram.stories[0].content}</pre>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Facebook Content */}
              {socialPlatform === 'facebook' && content.facebook && (
                <div className="space-y-4">
                  {content.facebook.posts?.map((post, index) => (
                    <div key={index} className="bg-slate-700/60 rounded-lg p-4 border border-slate-600/40">
                      <h4 className="font-semibold mb-2 text-white">Facebook Post {index + 1}</h4>
                      <div className="bg-white/5 border border-slate-500/30 p-3 rounded mb-3">
                        <pre className="whitespace-pre-wrap text-sm text-slate-300">{post.text}</pre>
                      </div>
                      <div className="text-xs text-slate-400 mb-2">
                        Engagement hooks: {post.engagement_hooks.join(', ')}
                      </div>
                      <button
                        onClick={() => handleCopy(post.text)}
                        className="text-blue-400 hover:text-blue-300 text-sm flex items-center gap-1"
                      >
                        <Copy size={14} /> Copy Post
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* LinkedIn Content */}
              {socialPlatform === 'linkedin' && content.linkedin && (
                <div className="space-y-4">
                  {content.linkedin.posts?.map((post, index) => (
                    <div key={index} className="bg-slate-700/60 rounded-lg p-4 border border-slate-600/40">
                      <h4 className="font-semibold mb-2 text-white">LinkedIn Post {index + 1}</h4>
                      <div className="bg-white/5 border border-slate-500/30 p-3 rounded mb-3">
                        <pre className="whitespace-pre-wrap text-sm text-slate-300">{post.text}</pre>
                      </div>
                      <div className="text-xs text-slate-400 mb-2">
                        Hashtags: {post.hashtags.map(tag => `#${tag}`).join(' ')}
                      </div>
                      <button
                        onClick={() => handleCopy(post.text + '\n\n' + post.hashtags.map(tag => `#${tag}`).join(' '))}
                        className="text-blue-400 hover:text-blue-300 text-sm flex items-center gap-1"
                      >
                        <Copy size={14} /> Copy Post
                      </button>
                    </div>
                  ))}
                  {content.linkedin.articles && (
                    <div className="bg-slate-700/60 rounded-lg p-4 border border-slate-600/40 mt-4">
                      <h4 className="font-semibold mb-2 text-white">LinkedIn Article</h4>
                      <h5 className="font-medium mb-2 text-white">{content.linkedin.articles[0].title}</h5>
                      <div className="bg-white/5 border border-slate-500/30 p-3 rounded max-h-64 overflow-y-auto">
                        <pre className="whitespace-pre-wrap text-sm text-slate-300">{content.linkedin.articles[0].content}</pre>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* TikTok Content */}
              {socialPlatform === 'tiktok' && content.tiktok && (
                <div className="space-y-4">
                  {content.tiktok.scripts?.map((script, index) => (
                    <div key={index} className="bg-slate-700/60 rounded-lg p-4 border border-slate-600/40">
                      <h4 className="font-semibold mb-2">TikTok Script {index + 1}</h4>
                      <div className="space-y-3">
                        <div>
                          <label className="text-xs font-medium text-slate-400">HOOK</label>
                          <div className="bg-yellow-50 p-2 rounded text-sm">{script.hook}</div>
                        </div>
                        <div>
                          <label className="text-xs font-medium text-slate-400">BODY</label>
                          <div className="bg-blue-50 p-2 rounded text-sm">
                            <pre className="whitespace-pre-wrap">{script.body}</pre>
                          </div>
                        </div>
                        <div>
                          <label className="text-xs font-medium text-slate-400">CTA</label>
                          <div className="bg-green-50 p-2 rounded text-sm">{script.cta}</div>
                        </div>
                        <div className="text-xs text-slate-400">
                          Duration: {script.duration_seconds}s | Sounds: {script.trending_sounds.join(', ')}
                        </div>
                      </div>
                      <button
                        onClick={() => handleCopy(`${script.hook}\n\n${script.body}\n\n${script.cta}`)}
                        className="mt-2 text-blue-400 hover:text-blue-300 text-sm flex items-center gap-1"
                      >
                        <Copy size={14} /> Copy Script
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* YouTube Content */}
              {socialPlatform === 'youtube' && content.youtube && (
                <div className="bg-slate-700/60 rounded-lg p-4 border border-slate-600/40">
                  <h4 className="font-semibold mb-4 text-white">YouTube Video Content</h4>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-slate-300">Title</label>
                      <div className="bg-white/5 border border-slate-500/30 p-3 rounded text-sm font-medium text-slate-300">{content.youtube.title}</div>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-slate-300">Description</label>
                      <div className="bg-white/5 border border-slate-500/30 p-3 rounded text-sm max-h-32 overflow-y-auto">
                        <pre className="whitespace-pre-wrap text-slate-300">{content.youtube.description}</pre>
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-slate-300">Script</label>
                      <div className="bg-white/5 border border-slate-500/30 p-3 rounded text-sm max-h-64 overflow-y-auto">
                        <pre className="whitespace-pre-wrap text-slate-300">{content.youtube.script}</pre>
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-slate-300">Timestamps</label>
                      <div className="bg-white/5 border border-slate-500/30 p-3 rounded text-sm">
                        {content.youtube.timestamps.map((ts, i) => (
                          <div key={i} className="text-slate-300">{ts.time} - {ts.description}</div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Newsletter Content */}
              {socialPlatform === 'newsletter' && content.newsletter && (
                <div className="bg-slate-700/60 rounded-lg p-4 border border-slate-600/40">
                  <h4 className="font-semibold mb-4 text-white">Newsletter Content</h4>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-slate-300">Subject Line</label>
                      <div className="bg-white/5 border border-slate-500/30 p-3 rounded text-sm font-medium text-slate-300">{content.newsletter.subject_line}</div>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-slate-300">Preview Text</label>
                      <div className="bg-white/5 border border-slate-500/30 p-3 rounded text-sm text-slate-300">{content.newsletter.preview_text}</div>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-slate-300">HTML Content</label>
                      <div className="bg-white/5 border border-slate-500/30 p-3 rounded text-sm max-h-32 overflow-y-auto">
                        <code className="text-xs text-slate-300">{content.newsletter.html_content}</code>
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-slate-300">Text Version</label>
                      <div className="bg-white/5 border border-slate-500/30 p-3 rounded text-sm max-h-32 overflow-y-auto">
                        <pre className="whitespace-pre-wrap text-slate-300">{content.newsletter.text_content}</pre>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-8 text-slate-400">
              No {socialPlatform} content generated for this brief.
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="bg-slate-800/90 backdrop-blur-xl rounded-xl shadow-lg overflow-hidden border border-slate-600/30">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-green-700 text-white p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-10 h-10 bg-white/20 rounded-lg">
              <FileText className="text-white" size={24} />
            </div>
            <div>
              <h2 className="text-2xl font-bold">Generated Content</h2>
              <p className="text-green-100">Ready for review and publishing</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <div className="bg-white/20 px-3 py-1 rounded-full text-sm">
              Novelty Score: {Math.round(content.novelty_score * 100)}%
            </div>
            <button
              onClick={exportToPDF}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                planFeatures.exportFormats.includes('pdf')
                  ? 'bg-white/20 text-white hover:bg-white/30'
                  : 'bg-gray-500/20 text-gray-400 cursor-not-allowed opacity-60'
              }`}
              disabled={!planFeatures.exportFormats.includes('pdf')}
            >
              <Download size={16} />
              <span>Export PDF</span>
              {!planFeatures.exportFormats.includes('pdf') && <Lock size={14} className="text-yellow-400" />}
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-white/20">
        <div className="flex space-x-1 p-4">
          <TabButton id="article" label="Article" icon={FileText} />
          <TabButton id="social" label="Social Media" icon={Share2} />
          <TabButton id="seo" label="SEO & Keywords" icon={Hash} />
          <TabButton id="analytics" label="Performance" icon={BarChart3} />
          <TabButton id="optimize" label="AI Optimize" icon={Brain} />
          <TabButton id="publish" label="Publish" icon={Send} />
          <TabButton id="images" label="Image Prompts" icon={Image} />
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {activeTab === 'article' && content.article && (
          <div ref={contentRef} className="space-y-6">
            {/* Article Header */}
            <div className="border-b border-white/20 pb-4">
              <h1 className="text-3xl font-bold text-white mb-2">{content.article.title}</h1>
              <div className="flex items-center space-x-4 text-sm text-slate-400">
                <span className="flex items-center space-x-1">
                  <Clock size={14} />
                  <span>{Math.ceil(content.article.content.split(' ').length / 200)} min read</span>
                </span>
                <span className="flex items-center space-x-1">
                  <BarChart3 size={14} />
                  <span>{content.article.content.split(' ').length} words</span>
                </span>
              </div>
            </div>

            {/* Article Content */}
            <div className="prose prose-lg max-w-none">
              {formatContent(content.article.content)}
            </div>

            {/* SEO Info */}
            <div className="bg-blue-500/10 rounded-lg p-4 border border-blue-500/30">
              <h3 className="font-semibold text-blue-300 mb-2">SEO Information</h3>
              <div className="space-y-2 text-sm text-slate-300">
                <div className="text-slate-300"><strong>Slug:</strong> {content.article.seo.slug}</div>
                <div className="text-slate-300"><strong>Meta Description:</strong> {content.article.seo.meta_description}</div>
                <div className="text-slate-300"><strong>Keywords:</strong> {content.article.seo.keywords.join(', ')}</div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-3 pt-4 border-t border-white/20">
              <button
                onClick={() => content.article && handleCopy(content.article.content)}
                className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Copy size={16} />
                <span>Copy Article</span>
              </button>
              <button className="flex items-center space-x-2 border border-white/30 text-white px-4 py-2 rounded-lg hover:bg-white/10 transition-colors">
                <Edit3 size={16} />
                <span>Edit</span>
              </button>
            </div>
          </div>
        )}

        {activeTab === 'social' && (
          <div>
            {renderSocialContent()}
          </div>
        )}

        {activeTab === 'seo' && content.article && (
          <div className="space-y-6">
            <div className="bg-green-500/10 rounded-lg p-6 border border-green-500/30">
              <h3 className="text-lg font-semibold text-green-300 mb-4">SEO Analysis</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-green-300 mb-2">Primary Keywords</h4>
                  <div className="space-y-1">
                    {content.article.seo.keywords.slice(0, 3).map((keyword, index) => (
                      <span key={index} className="inline-block bg-green-500/20 text-green-300 px-2 py-1 rounded-full text-xs mr-1">
                        {keyword}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-medium text-green-300 mb-2">SEO Score</h4>
                  <div className="flex items-center space-x-2">
                    <div className="w-full bg-green-800/50 rounded-full h-2">
                      <div className="bg-green-400 h-2 rounded-full" style={{ width: `${content.novelty_score * 100}%` }}></div>
                    </div>
                    <span className="text-sm font-medium text-green-300">{Math.round(content.novelty_score * 100)}%</span>
                  </div>
                </div>
              </div>
              <div className="mt-4">
                <h4 className="font-medium text-green-300 mb-2">Meta Description</h4>
                <p className="text-sm text-green-200 bg-green-500/10 p-3 rounded">
                  {content.article.seo.meta_description}
                </p>
                <div className="text-xs text-green-400 mt-1">
                  {content.article.seo.meta_description.length}/160 characters
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'analytics' && (
          <div className="space-y-6">
            <PlanGate requiredPlan="professional" feature="Performance Analytics">
              <PerformanceAnalytics 
                contentId={content.article?.title || 'content-1'}
                isVisible={activeTab === 'analytics'}
              />
            </PlanGate>
          </div>
        )}

        {activeTab === 'optimize' && (
          <div className="space-y-6">
            <PlanGate requiredPlan="professional" feature="AI Content Optimization">
              <ContentOptimizationSuggestions 
                content={content}
                isVisible={activeTab === 'optimize'}
                onApplySuggestion={(suggestionId, updatedContent) => {
                  if (onEdit) onEdit(updatedContent);
                }}
              />
            </PlanGate>
          </div>
        )}

        {activeTab === 'publish' && (
          <div className="space-y-6">
            <PlanGate requiredPlan="professional" feature="Multi-Platform Publishing">
              <PublishingIntegration 
                content={content}
                isVisible={activeTab === 'publish'}
                onPublish={(platforms) => {
                  console.log(`Published to: ${platforms.join(', ')}`);
                  // You could add success notification here
                }}
              />
            </PlanGate>
          </div>
        )}

        {activeTab === 'images' && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-white">AI Image Generation Prompts</h3>
            <div className="grid gap-4">
              {content.image_packs.map((pack, index) => (
                <div key={index} className="bg-purple-500/10 rounded-lg p-4 border border-purple-500/30">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-medium text-purple-300 capitalize">{pack.role.replace('-', ' ')}</h4>
                    <button
                      onClick={() => handleCopy(pack.prompt)}
                      className="text-purple-400 hover:text-purple-300 text-sm flex items-center gap-1"
                    >
                      <Copy size={14} /> Copy
                    </button>
                  </div>
                  <p className="text-sm text-purple-200 mb-2">{pack.prompt}</p>
                  <div className="text-xs text-purple-400">
                    <strong className="text-purple-300">Alt text:</strong> <span className="text-purple-200">{pack.alt_text}</span>
                  </div>
                  <div className="text-xs text-purple-400 mt-1">
                    <strong className="text-purple-300">Composition:</strong> <span className="text-purple-200">{pack.composition}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}