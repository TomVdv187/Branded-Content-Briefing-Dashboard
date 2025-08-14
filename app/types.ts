// CLAUDE.md compliant structured brief schema
export interface ContentBrief {
  brand: {
    name: string;
    voice_tone: string[];
    must_use_phrases: string[];
    banned_phrases: string[];
  };
  audience: {
    primary: string;
    reading_level: 'A2' | 'B1' | 'B2' | 'C1';
    locale: string;
  };
  storyline: string;
  platforms: ('article' | 'instagram' | 'tiktok' | 'facebook' | 'linkedin' | 'newsletter' | 'youtube')[];
  seo: {
    primary_keyword: string;
    secondary_keywords: string[];
  };
  legal: {
    disclaimer: string;
  };
  angle_hint: string;
}

// Legacy interface for backward compatibility - will be converted
export interface LegacyContentBrief {
  clientName: string;
  brandName: string;
  industry: string;
  contentType: 'article' | 'blog-post' | 'social-posts' | 'newsletter' | 'product-description' | 'press-release' | 'case-study' | 'landing-page';
  topic: string;
  mainMessage: string;
  targetAudience: string;
  keywords: string[];
  tone: 'professional' | 'casual' | 'friendly' | 'authoritative' | 'conversational' | 'technical' | 'persuasive';
  wordCount: number;
  language: string;
  seoFocus: string;
  metaDescription?: string;
  includeImages: boolean;
  socialPlatforms: string[];
  brandVoice: string;
  doNotMention: string[];
  mustInclude: string[];
  deadline: string;
  budget: string;
  guaranteedPageviews: number;
  revisionNotes?: string;
  referenceUrls?: string[];
}

// Image pack proposal interface
export interface ImagePack {
  role: string;
  prompt: string;
  alt_text: string;
  composition: string;
  preview_svg?: string; // Server will inject base64 SVG previews
}

export interface SEOSuggestions {
  suggestedKeywords: string[];
  suggestedMetaDescription: string;
  keywordDifficulty: { [keyword: string]: 'Low' | 'Medium' | 'High' };
  searchVolume: { [keyword: string]: number };
  competitorAnalysis: string[];
}

// Multi-platform content package according to CLAUDE.md
export interface GeneratedContent {
  // Article content
  article?: {
    title: string;
    content: string;
    seo: {
      meta_description: string;
      slug: string;
      keywords: string[];
    };
  };
  
  // Instagram content
  instagram?: {
    posts: Array<{
      caption: string;
      hashtags: string[];
      image_requirements: ImagePack[];
    }>;
    stories?: Array<{
      content: string;
      image_requirements: ImagePack[];
    }>;
  };
  
  // TikTok content
  tiktok?: {
    scripts: Array<{
      hook: string;
      body: string;
      cta: string;
      duration_seconds: number;
      trending_sounds: string[];
    }>;
  };
  
  // Facebook content (included by default per CLAUDE.md)
  facebook?: {
    posts: Array<{
      text: string;
      image_requirements: ImagePack[];
      engagement_hooks: string[];
    }>;
  };
  
  // LinkedIn content
  linkedin?: {
    posts: Array<{
      text: string;
      hashtags: string[];
      image_requirements: ImagePack[];
    }>;
    articles?: Array<{
      title: string;
      content: string;
      seo_optimized: boolean;
    }>;
  };
  
  // Newsletter content
  newsletter?: {
    subject_line: string;
    preview_text: string;
    html_content: string;
    text_content: string;
    personalization_tags: string[];
  };
  
  // YouTube content
  youtube?: {
    title: string;
    description: string;
    script: string;
    timestamps: Array<{
      time: string;
      description: string;
    }>;
    thumbnail_requirements: ImagePack[];
  };
  
  // Image packs for all content
  image_packs: ImagePack[];
  
  // Metadata
  generated_at: string;
  compliant: boolean;
  novelty_score: number;
}

export interface ContentBatch {
  batchId: string;
  briefs: ContentBrief[];
  generatedContent: GeneratedContent[];
  status: 'pending' | 'generating' | 'completed' | 'error';
  progress: number;
}