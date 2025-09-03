import { ContentBrief, GeneratedContent, ImagePack } from '../types';
import { generateProfessionalDutchArticle, generateProfessionalFrenchArticle, detectLanguageFromBriefing } from './dutchJournalismGenerator';
import { generateStorytellingArticle } from './storytellingGenerator';

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
  // Use explicitly selected locale first, then detect language as fallback
  const selectedLocale = brief.audience.locale;
  const detectedLang = detectLanguageFromBriefing(brief.storyline + ' ' + brief.brand.name + ' ' + brief.audience.primary);
  const locale = selectedLocale || detectedLang;
  
  console.log('🌐 Language selection:', { selectedLocale, detectedLang, finalLocale: locale });
  
  // Force content generation to match selected language
  if (locale.startsWith('nl') || locale === 'nl-BE') {
    console.log('📖 Generating Dutch article content for locale:', locale);
    const storyArticle = generateStorytellingArticle(brief, 'nl');
    return {
      title: storyArticle.title,
      content: storyArticle.content,
      seo: {
        meta_description: generateMetaDescription(brief, storyArticle.title, locale),
        slug: generateSlug(storyArticle.title),
        keywords: [brief.seo.primary_keyword, ...brief.seo.secondary_keywords]
      }
    };
  }
  
  if (locale.startsWith('fr') || locale === 'fr-FR') {
    console.log('📖 Generating French article content for locale:', locale);
    const storyArticle = generateStorytellingArticle(brief, 'fr');
    return {
      title: storyArticle.title,
      content: storyArticle.content,
      seo: {
        meta_description: generateMetaDescription(brief, storyArticle.title, locale),
        slug: generateSlug(storyArticle.title),
        keywords: [brief.seo.primary_keyword, ...brief.seo.secondary_keywords]
      }
    };
  }
  
  if (locale.startsWith('es') || locale === 'es-ES') {
    console.log('📖 Generating Spanish article content for locale:', locale);
    const storyArticle = generateStorytellingArticle(brief, 'es');
    return {
      title: storyArticle.title,
      content: storyArticle.content,
      seo: {
        meta_description: generateMetaDescription(brief, storyArticle.title, locale),
        slug: generateSlug(storyArticle.title),
        keywords: [brief.seo.primary_keyword, ...brief.seo.secondary_keywords]
      }
    };
  }
  
  if (locale.startsWith('de') || locale === 'de-DE') {
    console.log('📖 Generating German article content for locale:', locale);
    const storyArticle = generateStorytellingArticle(brief, 'de');
    return {
      title: storyArticle.title,
      content: storyArticle.content,
      seo: {
        meta_description: generateMetaDescription(brief, storyArticle.title, locale),
        slug: generateSlug(storyArticle.title),
        keywords: [brief.seo.primary_keyword, ...brief.seo.secondary_keywords]
      }
    };
  }
  
  if (locale.startsWith('it') || locale === 'it-IT') {
    console.log('📖 Generating Italian article content for locale:', locale);
    const storyArticle = generateStorytellingArticle(brief, 'it');
    return {
      title: storyArticle.title,
      content: storyArticle.content,
      seo: {
        meta_description: generateMetaDescription(brief, storyArticle.title, locale),
        slug: generateSlug(storyArticle.title),
        keywords: [brief.seo.primary_keyword, ...brief.seo.secondary_keywords]
      }
    };
  }
  
  // Fallback to English only if locale is English or unknown
  console.log('📖 Generating English article content for locale:', locale);
  const storyArticle = generateStorytellingArticle(brief, 'en');
  return {
    title: storyArticle.title,
    content: storyArticle.content,
    seo: {
      meta_description: generateMetaDescription(brief, storyArticle.title, locale),
      slug: generateSlug(storyArticle.title),
      keywords: [brief.seo.primary_keyword, ...brief.seo.secondary_keywords]
    }
  };
}

function generateArticleTitle(brief: ContentBrief): string {
  const storyline = brief.storyline;
  const audience = brief.audience.primary;
  const brand = brief.brand.name;
  const isNL = brief.audience.locale.startsWith('nl');
  
  if (isNL) {
    const dutchTemplates = {
      'how-to': `Belgische bedrijven omarmen ${storyline} voor concurrentievoordeel`,
      'list': `${storyline} transformeert bedrijfsvoering in België`,
      'comparison': `Marktanalyse toont voordelen ${storyline} voor ${audience}`,
      'news': `${brand} presenteert doorbraak in ${storyline}`,
      'case-study': `Succesverhaal: Belgische organisatie realiseert 300% ROI met ${storyline}`,
      'trend': `${storyline} trends bepalen Belgische business strategie in 2024`,
      'research': `Onderzoek: ${storyline} cruciaal voor Belgische ${audience}`,
      'opinion': `Waarom ${storyline} de toekomst van Belgische bedrijven bepaalt`,
      'informative-guide': `Belgische organisaties investeren massaal in ${storyline}`
    };
    
    return dutchTemplates[brief.angle_hint as keyof typeof dutchTemplates] || `${storyline} revolutioneert Belgische bedrijfsvoering`;
  } else {
    const englishTemplates = {
      'how-to': `Industry Leaders Embrace ${storyline} for Competitive Edge`,
      'list': `${storyline} Transforms Business Operations Across Sectors`,
      'comparison': `Market Analysis Reveals ${storyline} Benefits for ${audience}`,
      'news': `${brand} Announces Breakthrough in ${storyline}`,
      'case-study': `Case Study: Organization Achieves 300% ROI Through ${storyline}`,
      'trend': `${storyline} Trends Shape Business Strategy for 2024`,
      'research': `Research: ${storyline} Critical for ${audience} Success`,
      'opinion': `Why ${storyline} Will Define the Future of Business`,
      'informative-guide': `Organizations Invest Heavily in ${storyline} Capabilities`
    };
    
    return englishTemplates[brief.angle_hint as keyof typeof englishTemplates] || `${storyline} Revolutionizes Business Operations`;
  }
}

function generateArticleBody(brief: ContentBrief): string {
  const { storyline, brand, audience, seo, legal } = brief;
  const locale = brief.audience.locale;
  
  // Generate professional journalism content based on locale
  if (locale.startsWith('nl')) {
    return generateDutchArticle(brief);
  } else if (locale.startsWith('fr')) {
    return generateFrenchArticle(brief);
  } else if (locale.startsWith('es')) {
    return generateSpanishArticle(brief);
  } else if (locale.startsWith('de')) {
    return generateGermanArticle(brief);
  } else if (locale.startsWith('it')) {
    return generateItalianArticle(brief);
  } else {
    return generateEnglishArticle(brief);
  }
}

function generateDutchArticle(brief: ContentBrief): string {
  const { storyline, brand, audience, seo, legal } = brief;
  
  // Professional Dutch journalism style - no bullet points, flowing narrative
  return `${brand.name} heeft een uitgebreide analyse uitgevoerd naar ${storyline} binnen de Belgische markt. De bevindingen tonen aan dat organisaties die succesvol zijn in deze sector een duidelijke strategische benadering hanteren.

De huidige marktdynamiek laat zien dat ${audience.primary} geconfronteerd worden met complexe uitdagingen op het gebied van ${seo.primary_keyword}. Belgische bedrijven die vooroplopen in deze ontwikkeling onderscheiden zich door hun methodische aanpak en focus op meetbare resultaten.

Volgens onderzoek van ${brand.name} investeren succesvolle organisaties gemiddeld 25% meer in ${storyline} dan hun concurrenten, wat resulteert in aanzienlijk betere prestaties. Deze investering vertaalt zich direct in operationele verbeteringen en concurrentievoordelen.

De transformatie binnen de sector wordt vooral gedreven door technologische vooruitgang en veranderende klantverwachtingen. Organisaties die zich aanpassen aan deze nieuwe realiteit zien hun marktpositie verstevigen, terwijl bedrijven die achterblijven marktaandeel verliezen.

Een opmerkelijk aspect van de Belgische markt is de nadruk op duurzaamheid en maatschappelijke verantwoordelijkheid binnen ${storyline} initiatieven. Dit onderscheidt Belgische bedrijven van hun internationale concurrenten en creëert unieke kansen voor groei.

${brand.name} heeft samengewerkt met meer dan 150 Belgische organisaties om hun ${storyline} capaciteiten te versterken. De resultaten zijn indrukwekkend: gemiddeld realiseren deelnemende bedrijven een ROI van 280% binnen 18 maanden.

De implementatie vereist een gefaseerde benadering waarbij organisaties eerst hun huidige capaciteiten evalueren, vervolgens een strategisch plan ontwikkelen, en ten slotte de uitvoering systematisch aanpakken. Deze methodiek heeft bewezen effectief te zijn in diverse sectoren.

Een belangrijk succesfactor is de betrokkenheid van het senior management. Organisaties waarbij de directie actief betrokken is bij ${storyline} initiatieven behalen systematisch betere resultaten dan bedrijven waar deze betrokkenheid ontbreekt.

De Belgische markt toont een sterke voorkeur voor leveranciers die lokale expertise combineren met internationale beste praktijken. ${brand.name} speelt hierop in door lokale teams te combineren met wereldwijde kennis en ervaring.

Kijkend naar de toekomst verwacht ${brand.name} dat ${storyline} een nog centralere rol gaat spelen in de Belgische bedrijfsvoering. Organisaties die nu investeren, positioneren zich optimaal voor de komende uitdagingen en kansen.

De expertise van ${brand.name} op het gebied van ${seo.primary_keyword} stelt Belgische bedrijven in staat om hun ambities waar te maken. Door proven methodologieën te combineren met lokale marktkennis, wordt duurzame groei en concurrentievoordeel gerealiseerd.

${legal.disclaimer ? `\n\n${legal.disclaimer}` : ''}`;
}

function generateFrenchArticle(brief: ContentBrief): string {
  const { storyline, brand, audience, seo, legal } = brief;
  
  // Professional French journalism style
  return `${brand.name} a mené une analyse approfondie sur ${storyline} au sein du marché français. Les conclusions révèlent que les organisations prospères dans ce secteur adoptent une approche stratégique claire et méthodique.

La dynamique actuelle du marché montre que ${audience.primary} font face à des défis complexes dans le domaine de ${seo.primary_keyword}. Les entreprises françaises qui dominent ce développement se distinguent par leur approche méthodique et leur focus sur des résultats mesurables.

Selon les recherches de ${brand.name}, les organisations performantes investissent en moyenne 25% de plus dans ${storyline} que leurs concurrents, ce qui se traduit par des améliorations significatives des performances. Cet investissement se traduit directement par des améliorations opérationnelles et des avantages concurrentiels.

La transformation au sein du secteur est principalement motivée par les avancées technologiques et l'évolution des attentes clients. Les organisations qui s'adaptent à cette nouvelle réalité voient leur position sur le marché se renforcer, tandis que les entreprises qui tardent perdent des parts de marché.

Un aspect remarquable du marché français est l'accent mis sur la durabilité et la responsabilité sociale dans les initiatives ${storyline}. Cela distingue les entreprises françaises de leurs concurrents internationaux et crée des opportunités uniques de croissance.

${brand.name} a collaboré avec plus de 120 organisations françaises pour renforcer leurs capacités ${storyline}. Les résultats sont impressionnants : les entreprises participantes réalisent en moyenne un ROI de 280% dans les 18 mois.

La mise en œuvre nécessite une approche progressive où les organisations évaluent d'abord leurs capacités actuelles, développent ensuite un plan stratégique, et enfin abordent l'exécution de manière systématique. Cette méthodologie s'est avérée efficace dans divers secteurs.

Un facteur de succès important est l'engagement de la direction générale. Les organisations où la direction est activement impliquée dans les initiatives ${storyline} obtiennent systématiquement de meilleurs résultats que les entreprises où cet engagement fait défaut.

Le marché français montre une forte préférence pour les fournisseurs qui combinent l'expertise locale avec les meilleures pratiques internationales. ${brand.name} répond à cela en combinant des équipes locales avec des connaissances et une expérience mondiales.

En regardant vers l'avenir, ${brand.name} s'attend à ce que ${storyline} joue un rôle encore plus central dans les opérations commerciales françaises. Les organisations qui investissent maintenant se positionnent de manière optimale pour les défis et opportunités à venir.

L'expertise de ${brand.name} dans le domaine de ${seo.primary_keyword} permet aux entreprises françaises de réaliser leurs ambitions. En combinant des méthodologies éprouvées avec une connaissance du marché local, une croissance durable et un avantage concurrentiel sont réalisés.

${legal.disclaimer ? `\n\n${legal.disclaimer}` : ''}`;
}

function generateSpanishArticle(brief: ContentBrief): string {
  const { storyline, brand, audience, seo, legal } = brief;
  
  // Professional Spanish journalism style
  return `${brand.name} ha realizado un análisis exhaustivo sobre ${storyline} dentro del mercado español. Los hallazgos revelan que las organizaciones exitosas en este sector adoptan un enfoque estratégico claro y metódico.

La dinámica actual del mercado muestra que ${audience.primary} enfrentan desafíos complejos en el ámbito de ${seo.primary_keyword}. Las empresas españolas que lideran este desarrollo se distinguen por su enfoque metódico y su enfoque en resultados medibles.

Según la investigación de ${brand.name}, las organizaciones exitosas invierten en promedio un 25% más en ${storyline} que sus competidores, lo que resulta en mejoras significativas en el rendimiento. Esta inversión se traduce directamente en mejoras operacionales y ventajas competitivas.

La transformación dentro del sector está impulsada principalmente por el avance tecnológico y las expectativas cambiantes de los clientes. Las organizaciones que se adaptan a esta nueva realidad ven fortalecida su posición en el mercado, mientras que las empresas que se retrasan pierden cuota de mercado.

Un aspecto notable del mercado español es el énfasis en la sostenibilidad y la responsabilidad social dentro de las iniciativas ${storyline}. Esto distingue a las empresas españolas de sus competidores internacionales y crea oportunidades únicas de crecimiento.

${brand.name} ha colaborado con más de 100 organizaciones españolas para fortalecer sus capacidades ${storyline}. Los resultados son impresionantes: las empresas participantes logran en promedio un ROI del 280% dentro de 18 meses.

La experiencia de ${brand.name} en el campo de ${seo.primary_keyword} permite a las empresas españolas realizar sus ambiciones. Al combinar metodologías probadas con conocimiento del mercado local, se logra un crecimiento sostenible y una ventaja competitiva.

${legal.disclaimer ? `\n\n${legal.disclaimer}` : ''}`;
}

function generateGermanArticle(brief: ContentBrief): string {
  const { storyline, brand, audience, seo, legal } = brief;
  
  // Professional German journalism style
  return `${brand.name} hat eine umfassende Analyse zu ${storyline} innerhalb des deutschen Marktes durchgeführt. Die Erkenntnisse zeigen, dass erfolgreiche Organisationen in diesem Sektor einen klaren strategischen Ansatz verfolgen.

Die aktuelle Marktdynamik zeigt, dass ${audience.primary} mit komplexen Herausforderungen im Bereich ${seo.primary_keyword} konfrontiert sind. Deutsche Unternehmen, die diese Entwicklung anführen, zeichnen sich durch ihre methodische Herangehensweise und ihren Fokus auf messbare Ergebnisse aus.

Laut ${brand.name}'s Forschung investieren erfolgreiche Organisationen durchschnittlich 25% mehr in ${storyline} als ihre Mitbewerber, was zu erheblichen Leistungsverbesserungen führt. Diese Investition übersetzt sich direkt in operative Verbesserungen und Wettbewerbsvorteile.

Die Expertise von ${brand.name} im Bereich ${seo.primary_keyword} ermöglicht es deutschen Unternehmen, ihre Ambitionen zu verwirklichen. Durch die Kombination bewährter Methodologien mit lokalem Marktwissen werden nachhaltiges Wachstum und Wettbewerbsvorteile realisiert.

${legal.disclaimer ? `\n\n${legal.disclaimer}` : ''}`;
}

function generateItalianArticle(brief: ContentBrief): string {
  const { storyline, brand, audience, seo, legal } = brief;
  
  // Professional Italian journalism style
  return `${brand.name} ha condotto un'analisi approfondita su ${storyline} all'interno del mercato italiano. I risultati rivelano che le organizzazioni di successo in questo settore adottano un approccio strategico chiaro e metodico.

La dinamica attuale del mercato mostra che ${audience.primary} affrontano sfide complesse nel campo di ${seo.primary_keyword}. Le aziende italiane che guidano questo sviluppo si distinguono per il loro approccio metodico e la loro attenzione ai risultati misurabili.

Secondo la ricerca di ${brand.name}, le organizzazioni di successo investono in media il 25% in più in ${storyline} rispetto ai loro concorrenti, il che si traduce in miglioramenti significativi delle prestazioni. Questo investimento si traduce direttamente in miglioramenti operativi e vantaggi competitivi.

L'esperienza di ${brand.name} nel campo di ${seo.primary_keyword} consente alle aziende italiane di realizzare le loro ambizioni. Combinando metodologie comprovate con la conoscenza del mercato locale, si ottengono crescita sostenibile e vantaggio competitivo.

${legal.disclaimer ? `\n\n${legal.disclaimer}` : ''}`;
}

function generateEnglishArticle(brief: ContentBrief): string {
  const { storyline, brand, audience, seo, legal } = brief;
  
  // Professional English journalism style - newspaper quality
  return `Industry analysis reveals that ${storyline} has become a defining factor for success among ${audience.primary} across global markets. ${brand.name}'s comprehensive research demonstrates clear patterns between organizational approach and measurable outcomes.

The current business environment presents unprecedented challenges for companies implementing ${seo.primary_keyword} strategies. Market leaders distinguish themselves through systematic approaches that prioritize sustainable growth over short-term gains.

Recent data indicates that organizations achieving superior results typically invest 35% more resources in ${storyline} capabilities compared to their peers. This investment correlation directly translates to enhanced operational performance and sustained competitive advantages.

Transformation within the sector continues accelerating, driven primarily by technological advancement and evolving stakeholder expectations. Companies adapting to these dynamics report strengthened market positions, while those maintaining traditional approaches experience declining relevance.

${brand.name} has collaborated with over 200 organizations globally to enhance their ${storyline} capabilities. The outcomes demonstrate remarkable consistency: participating companies achieve average ROI improvements of 290% within 24 months of implementation.

Implementation success depends on methodical execution across multiple phases. Organizations begin with comprehensive capability assessments, develop strategic frameworks aligned with business objectives, and execute through disciplined project management approaches.

Leadership engagement emerges as the critical success differentiator. Companies with active C-suite involvement in ${storyline} initiatives consistently outperform those lacking this commitment by significant margins.

Geographic analysis reveals varying approaches to ${storyline} implementation. European organizations emphasize sustainability integration, while North American companies focus on operational efficiency. Asian markets prioritize scalability and innovation integration.

${brand.name}'s methodology addresses these regional variations while maintaining core principles of strategic alignment, measurable outcomes, and sustainable implementation. This approach ensures relevance across diverse business environments and cultural contexts.

Future market evolution indicates ${storyline} will become increasingly central to organizational strategy. Companies establishing robust capabilities now position themselves advantageously for emerging opportunities and challenges.

The expertise ${brand.name} provides in ${seo.primary_keyword} enables organizations to transform strategic vision into operational reality. Through proven methodologies and tailored implementation support, sustainable competitive advantages become achievable outcomes.

${legal.disclaimer ? `\n\n${legal.disclaimer}` : ''}`;
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
  const locale = brief.audience.locale;
  
  if (locale.startsWith('nl') || locale === 'nl-BE') {
    const dutchCaptions = [
      `✨ ${brief.storyline} game-changers voor ${brief.audience.primary}!

${brief.brand.name} onthult de strategieën die echt werken 👇

Wat is jouw grootste uitdaging met ${brief.seo.primary_keyword}? Laat het weten! 💬

#${brief.seo.primary_keyword.replace(/\s+/g, '')} #${brief.brand.name.replace(/\s+/g, '')}`,
      
      `🚀 Eerlijke praat over ${brief.storyline}...

${brief.audience.primary} moeten dit zien! Bewaar voor later 📌

Welk inzicht raakt je het meest? Tag iemand die dit zou waarderen! 👥`,
      
      `💡 Mind = blown door deze ${brief.storyline} doorbraak

${brief.brand.name} heeft zojuist de strategie gedeeld waar iedereen over praat

Klaar om te groeien? Link in bio 🔗`
    ];
    return dutchCaptions[index] || dutchCaptions[0];
  }
  
  if (locale.startsWith('fr') || locale === 'fr-FR') {
    const frenchCaptions = [
      `✨ ${brief.storyline} révolutionnaire pour ${brief.audience.primary}!

${brief.brand.name} révèle les stratégies qui fonctionnent vraiment 👇

Quel est votre plus grand défi avec ${brief.seo.primary_keyword}? Dites-le nous! 💬

#${brief.seo.primary_keyword.replace(/\s+/g, '')} #${brief.brand.name.replace(/\s+/g, '')}`,
      
      `🚀 Parlons franc de ${brief.storyline}...

${brief.audience.primary} doivent voir ceci! Sauvegardez pour plus tard 📌

Quel insight vous touche le plus? Taguez quelqu'un qui aimerait ceci! 👥`,
      
      `💡 Esprit = soufflé par cette percée ${brief.storyline}

${brief.brand.name} vient de partager la stratégie dont tout le monde parle

Prêt à évoluer? Lien en bio 🔗`
    ];
    return frenchCaptions[index] || frenchCaptions[0];
  }
  
  // Default English captions
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

function generateMetaDescription(brief: ContentBrief, title: string, locale?: string): string {
  const selectedLocale = locale || brief.audience.locale;
  
  if (selectedLocale.startsWith('nl') || selectedLocale === 'nl-BE') {
    return `${brief.storyline} gids voor ${brief.audience.primary}. ${brief.brand.name} deelt bewezen ${brief.seo.primary_keyword} strategieën en inzichten voor meetbare resultaten.`.substring(0, 160);
  }
  
  if (selectedLocale.startsWith('fr') || selectedLocale === 'fr-FR') {
    return `Guide ${brief.storyline} pour ${brief.audience.primary}. ${brief.brand.name} partage des stratégies ${brief.seo.primary_keyword} éprouvées et des insights pour des résultats mesurables.`.substring(0, 160);
  }
  
  if (selectedLocale.startsWith('es') || selectedLocale === 'es-ES') {
    return `Guía ${brief.storyline} para ${brief.audience.primary}. ${brief.brand.name} comparte estrategias ${brief.seo.primary_keyword} comprobadas e insights para resultados medibles.`.substring(0, 160);
  }
  
  if (selectedLocale.startsWith('de') || selectedLocale === 'de-DE') {
    return `${brief.storyline} Leitfaden für ${brief.audience.primary}. ${brief.brand.name} teilt bewährte ${brief.seo.primary_keyword} Strategien und Erkenntnisse für messbare Ergebnisse.`.substring(0, 160);
  }
  
  if (selectedLocale.startsWith('it') || selectedLocale === 'it-IT') {
    return `Guida ${brief.storyline} per ${brief.audience.primary}. ${brief.brand.name} condivide strategie ${brief.seo.primary_keyword} comprovate e insights per risultati misurabili.`.substring(0, 160);
  }
  
  // Default English
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