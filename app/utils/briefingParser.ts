import { ContentBrief } from '../types';

/**
 * CLAUDE.md compliant briefing parser
 * Converts messy briefings (email/doc) to structured brief JSON
 */
export function parseBriefingToStructuredJSON(input: string): ContentBrief {
  const text = input.toLowerCase();
  const originalText = input;
  
  // Parse brand information
  const brand = {
    name: extractBrandName(originalText) || "Brand Name",
    voice_tone: extractVoiceTone(text),
    must_use_phrases: extractMustUsePhrases(originalText),
    banned_phrases: extractBannedPhrases(originalText)
  };
  
  // Parse audience information
  const audience = {
    primary: extractPrimaryAudience(originalText) || "Target audience",
    reading_level: extractReadingLevel(text) as 'A2' | 'B1' | 'B2' | 'C1',
    locale: extractLocale(text) || "en-US"
  };
  
  // Parse storyline (main topic/message)
  const storyline = extractStoryline(originalText) || "Story topic";
  
  // Parse platforms - include Facebook by default per CLAUDE.md
  const platforms = extractPlatforms(text);
  
  // Parse SEO information
  const seo = {
    primary_keyword: extractPrimaryKeyword(originalText) || storyline,
    secondary_keywords: extractSecondaryKeywords(originalText)
  };
  
  // Parse legal requirements
  const legal = {
    disclaimer: extractDisclaimer(originalText) || ""
  };
  
  // Parse angle hint
  const angle_hint = extractAngleHint(originalText) || "informative-guide";
  
  return {
    brand,
    audience,
    storyline,
    platforms,
    seo,
    legal,
    angle_hint
  };
}

function extractBrandName(text: string): string | null {
  const patterns = [
    /(?:company|brand|client|organization):\s*([^\n.]+)/i,
    /(?:for|client|brand)\s+([A-Z][a-zA-Z\s&]+)(?:\s|,|\.)/,
    /([A-Z][a-zA-Z\s&]{2,30})(?:\s+(?:wants|needs|is looking|requires))/i,
    /^([A-Z][a-zA-Z\s&]{2,30})\s*$/m
  ];
  
  for (const pattern of patterns) {
    const match = text.match(pattern);
    if (match && match[1]) {
      const name = match[1].trim();
      if (name.length > 2 && name.length < 50) {
        return name;
      }
    }
  }
  
  return null;
}

function extractVoiceTone(text: string): string[] {
  const tones = [];
  
  // Professional indicators
  if (text.includes('professional') || text.includes('formal') || text.includes('corporate')) {
    tones.push('professional');
  }
  
  // Friendly indicators
  if (text.includes('friendly') || text.includes('approachable') || text.includes('warm')) {
    tones.push('friendly');
  }
  
  // Authoritative indicators
  if (text.includes('expert') || text.includes('authoritative') || text.includes('thought leader')) {
    tones.push('authoritative');
  }
  
  // Conversational indicators
  if (text.includes('conversational') || text.includes('casual') || text.includes('informal')) {
    tones.push('conversational');
  }
  
  // Technical indicators
  if (text.includes('technical') || text.includes('detailed') || text.includes('in-depth')) {
    tones.push('technical');
  }
  
  // Default to professional if none found
  return tones.length > 0 ? tones : ['professional'];
}

function extractMustUsePhrases(text: string): string[] {
  const patterns = [
    /(?:must include|must use|required phrases?|include):\s*([^\n]+)/i,
    /(?:mention|use|include)\s+"([^"]+)"/g,
    /(?:key phrases?|important terms?):\s*([^\n]+)/i
  ];
  
  const phrases = [];
  
  for (const pattern of patterns) {
    const matches = Array.from(text.matchAll(new RegExp(pattern.source, pattern.flags)));
    for (const match of matches) {
      if (match[1]) {
        const extracted = match[1].split(/[,;]/).map(p => p.trim()).filter(p => p.length > 0);
        phrases.push(...extracted);
      }
    }
  }
  
  return Array.from(new Set(phrases));
}

function extractBannedPhrases(text: string): string[] {
  const patterns = [
    /(?:don't mention|do not mention|avoid|banned|prohibited):\s*([^\n]+)/i,
    /(?:don't use|do not use|avoid using)\s+"([^"]+)"/g,
    /(?:competitors?|avoid mentioning):\s*([^\n]+)/i
  ];
  
  const phrases = [];
  
  for (const pattern of patterns) {
    const matches = Array.from(text.matchAll(new RegExp(pattern.source, pattern.flags)));
    for (const match of matches) {
      if (match[1]) {
        const extracted = match[1].split(/[,;]/).map(p => p.trim()).filter(p => p.length > 0);
        phrases.push(...extracted);
      }
    }
  }
  
  return Array.from(new Set(phrases));
}

function extractPrimaryAudience(text: string): string | null {
  const patterns = [
    /(?:target audience|audience|target):\s*([^\n]+)/i,
    /(?:for|targeting)\s+(executives|professionals|consumers|customers|users|managers|directors|[A-Z][a-z-]+\s+professionals)/i,
    /(?:aimed at|directed at|intended for)\s+([^\n.]+)/i
  ];
  
  for (const pattern of patterns) {
    const match = text.match(pattern);
    if (match && match[1]) {
      return match[1].trim();
    }
  }
  
  return null;
}

function extractReadingLevel(text: string): 'A2' | 'B1' | 'B2' | 'C1' {
  if (text.includes('simple') || text.includes('basic') || text.includes('beginner')) {
    return 'A2';
  }
  if (text.includes('intermediate') || text.includes('general audience')) {
    return 'B1';
  }
  if (text.includes('advanced') || text.includes('professional') || text.includes('expert')) {
    return 'C1';
  }
  
  // Default to B2 (upper intermediate) - most common for business content
  return 'B2';
}

function extractLocale(text: string): string {
  const localeMap = {
    'english': 'en-US',
    'spanish': 'es-ES',
    'french': 'fr-FR',
    'german': 'de-DE',
    'dutch': 'nl-NL',
    'italian': 'it-IT',
    'portuguese': 'pt-PT',
    'uk': 'en-GB',
    'britain': 'en-GB',
    'america': 'en-US',
    'usa': 'en-US'
  };
  
  for (const [key, locale] of Object.entries(localeMap)) {
    if (text.includes(key)) {
      return locale;
    }
  }
  
  return 'en-US'; // Default
}

function extractStoryline(text: string): string | null {
  const patterns = [
    /(?:topic|subject|about|regarding):\s*([^\n.]+)/i,
    /(?:story|storyline|narrative):\s*([^\n.]+)/i,
    /(?:main topic|key topic|focus):\s*([^\n.]+)/i,
    /(?:writing about|content on|article on)\s+([^\n.]+)/i
  ];
  
  for (const pattern of patterns) {
    const match = text.match(pattern);
    if (match && match[1]) {
      return match[1].trim().replace(/[.!?]+$/, '');
    }
  }
  
  return null;
}

function extractPlatforms(text: string): ('article' | 'instagram' | 'tiktok' | 'facebook' | 'linkedin' | 'newsletter' | 'youtube')[] {
  const platforms: ('article' | 'instagram' | 'tiktok' | 'facebook' | 'linkedin' | 'newsletter' | 'youtube')[] = [];
  
  // Check for explicit platform mentions
  if (text.includes('article') || text.includes('blog') || text.includes('website')) {
    platforms.push('article');
  }
  if (text.includes('instagram') || text.includes('insta')) {
    platforms.push('instagram');
  }
  if (text.includes('tiktok') || text.includes('tik tok')) {
    platforms.push('tiktok');
  }
  if (text.includes('linkedin')) {
    platforms.push('linkedin');
  }
  if (text.includes('newsletter') || text.includes('email')) {
    platforms.push('newsletter');
  }
  if (text.includes('youtube')) {
    platforms.push('youtube');
  }
  
  // CLAUDE.md requirement: Include Facebook by default if platforms are unspecified
  if (platforms.length === 0 || !text.includes('facebook')) {
    platforms.push('facebook');
  }
  
  // If no platforms specified, include common defaults
  if (platforms.length === 1 && platforms[0] === 'facebook') {
    platforms.push('article', 'instagram', 'linkedin');
  }
  
  return platforms;
}

function extractPrimaryKeyword(text: string): string | null {
  const patterns = [
    /(?:primary keyword|main keyword|focus keyword):\s*([^\n]+)/i,
    /(?:seo|keyword|target):\s*([^\n]+)/i
  ];
  
  for (const pattern of patterns) {
    const match = text.match(pattern);
    if (match && match[1]) {
      return match[1].trim();
    }
  }
  
  return null;
}

function extractSecondaryKeywords(text: string): string[] {
  const patterns = [
    /(?:secondary keywords?|keywords?|tags?):\s*([^\n]+)/i,
    /(?:related keywords?|additional keywords?):\s*([^\n]+)/i
  ];
  
  const keywords = [];
  
  for (const pattern of patterns) {
    const match = text.match(pattern);
    if (match && match[1]) {
      const extracted = match[1].split(/[,;]/).map(k => k.trim()).filter(k => k.length > 2);
      keywords.push(...extracted);
    }
  }
  
  return Array.from(new Set(keywords));
}

function extractDisclaimer(text: string): string {
  const patterns = [
    /(?:disclaimer|legal|compliance):\s*([^\n]+)/i,
    /(?:disclaimer|legal notice):\s*([^.]+\.[^.]*\.?)/i
  ];
  
  for (const pattern of patterns) {
    const match = text.match(pattern);
    if (match && match[1]) {
      return match[1].trim();
    }
  }
  
  return "";
}

function extractAngleHint(text: string): string {
  const angles = {
    'how-to': /how\s+to|tutorial|guide|step.by.step/i,
    'list': /top\s+\d+|\d+\s+best|\d+\s+ways|list\s+of/i,
    'comparison': /vs\s+|versus|compare|comparison|best\s+alternative/i,
    'news': /announces?|launches?|releases?|news|breaking/i,
    'opinion': /opinion|think|believe|should|why\s+\w+\s+is/i,
    'case-study': /case\s+study|success\s+story|how\s+\w+\s+achieved/i,
    'research': /study|research|data|statistics|report/i,
    'trend': /trend|future|2024|2025|emerging|rising/i
  };
  
  for (const [angle, pattern] of Object.entries(angles)) {
    if (pattern.test(text)) {
      return angle;
    }
  }
  
  return 'informative-guide'; // Default angle
}

/**
 * Legacy converter for backward compatibility
 * Converts old ContentBrief format to new CLAUDE.md format
 */
export function convertLegacyBrief(legacy: any): ContentBrief {
  return {
    brand: {
      name: legacy.brandName || legacy.clientName || "Brand",
      voice_tone: legacy.tone ? [legacy.tone] : ['professional'],
      must_use_phrases: legacy.mustInclude || [],
      banned_phrases: legacy.doNotMention || []
    },
    audience: {
      primary: legacy.targetAudience || "Target audience",
      reading_level: 'B2',
      locale: legacy.language === 'English' ? 'en-US' : 'en-US'
    },
    storyline: legacy.topic || legacy.mainMessage || "Story topic",
    platforms: ['article', 'facebook', 'instagram', 'linkedin'], // Default with Facebook
    seo: {
      primary_keyword: legacy.seoFocus || legacy.topic || "keyword",
      secondary_keywords: legacy.keywords || []
    },
    legal: {
      disclaimer: ""
    },
    angle_hint: mapContentTypeToAngle(legacy.contentType) || "informative-guide"
  };
}

function mapContentTypeToAngle(contentType: string): string {
  const mapping = {
    'article': 'informative-guide',
    'blog-post': 'how-to',
    'case-study': 'case-study',
    'press-release': 'news',
    'product-description': 'comparison',
    'newsletter': 'trend',
    'landing-page': 'comparison',
    'social-posts': 'list'
  };
  
  return mapping[contentType as keyof typeof mapping] || 'informative-guide';
}