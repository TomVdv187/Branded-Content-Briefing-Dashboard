'use client';

import React, { useState } from 'react';
import { BriefingData } from '../types';
import { Building2, Users, Target, DollarSign, Clock, Wrench } from 'lucide-react';

interface BriefingFormProps {
  onSubmit: (data: BriefingData) => void;
  loading: boolean;
}

export default function BriefingForm({ onSubmit, loading }: BriefingFormProps) {
  const [formData, setFormData] = useState<BriefingData>({
    publisherName: '',
    publisherType: '',
    currentChallenges: '',
    targetAudience: '',
    contentTypes: [],
    monetizationMethods: [],
    currentTools: '',
    desiredOutcomes: '',
    timeframe: '',
    budget: '',
    additionalRequirements: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleContentTypeChange = (type: string, checked: boolean) => {
    if (checked) {
      setFormData(prev => ({
        ...prev,
        contentTypes: [...prev.contentTypes, type]
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        contentTypes: prev.contentTypes.filter(t => t !== type)
      }));
    }
  };

  const handleMonetizationChange = (method: string, checked: boolean) => {
    if (checked) {
      setFormData(prev => ({
        ...prev,
        monetizationMethods: [...prev.monetizationMethods, method]
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        monetizationMethods: prev.monetizationMethods.filter(m => m !== method)
      }));
    }
  };

  const contentTypeOptions = [
    'Blog Articles', 'Video Content', 'Podcasts', 'Social Media Posts', 
    'Newsletters', 'Interactive Content', 'Infographics', 'Case Studies'
  ];

  const monetizationOptions = [
    'Display Advertising', 'Sponsored Content', 'Affiliate Marketing', 
    'Subscriptions', 'E-commerce', 'Lead Generation', 'Events', 'Consulting'
  ];

  return (
    <div className="bg-white rounded-xl shadow-lg p-8">
      <div className="flex items-center gap-3 mb-6">
        <Building2 className="text-primary-600" size={24} />
        <h2 className="text-2xl font-bold text-gray-900">Client Briefing</h2>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Publisher Information */}
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Publisher Name *
            </label>
            <input
              type="text"
              className="input-field"
              value={formData.publisherName}
              onChange={(e) => setFormData(prev => ({ ...prev, publisherName: e.target.value }))}
              required
              placeholder="e.g., TechCrunch, Conde Nast"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Publisher Type *
            </label>
            <select
              className="input-field"
              value={formData.publisherType}
              onChange={(e) => setFormData(prev => ({ ...prev, publisherType: e.target.value }))}
              required
            >
              <option value="">Select type</option>
              <option value="Digital Magazine">Digital Magazine</option>
              <option value="News Organization">News Organization</option>
              <option value="Blog Network">Blog Network</option>
              <option value="B2B Publisher">B2B Publisher</option>
              <option value="Lifestyle Brand">Lifestyle Brand</option>
              <option value="E-commerce Publisher">E-commerce Publisher</option>
            </select>
          </div>
        </div>

        {/* Current Challenges */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Current Content Creation Challenges *
          </label>
          <textarea
            className="textarea-field"
            value={formData.currentChallenges}
            onChange={(e) => setFormData(prev => ({ ...prev, currentChallenges: e.target.value }))}
            required
            placeholder="Describe specific pain points: slow production, inconsistent quality, limited resources, etc."
            rows={3}
          />
        </div>

        {/* Target Audience */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Users className="text-primary-600" size={16} />
            <label className="block text-sm font-medium text-gray-700">
              Target Audience *
            </label>
          </div>
          <textarea
            className="textarea-field"
            value={formData.targetAudience}
            onChange={(e) => setFormData(prev => ({ ...prev, targetAudience: e.target.value }))}
            required
            placeholder="Demographics, interests, behavior patterns, pain points..."
            rows={3}
          />
        </div>

        {/* Content Types */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Content Types Currently Produced *
          </label>
          <div className="grid md:grid-cols-2 gap-2">
            {contentTypeOptions.map((type) => (
              <label key={type} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                  checked={formData.contentTypes.includes(type)}
                  onChange={(e) => handleContentTypeChange(type, e.target.checked)}
                />
                <span className="text-sm text-gray-700">{type}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Monetization Methods */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <DollarSign className="text-primary-600" size={16} />
            <label className="block text-sm font-medium text-gray-700">
              Current Monetization Methods *
            </label>
          </div>
          <div className="grid md:grid-cols-2 gap-2">
            {monetizationOptions.map((method) => (
              <label key={method} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                  checked={formData.monetizationMethods.includes(method)}
                  onChange={(e) => handleMonetizationChange(method, e.target.checked)}
                />
                <span className="text-sm text-gray-700">{method}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Current Tools */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Wrench className="text-primary-600" size={16} />
            <label className="block text-sm font-medium text-gray-700">
              Current Tools & Systems
            </label>
          </div>
          <textarea
            className="textarea-field"
            value={formData.currentTools}
            onChange={(e) => setFormData(prev => ({ ...prev, currentTools: e.target.value }))}
            placeholder="CMS, analytics, design tools, social media management, etc."
            rows={2}
          />
        </div>

        {/* Desired Outcomes */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Target className="text-primary-600" size={16} />
            <label className="block text-sm font-medium text-gray-700">
              Desired Outcomes *
            </label>
          </div>
          <textarea
            className="textarea-field"
            value={formData.desiredOutcomes}
            onChange={(e) => setFormData(prev => ({ ...prev, desiredOutcomes: e.target.value }))}
            required
            placeholder="Specific goals: increase content output, improve engagement, reduce costs, etc."
            rows={3}
          />
        </div>

        {/* Timeline and Budget */}
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Clock className="text-primary-600" size={16} />
              <label className="block text-sm font-medium text-gray-700">
                Implementation Timeframe
              </label>
            </div>
            <select
              className="input-field"
              value={formData.timeframe}
              onChange={(e) => setFormData(prev => ({ ...prev, timeframe: e.target.value }))}
            >
              <option value="">Select timeframe</option>
              <option value="3 months">3 months</option>
              <option value="6 months">6 months</option>
              <option value="12 months">12 months</option>
              <option value="18+ months">18+ months</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Budget Range
            </label>
            <select
              className="input-field"
              value={formData.budget}
              onChange={(e) => setFormData(prev => ({ ...prev, budget: e.target.value }))}
            >
              <option value="">Select budget</option>
              <option value="Under $50k">Under $50k</option>
              <option value="$50k - $100k">$50k - $100k</option>
              <option value="$100k - $250k">$100k - $250k</option>
              <option value="$250k - $500k">$250k - $500k</option>
              <option value="$500k+">$500k+</option>
            </select>
          </div>
        </div>

        {/* Additional Requirements */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Additional Requirements or Notes
          </label>
          <textarea
            className="textarea-field"
            value={formData.additionalRequirements}
            onChange={(e) => setFormData(prev => ({ ...prev, additionalRequirements: e.target.value }))}
            placeholder="Any specific technical requirements, integrations, compliance needs, etc."
            rows={3}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="btn-primary w-full text-lg py-3 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Generating Blueprint...
            </span>
          ) : (
            'Generate Content Strategy Blueprint'
          )}
        </button>
      </form>
    </div>
  );
}