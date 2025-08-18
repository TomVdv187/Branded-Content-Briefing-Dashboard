import { ContentBrief } from '../types';

/**
 * Professional Dutch Journalism Content Generator
 * Produces newspaper-quality Dutch articles without bullet points
 */

export function generateProfessionalDutchArticle(brief: ContentBrief): { title: string; content: string } {
  const title = generateDutchNewsTitle(brief);
  const content = generateDutchNewsArticle(brief);
  
  return { title, content };
}

function generateDutchNewsTitle(brief: ContentBrief): string {
  const { storyline, brand } = brief;
  
  // Professional Dutch newspaper headlines
  const templates = [
    `${brand.name} lanceert ${storyline} voor Nederlandse markt`,
    `Nieuwe ${storyline}-oplossing van ${brand.name} wint terrein`,
    `${brand.name} zet in op ${storyline} voor groei`,
    `Nederlandse consumenten omarmen ${storyline} van ${brand.name}`,
    `${brand.name} introduceert vernieuwende ${storyline}-aanpak`,
    `Marktleider ${brand.name} breidt uit met ${storyline}`,
    `${storyline}: ${brand.name} speelt in op Nederlandse vraag`,
    `${brand.name} verstevigt positie met ${storyline}-innovatie`
  ];
  
  return templates[Math.floor(Math.random() * templates.length)];
}

function generateDutchNewsArticle(brief: ContentBrief): string {
  const { storyline, brand, audience, seo } = brief;
  
  // Professional Dutch journalism - flowing narrative, no lists
  const article = `${brand.name} heeft aangekondigd dat het bedrijf zijn ${storyline}-aanbod uitbreidt om beter aan te sluiten bij de behoeften van Nederlandse consumenten. De nieuwe strategie richt zich specifiek op ${audience.primary} die op zoek zijn naar kwalitatieve technologische oplossingen.

De ontwikkeling komt voort uit uitgebreid marktonderzoek dat ${brand.name} de afgelopen maanden heeft uitgevoerd. Volgens het onderzoek zoeken Nederlandse gebruikers naar producten die niet alleen technologisch geavanceerd zijn, maar ook aansluiten bij hun dagelijkse routine en werkwijze.

"We zien een duidelijke trend waarbij ${audience.primary} steeds meer waarde hechten aan ${seo.primary_keyword}," aldus een woordvoerder van ${brand.name}. "Onze nieuwe aanpak speelt daar optimaal op in door functionaliteit te combineren met gebruiksgemak."

Het bedrijf heeft de afgelopen periode intensief samengewerkt met Nederlandse retailers en distributeurs om de uitrol van ${storyline} soepel te laten verlopen. Deze samenwerking heeft geleid tot een uitgebreid netwerk van verkooppunten waar consumenten de producten kunnen ervaren en aanschaffen.

Marktanalisten zijn positief over de nieuwe koers van ${brand.name}. Het bedrijf wordt geprezen om zijn vermogen om snel in te spelen op veranderende consumentenbehoeften en technologische ontwikkelingen. Deze flexibiliteit heeft ${brand.name} in het verleden al vaker concurrentievoordeel opgeleverd.

De timing van de lancering is strategisch gekozen. Met de huidige marktomstandigheden en de toenemende vraag naar ${seo.primary_keyword}, verwacht ${brand.name} dat ${storyline} goed zal worden ontvangen door de Nederlandse doelgroep.

Nederlandse consumenten hebben de afgelopen jaren laten zien dat ze openstaan voor innovatieve technologieën, mits deze echte meerwaarde bieden. ${brand.name} heeft daar in zijn ontwikkelingsproces rekening mee gehouden door uitgebreid feedback te verzamelen van gebruikers uit verschillende leeftijdscategorieën.

Het bedrijf plant een geleidelijke uitrol van ${storyline} over verschillende kanalen. Daarbij wordt ingezet op zowel online als offline verkoop, met speciale aandacht voor de service en ondersteuning die Nederlandse klanten gewend zijn.

De verwachtingen voor ${storyline} zijn hooggespannen. ${brand.name} heeft aangegeven dat het succes van deze lancering bepalend zal zijn voor verdere investeringen in de Nederlandse markt. Het bedrijf ziet Nederland als een strategisch belangrijke markt binnen Europa.

Retailpartners tonen zich enthousiast over de samenwerking met ${brand.name}. Verschillende grote ketens hebben al toegezegd dat ze ${storyline} prominent zullen positioneren in hun winkels en online platforms.

Voor ${audience.primary} betekent dit dat ze binnenkort toegang krijgen tot een uitgebreider aanbod van ${seo.primary_keyword}-oplossingen. ${brand.name} heeft benadrukt dat klanttevredenheid en service centraal staan in de nieuwe strategie.

Het bedrijf verwacht dat ${storyline} een belangrijke bijdrage zal leveren aan de groei van ${brand.name} in Nederland en mogelijk ook in andere Europese markten waar vergelijkbare trends zichtbaar zijn.`;

  return article;
}

export function detectLanguageFromBriefing(briefingText: string): string {
  const text = briefingText.toLowerCase();
  
  // Dutch language indicators
  const dutchIndicators = [
    'nederlands', 'nederland', 'dutch', 'nl', 
    'bedrijf', 'organisatie', 'campagne', 'doelgroep',
    'studenten', 'gezinnen', 'professionals',
    'verkeer', 'awareness', 'consideration',
    'productpagina', 'retailpartners', 'pageviews',
    'sudinfo', 'belgië', 'vlaanderen',
    'euro', 'tekens', 'geschreven',
    'garantie', 'hosting', 'website'
  ];
  
  const dutchCount = dutchIndicators.filter(indicator => text.includes(indicator)).length;
  
  if (dutchCount >= 3) {
    return 'nl-NL';
  }
  
  // French indicators
  const frenchIndicators = ['français', 'france', 'french', 'fr'];
  if (frenchIndicators.some(indicator => text.includes(indicator))) {
    return 'fr-FR';
  }
  
  // German indicators
  const germanIndicators = ['deutsch', 'deutschland', 'german', 'de'];
  if (germanIndicators.some(indicator => text.includes(indicator))) {
    return 'de-DE';
  }
  
  return 'en-US';
}