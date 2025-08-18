import { ContentBrief } from '../types';
import { detectLanguageFromBriefing } from './dutchJournalismGenerator';

/**
 * Enhanced briefing parser for real-world campaign briefings
 * Handles Dutch, French, and English briefings with intelligent extraction
 */
export function parseRealWorldBriefing(input: string): ContentBrief {
  const originalText = input;
  const lowerText = input.toLowerCase();
  
  // Detect language first
  const detectedLocale = detectLanguageFromBriefing(originalText);
  
  console.log('🔍 Parsing briefing...', { detectedLocale });
  
  // Extract brand name
  const brandName = extractBrandName(originalText);
  
  // Extract storyline/campaign focus
  const storyline = extractCampaignFocus(originalText);
  
  // Extract target audience
  const primaryAudience = extractTargetAudience(originalText);
  
  // Extract SEO keywords
  const keywords = extractKeywords(originalText);
  
  // Extract budget info
  const budget = extractBudget(originalText);
  
  // Extract platform info
  const platform = extractPlatformInfo(originalText);
  
  console.log('📊 Extracted data:', {
    brandName,
    storyline,
    primaryAudience,
    keywords,
    budget,
    platform,
    detectedLocale
  });

  const brief: ContentBrief = {
    brand: {
      name: brandName || "Brand Name",
      voice_tone: ["professional", "engaging"],
      must_use_phrases: [],
      banned_phrases: []
    },
    audience: {
      primary: primaryAudience || "Target audience",
      reading_level: 'B2' as const,
      locale: detectedLocale
    },
    storyline: storyline || "Campaign story",
    platforms: ['article'],
    seo: {
      primary_keyword: keywords[0] || storyline || "keyword",
      secondary_keywords: keywords.slice(1, 6)
    },
    legal: {
      disclaimer: ""
    },
    angle_hint: determineAngleHint(originalText)
  };

  return brief;
}

function extractBrandName(text: string): string {
  // Look for brand names in various formats
  const patterns = [
    // "OnePlus – Back to School" format
    /^([A-Za-z0-9\s]+)\s*[–-]\s*/m,
    // "Brand: Name" format
    /(?:brand|merk|marque|marca):\s*([^\n]+)/i,
    // "Company Name" at start of line
    /^([A-Z][A-Za-z0-9\s]{2,30})\s*$/m
  ];
  
  for (const pattern of patterns) {
    const match = text.match(pattern);
    if (match && match[1]) {
      const brandName = match[1].trim();
      // Validate it looks like a brand name
      if (brandName.length > 2 && brandName.length < 50) {
        return brandName;
      }
    }
  }
  
  return "Brand Name";
}

function extractCampaignFocus(text: string): string {
  const patterns = [
    // "Back to School Campagnevoorstel" format
    /([A-Z][A-Za-z\s]+)\s+(?:campagnevoorstel|campaign|campagne)/i,
    // "Campagnefocus" section
    /(?:campagnefocus|campaign focus|focus)[:*]\s*([^\n•]+)/i,
    // "Back to school-oplossingen" format
    /back to school[^\n]*([^\n]+)/i,
    // Look for main topic after brand name
    /[–-]\s*([^–\n]+)/,
    // French formats
    /(?:sujet|thème|focus):\s*([^\n]+)/i,
    // General topic patterns
    /(?:onderwerp|topic|subject|thema):\s*([^\n]+)/i
  ];
  
  for (const pattern of patterns) {
    const match = text.match(pattern);
    if (match && match[1]) {
      let focus = match[1].trim();
      // Clean up common artifacts
      focus = focus.replace(/^[•\-*]\s*/, '');
      focus = focus.replace(/campagnevoorstel$/i, '');
      if (focus.length > 5 && focus.length < 200) {
        return focus;
      }
    }
  }
  
  return "Campaign focus";
}

function extractTargetAudience(text: string): string {
  const lowerText = text.toLowerCase();
  const audiences: string[] = [];
  
  // Look for explicit audience sections
  const audienceSection = text.match(/(?:doelgroep|target|audience|cible)[:*]\s*([^]*?)(?:\n\n|\n[A-Z]|$)/i);
  if (audienceSection) {
    const section = audienceSection[1];
    // Extract individual audience items
    const items = section.split(/[•\n-]/).filter(item => item.trim().length > 0);
    items.forEach(item => {
      const cleaned = item.trim().replace(/^\s*[•\-*]\s*/, '');
      if (cleaned.length > 2 && cleaned.length < 100) {
        audiences.push(cleaned);
      }
    });
  }
  
  // Look for common audience terms
  const commonAudiences = [
    'studenten', 'students', 'étudiants',
    'professionals', 'professionnels', 'professionals',
    'gezinnen', 'families', 'familles',
    'young professionals', 'jonge professionals', 'jeunes professionnels',
    'ondernemers', 'entrepreneurs', 'entrepreneurs',
    'bedrijfsleiders', 'business leaders', 'dirigeants'
  ];
  
  commonAudiences.forEach(term => {
    if (lowerText.includes(term.toLowerCase())) {
      audiences.push(term);
    }
  });
  
  if (audiences.length > 0) {
    return audiences.slice(0, 3).join(', ');
  }
  
  return "Target audience";
}

function extractKeywords(text: string): string[] {
  const keywords: string[] = [];
  
  // Look for product names
  const products = text.match(/(?:OnePlus|Nord|Watch|Pad|Buds)\s*[A-Za-z0-9\s]*/gi);
  if (products) {
    products.forEach(product => {
      const cleaned = product.trim();
      if (cleaned.length > 2) {
        keywords.push(cleaned);
      }
    });
  }
  
  // Look for campaign themes
  const themes = [
    'back to school', 'terug naar school', 'rentrée scolaire',
    'digitale transformatie', 'digital transformation', 'transformation numérique',
    'slimme technologie', 'smart technology', 'technologie intelligente',
    'efficiënt studeren', 'efficient studying', 'étude efficace'
  ];
  
  themes.forEach(theme => {
    if (text.toLowerCase().includes(theme)) {
      keywords.push(theme);
    }
  });
  
  // Extract from campaign focus
  const focus = extractCampaignFocus(text);
  if (focus && focus !== "Campaign focus") {
    keywords.unshift(focus);
  }
  
  // Remove duplicates and return first 6
  return Array.from(new Set(keywords)).slice(0, 6);
}

function extractBudget(text: string): string {
  const budgetMatch = text.match(/(?:budget|Budget)[:*]\s*[€$]?\s*([0-9.,]+)\s*(?:€|euro|EUR)/i);
  if (budgetMatch) {
    return budgetMatch[1];
  }
  return "";
}

function extractPlatformInfo(text: string): string {
  const platformMatch = text.match(/(?:platform|Platform)[:*]\s*([^\n]+)/i);
  if (platformMatch) {
    return platformMatch[1].trim();
  }
  return "";
}

function determineAngleHint(text: string): string {
  const lowerText = text.toLowerCase();
  
  if (lowerText.includes('campagne') || lowerText.includes('campaign')) {
    return 'news';
  }
  if (lowerText.includes('back to school') || lowerText.includes('terug naar school')) {
    return 'trend';
  }
  if (lowerText.includes('product') || lowerText.includes('launch')) {
    return 'news';
  }
  if (lowerText.includes('analyse') || lowerText.includes('research')) {
    return 'research';
  }
  
  return 'informative-guide';
}

// Add French content generation
export function generateFrenchArticle(brief: ContentBrief): { title: string; content: string } {
  const { storyline, brand, audience, seo } = brief;
  
  const title = `${brand.name} lance ${storyline} sur le marché français`;
  
  const content = `${brand.name} a annoncé le lancement de ${storyline} pour répondre aux besoins spécifiques des consommateurs français. Cette nouvelle stratégie vise particulièrement ${audience.primary} qui recherchent des solutions technologiques de qualité.

Le développement résulte d'une étude de marché approfondie menée par ${brand.name} ces derniers mois. Selon cette recherche, les utilisateurs français privilégient des produits à la fois technologiquement avancés et adaptés à leur quotidien professionnel.

"Nous observons une tendance claire où ${audience.primary} accordent une importance croissante à ${seo.primary_keyword}", déclare un porte-parole de ${brand.name}. "Notre nouvelle approche répond parfaitement à cette demande en combinant fonctionnalité et simplicité d'usage."

L'entreprise a collaboré étroitement avec des distributeurs et partenaires français pour assurer un déploiement fluide de ${storyline}. Cette collaboration a permis de constituer un réseau étendu de points de vente où les consommateurs peuvent découvrir et acquérir les produits.

Les analystes du secteur se montrent optimistes concernant la nouvelle orientation de ${brand.name}. L'entreprise est saluée pour sa capacité à s'adapter rapidement aux évolutions des besoins consommateurs et aux développements technologiques.

Le timing du lancement est stratégiquement choisi. Dans le contexte actuel et avec la demande croissante pour ${seo.primary_keyword}, ${brand.name} anticipe une réception favorable de ${storyline} par le public français.

Les consommateurs français ont démontré ces dernières années leur ouverture aux technologies innovantes, à condition qu'elles apportent une réelle valeur ajoutée. ${brand.name} a intégré cette donnée dans son processus de développement en recueillant les retours d'utilisateurs de différentes tranches d'âge.

L'entreprise prévoit un déploiement progressif de ${storyline} sur plusieurs canaux de distribution, misant sur une approche omnicanale avec un accent particulier sur le service et l'accompagnement que plébiscitent les clients français.

Les attentes concernant ${storyline} sont élevées. ${brand.name} a indiqué que le succès de ce lancement conditionnera ses investissements futurs sur le marché français, considéré comme stratégique en Europe.

Les partenaires de distribution manifestent leur enthousiasme pour cette collaboration avec ${brand.name}. Plusieurs grandes enseignes ont déjà confirmé qu'elles présenteront ${storyline} de manière privilégiée dans leurs magasins et plateformes numériques.`;

  return { title, content };
}