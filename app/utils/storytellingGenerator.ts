import { ContentBrief } from '../types';
import { generateProfessionalStoryContent } from './enhancedContentGenerator';

/**
 * Storytelling Content Generator
 * Creates educational, engaging narratives that happen to involve brands
 * Focus on human stories, trends, insights - not promotion
 */

export function generateStorytellingArticle(brief: ContentBrief, language: string = 'en'): { title: string; content: string } {
  console.log('🌍 Professional content generator called with language:', language, 'and locale:', brief.audience.locale);
  
  // Use the enhanced professional content generator for all languages
  return generateProfessionalStoryContent(brief, language);
}

function generateDutchStoryArticle(brief: ContentBrief): { title: string; content: string } {
  const { storyline, brand, audience, seo } = brief;
  
  const storyTypes = [
    'generational-shift',
    'lifestyle-evolution', 
    'cultural-observation',
    'behavioral-trend',
    'social-change'
  ];
  
  const selectedStory = storyTypes[Math.floor(Math.random() * storyTypes.length)];
  const title = generateDutchStoryTitle(brief, selectedStory);
  const content = generateDutchStoryContent(brief, selectedStory);
  
  return { title, content };
}

function generateDutchStoryTitle(brief: ContentBrief, storyType: string): string {
  const { storyline } = brief;
  
  return `${storyline} : de nieuwe aanpak die het verschil maakt`;
}

function generateDutchStoryContent(brief: ContentBrief, storyType: string): string {
  const { storyline, brand, audience, seo } = brief;
  
  // Determine appropriate demographic terms based on audience type
  const getAudienceDemographic = (audienceType: string) => {
    const lower = audienceType.toLowerCase();
    if (lower.includes('student') || lower.includes('étudiant')) {
      return { demographic: 'jonge professionals', persona: 'student uit Gent', role: 'afgestudeerde' };
    } else if (lower.includes('entrepreneur') || lower.includes('executive') || lower.includes('ceo')) {
      return { demographic: 'bedrijfsleiders', persona: 'ondernemer uit Antwerpen', role: 'CEO' };
    } else if (lower.includes('developer') || lower.includes('tech')) {
      return { demographic: 'technologie professionals', persona: 'developer uit Brussel', role: 'tech lead' };
    } else {
      return { demographic: 'professionals', persona: 'specialist uit Gent', role: 'professional' };
    }
  };
  
  const audienceProfile = getAudienceDemographic(audience.primary);
  
  return `Een nieuwe generatie Belgische ${audienceProfile.demographic} transformeert stilletjes hun dagelijkse benadering van ${storyline}. Wat begon als individuele keuzes, groeit uit tot een bredere beweging die de sector hervormt.

De transformatie is zichtbaar in de cijfers: onderzoek toont aan dat 73% van de organisaties in België fundamenteel andere criteria hanteren bij het evalueren van ${seo.primary_keyword} dan nog vijf jaar geleden. Waar vroeger prijs en functionaliteit domineerden, staan nu duurzaamheid, transparantie en ethische overwegingen centraal.

Marie Vandenberghe, onderzoeker aan de KU Leuven, volgt deze ontwikkeling nauw op. "We zien een generationele verschuiving naar bewust handelen," legt ze uit. "Mensen zijn niet langer passieve gebruikers—ze kureren actief hun keuzes en prioriteiten."

Deze nieuwe mentaliteit manifesteert zich op concrete manieren. In plaats van de nieuwste trends blindelings te volgen, evalueren organisaties zorgvuldig hoe elke beslissing past in hun bredere strategische doelen. Ze geven prioriteit aan waardecreatie en duurzaamheid boven korte termijn voordelen.

"Ik nam vroeger beslissingen veel impulsiever," deelt Pieter Janssens, een ${audienceProfile.role} uit Gent. "Nu vraag ik mezelf af of iets werkelijk bijdraagt aan onze langetermijn visie voordat we investeren. Het heeft onze hele benadering veranderd."

Belgische bedrijven nemen hiervan notitie. Organisaties zoals ${brand.name} verschuiven hun focus van pure product ontwikkeling naar holistische oplossingen. De uitdaging bestaat er niet in de meest geavanceerde technologie te creëren, maar ecosystemen te ontwerpen die echte waarde toevoegen.

Deze evolutie strekt zich uit voorbij individuele organisaties. Sectoren herdenken hun standaarden, netwerken bevragen hun samenwerkingsmodellen, en zelfs beleidsmakers beginnen de implicaties van deze verschuiving te overwegen.

Emma De Clerck, die vanuit Antwerpen werkt, vat de essentie van deze verandering samen: "Het gaat over intentioneel zijn met je resources en focus. Elke strategische keuze wordt een definitie van wie je bent en waar je naartoe wilt."

Deze bewuste benadering herdefinieert geleidelijk de normen voor succes en impact. Het suggereert de opkomst van een meer volwassen, waardegedreven manier van opereren—een die duurzame groei verkiest boven snelle winsten.

De impact op de Belgische markt is merkbaar: organisaties die zich aanpassen aan deze nieuwe realiteit zien hun resultaten verbeteren met gemiddeld 34%, terwijl entiteiten die vasthouden aan verouderde modellen relevantie verliezen.

Deze shift wordt gedreven door een generatie die opgroeide met toegang tot informatie maar nu de wijsheid ontwikkelt om die gericht in te zetten. Het resultaat is een meer selectieve, strategische mentaliteit die betekenis en impact verkiest boven volume en zichtbaarheid.

Voor organisaties betekent dit een fundamentele heroriëntatie: van output-gecentreerd naar impact-gecentreerd, van transactie-gedreven naar relatie-gedreven. Entiteiten die deze evolutie begrijpen en erop anticiperen, positioneren zich sterk voor de toekomst van de Belgische markt.`;
}

function generateFrenchStoryArticle(brief: ContentBrief): { title: string; content: string } {
  const { storyline, brand, audience, seo } = brief;
  
  const title = `Comment une nouvelle génération transforme silencieusement ses habitudes quotidiennes`;
  
  // Determine appropriate demographic terms based on audience type
  const getAudienceDemographic = (audienceType: string) => {
    const lower = audienceType.toLowerCase();
    if (lower.includes('student') || lower.includes('étudiant')) {
      return { demographic: 'jeunes professionnels', persona: 'diplômé universitaire de Bruxelles', role: 'jeune diplômé' };
    } else if (lower.includes('entrepreneur') || lower.includes('executive') || lower.includes('ceo')) {
      return { demographic: 'dirigeants d\'entreprise', persona: 'entrepreneur de Liège', role: 'dirigeant' };
    } else if (lower.includes('developer') || lower.includes('tech')) {
      return { demographic: 'professionnels de la technologie', persona: 'développeur de Bruxelles', role: 'tech lead' };
    } else {
      return { demographic: 'professionnels', persona: 'spécialiste de Gand', role: 'professionnel' };
    }
  };
  
  const audienceProfile = getAudienceDemographic(audience.primary);
  
  const content = `Une nouvelle génération de ${audienceProfile.demographic} belges transforme discrètement leur approche quotidienne de ${storyline}. Ce qui a commencé comme des choix individuels se développe en un mouvement plus large qui redéfinit le secteur.

La transformation se reflète dans les données : des recherches montrent que 73% des organisations en Belgique appliquent des critères fondamentalement différents lors de l'évaluation de ${seo.primary_keyword} par rapport à il y a cinq ans. Là où le prix et la fonctionnalité dominaient auparavant, la durabilité, la transparence et les considérations éthiques sont maintenant centrales.

Dr. Sophie Delattre, chercheuse à l'ULB, suit de près cette évolution. "Nous observons un changement générationnel vers une approche consciente", explique-t-elle. "Les gens ne sont plus des utilisateurs passifs—ils curent activement leurs décisions et priorités."

Cette nouvelle mentalité se manifeste de manières concrètes. Plutôt que de suivre aveuglément les dernières tendances, les organisations évaluent soigneusement comment chaque décision s'intègre dans leurs objectifs stratégiques plus larges. Ils privilégient la création de valeur et la durabilité plutôt que les gains à court terme.

"Je prenais des décisions beaucoup plus impulsives auparavant", partage Thomas Dubois, un ${audienceProfile.role} de Bruxelles. "Maintenant, je me demande si quelque chose contribue véritablement à notre vision à long terme avant d'investir. Cela a complètement changé notre approche."

Les entreprises belges prennent note de cette évolution. Des organisations comme ${brand.name} déplacent leur focus du développement de produits pur vers des solutions holistiques. Le défi ne consiste pas à créer la technologie la plus avancée, mais à concevoir des écosystèmes qui ajoutent une valeur réelle.

Cette évolution s'étend au-delà des organisations individuelles. Les secteurs repensent leurs standards, les réseaux questionnent leurs modèles de collaboration, et même les décideurs politiques commencent à considérer les implications de ce changement.

Marie van de Berg, qui travaille à distance depuis Liège, capture l'essence de ce changement : "Il s'agit d'être intentionnel avec vos ressources et votre focus. Chaque choix stratégique devient une définition de qui vous êtes et où vous voulez aller."

Cette approche consciente redéfinit graduellement les normes de succès et d'impact. Elle suggère l'émergence d'une manière plus mature et axée sur la valeur d'opérer—une qui privilégie la croissance durable plutôt que les profits rapides.

L'impact sur le marché belge est notable : les organisations qui s'adaptent à cette nouvelle réalité voient leurs résultats s'améliorer de 34% en moyenne, tandis que les entités qui s'accrochent aux modèles obsolètes perdent en pertinence.

Ce changement est porté par une génération qui a grandi avec l'accès à l'information mais développe maintenant la sagesse de l'utiliser de manière ciblée. Le résultat est une mentalité plus sélective et stratégique qui privilégie la signification et l'impact plutôt que le volume et la visibilité.

Pour les organisations, cela signifie une réorientation fondamentale : de centré sur l'output à centré sur l'impact, de axé sur les transactions à axé sur les relations. Les entités qui comprennent et anticipent cette évolution se positionnent fortement pour l'avenir du marché belge.`;
  
  return { title, content };
}

function generateEnglishStoryArticle(brief: ContentBrief): { title: string; content: string } {
  const { storyline, brand, audience, seo } = brief;
  
  // Determine appropriate demographic terms and tone based on audience type
  const getAudienceProfile = (audienceType: string) => {
    const lower = audienceType.toLowerCase();
    if (lower.includes('student') || lower.includes('étudiant')) {
      return { 
        demographic: 'young professionals',
        persona: 'graduate student',
        setting: 'university district',
        tone: 'accessible and aspirational'
      };
    } else if (lower.includes('entrepreneur') || lower.includes('executive') || lower.includes('ceo')) {
      return { 
        demographic: 'business leaders',
        persona: 'executive',
        setting: 'corporate environment', 
        tone: 'strategic and analytical'
      };
    } else if (lower.includes('developer') || lower.includes('tech')) {
      return { 
        demographic: 'technology professionals',
        persona: 'senior developer',
        setting: 'tech hub',
        tone: 'technical yet human-centered'
      };
    } else {
      return { 
        demographic: 'professionals',
        persona: 'industry professional',
        setting: 'business district',
        tone: 'professional and insightful'
      };
    }
  };
  
  const audienceProfile = getAudienceProfile(audience.primary);
  const title = `How Organizations Are Quietly Transforming Their Approach to Innovation`;
  
  const content = `In a bustling coffee shop near the ${audienceProfile.setting}, Sarah observes the changing patterns around her with growing fascination. What strikes her most isn't what people are doing, but how differently they approach their strategic decisions compared to just a few years ago.

This personal observation reflects a broader transformation taking place across organizations nationwide. A quiet revolution in how they structure their operations, select their solutions, and define what constitutes real value.

Dr. Michael Chen, a behavioral researcher, has been tracking these changes closely. "We're witnessing an organizational shift toward intentional strategy," he explains. "Decision-makers are no longer passive adopters of technology—they're active architects of their operational environment."

This new mindset manifests in very practical ways. Rather than implementing the latest trends, organizations carefully evaluate how each initiative fits into their broader strategic goals. They prioritize sustainable impact and integration over immediate features and capabilities.

"We used to chase every innovation constantly," shares Alex Thompson, a ${audienceProfile.persona}. "Now we ask ourselves whether something genuinely advances our mission before making any investment. It's fundamentally changed how we approach transformation."

Companies like ${brand.name} are taking notice, shifting their focus from pure innovation to meaningful integration. The challenge isn't creating the most advanced solutions, but designing ecosystems that enhance rather than complicate organizational effectiveness.

This evolution extends beyond individual organizations. Entire industries are rethinking their standards, networks are questioning their collaboration models, and even policymakers are beginning to consider the implications of this shift.

Emma Rodriguez, who leads strategy remotely, captures the essence of this change: "It's about being intentional with your resources and focus. Every strategic choice becomes a definition of who you are as an organization."

This conscious approach is gradually redefining standards for success, sustainability, and impact. It suggests the emergence of a more mature, value-centered relationship with innovation—one that prioritizes meaningful advancement over disruptive change.`;
  
  return { title, content };
}

function generateSpanishStoryArticle(brief: ContentBrief): { title: string; content: string } {
  const { storyline, brand, audience, seo } = brief;
  
  const title = `Cómo los ${audience.primary} españoles están transformando su vida cotidiana`;
  
  const content = `En una cafetería del barrio de Malasaña en Madrid, Carmen Rodríguez observa las nuevas costumbres de su generación. A los 25 años, esta consultora de marketing ha notado que tanto ella como sus amigos abordan la tecnología de manera muy diferente a como lo hacían hace algunos años.

Esta observación personal refleja un fenómeno más amplio que afecta a los ${audience.primary} en toda España. Una transformación silenciosa pero profunda en la forma de organizar su día a día, elegir sus herramientas y definir sus prioridades.

Dr. Rafael Jiménez, sociólogo de la Universidad Complutense, estudia esta evolución desde hace tiempo. "Estamos siendo testigos de un cambio generacional importante en el enfoque español hacia la tecnología," explica desde su despacho. "Los jóvenes adultos ya no son consumidores pasivos, sino que eligen conscientemente."

Esta nueva mentalidad se manifiesta en decisiones muy concretas. Los ${audience.primary} españoles priorizan ahora la coherencia global por encima del rendimiento individual de cada dispositivo. Buscan soluciones que se integren armoniosamente en su estilo de vida.

"Crecí acumulando gadgets," cuenta Diego Martín, estudiante de máster en Barcelona. "Ahora siempre me pregunto si algo realmente va a mejorar mi vida antes de comprarlo. Es un enfoque completamente diferente."

Esta evolución no pasa desapercibida para las empresas. Marcas como ${brand.name} adaptan su estrategia para responder a esta demanda de integración reflexiva más que de innovación pura. El desafío ya no es proponer la tecnología más avanzada, sino la que mejor se adapta al proyecto de vida de los usuarios.

El impacto de este cambio trasciende el marco del consumo individual. Las universidades españolas repiensan sus espacios de aprendizaje, las empresas cuestionan su equipamiento digital, e incluso las políticas públicas empiezan a integrar esta nueva realidad.

Ana López, que termina sus estudios en la Universidad de Sevilla, resume esta filosofía: "Se trata de recuperar el control de tu tiempo y tu atención. Cada elección tecnológica se convierte en una elección de vida."

Este enfoque consciente redefine progresivamente los estándares españoles en materia de calidad de vida, productividad y bienestar digital.`;
  
  return { title, content };
}

function generateGermanStoryArticle(brief: ContentBrief): { title: string; content: string } {
  const { storyline, brand, audience, seo } = brief;
  
  const title = `Wie deutsche ${audience.primary} ihren Alltag neu gestalten`;
  
  const content = `In einem Café in Berlin-Mitte beobachtet Julia Schmidt die Gewohnheiten ihrer Generation. Die 27-jährige Beraterin hat bemerkt, dass sie und ihre Freunde einen völlig anderen Umgang mit Technologie entwickelt haben als noch vor wenigen Jahren.

Diese persönliche Beobachtung spiegelt ein breiteres Phänomen wider, das deutsche ${audience.primary} im ganzen Land betrifft. Eine stille, aber tiefgreifende Transformation in der Art, wie sie ihren Alltag strukturieren, ihre Werkzeuge auswählen und ihre Prioritäten definieren.

Dr. Thomas Weber, Soziologe an der Humboldt-Universität, erforscht diese Entwicklung seit mehreren Jahren. "Wir erleben einen wichtigen Generationswandel im deutschen Umgang mit Technologie," erklärt er in seinem Universitätsbüro. "Junge Erwachsene sind keine passiven Konsumenten mehr, sondern bewusste Gestalter ihrer digitalen Umgebung."

Diese neue Denkweise zeigt sich in sehr konkreten Entscheidungen. Deutsche ${audience.primary} bevorzugen mittlerweile Gesamtkohärenz statt der individuellen Leistung einzelner Geräte. Sie suchen Lösungen, die sich harmonisch in ihren Lebensstil integrieren.

"Ich bin damit aufgewachsen, ständig die neuesten Gadgets zu sammeln," erzählt Michael Müller, Masterstudent in München. "Jetzt frage ich mich immer, ob etwas wirklich mein Leben verbessert, bevor ich es kaufe. Das ist ein völlig anderer Ansatz."

Diese Entwicklung bleibt Unternehmen nicht verborgen. Marken wie ${brand.name} passen ihre Strategie an, um dieser Nachfrage nach durchdachter Integration statt reiner Innovation zu entsprechen. Die Herausforderung besteht nicht mehr darin, die fortschrittlichste Technologie anzubieten, sondern die, die am besten zum Lebenskonzept der Nutzer passt.

Die Auswirkungen dieses Wandels gehen über den individuellen Konsum hinaus. Deutsche Universitäten überdenken ihre Lernräume, Unternehmen hinterfragen ihre digitale Ausstattung, und sogar die Politik beginnt, diese neue Realität zu berücksichtigen.

Lisa Wagner, die ihr Studium an der TU Dresden abschließt, fasst diese Philosophie zusammen: "Es geht darum, die Kontrolle über Zeit und Aufmerksamkeit zurückzugewinnen. Jede technologische Entscheidung wird zu einer Lebensentscheidung."`;
  
  return { title, content };
}

function generateItalianStoryArticle(brief: ContentBrief): { title: string; content: string } {
  const { storyline, brand, audience, seo } = brief;
  
  const title = `Come gli ${audience.primary} italiani stanno trasformando la loro quotidianità`;
  
  const content = `In un caffè del quartiere Navigli a Milano, Francesca Rossi osserva le nuove abitudini della sua generazione. A 26 anni, questa consulente di comunicazione ha notato che lei e i suoi amici affrontano la tecnologia in modo molto diverso rispetto a qualche anno fa.

Questa osservazione personale riflette un fenomeno più ampio che coinvolge gli ${audience.primary} in tutta Italia. Una trasformazione silenziosa ma profonda nel modo di organizzare la giornata, scegliere gli strumenti e definire le priorità.

Prof. Marco Bianchi, sociologo alla Bocconi, studia questa evoluzione da diversi anni. "Stiamo assistendo a un cambiamento generazionale importante nell'approccio italiano alla tecnologia," spiega dal suo ufficio universitario. "I giovani adulti non subiscono più i loro strumenti, li scelgono consapevolmente."

Questa nuova mentalità si manifesta in scelte molto concrete. Gli ${audience.primary} italiani privilegiano ora la coerenza d'insieme rispetto alle prestazioni individuali di ogni dispositivo. Cercano soluzioni che si integrino armoniosamente nel loro stile di vita.

"Sono cresciuto accumulando gadget," racconta Lorenzo Ferrari, studente magistrale a Roma. "Ora mi chiedo sempre se qualcosa migliorerà davvero la mia vita prima di comprarlo. È un approccio completamente diverso."

Questa evoluzione non sfugge alle aziende. Marchi come ${brand.name} adattano la loro strategia per rispondere a questa domanda di integrazione ragionata piuttosto che di pura innovazione. La sfida non è più proporre la tecnologia più avanzata, ma quella che si adatta meglio al progetto di vita degli utenti.

L'impatto di questo cambiamento supera il quadro del consumo individuale. Le università italiane ripensano i loro spazi di apprendimento, le aziende mettono in discussione la loro dotazione digitale, e persino le politiche pubbliche iniziano a integrare questa nuova realtà.

Elena Conti, che sta terminando gli studi alla Statale di Milano, riassume questa filosofia: "Si tratta di riprendere il controllo del proprio tempo e della propria attenzione. Ogni scelta tecnologica diventa una scelta di vita."`;
  
  return { title, content };
}