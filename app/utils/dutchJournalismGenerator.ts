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
  const { storyline, brand, audience } = brief;
  
  // Educational storytelling headlines - focus on trends, insights, human stories
  const storyTemplates = [
    `Hoe Belgische ${audience.primary} hun dagelijkse routine veranderen`,
    `De stille revolutie in Belgische huiskamers en studiekamers`,
    `Waarom ${audience.primary} anders denken over technologie`,
    `De nieuwe realiteit voor Belgische studenten en gezinnen`,
    `Hoe een generatie België digitaal opnieuw uitvindt`,
    `Het verhaal achter veranderende gewoontes bij ${audience.primary}`,
    `Belgische levensstijl in transitie: een generatie zoekt balans`,
    `Van chaos naar controle: hoe Belgische huishoudens hun dag herwinnen`,
    `De stille kracht van bewuste technologiekeuzes in België`,
    `Waarom efficiëntie het nieuwe statussymbool is geworden`
  ];
  
  return storyTemplates[Math.floor(Math.random() * storyTemplates.length)];
}

function generateDutchNewsArticle(brief: ContentBrief): string {
  const { storyline, brand, audience, seo } = brief;
  
  // Professional Dutch journalism - flowing narrative, no lists
  const article = `${brand.name} heeft aangekondigd dat het bedrijf zijn ${storyline}-aanbod uitbreidt om beter aan te sluiten bij de behoeften van Belgische consumenten. De nieuwe strategie richt zich specifiek op ${audience.primary} die op zoek zijn naar kwalitatieve technologische oplossingen.

De ontwikkeling komt voort uit uitgebreid marktonderzoek dat ${brand.name} de afgelopen maanden heeft uitgevoerd. Volgens het onderzoek zoeken Belgische gebruikers naar producten die niet alleen technologisch geavanceerd zijn, maar ook aansluiten bij hun dagelijkse routine en werkwijze.

"We zien een duidelijke trend waarbij ${audience.primary} steeds meer waarde hechten aan ${seo.primary_keyword}," aldus een woordvoerder van ${brand.name}. "Onze nieuwe aanpak speelt daar optimaal op in door functionaliteit te combineren met gebruiksgemak."

Het bedrijf heeft de afgelopen periode intensief samengewerkt met Belgische retailers en distributeurs om de uitrol van ${storyline} soepel te laten verlopen. Deze samenwerking heeft geleid tot een uitgebreid netwerk van verkooppunten waar consumenten de producten kunnen ervaren en aanschaffen.

Marktanalisten zijn positief over de nieuwe koers van ${brand.name}. Het bedrijf wordt geprezen om zijn vermogen om snel in te spelen op veranderende consumentenbehoeften en technologische ontwikkelingen. Deze flexibiliteit heeft ${brand.name} in het verleden al vaker concurrentievoordeel opgeleverd.

De timing van de lancering is strategisch gekozen. Met de huidige marktomstandigheden en de toenemende vraag naar ${seo.primary_keyword}, verwacht ${brand.name} dat ${storyline} goed zal worden ontvangen door de Belgische doelgroep.

Belgische consumenten hebben de afgelopen jaren laten zien dat ze openstaan voor innovatieve technologieën, mits deze echte meerwaarde bieden. ${brand.name} heeft daar in zijn ontwikkelingsproces rekening mee gehouden door uitgebreid feedback te verzamelen van gebruikers uit verschillende leeftijdscategorieën.

Het bedrijf plant een geleidelijke uitrol van ${storyline} over verschillende kanalen. Daarbij wordt ingezet op zowel online als offline verkoop, met speciale aandacht voor de service en ondersteuning die Belgische klanten gewend zijn.

De verwachtingen voor ${storyline} zijn hooggespannen. ${brand.name} heeft aangegeven dat het succes van deze lancering bepalend zal zijn voor verdere investeringen in de Belgische markt. Het bedrijf ziet België als een strategisch belangrijke markt binnen Europa.

Retailpartners tonen zich enthousiast over de samenwerking met ${brand.name}. Verschillende grote ketens hebben al toegezegd dat ze ${storyline} prominent zullen positioneren in hun winkels en online platforms.

Voor ${audience.primary} betekent dit dat ze binnenkort toegang krijgen tot een uitgebreider aanbod van ${seo.primary_keyword}-oplossingen. ${brand.name} heeft benadrukt dat klanttevredenheid en service centraal staan in de nieuwe strategie.

Het bedrijf verwacht dat ${storyline} een belangrijke bijdrage zal leveren aan de groei van ${brand.name} in België en mogelijk ook in andere Europese markten waar vergelijkbare trends zichtbaar zijn.`;

  return article;
}

export function detectLanguageFromBriefing(briefingText: string): string {
  const text = briefingText.toLowerCase();
  
  // Dutch language indicators (more comprehensive)
  const dutchIndicators = [
    'nederlands', 'nederland', 'dutch', 'nl', 'campagnevoorstel',
    'bedrijf', 'organisatie', 'campagne', 'doelgroep', 'campagnefocus',
    'studenten', 'gezinnen', 'professionals', 'jonge professionals',
    'verkeer', 'awareness', 'consideration', 'oplossingen',
    'productpagina', 'retailpartners', 'pageviews', 'blijven verbonden',
    'sudinfo', 'belgië', 'vlaanderen', 'vlaamse', 'brusselse',
    'euro', '€', 'tekens', 'geschreven', 'doelstelling',
    'garantie', 'hosting', 'website', 'detailsbestelling', 'bestelbon',
    'efficiënt studeren', 'slimme technologie', 'school- en gezinsoplossing',
    'nederlandse', 'belgische', 'vlaamse', 'brusselse'
  ];
  
  const dutchCount = dutchIndicators.filter(indicator => text.includes(indicator)).length;
  
  // French language indicators (comprehensive)
  const frenchIndicators = [
    'français', 'france', 'french', 'fr', 'française',
    'campagne', 'entreprise', 'société', 'marché français',
    'consommateurs français', 'étudiants', 'familles', 'professionnels',
    'solution', 'technologie', 'numérique', 'lancement',
    'stratégie', 'développement', 'distribution', 'partenaires',
    'analyse', 'recherche', 'étude', 'résultats',
    'suisse', 'québec', 'belge francophone', 'wallonie'
  ];
  
  const frenchCount = frenchIndicators.filter(indicator => text.includes(indicator)).length;
  
  // Determine language based on indicators
  if (dutchCount >= 2) {
    return 'nl-NL';
  }
  
  if (frenchCount >= 2) {
    return 'fr-FR';
  }
  
  // German indicators
  const germanIndicators = ['deutsch', 'deutschland', 'german', 'de', 'österreich', 'schweiz'];
  if (germanIndicators.some(indicator => text.includes(indicator))) {
    return 'de-DE';
  }
  
  // Spanish indicators
  const spanishIndicators = ['español', 'españa', 'spanish', 'es', 'mexicano'];
  if (spanishIndicators.some(indicator => text.includes(indicator))) {
    return 'es-ES';
  }
  
  return 'en-US';
}

export function generateProfessionalFrenchArticle(brief: ContentBrief): { title: string; content: string } {
  const title = generateFrenchNewsTitle(brief);
  const content = generateFrenchNewsArticle(brief);
  
  return { title, content };
}

function generateFrenchNewsTitle(brief: ContentBrief): string {
  const { storyline, brand } = brief;
  
  // Professional French newspaper headlines
  const templates = [
    `${brand.name} lance ${storyline} sur le marché français`,
    `Nouvelle stratégie ${storyline} pour ${brand.name}`,
    `${brand.name} mise sur ${storyline} pour sa croissance`,
    `Les consommateurs français adoptent ${storyline} de ${brand.name}`,
    `${brand.name} révolutionne le secteur avec ${storyline}`,
    `Innovation : ${brand.name} présente ${storyline}`,
    `${storyline} : ${brand.name} répond à la demande française`,
    `${brand.name} renforce sa position avec ${storyline}`
  ];
  
  return templates[Math.floor(Math.random() * templates.length)];
}

function generateFrenchNewsArticle(brief: ContentBrief): string {
  const { storyline, brand, audience, seo } = brief;
  
  const article = `${brand.name} a officialisé le lancement de ${storyline}, une initiative stratégique destinée à répondre aux attentes spécifiques du marché français. Cette démarche s'inscrit dans une approche ciblée visant ${audience.primary} en quête de solutions technologiques performantes et adaptées.

L'annonce fait suite à une étude de marché approfondie menée par les équipes de ${brand.name} sur plusieurs mois. Les résultats révèlent que les consommateurs français privilégient des produits alliant innovation technologique et simplicité d'utilisation, particulièrement dans le domaine de ${seo.primary_keyword}.

"Le marché français présente des spécificités que nous avons soigneusement analysées", explique un responsable de ${brand.name}. "Notre approche de ${storyline} répond précisément à ces besoins en proposant des solutions qui s'intègrent naturellement dans le quotidien de nos utilisateurs."

La stratégie de déploiement repose sur un partenariat étroit avec les principaux distributeurs et détaillants français. Cette collaboration permettra d'assurer une présence optimale de ${storyline} dans l'ensemble du réseau de distribution, tant physique que numérique.

Les experts du secteur saluent cette initiative de ${brand.name}, soulignant la pertinence de l'approche adoptée. L'entreprise démontre une fois de plus sa capacité à anticiper les évolutions du marché et à proposer des réponses adaptées aux besoins émergents.

Le calendrier de lancement a été soigneusement planifié pour coïncider avec les tendances actuelles du marché. Dans un contexte où la demande pour ${seo.primary_keyword} connaît une croissance soutenue, ${brand.name} positionne ${storyline} comme une réponse innovante et différenciante.

L'accueil réservé par les consommateurs français aux précédentes innovations de ${brand.name} laisse présager un accueil favorable pour ${storyline}. L'entreprise s'appuie sur cette confiance établie pour développer sa présence sur ce marché stratégique.

La phase de déploiement s'étalera sur plusieurs semaines, permettant une montée en puissance progressive et maîtrisée. ${brand.name} privilégie cette approche méthodique pour garantir la qualité de l'expérience utilisateur et l'efficacité de l'accompagnement client.

L'impact de ${storyline} sur la stratégie globale de ${brand.name} en Europe pourrait être significatif. L'entreprise considère ce lancement comme un test majeur pour ses ambitions de développement sur les marchés européens francophones.

Les partenaires commerciaux manifestent leur confiance dans le potentiel de ${storyline}. Plusieurs enseignes de référence ont d'ores et déjà confirmé leur intention de mettre en avant cette offre dans leurs espaces de vente et leurs communications.

Cette initiative s'inscrit dans une démarche plus large de ${brand.name} visant à consolider sa position de leader technologique tout en répondant aux spécificités locales des différents marchés européens.`;

  return article;
}