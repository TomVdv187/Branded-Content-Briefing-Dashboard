import { ContentBrief, GeneratedContent, ImagePack } from '../types';

/**
 * CLAUDE.md compliant storyline-first content generator
 * Generates multi-platform packages with image packs
 */
export function generateStoryContent(brief: ContentBrief): GeneratedContent {
  const storyline = brief.storyline;
  const brandName = brief.brand.name;
  const voiceTone = brief.brand.voice_tone[0] || 'professional';
  const audience = brief.audience.primary;
  
  // Generate content for each requested platform
  const content: GeneratedContent = {
    image_packs: [],
    generated_at: new Date().toISOString(),
    compliant: true,
    novelty_score: calculateNoveltyScore(brief)
  };
  
  // Generate content for each platform
  brief.platforms.forEach(platform => {
    switch (platform) {
      case 'article':
        content.article = generateArticleContent(brief);
        break;
      case 'instagram':
        content.instagram = generateInstagramContent(brief);
        break;
      case 'tiktok':
        content.tiktok = generateTikTokContent(brief);
        break;
      case 'facebook':
        content.facebook = generateFacebookContent(brief);
        break;
      case 'linkedin':
        content.linkedin = generateLinkedInContent(brief);
        break;
      case 'newsletter':
        content.newsletter = generateNewsletterContent(brief);
        break;
      case 'youtube':
        content.youtube = generateYouTubeContent(brief);
        break;
    }
  });
  
  // Generate comprehensive image packs
  content.image_packs = generateImagePacks(brief);
  
  return content;
}

function generateArticleContent(brief: ContentBrief) {
  const title = generateStorylineTitle(brief);
  const content = generateStorylineArticle(brief);
  
  return {
    title,
    content,
    seo: {
      meta_description: generateMetaDescription(brief, title),
      slug: generateSlug(title),
      keywords: [brief.seo.primary_keyword, ...brief.seo.secondary_keywords]
    }
  };
}

function generateInstagramContent(brief: ContentBrief) {
  const posts = [];
  
  // Create 3 Instagram posts for better engagement
  for (let i = 0; i < 3; i++) {
    posts.push({
      caption: generateInstagramCaption(brief, i),
      hashtags: generateInstagramHashtags(brief),
      image_requirements: [
        {
          role: 'hero-visual',
          prompt: `Create a visually striking Instagram post image about ${brief.storyline}. Style: ${brief.brand.voice_tone.join(', ')}. Target: ${brief.audience.primary}`,
          alt_text: `Instagram post about ${brief.storyline} by ${brief.brand.name}`,
          composition: 'square 1:1 ratio, bold text overlay, brand colors'
        }
      ]
    });
  }
  
  return {
    posts,
    stories: [
      {
        content: generateInstagramStoryContent(brief),
        image_requirements: [
          {
            role: 'story-background',
            prompt: `Instagram story background for ${brief.storyline}. Modern, engaging design`,
            alt_text: `Instagram story about ${brief.storyline}`,
            composition: '9:16 vertical, minimal text, eye-catching visuals'
          }
        ]
      }
    ]
  };
}

function generateTikTokContent(brief: ContentBrief) {
  const scripts = [];
  
  // Create 2 TikTok scripts with different angles
  const angles = ['how-to', 'trending-insight'];
  
  angles.forEach(angle => {
    scripts.push({
      hook: generateTikTokHook(brief, angle),
      body: generateTikTokBody(brief, angle),
      cta: generateTikTokCTA(brief),
      duration_seconds: brief.angle_hint === 'how-to' ? 60 : 30,
      trending_sounds: getTrendingSounds(brief)
    });
  });
  
  return { scripts };
}

function generateFacebookContent(brief: ContentBrief) {
  // Facebook included by default per CLAUDE.md
  const posts = [
    {
      text: generateFacebookPost(brief),
      image_requirements: [
        {
          role: 'facebook-hero',
          prompt: `Facebook post image for ${brief.storyline}. Professional yet engaging, suitable for ${brief.audience.primary}`,
          alt_text: `Facebook post about ${brief.storyline} by ${brief.brand.name}`,
          composition: 'landscape 1.91:1, clear text hierarchy, social proof elements'
        }
      ],
      engagement_hooks: generateFacebookEngagementHooks(brief)
    }
  ];
  
  return { posts };
}

function generateLinkedInContent(brief: ContentBrief) {
  const posts = [
    {
      text: generateLinkedInPost(brief),
      hashtags: generateLinkedInHashtags(brief),
      image_requirements: [
        {
          role: 'professional-visual',
          prompt: `Professional LinkedIn image about ${brief.storyline}. Corporate style, data visualization if applicable`,
          alt_text: `LinkedIn post about ${brief.storyline} by ${brief.brand.name}`,
          composition: 'landscape format, professional color scheme, minimal design'
        }
      ]
    }
  ];
  
  // Add LinkedIn article if storyline is comprehensive
  if (brief.storyline.length > 100) {
    posts.push({
      text: '',
      hashtags: [],
      image_requirements: []
    });
    
    return {
      posts,
      articles: [
        {
          title: generateLinkedInArticleTitle(brief),
          content: generateLinkedInArticleContent(brief),
          seo_optimized: true
        }
      ]
    };
  }
  
  return { posts };
}

function generateNewsletterContent(brief: ContentBrief) {
  return {
    subject_line: generateNewsletterSubject(brief),
    preview_text: generateNewsletterPreview(brief),
    html_content: generateNewsletterHTML(brief),
    text_content: generateNewsletterText(brief),
    personalization_tags: ['{{first_name}}', '{{company}}', '{{industry}}']
  };
}

function generateYouTubeContent(brief: ContentBrief) {
  return {
    title: generateYouTubeTitle(brief),
    description: generateYouTubeDescription(brief),
    script: generateYouTubeScript(brief),
    timestamps: generateYouTubeTimestamps(brief),
    thumbnail_requirements: [
      {
        role: 'youtube-thumbnail',
        prompt: `YouTube thumbnail for ${brief.storyline}. High-contrast, compelling facial expression or visual, clear text`,
        alt_text: `YouTube video about ${brief.storyline}`,
        composition: '1280x720, bold typography, contrasting colors, 3 focal points max'
      }
    ]
  };
}

function generateImagePacks(brief: ContentBrief): ImagePack[] {
  const packs: ImagePack[] = [];
  
  // Hero image pack
  packs.push({
    role: 'hero-image',
    prompt: `Create a compelling hero image for content about ${brief.storyline}. Style should reflect ${brief.brand.voice_tone.join(' and ')} tone. Target audience: ${brief.audience.primary}`,
    alt_text: `Hero image representing ${brief.storyline} by ${brief.brand.name}`,
    composition: 'landscape 16:9, strong focal point, brand colors, professional lighting'
  });
  
  // Supporting visuals
  packs.push({
    role: 'supporting-visual',
    prompt: `Supporting infographic or visual for ${brief.storyline}. Data-driven if applicable, clean design`,
    alt_text: `Supporting visual for ${brief.storyline} content`,
    composition: 'square or vertical format, minimal text, clear hierarchy'
  });
  
  // Social media pack
  packs.push({
    role: 'social-media-pack',
    prompt: `Social media visual pack for ${brief.storyline}. Multiple format variations (square, story, landscape)`,
    alt_text: `Social media visuals for ${brief.storyline}`,
    composition: 'multiple aspect ratios, consistent brand elements, mobile-optimized'
  });
  
  return packs;
}

// Content generation helper functions

function generateStorylineTitle(brief: ContentBrief): string {
  const angleTemplates = {
    'how-to': `How to ${brief.storyline}: Complete Guide for ${brief.audience.primary}`,
    'list': `Top 7 ${brief.storyline} Strategies That Actually Work`,
    'comparison': `${brief.storyline}: Best Solutions Compared`,
    'news': `${brief.brand.name} Reveals: ${brief.storyline}`,
    'case-study': `Success Story: How ${brief.storyline} Transformed Results`,
    'trend': `${brief.storyline}: 2024 Trends and Predictions`,
    'informative-guide': `The Complete Guide to ${brief.storyline}`
  };
  
  return angleTemplates[brief.angle_hint as keyof typeof angleTemplates] || 
         `${brief.storyline}: Essential Guide`;
}

function generateStorylineArticle(brief: ContentBrief): string {
  const mustUse = brief.brand.must_use_phrases.length > 0 ? 
    `This article incorporates key messaging: ${brief.brand.must_use_phrases.join(', ')}.` : '';
  
  const compliance = brief.brand.banned_phrases.length > 0 ? 
    `Note: This content avoids mentioning ${brief.brand.banned_phrases.join(', ')} as requested.` : '';
  
  return `# ${generateStorylineTitle(brief)}

## Introduction

${brief.storyline} represents a critical opportunity for ${brief.audience.primary} seeking competitive advantage and operational excellence. ${brief.brand.name} brings extensive expertise to help organizations navigate this landscape successfully.

## Key Insights

Understanding ${brief.storyline} requires a strategic approach that balances innovation with practical implementation. For ${brief.audience.primary}, this means:

• Strategic planning aligned with business objectives
• Implementation roadmaps that minimize risk
• Performance metrics that demonstrate ROI
• Change management that ensures adoption

## Best Practices

Based on ${brief.brand.name}'s experience with ${brief.audience.primary}, we recommend:

1. **Assessment Phase**: Comprehensive evaluation of current capabilities
2. **Strategy Development**: Customized approach aligned with business goals  
3. **Implementation**: Phased rollout with continuous monitoring
4. **Optimization**: Ongoing refinement based on performance data

## ${brief.seo.primary_keyword} Implementation

The successful deployment of ${brief.seo.primary_keyword} strategies requires understanding both technical requirements and organizational readiness. Key considerations include:

• Resource allocation and timeline planning
• Integration with existing systems and processes
• Training and change management requirements
• Performance measurement and optimization protocols

## Industry-Specific Applications

For organizations in the ${brief.audience.primary} sector, ${brief.storyline} applications include:

${brief.seo.secondary_keywords.map(keyword => 
  `• **${keyword}**: Specialized approaches that deliver measurable results`
).join('\n')}

## Conclusion

${brief.storyline} represents both an opportunity and a imperative for ${brief.audience.primary}. Organizations that embrace strategic implementation will gain significant competitive advantages.

${brief.brand.name} stands ready to support your ${brief.storyline} journey with proven expertise and innovative solutions tailored to your specific requirements.

${mustUse}
${compliance}
${brief.legal.disclaimer}`;
}

function generateInstagramCaption(brief: ContentBrief, index: number): string {
  const captions = [
    `✨ ${brief.storyline} insights that will transform your approach!

${brief.brand.name} breaks down the essentials for ${brief.audience.primary} 👇

What's your biggest challenge with ${brief.seo.primary_keyword}? Drop it in the comments! 💬

#${brief.seo.primary_keyword.replace(/\s+/g, '')} #${brief.brand.name.replace(/\s+/g, '')}`,

    `🎯 Real talk about ${brief.storyline}...

${brief.audience.primary} need to know this! Save this post for later 📌

Which tip resonates most with you? Tag a friend who needs to see this! 👥`,

    `🚀 Game-changing ${brief.storyline} strategy alert!

${brief.brand.name} reveals what actually works for ${brief.audience.primary}

Ready to level up? Link in bio for the full guide! ⬆️`
  ];
  
  return captions[index] || captions[0];
}

function generateInstagramHashtags(brief: ContentBrief): string[] {
  const base = [
    brief.seo.primary_keyword.replace(/\s+/g, ''),
    brief.brand.name.replace(/\s+/g, ''),
    'Innovation',
    'Success',
    'Growth'
  ];
  
  const secondary = brief.seo.secondary_keywords.map(k => k.replace(/\s+/g, ''));
  
  return [...base, ...secondary].slice(0, 15);
}

function generateInstagramStoryContent(brief: ContentBrief): string {
  return `💡 ${brief.storyline} secret revealed!

Swipe up to learn how ${brief.brand.name} helps ${brief.audience.primary} achieve results

#${brief.seo.primary_keyword.replace(/\s+/g, '')}`;
}

function generateTikTokHook(brief: ContentBrief, angle: string): string {
  const hooks = {
    'how-to': `POV: You finally understand ${brief.storyline} 👀`,
    'trending-insight': `This ${brief.storyline} trend is changing everything...`
  };
  
  return hooks[angle as keyof typeof hooks] || `${brief.storyline} explained in 30 seconds ⏰`;
}

function generateTikTokBody(brief: ContentBrief, angle: string): string {
  return `Here's what ${brief.audience.primary} need to know about ${brief.storyline}:

✅ ${brief.seo.primary_keyword} strategies that work
✅ Real results from ${brief.brand.name}  
✅ Actionable tips you can use today

Follow for more ${brief.storyline} content! 🔥`;
}

function generateTikTokCTA(brief: ContentBrief): string {
  return `Follow @${brief.brand.name.replace(/\s+/g, '').toLowerCase()} for more ${brief.storyline} tips! Comment your biggest question 👇`;
}

function getTrendingSounds(brief: ContentBrief): string[] {
  return [
    'original-sound-trend',
    'upbeat-motivation-track',
    'educational-content-sound',
    'success-story-audio'
  ];
}

function generateFacebookPost(brief: ContentBrief): string {
  return `🎯 ${brief.storyline} insights for ${brief.audience.primary}

${brief.brand.name} shares proven strategies that deliver results:

🔹 ${brief.seo.primary_keyword} best practices
🔹 Implementation roadmaps that work  
🔹 Real success stories and case studies
🔹 Expert guidance from industry leaders

Perfect for professionals looking to enhance their ${brief.storyline} capabilities and drive meaningful business impact.

What's your experience with ${brief.storyline}? Share your thoughts below! 💬

#${brief.seo.primary_keyword.replace(/\s+/g, '')} #BusinessGrowth #Innovation`;
}

function generateFacebookEngagementHooks(brief: ContentBrief): string[] {
  return [
    `What's your biggest ${brief.storyline} challenge?`,
    `Share your ${brief.seo.primary_keyword} success story!`,
    `Tag someone who needs to see this!`,
    `Which tip will you implement first?`
  ];
}

function generateLinkedInPost(brief: ContentBrief): string {
  return `${brief.storyline}: Strategic Insights for ${brief.audience.primary} 🚀

After working with numerous organizations on ${brief.seo.primary_keyword} initiatives, I've observed some key patterns that separate successful implementations from failed attempts.

Key success factors:

• Strategic alignment with business objectives
• Comprehensive stakeholder engagement  
• Phased implementation with clear milestones
• Continuous measurement and optimization

${brief.brand.name} has developed proven methodologies that address these critical areas, helping ${brief.audience.primary} achieve sustainable results.

The organizations that thrive understand that ${brief.storyline} isn't just about technology—it's about transformation that creates lasting competitive advantage.

What's been your experience with ${brief.storyline} initiatives? I'd love to hear your insights in the comments.

#${brief.seo.primary_keyword.replace(/\s+/g, '')} #BusinessTransformation #Leadership`;
}

function generateLinkedInHashtags(brief: ContentBrief): string[] {
  return [
    brief.seo.primary_keyword.replace(/\s+/g, ''),
    'BusinessStrategy',
    'Innovation',
    'Leadership',
    'Growth',
    'Transformation'
  ];
}

function generateLinkedInArticleTitle(brief: ContentBrief): string {
  return `Strategic Guide to ${brief.storyline}: What ${brief.audience.primary} Need to Know`;
}

function generateLinkedInArticleContent(brief: ContentBrief): string {
  return `The landscape of ${brief.storyline} continues to evolve rapidly, creating both opportunities and challenges for ${brief.audience.primary}.

In this comprehensive analysis, we'll explore the strategic considerations, implementation approaches, and success metrics that define effective ${brief.storyline} initiatives.

## Strategic Framework

Successful ${brief.storyline} implementation requires a structured approach that addresses:

1. **Strategic Alignment**: Ensuring initiatives support broader business objectives
2. **Resource Optimization**: Maximizing ROI through efficient resource allocation  
3. **Risk Mitigation**: Addressing potential challenges before they impact outcomes
4. **Performance Measurement**: Establishing metrics that demonstrate value creation

## Industry Applications

${brief.brand.name}'s experience across diverse sectors reveals that ${brief.storyline} applications vary significantly based on:

• Organizational maturity and readiness
• Industry-specific requirements and constraints
• Competitive landscape and market dynamics
• Available resources and timeline considerations

## Conclusion

${brief.storyline} represents a critical capability for organizations seeking sustainable competitive advantage. Success requires strategic thinking, careful planning, and expert execution.

The organizations that invest in comprehensive ${brief.storyline} capabilities today will be best positioned to capitalize on future opportunities.`;
}

// Additional helper functions...

function generateNewsletterSubject(brief: ContentBrief): string {
  return `${brief.storyline}: Essential insights for ${brief.audience.primary}`;
}

function generateNewsletterPreview(brief: ContentBrief): string {
  return `Discover how ${brief.brand.name} helps organizations master ${brief.storyline}...`;
}

function generateNewsletterHTML(brief: ContentBrief): string {
  return `<h1>${brief.storyline} Update</h1>
<p>Hello {{first_name}},</p>
<p>This week, we're focusing on ${brief.storyline} and its impact on ${brief.audience.primary}.</p>
<h2>Key Insights</h2>
<ul>
<li>${brief.seo.primary_keyword} best practices</li>
<li>Implementation strategies that work</li>
<li>Success stories from industry leaders</li>
</ul>
<p>Best regards,<br>The ${brief.brand.name} Team</p>`;
}

function generateNewsletterText(brief: ContentBrief): string {
  return `${brief.storyline} Update

Hello {{first_name}},

This week, we're focusing on ${brief.storyline} and its impact on ${brief.audience.primary}.

Key Insights:
- ${brief.seo.primary_keyword} best practices
- Implementation strategies that work  
- Success stories from industry leaders

Best regards,
The ${brief.brand.name} Team`;
}

function generateYouTubeTitle(brief: ContentBrief): string {
  return `${brief.storyline}: Complete Guide for ${brief.audience.primary} (2024)`;
}

function generateYouTubeDescription(brief: ContentBrief): string {
  return `In this comprehensive video, we explore ${brief.storyline} and its impact on ${brief.audience.primary}.

🎯 What you'll learn:
• ${brief.seo.primary_keyword} fundamentals
• Implementation strategies
• Real-world case studies  
• Expert tips and best practices

🔗 Resources mentioned:
• ${brief.brand.name} website
• Additional guides and templates

📝 Chapters:
00:00 Introduction
02:30 ${brief.seo.primary_keyword} Overview
05:15 Implementation Strategy
08:45 Case Studies
12:00 Key Takeaways

#${brief.seo.primary_keyword.replace(/\s+/g, '')} #${brief.storyline.replace(/\s+/g, '')} #BusinessGrowth`;
}

function generateYouTubeScript(brief: ContentBrief): string {
  return `INTRO (0-30s)
Hi everyone! Today we're diving deep into ${brief.storyline} and why it's crucial for ${brief.audience.primary}.

HOOK (30-60s)  
If you're struggling with ${brief.seo.primary_keyword}, this video will change how you approach it completely.

MAIN CONTENT (60s-8min)
Let me share the framework that ${brief.brand.name} uses to help organizations succeed with ${brief.storyline}...

[Detailed content sections based on brief.storyline]

CONCLUSION (8-10min)
So there you have it - everything you need to know about ${brief.storyline}. 

What's your biggest takeaway? Let me know in the comments below!`;
}

function generateYouTubeTimestamps(brief: ContentBrief): Array<{time: string, description: string}> {
  return [
    { time: '00:00', description: 'Introduction' },
    { time: '02:30', description: `${brief.seo.primary_keyword} Overview` },
    { time: '05:15', description: 'Implementation Strategy' },
    { time: '08:45', description: 'Case Studies' },
    { time: '12:00', description: 'Key Takeaways' }
  ];
}

function generateMetaDescription(brief: ContentBrief, title: string): string {
  return `${brief.storyline} guide for ${brief.audience.primary}. ${brief.brand.name} shares proven ${brief.seo.primary_keyword} strategies and insights.`.substring(0, 160);
}

function generateSlug(title: string): string {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
}

function calculateNoveltyScore(brief: ContentBrief): number {
  // Calculate novelty based on angle, keywords, and storyline uniqueness
  let score = 0.7; // Base score
  
  if (brief.angle_hint !== 'informative-guide') score += 0.1;
  if (brief.seo.secondary_keywords.length > 3) score += 0.1;
  if (brief.storyline.length > 100) score += 0.1;
  
  return Math.min(score, 1.0);
}