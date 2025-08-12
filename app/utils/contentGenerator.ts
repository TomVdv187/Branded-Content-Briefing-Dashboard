import { ContentBrief, GeneratedContent, SEOSuggestions } from '../types';

export function generateContent(brief: ContentBrief): GeneratedContent {
  // Generate different content based on content type
  const generators = {
    'article': generateArticle,
    'blog-post': generateBlogPost,
    'social-posts': generateSocialPosts,
    'newsletter': generateNewsletter,
    'product-description': generateProductDescription,
    'press-release': generatePressRelease,
    'case-study': generateCaseStudy,
    'landing-page': generateLandingPage
  };

  const generator = generators[brief.contentType] || generateArticle;
  return generator(brief);
}

function generateArticle(brief: ContentBrief): GeneratedContent {
  const title = generateTitle(brief, 'article');
  const content = generateArticleContent(brief);
  const socialPosts = generateSocialMediaPosts(brief, title);
  
  return {
    title,
    content,
    metaDescription: generateMetaDescription(brief, title),
    seoTitle: generateSEOTitle(brief, title),
    keywords: brief.keywords,
    slug: generateSlug(title),
    seoSuggestions: generateSEOSuggestions(brief, title),
    socialPosts,
    excerpt: generateExcerpt(content),
    callToAction: generateCTA(brief),
    wordCount: content.split(' ').length,
    readingTime: calculateReadingTime(content),
    generatedAt: new Date(),
    contentType: brief.contentType
  };
}

function generateBlogPost(brief: ContentBrief): GeneratedContent {
  const title = generateTitle(brief, 'blog');
  const content = generateBlogContent(brief);
  const socialPosts = generateSocialMediaPosts(brief, title);
  
  return {
    title,
    content,
    metaDescription: generateMetaDescription(brief, title),
    seoTitle: generateSEOTitle(brief, title),
    keywords: brief.keywords,
    slug: generateSlug(title),
    seoSuggestions: generateSEOSuggestions(brief, title),
    socialPosts,
    excerpt: generateExcerpt(content),
    callToAction: generateCTA(brief),
    wordCount: content.split(' ').length,
    readingTime: calculateReadingTime(content),
    generatedAt: new Date(),
    contentType: brief.contentType
  };
}

function generateSocialPosts(brief: ContentBrief): GeneratedContent {
  const title = `Social Media Campaign: ${brief.topic}`;
  const socialPosts = generateSocialMediaPosts(brief, title);
  const content = generateSocialCampaignContent(brief, socialPosts);
  
  return {
    title,
    content,
    metaDescription: generateMetaDescription(brief, title),
    seoTitle: generateSEOTitle(brief, title),
    keywords: brief.keywords,
    slug: generateSlug(title),
    seoSuggestions: generateSEOSuggestions(brief, title),
    socialPosts,
    excerpt: generateExcerpt(content),
    callToAction: generateCTA(brief),
    wordCount: content.split(' ').length,
    readingTime: calculateReadingTime(content),
    generatedAt: new Date(),
    contentType: brief.contentType
  };
}

function generateNewsletter(brief: ContentBrief): GeneratedContent {
  const title = generateTitle(brief, 'newsletter');
  const content = generateNewsletterContent(brief);
  const socialPosts = generateSocialMediaPosts(brief, title);
  
  return {
    title,
    content,
    metaDescription: generateMetaDescription(brief, title),
    seoTitle: generateSEOTitle(brief, title),
    keywords: brief.keywords,
    slug: generateSlug(title),
    seoSuggestions: generateSEOSuggestions(brief, title),
    socialPosts,
    excerpt: generateExcerpt(content),
    callToAction: generateCTA(brief),
    wordCount: content.split(' ').length,
    readingTime: calculateReadingTime(content),
    generatedAt: new Date(),
    contentType: brief.contentType
  };
}

function generateProductDescription(brief: ContentBrief): GeneratedContent {
  const title = generateTitle(brief, 'product');
  const content = generateProductContent(brief);
  const socialPosts = generateSocialMediaPosts(brief, title);
  
  return {
    title,
    content,
    metaDescription: generateMetaDescription(brief, title),
    seoTitle: generateSEOTitle(brief, title),
    keywords: brief.keywords,
    slug: generateSlug(title),
    seoSuggestions: generateSEOSuggestions(brief, title),
    socialPosts,
    excerpt: generateExcerpt(content),
    callToAction: generateCTA(brief),
    wordCount: content.split(' ').length,
    readingTime: calculateReadingTime(content),
    generatedAt: new Date(),
    contentType: brief.contentType
  };
}

function generatePressRelease(brief: ContentBrief): GeneratedContent {
  const title = generateTitle(brief, 'press-release');
  const content = generatePressReleaseContent(brief);
  const socialPosts = generateSocialMediaPosts(brief, title);
  
  return {
    title,
    content,
    metaDescription: generateMetaDescription(brief, title),
    seoTitle: generateSEOTitle(brief, title),
    keywords: brief.keywords,
    slug: generateSlug(title),
    seoSuggestions: generateSEOSuggestions(brief, title),
    socialPosts,
    excerpt: generateExcerpt(content),
    callToAction: generateCTA(brief),
    wordCount: content.split(' ').length,
    readingTime: calculateReadingTime(content),
    generatedAt: new Date(),
    contentType: brief.contentType
  };
}

function generateCaseStudy(brief: ContentBrief): GeneratedContent {
  const title = generateTitle(brief, 'case-study');
  const content = generateCaseStudyContent(brief);
  const socialPosts = generateSocialMediaPosts(brief, title);
  
  return {
    title,
    content,
    metaDescription: generateMetaDescription(brief, title),
    seoTitle: generateSEOTitle(brief, title),
    keywords: brief.keywords,
    slug: generateSlug(title),
    seoSuggestions: generateSEOSuggestions(brief, title),
    socialPosts,
    excerpt: generateExcerpt(content),
    callToAction: generateCTA(brief),
    wordCount: content.split(' ').length,
    readingTime: calculateReadingTime(content),
    generatedAt: new Date(),
    contentType: brief.contentType
  };
}

function generateLandingPage(brief: ContentBrief): GeneratedContent {
  const title = generateTitle(brief, 'landing-page');
  const content = generateLandingPageContent(brief);
  const socialPosts = generateSocialMediaPosts(brief, title);
  
  return {
    title,
    content,
    metaDescription: generateMetaDescription(brief, title),
    seoTitle: generateSEOTitle(brief, title),
    keywords: brief.keywords,
    slug: generateSlug(title),
    seoSuggestions: generateSEOSuggestions(brief, title),
    socialPosts,
    excerpt: generateExcerpt(content),
    callToAction: generateCTA(brief),
    wordCount: content.split(' ').length,
    readingTime: calculateReadingTime(content),
    generatedAt: new Date(),
    contentType: brief.contentType
  };
}

// Title Generation Functions
function generateTitle(brief: ContentBrief, contentType: string): string {
  const toneAdjectives = {
    'professional': ['Advanced', 'Strategic', 'Comprehensive', 'Expert', 'Professional'],
    'casual': ['Simple', 'Easy', 'Quick', 'Practical', 'Everyday'],
    'friendly': ['Helpful', 'Friendly', 'Welcoming', 'Approachable', 'Supportive'],
    'authoritative': ['Ultimate', 'Definitive', 'Complete', 'Authoritative', 'Essential'],
    'conversational': ['Let\'s Talk About', 'Understanding', 'Exploring', 'Discussing', 'Discovering'],
    'technical': ['Technical', 'Advanced', 'In-Depth', 'Detailed', 'Comprehensive'],
    'persuasive': ['Revolutionary', 'Game-Changing', 'Breakthrough', 'Innovative', 'Transformative']
  };

  const adjectives = toneAdjectives[brief.tone] || toneAdjectives['professional'];
  const randomAdjective = adjectives[Math.floor(Math.random() * adjectives.length)];

  // Create title based on content type and topic
  const titleTemplates = {
    'article': [
      `${randomAdjective} Guide to ${brief.topic}`,
      `How ${brief.brandName} is Transforming ${brief.topic}`,
      `The Future of ${brief.topic} in ${brief.industry}`,
      `${brief.topic}: What ${brief.targetAudience} Need to Know`
    ],
    'blog': [
      `Why ${brief.topic} Matters for Your Business`,
      `${randomAdjective} Tips for ${brief.topic}`,
      `The Complete Guide to ${brief.topic}`,
      `${brief.topic}: Best Practices and Insights`
    ],
    'newsletter': [
      `${brief.brandName} Newsletter: ${brief.topic} Update`,
      `This Week in ${brief.topic}`,
      `${brief.topic} Insights from ${brief.brandName}`
    ],
    'product': [
      `${brief.brandName} ${brief.topic}`,
      `Introducing ${brief.topic} by ${brief.brandName}`,
      `${randomAdjective} ${brief.topic} Solution`
    ],
    'press-release': [
      `${brief.brandName} Announces ${brief.topic}`,
      `${brief.brandName} Launches ${randomAdjective} ${brief.topic}`,
      `Breaking: ${brief.brandName} ${brief.topic}`
    ],
    'case-study': [
      `How ${brief.brandName} Achieved Success with ${brief.topic}`,
      `Case Study: ${brief.topic} Implementation`,
      `${brief.brandName} Success Story: ${brief.topic}`
    ],
    'landing-page': [
      `${randomAdjective} ${brief.topic} Solutions`,
      `Transform Your Business with ${brief.topic}`,
      `${brief.brandName}: Your ${brief.topic} Partner`
    ]
  };

  const templates = titleTemplates[contentType as keyof typeof titleTemplates] || titleTemplates['article'];
  return templates[Math.floor(Math.random() * templates.length)];
}

// Content Generation Functions
function generateArticleContent(brief: ContentBrief): string {
  const introduction = generateIntroduction(brief);
  const mainContent = generateMainContent(brief);
  const conclusion = generateConclusion(brief);
  
  return `${introduction}\n\n${mainContent}\n\n${conclusion}`;
}

function generateBlogContent(brief: ContentBrief): string {
  const hook = generateHook(brief);
  const introduction = generateIntroduction(brief);
  const mainContent = generateMainContent(brief);
  const personalTouch = generatePersonalTouch(brief);
  const conclusion = generateConclusion(brief);
  
  return `${hook}\n\n${introduction}\n\n${mainContent}\n\n${personalTouch}\n\n${conclusion}`;
}

function generateNewsletterContent(brief: ContentBrief): string {
  const greeting = generateNewsletterGreeting(brief);
  const mainContent = generateMainContent(brief);
  const callToAction = generateCTA(brief);
  const signature = generateSignature(brief);
  
  return `${greeting}\n\n${mainContent}\n\n${callToAction}\n\n${signature}`;
}

function generateProductContent(brief: ContentBrief): string {
  const overview = generateProductOverview(brief);
  const features = generateProductFeatures(brief);
  const benefits = generateProductBenefits(brief);
  const specifications = generateProductSpecs(brief);
  
  return `${overview}\n\n## Key Features\n${features}\n\n## Benefits\n${benefits}\n\n## Specifications\n${specifications}`;
}

function generatePressReleaseContent(brief: ContentBrief): string {
  const headline = generatePressHeadline(brief);
  const dateline = generateDateline(brief);
  const lead = generatePressLead(brief);
  const body = generatePressBody(brief);
  const quote = generateQuote(brief);
  const boilerplate = generateBoilerplate(brief);
  
  return `${headline}\n\n${dateline}\n\n${lead}\n\n${body}\n\n${quote}\n\n${boilerplate}`;
}

function generateCaseStudyContent(brief: ContentBrief): string {
  const executive = generateExecutiveSummary(brief);
  const challenge = generateChallenge(brief);
  const solution = generateSolution(brief);
  const results = generateResults(brief);
  const testimonial = generateTestimonial(brief);
  
  return `## Executive Summary\n${executive}\n\n## The Challenge\n${challenge}\n\n## The Solution\n${solution}\n\n## Results\n${results}\n\n## Client Testimonial\n${testimonial}`;
}

function generateLandingPageContent(brief: ContentBrief): string {
  const hero = generateHeroSection(brief);
  const value = generateValueProposition(brief);
  const features = generateFeatureList(brief);
  const testimonials = generateTestimonialSection(brief);
  const cta = generateCTA(brief);
  
  return `## ${hero}\n\n${value}\n\n## Key Features\n${features}\n\n## What Our Clients Say\n${testimonials}\n\n${cta}`;
}

// Helper Content Generation Functions
function generateIntroduction(brief: ContentBrief): string {
  const toneStarters = {
    'professional': `In today's ${brief.industry} landscape, ${brief.topic} has become increasingly important for organizations seeking to maintain competitive advantage.`,
    'casual': `Let's dive into ${brief.topic} and explore why it matters for your ${brief.industry} business.`,
    'friendly': `Welcome! Today we're exploring ${brief.topic} and how it can benefit your ${brief.industry} organization.`,
    'authoritative': `${brief.topic} represents a critical component of modern ${brief.industry} strategy, requiring comprehensive understanding and strategic implementation.`,
    'conversational': `You've probably heard about ${brief.topic}, but what does it really mean for your ${brief.industry} business?`,
    'technical': `${brief.topic} encompasses a complex set of technologies and methodologies specifically designed for ${brief.industry} applications.`,
    'persuasive': `Imagine transforming your ${brief.industry} operations with ${brief.topic} - the results could be game-changing for your organization.`
  };

  const starter = toneStarters[brief.tone] || toneStarters['professional'];
  
  return `${starter}

${brief.mainMessage}

For ${brief.targetAudience}, understanding ${brief.topic} is essential for making informed decisions about future investments and strategic direction. This comprehensive analysis will explore the key aspects, benefits, and implementation considerations that matter most to your organization.

${brief.mustInclude.length > 0 ? `This analysis includes insights on ${brief.mustInclude.join(', ')}, providing you with actionable intelligence for your decision-making process.` : ''}`;
}

function generateMainContent(brief: ContentBrief): string {
  const sections = [];
  
  // Generate content based on word count and keywords
  const keywordSections = brief.keywords.slice(0, 3).map(keyword => 
    generateKeywordSection(keyword, brief)
  );
  
  sections.push(...keywordSections);
  
  // Add industry-specific section
  sections.push(generateIndustrySection(brief));
  
  // Add benefits section
  sections.push(generateBenefitsSection(brief));
  
  // Add implementation section if word count is high enough
  if (brief.wordCount > 1000) {
    sections.push(generateImplementationSection(brief));
  }
  
  return sections.join('\n\n');
}

function generateKeywordSection(keyword: string, brief: ContentBrief): string {
  return `## Understanding ${keyword}

${keyword} plays a crucial role in ${brief.topic} for ${brief.industry} organizations. ${brief.targetAudience} should consider how ${keyword} impacts their strategic objectives and operational efficiency.

Key considerations for ${keyword} implementation:

• Strategic alignment with business objectives
• Resource requirements and budget considerations  
• Timeline for deployment and expected outcomes
• Integration with existing systems and processes
• Training and change management requirements

The impact of ${keyword} on ${brief.topic} cannot be understated. Organizations that successfully implement ${keyword} strategies typically see improved performance metrics and enhanced competitive positioning within the ${brief.industry} sector.`;
}

function generateIndustrySection(brief: ContentBrief): string {
  return `## ${brief.topic} in the ${brief.industry} Industry

The ${brief.industry} sector presents unique opportunities and challenges for ${brief.topic} implementation. ${brief.brandName} has extensive experience working with ${brief.targetAudience} to navigate these complexities successfully.

Industry-specific considerations include:

• Regulatory compliance and industry standards
• Competitive landscape and market dynamics
• Customer expectations and service requirements
• Technology infrastructure and legacy system integration
• Risk management and security protocols

Organizations in the ${brief.industry} space that prioritize ${brief.topic} are better positioned to adapt to market changes, meet customer demands, and maintain sustainable growth trajectories.`;
}

function generateBenefitsSection(brief: ContentBrief): string {
  return `## Key Benefits and Value Proposition

Implementing ${brief.topic} delivers measurable benefits for ${brief.targetAudience}:

**Operational Excellence**
• Improved efficiency and productivity
• Reduced operational costs and resource optimization
• Enhanced quality control and consistency
• Streamlined workflows and process automation

**Strategic Advantages**
• Competitive differentiation in the ${brief.industry} market
• Improved customer satisfaction and retention
• Enhanced data-driven decision making
• Increased agility and market responsiveness

**Financial Impact**
• Cost reduction through process optimization
• Revenue growth through improved capabilities
• Risk mitigation and compliance assurance
• ROI improvement through strategic investments

These benefits align directly with the core business objectives of ${brief.targetAudience}, providing both immediate operational improvements and long-term strategic value.`;
}

function generateImplementationSection(brief: ContentBrief): string {
  return `## Implementation Strategy and Best Practices

Successfully implementing ${brief.topic} requires a structured approach tailored to the ${brief.industry} environment. ${brief.brandName} recommends the following methodology:

**Phase 1: Assessment and Planning**
• Current state analysis and gap identification
• Stakeholder alignment and requirement gathering
• Resource allocation and timeline development
• Risk assessment and mitigation planning

**Phase 2: Design and Development**
• Solution architecture and technical specifications
• Custom development and system integration
• Quality assurance and testing protocols
• User training and change management

**Phase 3: Deployment and Optimization**
• Phased rollout and go-live support
• Performance monitoring and optimization
• Ongoing maintenance and support
• Continuous improvement and enhancement

This proven methodology ensures successful ${brief.topic} implementation while minimizing disruption to existing operations and maximizing value realization for ${brief.targetAudience}.`;
}

function generateConclusion(brief: ContentBrief): string {
  return `## Moving Forward with ${brief.topic}

${brief.topic} represents a significant opportunity for ${brief.targetAudience} to enhance their ${brief.industry} operations and achieve strategic objectives. The key to success lies in understanding the unique requirements of your organization and implementing solutions that align with your business goals.

${brief.brandName} stands ready to support your ${brief.topic} journey with comprehensive expertise, proven methodologies, and industry-specific knowledge. Our team understands the challenges facing ${brief.targetAudience} and delivers solutions that create measurable value.

**Next Steps:**
• Conduct a comprehensive assessment of your current capabilities
• Identify specific opportunities for ${brief.topic} implementation  
• Develop a strategic roadmap aligned with your business objectives
• Begin implementation with pilot projects to validate approach

The future of ${brief.industry} will be shaped by organizations that embrace ${brief.topic} and leverage its capabilities to drive innovation, efficiency, and growth. Don't let your competition gain the advantage - start your ${brief.topic} journey today.`;
}

// Social Media Generation Functions
function generateSocialMediaPosts(brief: ContentBrief, title: string): Array<{platform: string, content: string, hashtags: string[]}> {
  const posts: Array<{platform: string, content: string, hashtags: string[]}> = [];
  
  brief.socialPlatforms.forEach(platform => {
    switch(platform) {
      case 'LinkedIn':
        posts.push({
          platform: 'LinkedIn',
          content: generateLinkedInPost(brief, title),
          hashtags: generateLinkedInHashtags(brief)
        });
        break;
      case 'Twitter/X':
        posts.push({
          platform: 'Twitter/X',
          content: generateTwitterPost(brief, title),
          hashtags: generateTwitterHashtags(brief)
        });
        break;
      case 'Facebook':
        posts.push({
          platform: 'Facebook',
          content: generateFacebookPost(brief, title),
          hashtags: generateFacebookHashtags(brief)
        });
        break;
      case 'Instagram':
        posts.push({
          platform: 'Instagram',
          content: generateInstagramPost(brief, title),
          hashtags: generateInstagramHashtags(brief)
        });
        break;
      default:
        posts.push({
          platform,
          content: generateGenericPost(brief, title),
          hashtags: generateGenericHashtags(brief)
        });
    }
  });
  
  return posts;
}

function generateLinkedInPost(brief: ContentBrief, title: string): string {
  return `🚀 ${title}

${brief.mainMessage}

Key insights for ${brief.targetAudience}:
• Strategic implementation approaches
• Industry best practices and benchmarks  
• Measurable ROI and business impact

${brief.brandName} brings deep expertise in ${brief.industry} solutions, helping organizations transform their operations and achieve sustainable growth.

What's your experience with ${brief.topic}? Share your thoughts in the comments!

#${brief.industry} #${brief.topic.replace(/\s+/g, '')} #BusinessTransformation`;
}

function generateTwitterPost(brief: ContentBrief, title: string): string {
  return `${brief.brandName} insights: ${brief.mainMessage.substring(0, 120)}... 

${brief.topic} is transforming ${brief.industry} 🚀

Learn more about implementation strategies for ${brief.targetAudience} 👇`;
}

function generateFacebookPost(brief: ContentBrief, title: string): string {
  return `${title} 📊

Discover how ${brief.topic} is revolutionizing the ${brief.industry} industry! 

${brief.mainMessage}

Perfect for ${brief.targetAudience} looking to:
✅ Improve operational efficiency
✅ Drive strategic growth
✅ Stay ahead of competition

${brief.brandName} has the expertise to guide your transformation journey.

Read our latest insights and share your thoughts! 💬`;
}

function generateInstagramPost(brief: ContentBrief, title: string): string {
  return `${brief.topic} game-changer! 🎯

${brief.brandName} helps ${brief.industry} leaders like you transform operations and drive growth. 

${brief.mainMessage.substring(0, 100)}...

Ready to elevate your business? 💪

${brief.includeImages ? 'Swipe for key insights! →' : ''}`;
}

function generateGenericPost(brief: ContentBrief, title: string): string {
  return `${title}

${brief.mainMessage}

${brief.brandName} specializes in ${brief.topic} solutions for ${brief.industry} organizations.

Perfect for ${brief.targetAudience} seeking growth and innovation.`;
}

// Hashtag Generation Functions
function generateLinkedInHashtags(brief: ContentBrief): string[] {
  const baseHashtags = [brief.industry, 'BusinessStrategy', 'Innovation', 'Growth'];
  const keywordHashtags = brief.keywords.map(k => k.replace(/\s+/g, ''));
  return [...baseHashtags, ...keywordHashtags].slice(0, 8);
}

function generateTwitterHashtags(brief: ContentBrief): string[] {
  const baseHashtags = [brief.industry, brief.topic.replace(/\s+/g, ''), 'Innovation'];
  const keywordHashtags = brief.keywords.slice(0, 2).map(k => k.replace(/\s+/g, ''));
  return [...baseHashtags, ...keywordHashtags].slice(0, 5);
}

function generateFacebookHashtags(brief: ContentBrief): string[] {
  const baseHashtags = [brief.industry, 'Business', 'Technology', 'Growth'];
  const keywordHashtags = brief.keywords.slice(0, 3).map(k => k.replace(/\s+/g, ''));
  return [...baseHashtags, ...keywordHashtags].slice(0, 6);
}

function generateInstagramHashtags(brief: ContentBrief): string[] {
  const baseHashtags = [brief.industry, 'Business', 'Innovation', 'Success', 'Growth', 'Technology'];
  const keywordHashtags = brief.keywords.map(k => k.replace(/\s+/g, ''));
  const brandHashtags = [brief.brandName.replace(/\s+/g, '')];
  return [...baseHashtags, ...keywordHashtags, ...brandHashtags].slice(0, 15);
}

function generateGenericHashtags(brief: ContentBrief): string[] {
  return [brief.industry, brief.topic.replace(/\s+/g, ''), 'Business', 'Innovation'];
}

// Utility Functions
function generateMetaDescription(brief: ContentBrief, title: string): string {
  if (brief.metaDescription) return brief.metaDescription;
  
  return `${brief.mainMessage.substring(0, 120)}... Learn how ${brief.brandName} helps ${brief.targetAudience} with ${brief.topic}.`.substring(0, 160);
}

function generateSEOTitle(brief: ContentBrief, title: string): string {
  const seoTitle = `${title} | ${brief.brandName}`;
  return seoTitle.length <= 60 ? seoTitle : title.substring(0, 57) + '...';
}

function generateSlug(title: string): string {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
}

function generateExcerpt(content: string): string {
  const firstParagraph = content.split('\n\n')[0];
  return firstParagraph.length > 200 ? firstParagraph.substring(0, 197) + '...' : firstParagraph;
}

function generateCTA(brief: ContentBrief): string {
  const ctas = [
    `Ready to transform your ${brief.industry} operations with ${brief.topic}? Contact ${brief.brandName} today to learn how we can help you achieve your strategic objectives.`,
    `Discover how ${brief.brandName} can help you implement ${brief.topic} solutions that drive real business results. Get in touch with our expert team.`,
    `Take the next step in your ${brief.topic} journey. ${brief.brandName} offers comprehensive solutions tailored for ${brief.targetAudience}.`,
    `Partner with ${brief.brandName} to unlock the full potential of ${brief.topic} for your ${brief.industry} organization.`
  ];
  
  return ctas[Math.floor(Math.random() * ctas.length)];
}

function calculateReadingTime(content: string): string {
  const wordsPerMinute = 200;
  const wordCount = content.split(' ').length;
  const minutes = Math.ceil(wordCount / wordsPerMinute);
  return `${minutes} min read`;
}

// SEO Suggestions Generation
function generateSEOSuggestions(brief: ContentBrief, title: string): SEOSuggestions {
  const suggestedKeywords = generateAdvancedKeywords(brief);
  const suggestedMetaDescription = generateOptimizedMetaDescription(brief, title);
  const keywordDifficulty = calculateKeywordDifficulty(suggestedKeywords);
  const searchVolume = estimateSearchVolume(suggestedKeywords, brief);
  const competitorAnalysis = generateCompetitorInsights(brief);

  return {
    suggestedKeywords,
    suggestedMetaDescription,
    keywordDifficulty,
    searchVolume,
    competitorAnalysis
  };
}

function generateAdvancedKeywords(brief: ContentBrief): string[] {
  const keywords = [];
  
  // Primary topic keywords
  const topicWords = brief.topic.toLowerCase().split(' ');
  keywords.push(brief.topic.toLowerCase());
  
  // Industry-specific keywords
  keywords.push(`${brief.industry.toLowerCase()}`);
  keywords.push(`${brief.industry.toLowerCase()} ${brief.topic.toLowerCase()}`);
  
  // Intent-based keywords based on content type
  const intentKeywords: { [key: string]: string[] } = {
    'article': ['guide', 'complete guide', 'ultimate guide', 'comprehensive'],
    'blog-post': ['how to', 'tips', 'best practices', 'tutorial', 'step by step'],
    'case-study': ['success story', 'case study', 'results', 'ROI'],
    'product-description': ['best', 'top', 'review', 'features', 'benefits'],
    'press-release': ['news', 'announcement', 'launch', 'update'],
    'social-posts': ['trending', 'viral', 'engagement', 'social', 'share'],
    'newsletter': ['insights', 'trends', 'update', 'roundup'],
    'landing-page': ['solution', 'service', 'benefits', 'why choose']
  };
  
  const intents = intentKeywords[brief.contentType] || ['guide', 'tips'];
  intents.forEach(intent => {
    keywords.push(`${intent} ${brief.topic.toLowerCase()}`);
    keywords.push(`${brief.topic.toLowerCase()} ${intent}`);
    keywords.push(`${brief.industry.toLowerCase()} ${intent}`);
  });
  
  // Long-tail keywords
  keywords.push(`best ${brief.topic.toLowerCase()} for ${brief.industry.toLowerCase()}`);
  keywords.push(`${brief.topic.toLowerCase()} ${brief.industry.toLowerCase()} 2024`);
  keywords.push(`why ${brief.topic.toLowerCase()} matters`);
  keywords.push(`${brief.topic.toLowerCase()} benefits for ${brief.industry.toLowerCase()}`);
  
  // Target audience specific keywords
  if (brief.targetAudience) {
    const audienceKeywords = brief.targetAudience.toLowerCase().split(' ').slice(0, 3);
    audienceKeywords.forEach(aud => {
      if (aud.length > 3) {
        keywords.push(`${brief.topic.toLowerCase()} for ${aud}`);
      }
    });
  }
  
  // High-value commercial keywords based on budget
  const budgetLevel = getBudgetLevel(brief.budget);
  if (budgetLevel === 'high') {
    keywords.push(`premium ${brief.topic.toLowerCase()}`);
    keywords.push(`enterprise ${brief.topic.toLowerCase()}`);
    keywords.push(`professional ${brief.topic.toLowerCase()} services`);
  }
  
  // Remove duplicates and short keywords
  return Array.from(new Set(keywords))
    .filter(keyword => keyword.length > 3 && !keyword.includes('undefined'))
    .slice(0, 12);
}

function generateOptimizedMetaDescription(brief: ContentBrief, title: string): string {
  // Create compelling meta description based on guaranteed pageviews and value prop
  const pageviewsText = brief.guaranteedPageviews >= 100000 ? 
    `Proven to drive ${(brief.guaranteedPageviews / 1000).toLocaleString()}K+ pageviews.` : 
    `Optimized for maximum engagement.`;
  
  const industryValue = `${brief.industry} professionals trust our ${brief.contentType.replace('-', ' ')} content.`;
  
  const actionText = brief.contentType === 'landing-page' ? 
    'Get started today!' : 
    'Read the full analysis.';
  
  const metaDesc = `${brief.mainMessage.substring(0, 80)}... ${pageviewsText} ${industryValue} ${actionText}`;
  
  // Ensure it's under 160 characters
  return metaDesc.length > 160 ? metaDesc.substring(0, 157) + '...' : metaDesc;
}

function calculateKeywordDifficulty(keywords: string[]): { [keyword: string]: 'Low' | 'Medium' | 'High' } {
  const difficulty: { [keyword: string]: 'Low' | 'Medium' | 'High' } = {};
  
  keywords.forEach(keyword => {
    const wordCount = keyword.split(' ').length;
    const hasNumbers = /\d/.test(keyword);
    
    if (wordCount >= 4 || hasNumbers || keyword.includes('how to') || keyword.includes('best')) {
      difficulty[keyword] = 'Low';
    } else if (wordCount === 3) {
      difficulty[keyword] = 'Medium';
    } else {
      difficulty[keyword] = 'High';
    }
  });
  
  return difficulty;
}

function estimateSearchVolume(keywords: string[], brief: ContentBrief): { [keyword: string]: number } {
  const volume: { [keyword: string]: number } = {};
  
  const industryMultiplier = getIndustryMultiplier(brief.industry);
  
  keywords.forEach(keyword => {
    const wordCount = keyword.split(' ').length;
    let baseVolume = 1000;
    
    // Adjust based on keyword characteristics
    if (keyword.includes(brief.topic.toLowerCase())) baseVolume *= 2;
    if (keyword.includes('how to')) baseVolume *= 1.5;
    if (keyword.includes('best')) baseVolume *= 1.8;
    if (keyword.includes('guide')) baseVolume *= 1.3;
    if (wordCount >= 4) baseVolume *= 0.7; // Long-tail has lower volume but higher intent
    
    volume[keyword] = Math.round(baseVolume * industryMultiplier);
  });
  
  return volume;
}

function generateCompetitorInsights(brief: ContentBrief): string[] {
  return [
    `Focus on long-tail keywords for ${brief.industry} to avoid high competition`,
    `Content length of ${brief.wordCount}+ words performs better in ${brief.industry}`,
    `Include industry-specific case studies and data points`,
    `Target semantic keywords related to ${brief.topic}`,
    `Optimize for featured snippets with structured content`
  ];
}

function getBudgetLevel(budget: string): 'low' | 'medium' | 'high' {
  if (budget.includes('100K') || budget.includes('250K+')) return 'high';
  if (budget.includes('25K') || budget.includes('50K')) return 'medium';
  return 'low';
}

function getIndustryMultiplier(industry: string): number {
  const multipliers: { [key: string]: number } = {
    'technology': 1.5,
    'healthcare': 1.3,
    'finance': 1.4,
    'education': 1.2,
    'retail': 1.6,
    'manufacturing': 1.1,
    'consulting': 1.2
  };
  
  const industryLower = industry.toLowerCase();
  return multipliers[industryLower] || 1.0;
}

// Additional content generation functions for specialized content types
function generateHook(brief: ContentBrief): string {
  const hooks = [
    `What if I told you that ${brief.topic} could transform your entire ${brief.industry} operation in just ${brief.deadline ? 'months' : 'a short time'}?`,
    `${brief.targetAudience} are discovering something remarkable about ${brief.topic}...`,
    `The ${brief.industry} landscape is changing rapidly, and ${brief.topic} is at the center of this transformation.`,
    `Every day, organizations miss opportunities because they haven't embraced ${brief.topic}.`
  ];
  
  return hooks[Math.floor(Math.random() * hooks.length)];
}

function generatePersonalTouch(brief: ContentBrief): string {
  return `At ${brief.brandName}, we've seen firsthand how ${brief.topic} transforms ${brief.industry} organizations. Our experience working with ${brief.targetAudience} has taught us that success comes from understanding both the technical capabilities and the human impact of implementation.

What excites us most is seeing the "aha moment" when clients realize the full potential of their investment in ${brief.topic}.`;
}

function generateNewsletterGreeting(brief: ContentBrief): string {
  return `Hello ${brief.targetAudience},

Welcome to this week's insights from ${brief.brandName}. We're excited to share our latest thinking on ${brief.topic} and its impact on the ${brief.industry} sector.`;
}

function generateSignature(brief: ContentBrief): string {
  return `Best regards,
The ${brief.brandName} Team

P.S. Have questions about ${brief.topic}? Reply to this email - we'd love to hear from you!`;
}

function generateProductOverview(brief: ContentBrief): string {
  return `## ${brief.topic} by ${brief.brandName}

${brief.mainMessage}

Designed specifically for ${brief.targetAudience} in the ${brief.industry} sector, our ${brief.topic} solution delivers unprecedented value through innovative features and proven methodology.`;
}

function generateProductFeatures(brief: ContentBrief): string {
  const features = brief.keywords.map(keyword => 
    `• **${keyword}**: Advanced capabilities that enhance operational efficiency and strategic outcomes`
  ).join('\n');
  
  return features || '• Advanced functionality tailored to your industry needs\n• Intuitive user experience designed for efficiency\n• Comprehensive integration capabilities\n• Scalable architecture for future growth';
}

function generateProductBenefits(brief: ContentBrief): string {
  return `• Reduced operational costs and improved efficiency
• Enhanced decision-making capabilities
• Competitive advantage in the ${brief.industry} market
• Scalable solution that grows with your business
• Expert support and ongoing optimization`;
}

function generateProductSpecs(brief: ContentBrief): string {
  return `**Target Users**: ${brief.targetAudience}
**Industry Focus**: ${brief.industry}
**Implementation Timeline**: ${brief.deadline || 'Flexible based on requirements'}
**Support**: Comprehensive training and ongoing assistance
**Integration**: Compatible with existing ${brief.industry} systems`;
}

function generateSocialCampaignContent(brief: ContentBrief, socialPosts: any[]): string {
  const content = `# Social Media Campaign: ${brief.topic}

## Campaign Overview
This comprehensive social media campaign promotes ${brief.topic} across multiple platforms, targeting ${brief.targetAudience} in the ${brief.industry} sector.

## Key Message
${brief.mainMessage}

## Platform-Specific Content

${socialPosts.map(post => `### ${post.platform}
**Content**: ${post.content}

**Hashtags**: ${post.hashtags.map((h: string) => `#${h}`).join(' ')}

---`).join('\n')}

## Campaign Goals
• Increase awareness of ${brief.topic} solutions
• Generate qualified leads from ${brief.targetAudience}  
• Position ${brief.brandName} as thought leader in ${brief.industry}
• Drive engagement and community building

## Success Metrics
• Reach and impressions across all platforms
• Engagement rates (likes, shares, comments)
• Click-through rates to landing pages
• Lead generation and conversion rates
• Brand mention and sentiment analysis`;

  return content;
}

// Additional specialized content generators
function generatePressHeadline(brief: ContentBrief): string {
  return `FOR IMMEDIATE RELEASE\n\n${brief.brandName} ${brief.mainMessage}`;
}

function generateDateline(brief: ContentBrief): string {
  const today = new Date();
  return `${brief.industry} - ${today.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}`;
}

function generatePressLead(brief: ContentBrief): string {
  return `${brief.brandName}, a leading provider of ${brief.topic} solutions for the ${brief.industry} sector, today announced ${brief.mainMessage}`;
}

function generatePressBody(brief: ContentBrief): string {
  return `The announcement addresses growing demand from ${brief.targetAudience} for ${brief.topic} capabilities that deliver measurable business results.

"${brief.mainMessage}," said a ${brief.brandName} spokesperson. "This development represents our continued commitment to innovation and excellence in the ${brief.industry} space."

Key benefits include:
${brief.keywords.map(k => `• ${k} optimization and enhancement`).join('\n')}

The solution is designed specifically for ${brief.targetAudience} who require ${brief.topic} capabilities that integrate seamlessly with existing operations while delivering immediate value.`;
}

function generateQuote(brief: ContentBrief): string {
  return `"We're excited to bring ${brief.topic} capabilities to ${brief.targetAudience}," said [Executive Name], [Title] at ${brief.brandName}. "${brief.mainMessage} This represents a significant step forward for organizations in the ${brief.industry} sector looking to enhance their competitive position and operational efficiency."`;
}

function generateBoilerplate(brief: ContentBrief): string {
  return `About ${brief.brandName}
${brief.brandName} is a leading provider of ${brief.topic} solutions for the ${brief.industry} industry. With extensive experience serving ${brief.targetAudience}, the company delivers innovative technologies and expert guidance that drive measurable business results. For more information, visit [website] or contact [contact information].

###

Media Contact:
[Name]
${brief.brandName}
[Phone]
[Email]`;
}

function generateExecutiveSummary(brief: ContentBrief): string {
  return `This case study examines the successful implementation of ${brief.topic} for a ${brief.industry} organization. The client achieved significant operational improvements and strategic advantages through ${brief.brandName}'s comprehensive solution.

**Key Results:**
• Improved operational efficiency
• Enhanced customer satisfaction
• Reduced operational costs
• Increased competitive advantage`;
}

function generateChallenge(brief: ContentBrief): string {
  return `The client, a leading ${brief.industry} organization serving ${brief.targetAudience}, faced significant challenges with their existing approach to ${brief.topic}. Key issues included:

• Limited scalability and flexibility
• Inefficient processes and workflows
• Difficulty meeting customer expectations
• Competitive pressure and market dynamics

These challenges were impacting the organization's ability to grow and maintain market position.`;
}

function generateSolution(brief: ContentBrief): string {
  return `${brief.brandName} developed a comprehensive ${brief.topic} solution tailored to the client's specific requirements. The approach included:

**Strategy and Planning**
• Detailed assessment of current capabilities
• Custom solution design and architecture
• Implementation roadmap and timeline

**Technology Implementation**
${brief.keywords.map(k => `• ${k} optimization and integration`).join('\n')}

**Change Management**
• Training and support programs
• Process optimization and workflow redesign
• Ongoing monitoring and optimization`;
}

function generateResults(brief: ContentBrief): string {
  return `The implementation delivered exceptional results:

**Operational Improvements**
• 40% reduction in processing time
• 25% improvement in operational efficiency
• 60% reduction in error rates
• Enhanced scalability and flexibility

**Business Impact**
• Increased customer satisfaction scores
• Improved competitive positioning
• Cost savings and ROI achievement
• Enhanced strategic capabilities

**Strategic Advantages**
• Better decision-making capabilities
• Improved market responsiveness
• Enhanced innovation capacity
• Stronger competitive differentiation`;
}

function generateTestimonial(brief: ContentBrief): string {
  return `"Working with ${brief.brandName} transformed our approach to ${brief.topic}. The results exceeded our expectations and positioned us for continued success in the ${brief.industry} market. Their expertise and dedication made all the difference."

- [Client Name], [Title], [Client Organization]

"The implementation was smooth and professional. ${brief.brandName}'s team understood our unique requirements and delivered a solution that truly works for our organization."

- [Client Name], [Title], [Client Organization]`;
}

function generateHeroSection(brief: ContentBrief): string {
  return `Transform Your ${brief.industry} Operations with ${brief.topic}`;
}

function generateValueProposition(brief: ContentBrief): string {
  return `${brief.mainMessage}

${brief.brandName} delivers ${brief.topic} solutions specifically designed for ${brief.targetAudience}. Our proven approach combines industry expertise with innovative technology to create measurable business value.

**Why Choose ${brief.brandName}?**
• Deep ${brief.industry} industry expertise
• Proven track record of successful implementations  
• Comprehensive support and ongoing optimization
• Tailored solutions for ${brief.targetAudience}`;
}

function generateFeatureList(brief: ContentBrief): string {
  return brief.keywords.map(keyword => 
    `• **${keyword}**: Advanced capabilities that drive operational excellence and strategic advantage`
  ).join('\n') || `• Industry-leading functionality
• Intuitive user experience
• Comprehensive integration capabilities
• Scalable and flexible architecture
• Expert support and training`;
}

function generateTestimonialSection(brief: ContentBrief): string {
  return `"${brief.brandName} helped us achieve remarkable results with ${brief.topic}. The impact on our ${brief.industry} operations has been transformational."
*- ${brief.industry} Leader*

"Outstanding expertise and support. The ${brief.topic} solution exceeded our expectations and delivered real business value."
*- ${brief.targetAudience} Executive*

"Professional, knowledgeable, and results-focused. ${brief.brandName} is the partner you want for ${brief.topic} success."
*- Industry Expert*`;
}