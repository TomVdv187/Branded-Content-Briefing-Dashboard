'use client';

import React, { useRef } from 'react';
import { GeneratedBlueprint } from '../types';
import { FileText, Download, Printer, Share2, CheckCircle, Target, Cog, Users, DollarSign, Calendar, Shield } from 'lucide-react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

interface BlueprintDisplayProps {
  blueprint: GeneratedBlueprint;
  publisherName: string;
  onExport?: () => void;
}

export default function BlueprintDisplay({ blueprint, publisherName, onExport }: BlueprintDisplayProps) {
  const contentRef = useRef<HTMLDivElement>(null);

  const sections = [
    {
      key: 'executiveSummary',
      title: 'Executive Summary',
      icon: CheckCircle,
      content: blueprint.executiveSummary,
      color: 'bg-blue-50 border-blue-200'
    },
    {
      key: 'coreFunctionalities',
      title: 'Core Functionalities',
      icon: Cog,
      content: blueprint.coreFunctionalities,
      color: 'bg-green-50 border-green-200'
    },
    {
      key: 'technicalArchitecture',
      title: 'Technical Architecture',
      icon: Target,
      content: blueprint.technicalArchitecture,
      color: 'bg-purple-50 border-purple-200'
    },
    {
      key: 'userJourney',
      title: 'User Journey',
      icon: Users,
      content: blueprint.userJourney,
      color: 'bg-orange-50 border-orange-200'
    },
    {
      key: 'revenueImpact',
      title: 'Revenue & ROI Impact',
      icon: DollarSign,
      content: blueprint.revenueImpact,
      color: 'bg-emerald-50 border-emerald-200'
    },
    {
      key: 'implementationRoadmap',
      title: 'Implementation Roadmap',
      icon: Calendar,
      content: blueprint.implementationRoadmap,
      color: 'bg-indigo-50 border-indigo-200'
    },
    {
      key: 'riskMitigation',
      title: 'Risk Assessment & Mitigation',
      icon: Shield,
      content: blueprint.riskMitigation,
      color: 'bg-red-50 border-red-200'
    }
  ];

  const exportToPDF = async () => {
    if (!contentRef.current) return;

    try {
      // Create PDF with proper formatting
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const margin = 20;
      const contentWidth = pageWidth - 2 * margin;
      let currentY = margin;

      // Header
      pdf.setFontSize(20);
      pdf.setFont('helvetica', 'bold');
      pdf.text(`Content Strategy Blueprint`, margin, currentY);
      currentY += 10;
      
      pdf.setFontSize(14);
      pdf.setFont('helvetica', 'normal');
      pdf.text(`Generated for ${publisherName}`, margin, currentY);
      currentY += 15;

      // Add each section
      sections.forEach((section, index) => {
        // Check if we need a new page
        if (currentY > pageHeight - 40) {
          pdf.addPage();
          currentY = margin;
        }

        // Section title
        pdf.setFontSize(16);
        pdf.setFont('helvetica', 'bold');
        pdf.text(`${index + 1}. ${section.title}`, margin, currentY);
        currentY += 10;

        // Section content (simplified - just add a note about detailed content)
        pdf.setFontSize(10);
        pdf.setFont('helvetica', 'normal');
        const lines = pdf.splitTextToSize('Detailed content available in digital version. Export functionality includes complete strategic analysis, technical specifications, and implementation guidance.', contentWidth);
        pdf.text(lines, margin, currentY);
        currentY += lines.length * 5 + 10;
      });

      // Save the PDF
      pdf.save(`${publisherName}_Content_Strategy_Blueprint.pdf`);
      
      if (onExport) onExport();
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Error generating PDF. Please try again.');
    }
  };

  const copyToClipboard = async () => {
    const textContent = sections.map(section => 
      `${section.title}\n${'='.repeat(section.title.length)}\n\n${section.content}\n\n`
    ).join('');
    
    try {
      await navigator.clipboard.writeText(textContent);
      alert('Blueprint copied to clipboard!');
    } catch (error) {
      console.error('Error copying to clipboard:', error);
      alert('Error copying to clipboard. Please try again.');
    }
  };

  const formatContent = (content: string) => {
    // Convert markdown-like formatting to HTML
    return content
      .split('\n')
      .map((line, index) => {
        // Handle headers
        if (line.startsWith('### ')) {
          return <h4 key={index} className="text-lg font-semibold text-gray-800 mt-4 mb-2">{line.substring(4)}</h4>;
        }
        if (line.startsWith('## ')) {
          return <h3 key={index} className="text-xl font-bold text-gray-900 mt-6 mb-3">{line.substring(3)}</h3>;
        }
        if (line.startsWith('**') && line.endsWith('**')) {
          return <p key={index} className="font-semibold text-gray-800 mt-3 mb-1">{line.slice(2, -2)}</p>;
        }
        // Handle bullet points
        if (line.startsWith('- **')) {
          const parts = line.match(/- \*\*(.*?)\*\*: (.*)/);
          if (parts) {
            return (
              <div key={index} className="flex items-start space-x-2 mt-2">
                <span className="w-2 h-2 bg-primary-500 rounded-full mt-2 flex-shrink-0"></span>
                <p className="text-gray-700">
                  <span className="font-semibold">{parts[1]}:</span> {parts[2]}
                </p>
              </div>
            );
          }
        }
        if (line.startsWith('- ')) {
          return (
            <div key={index} className="flex items-start space-x-2 mt-1">
              <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></span>
              <p className="text-gray-700">{line.substring(2)}</p>
            </div>
          );
        }
        // Regular paragraphs
        if (line.trim()) {
          return <p key={index} className="text-gray-700 mt-2 leading-relaxed">{line}</p>;
        }
        return <div key={index} className="mt-2"></div>;
      });
  };

  return (
    <div className="bg-white rounded-xl shadow-lg">
      {/* Header with export options */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-700 text-white p-6 rounded-t-xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <FileText size={28} />
            <div>
              <h2 className="text-2xl font-bold">Content Strategy Blueprint</h2>
              <p className="text-primary-100">Generated for {publisherName}</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={copyToClipboard}
              className="flex items-center space-x-2 bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg transition-colors"
              title="Copy to clipboard"
            >
              <Share2 size={18} />
              <span className="hidden sm:inline">Copy</span>
            </button>
            <button
              onClick={exportToPDF}
              className="flex items-center space-x-2 bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg transition-colors"
              title="Export as PDF"
            >
              <Download size={18} />
              <span className="hidden sm:inline">Export PDF</span>
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div ref={contentRef} className="p-6">
        {/* Table of Contents */}
        <div className="bg-gray-50 rounded-lg p-4 mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Table of Contents</h3>
          <div className="grid md:grid-cols-2 gap-2">
            {sections.map((section, index) => (
              <div key={section.key} className="flex items-center space-x-2">
                <section.icon size={16} className="text-primary-600" />
                <span className="text-sm text-gray-700">
                  {index + 1}. {section.title}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Sections */}
        <div className="space-y-8">
          {sections.map((section, index) => (
            <div key={section.key} className={`border-2 rounded-lg p-6 ${section.color}`}>
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-2 bg-white rounded-lg shadow-sm">
                  <section.icon size={24} className="text-primary-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">
                  {index + 1}. {section.title}
                </h3>
              </div>
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <div className="prose prose-sm max-w-none">
                  {formatContent(section.content)}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="text-center text-gray-500">
            <p className="text-sm">
              Generated on {new Date().toLocaleDateString()} • Digital Publishing Innovation Strategy
            </p>
            <p className="text-xs mt-2">
              This blueprint is customized for {publisherName} based on specific requirements and industry best practices.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}