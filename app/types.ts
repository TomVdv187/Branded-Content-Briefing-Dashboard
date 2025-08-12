export interface ContentBrief {
  // Client Information
  clientName: string;
  brandName: string;
  industry: string;
  
  // Content Requirements
  contentType: 'article' | 'blog-post' | 'social-posts' | 'newsletter' | 'product-description' | 'press-release' | 'case-study' | 'landing-page';
  topic: string;
  mainMessage: string;
  targetAudience: string;
  keywords: string[];
  
  // Content Specifications
  tone: 'professional' | 'casual' | 'friendly' | 'authoritative' | 'conversational' | 'technical' | 'persuasive';
  wordCount: number;
  language: string;
  
  // SEO & Distribution
  seoFocus: string;
  metaDescription?: string;
  includeImages: boolean;
  socialPlatforms: string[];
  
  // Brand Guidelines
  brandVoice: string;
  doNotMention: string[];
  mustInclude: string[];
  
  // Additional Requirements
  deadline: string;
  budget: string;
  guaranteedPageviews: number;
  revisionNotes?: string;
  referenceUrls?: string[];
}

export interface SEOSuggestions {
  suggestedKeywords: string[];
  suggestedMetaDescription: string;
  keywordDifficulty: { [keyword: string]: 'Low' | 'Medium' | 'High' };
  searchVolume: { [keyword: string]: number };
  competitorAnalysis: string[];
}

export interface GeneratedContent {
  // Main Content
  title: string;
  content: string;
  metaDescription: string;
  
  // SEO Elements
  seoTitle: string;
  keywords: string[];
  slug: string;
  seoSuggestions: SEOSuggestions;
  
  // Social Media Versions
  socialPosts: {
    platform: string;
    content: string;
    hashtags: string[];
  }[];
  
  // Additional Formats
  excerpt: string;
  callToAction: string;
  
  // Metadata
  wordCount: number;
  readingTime: string;
  generatedAt: Date;
  contentType: string;
}

export interface ContentBatch {
  batchId: string;
  briefs: ContentBrief[];
  generatedContent: GeneratedContent[];
  status: 'pending' | 'generating' | 'completed' | 'error';
  progress: number;
}