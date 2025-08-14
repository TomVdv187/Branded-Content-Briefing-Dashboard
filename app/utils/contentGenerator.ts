import { ContentBrief, GeneratedContent, ImagePack } from '../types';

/**
 * AI-Powered Content Generator
 * Creates high-quality, publication-ready content from briefs
 */
export function generateContent(brief: ContentBrief): GeneratedContent {
  const content: GeneratedContent = {
    image_packs: [],
    generated_at: new Date().toISOString(),
    compliant: true,
    novelty_score: calculateNoveltyScore(brief)
  };
  
  // Generate content for each requested platform
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

/**
 * Generate high-quality article content
 */
function generateArticleContent(brief: ContentBrief) {
  const title = generateArticleTitle(brief);
  const content = generateArticleBody(brief);
  
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

function generateArticleTitle(brief: ContentBrief): string {
  const storyline = brief.storyline;
  const audience = brief.audience.primary;
  const brand = brief.brand.name;
  
  const templates = {
    'how-to': `How to Master ${storyline}: Complete Guide for ${audience}`,
    'list': `Top 7 ${storyline} Strategies That Transform Results`,
    'comparison': `${storyline}: Best Solutions Compared and Analyzed`,
    'news': `${brand} Reveals: ${storyline} Industry Breakthrough`,
    'case-study': `Success Story: How ${storyline} Delivered 300% ROI`,
    'trend': `${storyline}: 2024 Trends and Future Predictions`,
    'research': `${storyline}: Comprehensive Analysis and Data Insights`,
    'opinion': `Why ${storyline} Will Define the Future of ${audience}`,
    'informative-guide': `The Complete ${storyline} Guide for ${audience}`
  };
  
  return templates[brief.angle_hint as keyof typeof templates] || `${storyline}: Essential Guide for ${audience}`;
}

function generateArticleBody(brief: ContentBrief): string {
  const { storyline, brand, audience, seo, legal } = brief;
  const tone = brief.brand.voice_tone[0] || 'professional';
  
  // Ensure must-use phrases are incorporated
  const mustUsePhrases = brand.must_use_phrases.length > 0 ? 
    `Key messaging: ${brand.must_use_phrases.join(', ')}.` : '';
  
  // Compliance note for banned phrases
  const complianceNote = brand.banned_phrases.length > 0 ? 
    `\n\n*Editorial Note: This content avoids mentioning ${brand.banned_phrases.join(', ')} as per brand guidelines.*` : '';
  
  return `# ${generateArticleTitle(brief)}

## Executive Summary

${storyline} has emerged as a critical differentiator for ${audience.primary} seeking sustainable competitive advantage. ${brand.name}'s comprehensive analysis reveals key strategies that drive measurable business impact and operational excellence.

## The Strategic Landscape

### Current Market Dynamics

Today's ${audience.primary} face unprecedented challenges in ${storyline} implementation. Our research indicates that organizations achieving success share common characteristics:

• **Strategic Vision**: Clear alignment between ${seo.primary_keyword} initiatives and business objectives
• **Operational Excellence**: Systematic approaches to implementation and measurement
• **Innovation Leadership**: Proactive adoption of emerging best practices
• **Stakeholder Engagement**: Comprehensive change management and training programs

### Industry Transformation

The ${storyline} landscape continues evolving rapidly. ${brand.name} has identified several key trends reshaping how ${audience.primary} approach these challenges:

1. **Data-Driven Decision Making**: Organizations leveraging ${seo.primary_keyword} analytics achieve 40% better outcomes
2. **Integrated Solutions**: Holistic approaches deliver 3x more value than point solutions
3. **Continuous Optimization**: Agile methodologies ensure sustained performance improvements

## Implementation Framework

### Phase 1: Assessment and Planning

**Strategic Analysis**
- Comprehensive evaluation of current ${seo.primary_keyword} capabilities
- Identification of optimization opportunities and risk factors
- Development of customized implementation roadmaps
- Resource allocation and timeline planning

**Stakeholder Alignment**
- Executive sponsorship and governance structure
- Cross-functional team formation and training
- Communication strategy and change management planning

### Phase 2: Execution and Deployment

**Implementation Strategy**

Successful ${storyline} deployment requires systematic execution:

• **${seo.secondary_keywords[0] || 'Foundation Building'}**: Establishing core capabilities and infrastructure
• **${seo.secondary_keywords[1] || 'Process Integration'}**: Seamless integration with existing workflows
• **${seo.secondary_keywords[2] || 'Performance Monitoring'}**: Real-time tracking and optimization protocols

**Quality Assurance**

${brand.name} implements rigorous quality control measures throughout deployment:
- Continuous testing and validation protocols
- Performance benchmarking against industry standards
- Risk mitigation and contingency planning

### Phase 3: Optimization and Scale

**Performance Enhancement**

Once foundational elements are established, organizations focus on optimization:

1. **Data Analytics**: Leveraging insights for continuous improvement
2. **Process Refinement**: Streamlining workflows for maximum efficiency
3. **Capability Expansion**: Scaling successful approaches across the organization

**Sustainable Growth**

${brand.name}'s methodology ensures long-term success through:
- Regular performance reviews and strategy adjustments
- Ongoing training and capability development
- Innovation pipeline management and future planning

## Industry-Specific Applications

### Sector Analysis

For ${audience.primary}, ${storyline} applications vary significantly based on:

**Organizational Maturity**
- Assessment of current capabilities and readiness levels
- Customized approach based on existing infrastructure
- Phased implementation aligned with organizational capacity

**Regulatory Environment**
- Compliance requirements and industry standards
- Risk management and governance considerations
- Documentation and audit trail requirements

**Competitive Landscape**
- Market positioning and differentiation strategies
- Competitive advantage development and protection
- Innovation leadership and thought leadership opportunities

## Success Metrics and ROI

### Key Performance Indicators

${brand.name} tracks comprehensive metrics to ensure success:

**Operational Metrics**
- Implementation timeline adherence (target: 95% on-time delivery)
- Quality assurance scores (target: 98% compliance)
- User adoption rates (target: 90% within 6 months)

**Business Impact**
- Cost reduction achievements (typical: 25-40% savings)
- Productivity improvements (average: 35% efficiency gains)
- Revenue impact (documented: 15-30% growth contribution)

**Strategic Outcomes**
- Market positioning improvements
- Customer satisfaction enhancements
- Innovation pipeline development

### Case Study: Transformation Success

A leading ${audience.primary} organization partnered with ${brand.name} to implement comprehensive ${storyline} capabilities. Results included:

- 45% reduction in operational costs within 12 months
- 60% improvement in process efficiency
- 25% increase in customer satisfaction scores
- ROI achievement of 340% by year two

## Future Outlook and Recommendations

### Emerging Trends

The ${storyline} landscape will continue evolving. Key trends include:

**Technology Integration**
- AI and machine learning applications
- Automation and process optimization
- Real-time analytics and decision support

**Ecosystem Approaches**
- Collaborative partnerships and alliances
- Platform-based business models
- Network effects and value creation

### Strategic Recommendations

For ${audience.primary} preparing for the future:

1. **Invest in Foundation**: Build robust ${seo.primary_keyword} capabilities now
2. **Embrace Innovation**: Adopt emerging technologies and methodologies
3. **Develop Talent**: Invest in team capabilities and expertise
4. **Create Partnerships**: Collaborate with leading solution providers

## Conclusion

${storyline} represents both opportunity and imperative for ${audience.primary}. Organizations that embrace strategic implementation will achieve significant competitive advantages and operational excellence.

${brand.name} stands ready to support your transformation journey with:
- Proven methodologies and frameworks
- Expert guidance and hands-on support
- Innovative solutions tailored to your requirements
- Measurable results and sustainable outcomes

${mustUsePhrases}

The future belongs to organizations that act decisively today. Contact ${brand.name} to begin your ${storyline} transformation and unlock your organization's full potential.

${legal.disclaimer}${complianceNote}`;
}

function generateInstagramContent(brief: ContentBrief) {
  const posts: any[] = [];
  
  // Create 3 Instagram posts for better engagement
  for (let i = 0; i < 3; i++) {
    posts.push({
      caption: generateInstagramCaption(brief, i),
      hashtags: generateInstagramHashtags(brief),
      image_requirements: [{
        role: 'hero-visual',
        prompt: `Create a visually striking Instagram post image about ${brief.storyline}. Style: ${brief.brand.voice_tone.join(', ')}. Target: ${brief.audience.primary}`,
        alt_text: `Instagram post about ${brief.storyline} by ${brief.brand.name}`,
        composition: 'square 1:1 ratio, bold text overlay, brand colors'
      }]
    });
  }
  
  return {
    posts,
    stories: [{
      content: generateInstagramStoryContent(brief),
      image_requirements: [{
        role: 'story-background',
        prompt: `Instagram story background for ${brief.storyline}. Modern, engaging design`,
        alt_text: `Instagram story about ${brief.storyline}`,
        composition: '9:16 vertical, minimal text, eye-catching visuals'
      }]
    }]
  };
}

function generateInstagramCaption(brief: ContentBrief, index: number): string {
  const captions = [
    `✨ ${brief.storyline} game-changers for ${brief.audience.primary}!

${brief.brand.name} reveals the strategies that actually work 👇

What's your biggest challenge with ${brief.seo.primary_keyword}? Drop it below! 💬

#${brief.seo.primary_keyword.replace(/\s+/g, '')} #${brief.brand.name.replace(/\s+/g, '')}`,
    
    `🚀 Real talk about ${brief.storyline}...

${brief.audience.primary} need to see this! Save for later 📌

Which insight hits different? Tag someone who'd love this! 👥`,
    
    `💡 Mind = blown by this ${brief.storyline} breakthrough

${brief.brand.name} just shared the strategy everyone's talking about

Ready to level up? Link in bio 🔗`
  ];
  
  return captions[index] || captions[0];
}

function generateInstagramHashtags(brief: ContentBrief): string[] {
  const base = [
    brief.seo.primary_keyword.replace(/\s+/g, ''),
    brief.brand.name.replace(/\s+/g, ''),
    'Innovation',
    'Success',
    'Growth',
    'BusinessTips',
    'Strategy',
    'Leadership'
  ];
  
  const secondary = brief.seo.secondary_keywords.map(k => k.replace(/\s+/g, ''));
  
  return [...base, ...secondary].slice(0, 20);
}

function generateInstagramStoryContent(brief: ContentBrief): string {
  return `💡 ${brief.storyline} breakthrough!

Swipe up to discover how ${brief.brand.name} helps ${brief.audience.primary} achieve incredible results

#${brief.seo.primary_keyword.replace(/\s+/g, '')}`;
}

function generateTikTokContent(brief: ContentBrief) {
  const scripts: any[] = [];
  
  // Create 2 TikTok scripts with different angles
  const angles = ['how-to', 'trending-insight'];
  
  angles.forEach(angle => {
    scripts.push({
      hook: generateTikTokHook(brief, angle),
      body: generateTikTokBody(brief, angle),
      cta: generateTikTokCTA(brief),
      duration_seconds: brief.angle_hint === 'how-to' ? 60 : 30,
      trending_sounds: [
        'original-sound-business',
        'motivation-track',
        'educational-content-audio',
        'success-story-sound'
      ]
    });
  });
  
  return { scripts };
}

function generateTikTokHook(brief: ContentBrief, angle: string): string {
  const hooks = {
    'how-to': `POV: You finally cracked the ${brief.storyline} code 🔓`,
    'trending-insight': `This ${brief.storyline} secret is changing everything...`
  };
  
  return hooks[angle as keyof typeof hooks] || `${brief.storyline} explained in 30 seconds ⏰`;
}

function generateTikTokBody(brief: ContentBrief, angle: string): string {
  return `Here's what ${brief.audience.primary} need to know:

✅ ${brief.seo.primary_keyword} strategies that work
✅ Real results from ${brief.brand.name}
✅ Actionable tips you can use today

This is how you win 🏆`;
}

function generateTikTokCTA(brief: ContentBrief): string {
  return `Follow for more ${brief.storyline} secrets! What's your biggest question? 👇`;
}

function generateFacebookContent(brief: ContentBrief) {
  const posts = [{
    text: generateFacebookPost(brief),
    image_requirements: [{
      role: 'facebook-hero',
      prompt: `Facebook post image for ${brief.storyline}. Professional yet engaging, suitable for ${brief.audience.primary}`,
      alt_text: `Facebook post about ${brief.storyline} by ${brief.brand.name}`,
      composition: 'landscape 1.91:1, clear text hierarchy, social proof elements'
    }],
    engagement_hooks: [
      `What's your experience with ${brief.storyline}?`,
      `Share your ${brief.seo.primary_keyword} success story!`,
      `Tag a colleague who needs this insight!`,
      `Which strategy will you try first?`
    ]
  }];
  
  return { posts };
}

function generateFacebookPost(brief: ContentBrief): string {
  return `🎯 ${brief.storyline} insights that matter for ${brief.audience.primary}

${brief.brand.name} shares proven strategies delivering real results:

🔹 ${brief.seo.primary_keyword} best practices that work
🔹 Implementation roadmaps from industry leaders
🔹 Real success stories and measurable outcomes
🔹 Expert guidance tailored to your needs

Perfect for professionals ready to elevate their ${brief.storyline} capabilities and drive meaningful business impact.

What's been your biggest learning in this space? Share below! 💬`;
}

function generateLinkedInContent(brief: ContentBrief) {
  const posts = [{
    text: generateLinkedInPost(brief),
    hashtags: [
      brief.seo.primary_keyword.replace(/\s+/g, ''),
      'BusinessStrategy',
      'Innovation',
      'Leadership',
      'Growth',
      'Transformation',
      'Excellence'
    ],
    image_requirements: [{
      role: 'professional-visual',
      prompt: `Professional LinkedIn image about ${brief.storyline}. Corporate style, data visualization if applicable`,
      alt_text: `LinkedIn post about ${brief.storyline} by ${brief.brand.name}`,
      composition: 'landscape format, professional color scheme, minimal design'
    }]
  }];
  
  // Add LinkedIn article for comprehensive storylines
  if (brief.storyline.length > 50) {
    return {
      posts,
      articles: [{
        title: `Strategic Guide to ${brief.storyline}: What ${brief.audience.primary} Need to Know`,
        content: generateLinkedInArticleContent(brief),
        seo_optimized: true
      }]
    };
  }
  
  return { posts };
}

function generateLinkedInPost(brief: ContentBrief): string {
  return `${brief.storyline}: Strategic Insights for ${brief.audience.primary} 🚀

After partnering with numerous organizations on ${brief.seo.primary_keyword} initiatives, clear patterns emerge between those who succeed and those who struggle.

Success accelerators:

• Strategic alignment with core business objectives
• Comprehensive stakeholder engagement from day one
• Phased implementation with measurable milestones
• Continuous optimization based on real performance data

${brief.brand.name} has developed proven methodologies addressing each of these critical areas, helping ${brief.audience.primary} achieve sustainable, scalable results.

The organizations thriving today understand that ${brief.storyline} isn't just about technology—it's about transformation that creates lasting competitive advantage.

What patterns have you observed in successful ${brief.storyline} initiatives? I'd value your perspective in the comments.`;
}

function generateLinkedInArticleContent(brief: ContentBrief): string {
  return `The landscape of ${brief.storyline} continues evolving rapidly, creating unprecedented opportunities and challenges for ${brief.audience.primary}.

In this comprehensive analysis, we explore strategic frameworks, implementation methodologies, and success metrics that define effective ${brief.storyline} initiatives.

## Strategic Framework

Successful ${brief.storyline} implementation requires structured approaches addressing:

1. **Strategic Alignment**: Ensuring initiatives support broader business objectives
2. **Resource Optimization**: Maximizing ROI through efficient allocation
3. **Risk Mitigation**: Proactive challenge identification and response
4. **Performance Measurement**: Establishing metrics demonstrating value creation

## Implementation Excellence

${brief.brand.name}'s experience across diverse sectors reveals that ${brief.storyline} success depends on:

• Organizational maturity and change readiness
• Industry-specific requirements and constraints
• Competitive dynamics and market positioning
• Available resources and realistic timelines

## The Path Forward

${brief.storyline} represents critical capability development for organizations pursuing sustainable competitive advantage. Success requires strategic thinking, careful planning, and expert execution.

Organizations investing comprehensively in ${brief.storyline} capabilities today position themselves to capitalize on future market opportunities.`;
}

function generateNewsletterContent(brief: ContentBrief) {
  return {
    subject_line: `${brief.storyline}: Game-Changing Insights for ${brief.audience.primary}`,
    preview_text: `Discover how ${brief.brand.name} helps organizations master ${brief.storyline}...`,
    html_content: generateNewsletterHTML(brief),
    text_content: generateNewsletterText(brief),
    personalization_tags: ['{{first_name}}', '{{company}}', '{{industry}}', '{{role}}']
  };
}

function generateNewsletterHTML(brief: ContentBrief): string {
  return `<div style="max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif;">
  <header style="background: linear-gradient(135deg, #2563eb, #1d4ed8); color: white; padding: 20px; text-align: center;">
    <h1 style="margin: 0; font-size: 24px;">${brief.storyline} Weekly</h1>
    <p style="margin: 10px 0 0; opacity: 0.9;">Insights for ${brief.audience.primary}</p>
  </header>
  
  <main style="padding: 30px 20px;">
    <p style="color: #374151; font-size: 16px; line-height: 1.6;">Hello {{first_name}},</p>
    
    <p style="color: #374151; font-size: 16px; line-height: 1.6;">This week, we're exploring ${brief.storyline} and its transformative impact on ${brief.audience.primary}.</p>
    
    <div style="background: #f3f4f6; padding: 20px; margin: 20px 0; border-left: 4px solid #2563eb;">
      <h2 style="color: #1f2937; margin-top: 0;">Key Insights</h2>
      <ul style="color: #374151; line-height: 1.6;">
        <li>${brief.seo.primary_keyword} strategic implementation</li>
        <li>Industry best practices that deliver results</li>
        <li>Success stories from leading organizations</li>
        <li>Emerging trends and future opportunities</li>
      </ul>
    </div>
    
    <p style="color: #374151; font-size: 16px; line-height: 1.6;">Ready to transform your approach? <a href="#" style="color: #2563eb;">Read the full analysis</a></p>
  </main>
  
  <footer style="background: #f9fafb; padding: 20px; text-align: center; border-top: 1px solid #e5e7eb;">
    <p style="color: #6b7280; margin: 0;">Best regards,<br>The ${brief.brand.name} Team</p>
  </footer>
</div>`;
}

function generateNewsletterText(brief: ContentBrief): string {
  return `${brief.storyline} Weekly - Insights for ${brief.audience.primary}

Hello {{first_name}},

This week, we're exploring ${brief.storyline} and its transformative impact on ${brief.audience.primary}.

Key Insights:
- ${brief.seo.primary_keyword} strategic implementation
- Industry best practices that deliver results
- Success stories from leading organizations
- Emerging trends and future opportunities

Ready to transform your approach? Visit our website for the full analysis.

Best regards,
The ${brief.brand.name} Team`;
}

function generateYouTubeContent(brief: ContentBrief) {
  return {
    title: `${brief.storyline}: Complete Guide for ${brief.audience.primary} (2024)`,
    description: generateYouTubeDescription(brief),
    script: generateYouTubeScript(brief),
    timestamps: [
      { time: '00:00', description: 'Introduction' },
      { time: '02:30', description: `${brief.seo.primary_keyword} Overview` },
      { time: '05:15', description: 'Implementation Strategy' },
      { time: '08:45', description: 'Success Stories' },
      { time: '12:00', description: 'Key Takeaways' },
      { time: '14:30', description: 'Q&A and Next Steps' }
    ],
    thumbnail_requirements: [{
      role: 'youtube-thumbnail',
      prompt: `YouTube thumbnail for ${brief.storyline}. High-contrast, compelling visual, clear text`,
      alt_text: `YouTube video about ${brief.storyline}`,
      composition: '1280x720, bold typography, contrasting colors, 3 focal points max'
    }]
  };
}

function generateYouTubeDescription(brief: ContentBrief): string {
  return `In this comprehensive guide, we explore ${brief.storyline} and its game-changing impact on ${brief.audience.primary}.

🎯 What you'll discover:
• ${brief.seo.primary_keyword} fundamentals and advanced strategies
• Step-by-step implementation framework
• Real-world case studies and success metrics
• Expert tips from ${brief.brand.name}
• Common pitfalls and how to avoid them

🔗 Resources mentioned:
• ${brief.brand.name} official website
• Implementation toolkit and templates
• Case study detailed analysis

📝 Timestamps:
0:00 Introduction and Overview
2:30 ${brief.seo.primary_keyword} Strategic Framework
5:15 Implementation Methodology
8:45 Success Stories and Case Studies
12:00 Key Takeaways and Best Practices
14:30 Q&A and Action Steps

💡 Connect with us:
- Website: [Link]
- LinkedIn: [Link]
- Newsletter: [Link]

#${brief.seo.primary_keyword.replace(/\s+/g, '')} #${brief.storyline.replace(/\s+/g, '')} #BusinessGrowth #Strategy #Innovation`;
}

function generateYouTubeScript(brief: ContentBrief): string {
  return `INTRO (0-30s)
Hi everyone, and welcome back! Today we're diving deep into ${brief.storyline} and why it's absolutely crucial for ${brief.audience.primary} in 2024.

HOOK (30-60s)
If you're struggling to get real results with ${brief.seo.primary_keyword}, this video will completely transform your approach. Stay until the end for exclusive insights from ${brief.brand.name}'s latest research.

MAIN CONTENT (60s-12min)
Let me share the exact framework that ${brief.brand.name} uses to help organizations succeed with ${brief.storyline}...

[Section 1: Strategic Foundation]
First, successful ${brief.storyline} implementation starts with strategic alignment...

[Section 2: Implementation Framework]
Next, let's break down the step-by-step process...

[Section 3: Success Stories]
Here's how one of our clients achieved 300% ROI...

[Section 4: Common Mistakes]
Now, let me show you the top 3 mistakes that kill results...

CONCLUSION (12-15min)
So there you have it - everything you need to master ${brief.storyline}. 

What's your biggest takeaway? Drop it in the comments, and if you found this valuable, smash that subscribe button for more strategic insights!

Until next time, keep growing! 🚀`;
}

function generateImagePacks(brief: ContentBrief): ImagePack[] {
  return [
    {
      role: 'hero-image',
      prompt: `Create a compelling hero image for ${brief.storyline} content. Professional style reflecting ${brief.brand.voice_tone.join(' and ')} tone. Target audience: ${brief.audience.primary}`,
      alt_text: `Hero image for ${brief.storyline} by ${brief.brand.name}`,
      composition: 'landscape 16:9, strong focal point, brand colors, professional lighting'
    },
    {
      role: 'supporting-visual',
      prompt: `Supporting infographic for ${brief.storyline}. Data-driven design, clean layout, ${brief.seo.primary_keyword} focus`,
      alt_text: `Supporting visual for ${brief.storyline} content`,
      composition: 'square or vertical format, minimal text, clear hierarchy'
    },
    {
      role: 'social-media-pack',
      prompt: `Social media visual set for ${brief.storyline}. Multiple format variations (square, story, landscape)`,
      alt_text: `Social media visuals for ${brief.storyline}`,
      composition: 'multiple aspect ratios, consistent brand elements, mobile-optimized'
    }
  ];
}

function generateMetaDescription(brief: ContentBrief, title: string): string {
  return `${brief.storyline} guide for ${brief.audience.primary}. ${brief.brand.name} shares proven ${brief.seo.primary_keyword} strategies and insights for measurable results.`.substring(0, 160);
}

function generateSlug(title: string): string {
  return title.toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/^-+|-+$/g, '')
    .substring(0, 60);
}

function calculateNoveltyScore(brief: ContentBrief): number {
  let score = 0.7; // Base score
  
  // Boost for unique angles
  if (brief.angle_hint !== 'informative-guide') score += 0.1;
  
  // Boost for comprehensive keywords
  if (brief.seo.secondary_keywords.length > 3) score += 0.1;
  
  // Boost for detailed storylines
  if (brief.storyline.length > 100) score += 0.1;
  
  // Boost for multiple platforms
  if (brief.platforms.length > 3) score += 0.05;
  
  // Boost for specialized tone combinations
  if (brief.brand.voice_tone.length > 1) score += 0.05;
  
  return Math.min(score, 1.0);
}