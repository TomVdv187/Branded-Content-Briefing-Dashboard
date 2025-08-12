'use client';

import React, { useState, useRef } from 'react';
import { GeneratedContent } from '../types';
import { FileText, Download, Edit3, Copy, Share2, Eye, Hash, Clock, BarChart3, Globe, Image } from 'lucide-react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

interface GeneratedContentDisplayProps {
  content: GeneratedContent;
  onEdit?: (content: GeneratedContent) => void;
  onExport?: (format: 'pdf' | 'docx' | 'html') => void;
}

export default function GeneratedContentDisplay({ content, onEdit, onExport }: GeneratedContentDisplayProps) {
  const [activeTab, setActiveTab] = useState<'content' | 'seo' | 'social'>('content');
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(content.content);
  const [editedTitle, setEditedTitle] = useState(content.title);
  const contentRef = useRef<HTMLDivElement>(null);

  const formatContent = (text: string) => {
    return text.split('\n').map((line, index) => {
      if (line.startsWith('# ')) {
        return <h1 key={index} className="text-3xl font-bold text-gray-900 mt-8 mb-4">{line.substring(2)}</h1>;
      }
      if (line.startsWith('## ')) {
        return <h2 key={index} className="text-2xl font-bold text-gray-900 mt-6 mb-3">{line.substring(3)}</h2>;
      }
      if (line.startsWith('### ')) {
        return <h3 key={index} className="text-xl font-semibold text-gray-800 mt-4 mb-2">{line.substring(4)}</h3>;
      }
      if (line.startsWith('**') && line.endsWith('**')) {
        return <p key={index} className="font-semibold text-gray-900 mt-3 mb-1">{line.slice(2, -2)}</p>;
      }
      if (line.startsWith('• ')) {
        return (
          <div key={index} className="flex items-start space-x-2 mt-1 ml-4">
            <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></span>
            <p className="text-gray-700">{line.substring(2)}</p>
          </div>
        );
      }
      if (line.trim()) {
        return <p key={index} className="text-gray-700 mt-2 leading-relaxed">{line}</p>;
      }
      return <div key={index} className="mt-2"></div>;
    });
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      alert('Content copied to clipboard!');
    } catch (error) {
      console.error('Error copying to clipboard:', error);
      alert('Error copying to clipboard. Please try again.');
    }
  };

  const exportToPDF = async () => {
    if (!contentRef.current) return;

    try {
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pageWidth = pdf.internal.pageSize.getWidth();
      const margin = 20;
      const contentWidth = pageWidth - 2 * margin;
      let currentY = margin;

      // Title
      pdf.setFontSize(20);
      pdf.setFont('helvetica', 'bold');
      const titleLines = pdf.splitTextToSize(content.title, contentWidth);
      pdf.text(titleLines, margin, currentY);
      currentY += titleLines.length * 8 + 10;

      // Meta information
      pdf.setFontSize(10);
      pdf.setFont('helvetica', 'normal');
      pdf.text(`Word Count: ${content.wordCount} | Reading Time: ${content.readingTime} | Generated: ${content.generatedAt.toLocaleDateString()}`, margin, currentY);
      currentY += 10;

      // Content (simplified text version)
      pdf.setFontSize(12);
      const contentLines = pdf.splitTextToSize(content.content.replace(/[#*]/g, ''), contentWidth);
      
      contentLines.forEach((line: string) => {
        if (currentY > 270) { // Near page end
          pdf.addPage();
          currentY = margin;
        }
        pdf.text(line, margin, currentY);
        currentY += 5;
      });

      pdf.save(`${content.slug}.pdf`);
      
      if (onExport) onExport('pdf');
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Error generating PDF. Please try again.');
    }
  };

  const exportToHTML = () => {
    const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${content.seoTitle}</title>
    <meta name="description" content="${content.metaDescription}">
    <meta name="keywords" content="${content.keywords.join(', ')}">
    <style>
        body { font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; }
        h1 { color: #1f2937; margin-bottom: 20px; }
        h2 { color: #374151; margin-top: 30px; margin-bottom: 15px; }
        p { line-height: 1.6; margin-bottom: 15px; }
        .meta { color: #6b7280; font-size: 14px; margin-bottom: 20px; }
    </style>
</head>
<body>
    <h1>${content.title}</h1>
    <div class="meta">
        <p>Word Count: ${content.wordCount} | Reading Time: ${content.readingTime} | Generated: ${content.generatedAt.toLocaleDateString()}</p>
        <p>Keywords: ${content.keywords.join(', ')}</p>
    </div>
    <div>
        ${content.content.replace(/\n/g, '<br>')}
    </div>
</body>
</html>`;

    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${content.slug}.html`;
    link.click();
    URL.revokeObjectURL(url);

    if (onExport) onExport('html');
  };

  const saveEdits = () => {
    const updatedContent: GeneratedContent = {
      ...content,
      title: editedTitle,
      content: editedContent,
      wordCount: editedContent.split(' ').length
    };
    
    if (onEdit) onEdit(updatedContent);
    setIsEditing(false);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-green-700 text-white p-6 rounded-t-xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <FileText size={28} />
            <div>
              <h2 className="text-2xl font-bold">Generated Content</h2>
              <p className="text-green-100">Ready for review and publication</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => copyToClipboard(content.content)}
              className="flex items-center space-x-2 bg-white/20 hover:bg-white/30 px-3 py-2 rounded-lg transition-colors"
              title="Copy content"
            >
              <Copy size={16} />
              <span className="hidden sm:inline">Copy</span>
            </button>
            <button
              onClick={exportToPDF}
              className="flex items-center space-x-2 bg-white/20 hover:bg-white/30 px-3 py-2 rounded-lg transition-colors"
              title="Export as PDF"
            >
              <Download size={16} />
              <span className="hidden sm:inline">PDF</span>
            </button>
            <button
              onClick={exportToHTML}
              className="flex items-center space-x-2 bg-white/20 hover:bg-white/30 px-3 py-2 rounded-lg transition-colors"
              title="Export as HTML"
            >
              <Globe size={16} />
              <span className="hidden sm:inline">HTML</span>
            </button>
          </div>
        </div>
      </div>

      {/* Content Stats */}
      <div className="bg-gray-50 p-4 border-b">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="flex items-center space-x-2">
            <BarChart3 size={16} className="text-blue-600" />
            <span className="text-sm font-medium text-gray-700">{content.wordCount} words</span>
          </div>
          <div className="flex items-center space-x-2">
            <Clock size={16} className="text-green-600" />
            <span className="text-sm font-medium text-gray-700">{content.readingTime}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Hash size={16} className="text-purple-600" />
            <span className="text-sm font-medium text-gray-700">{content.keywords.length} keywords</span>
          </div>
          <div className="flex items-center space-x-2">
            <Share2 size={16} className="text-orange-600" />
            <span className="text-sm font-medium text-gray-700">{content.socialPosts.length} social posts</span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8 px-6">
          <button
            onClick={() => setActiveTab('content')}
            className={`py-4 px-2 border-b-2 font-medium text-sm ${
              activeTab === 'content'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <FileText size={16} className="inline mr-2" />
            Main Content
          </button>
          <button
            onClick={() => setActiveTab('seo')}
            className={`py-4 px-2 border-b-2 font-medium text-sm ${
              activeTab === 'seo'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <Globe size={16} className="inline mr-2" />
            SEO Elements
          </button>
          <button
            onClick={() => setActiveTab('social')}
            className={`py-4 px-2 border-b-2 font-medium text-sm ${
              activeTab === 'social'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <Share2 size={16} className="inline mr-2" />
            Social Media
          </button>
        </nav>
      </div>

      {/* Content Display */}
      <div ref={contentRef} className="p-6">
        {activeTab === 'content' && (
          <div>
            {/* Title */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-semibold text-gray-900">Title</h3>
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 transition-colors"
                >
                  <Edit3 size={16} />
                  <span>{isEditing ? 'Cancel' : 'Edit'}</span>
                </button>
              </div>
              
              {isEditing ? (
                <div className="space-y-3">
                  <input
                    type="text"
                    value={editedTitle}
                    onChange={(e) => setEditedTitle(e.target.value)}
                    className="input-field text-xl font-bold"
                    placeholder="Enter title..."
                  />
                  <button
                    onClick={saveEdits}
                    className="btn-primary px-4 py-2"
                  >
                    Save Changes
                  </button>
                </div>
              ) : (
                <h1 className="text-3xl font-bold text-gray-900 leading-tight">
                  {content.title}
                </h1>
              )}
            </div>

            {/* Main Content */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Content</h3>
              
              {isEditing ? (
                <textarea
                  value={editedContent}
                  onChange={(e) => setEditedContent(e.target.value)}
                  className="textarea-field w-full min-h-[500px]"
                  placeholder="Enter content..."
                />
              ) : (
                <div className="prose prose-lg max-w-none">
                  {formatContent(content.content)}
                </div>
              )}
            </div>

            {/* Excerpt */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <h4 className="font-semibold text-blue-900 mb-2">Excerpt</h4>
              <p className="text-blue-800">{content.excerpt}</p>
            </div>

            {/* Call to Action */}
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h4 className="font-semibold text-green-900 mb-2">Call to Action</h4>
              <p className="text-green-800">{content.callToAction}</p>
            </div>
          </div>
        )}

        {activeTab === 'seo' && (
          <div className="space-y-6">
            {/* SEO Suggestions */}
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg p-4">
              <h4 className="font-semibold text-green-900 mb-3 flex items-center">
                <Globe size={18} className="mr-2" />
                AI SEO Recommendations
              </h4>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h5 className="text-sm font-medium text-green-800 mb-2">Suggested Meta Description:</h5>
                  <p className="text-sm text-green-700 bg-green-100 p-2 rounded">
                    {content.seoSuggestions.suggestedMetaDescription}
                  </p>
                </div>
                <div>
                  <h5 className="text-sm font-medium text-green-800 mb-2">Competitor Insights:</h5>
                  <ul className="text-sm text-green-700 space-y-1">
                    {content.seoSuggestions.competitorAnalysis.slice(0, 2).map((insight, index) => (
                      <li key={index} className="flex items-start">
                        <span className="w-1 h-1 bg-green-600 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                        {insight}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* SEO Title */}
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-semibold text-purple-900">SEO Title</h4>
                <span className={`text-sm ${content.seoTitle.length > 60 ? 'text-red-600' : 'text-purple-700'}`}>
                  {content.seoTitle.length}/60
                </span>
              </div>
              <p className="text-purple-800">{content.seoTitle}</p>
            </div>

            {/* Meta Description */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-semibold text-blue-900">Meta Description</h4>
                <span className={`text-sm ${content.metaDescription.length > 160 ? 'text-red-600' : 'text-blue-700'}`}>
                  {content.metaDescription.length}/160
                </span>
              </div>
              <p className="text-blue-800">{content.metaDescription}</p>
            </div>

            {/* Suggested Keywords with Performance Data */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <h4 className="font-semibold text-yellow-900 mb-3">🚀 High-Performance Keywords</h4>
              <div className="grid gap-3">
                {content.seoSuggestions.suggestedKeywords.map((keyword, index) => (
                  <div key={index} className="flex items-center justify-between bg-white p-3 rounded border">
                    <span className="font-medium text-gray-900">{keyword}</span>
                    <div className="flex items-center space-x-4 text-sm">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        content.seoSuggestions.keywordDifficulty[keyword] === 'Low' ? 'bg-green-100 text-green-800' :
                        content.seoSuggestions.keywordDifficulty[keyword] === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {content.seoSuggestions.keywordDifficulty[keyword]} Difficulty
                      </span>
                      <span className="text-gray-600">
                        ~{content.seoSuggestions.searchVolume[keyword]?.toLocaleString() || '1,000'}/month
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Current Keywords */}
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
              <h4 className="font-semibold text-orange-900 mb-3">Current Target Keywords</h4>
              <div className="flex flex-wrap gap-2">
                {content.keywords.map((keyword, index) => (
                  <span
                    key={index}
                    className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-medium"
                  >
                    {keyword}
                  </span>
                ))}
              </div>
            </div>

            {/* URL Slug */}
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-2">URL Slug</h4>
              <code className="bg-gray-100 px-3 py-1 rounded text-gray-700">/{content.slug}</code>
            </div>
          </div>
        )}

        {activeTab === 'social' && (
          <div className="space-y-6">
            {content.socialPosts.length > 0 ? (
              content.socialPosts.map((post, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-lg font-semibold text-gray-900 flex items-center">
                      <Share2 size={20} className="mr-2 text-blue-600" />
                      {post.platform}
                    </h4>
                    <button
                      onClick={() => copyToClipboard(post.content)}
                      className="btn-secondary text-sm"
                    >
                      Copy Post
                    </button>
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-4 mb-4">
                    <p className="text-gray-800 leading-relaxed">{post.content}</p>
                  </div>
                  
                  {post.hashtags.length > 0 && (
                    <div>
                      <h5 className="font-medium text-gray-700 mb-2">Hashtags:</h5>
                      <div className="flex flex-wrap gap-2">
                        {post.hashtags.map((hashtag, hashIndex) => (
                          <span
                            key={hashIndex}
                            className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-sm"
                          >
                            #{hashtag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className="text-center py-12">
                <Share2 size={48} className="mx-auto text-gray-400 mb-4" />
                <p className="text-gray-500">No social media posts generated for this content.</p>
                <p className="text-sm text-gray-400">Select social platforms in your brief to generate posts.</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="bg-gray-50 px-6 py-4 rounded-b-xl border-t">
        <div className="flex items-center justify-between text-sm text-gray-500">
          <span>Generated on {content.generatedAt.toLocaleString()}</span>
          <span>Content Type: {content.contentType.charAt(0).toUpperCase() + content.contentType.slice(1)}</span>
        </div>
      </div>
    </div>
  );
}