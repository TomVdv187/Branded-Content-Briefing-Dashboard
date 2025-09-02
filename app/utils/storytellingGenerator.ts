import { ContentBrief } from '../types';

/**
 * Storytelling Content Generator
 * Creates educational, engaging narratives that happen to involve brands
 * Focus on human stories, trends, insights - not promotion
 */

export function generateStorytellingArticle(brief: ContentBrief, language: string = 'en'): { title: string; content: string } {
  console.log('🌍 Storytelling generator called with language:', language, 'and locale:', brief.audience.locale);
  
  // Use explicit locale selection from brief if available
  const selectedLocale = brief.audience.locale || language;
  
  if (selectedLocale.startsWith('fr') || language === 'fr') {
    console.log('📝 Generating French story article');
    return generateFrenchStoryArticle(brief);
  } else if (selectedLocale.startsWith('nl') || language === 'nl') {
    console.log('📝 Generating Dutch story article'); 
    return generateDutchStoryArticle(brief);
  } else if (selectedLocale.startsWith('es') || language === 'es') {
    console.log('📝 Generating Spanish story article');
    return generateSpanishStoryArticle(brief);
  } else if (selectedLocale.startsWith('de') || language === 'de') {
    console.log('📝 Generating German story article');
    return generateGermanStoryArticle(brief);
  } else if (selectedLocale.startsWith('it') || language === 'it') {
    console.log('📝 Generating Italian story article');
    return generateItalianStoryArticle(brief);
  } else {
    console.log('📝 Generating English story article (default)');
    return generateEnglishStoryArticle(brief);
  }
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
  
  return `Aangeboden door ${brand.name}
En als ${storyline} eindelijk toegankelijk werd? Prestaties, kwaliteit en volledige service, zonder verborgen kosten of compromissen. Dat is de belofte van ${brand.name} die inzet op transparantie, luisterend oor en de juiste prijs.

Door ${brand.name},
Gepubliceerd op ${new Date().toLocaleDateString('nl-BE')} ${new Date().toLocaleTimeString('nl-BE', { hour: '2-digit', minute: '2-digit' })}

Kan je echt ${storyline} bekomen dat performant, doordacht en duurzaam is… zonder bang te hoeven zijn voor onaangename verrassingen wanneer je de werkelijke investering ontdekt? Bij ${brand.name} is de toezegging duidelijk: ${storyline} van kwaliteit aanbieden tegen een eerlijke, transparante, all-inclusive prijs en zonder compromissen op prestaties en duurzaamheid. Met de uitgesproken wil om premium toegankelijk te maken voor ${audience.primary}.

Hier geen verborgen kosten, geen kosten op het laatste moment. Het voorgestelde voorstel omvat het volledige project: ${seo.primary_keyword}, begeleiding, installatie, opleiding, assistentie… Absoluut alles. Een partijdigheid voor transparantie die geruststelt.

De juiste prijs, zonder compromissen
Om dit resultaat te bereiken, zet ${brand.name} in op een efficiënte organisatie en een precieze kennis van de verwachtingen van klanten. Dankzij haar expertise heeft het bedrijf een model uitgebouwd waarbij elke oplossing op een intelligente manier wordt ontworpen, zonder onnodige meerkosten, rekening houdend met zowel het budget als de levensstijl van iedereen. Het doel is niet om een standaardoplossing tegen een kapotgeprijsde prijs te verkopen, maar om een gepersonaliseerde, evenwichtige en altijd toegankelijke aanpak uit te bouwen.

Prestaties en duurzaamheid ongeacht het toegewezen bedrag
Wat ook opvalt, is de kwaliteit van de prestaties en voorgestelde materialen. Bewezen technologieën, ruime mogelijkheden voor personalisatie, uitgebreide keuze aan configuraties: het aanbod ligt ver van de compromissen die men zou kunnen verwachten in deze prijsklasse. Men komt hier in een universum waar prestaties en functionaliteit samengaan, ongeacht je budget.

Of men nu zoekt naar een in de eerste plaats functionele oplossing of een meer gepersonaliseerde begeleiding, de omkadering is identiek, de garanties even solide. ${brand.name} heeft ervoor gekozen om nooit de kwaliteit op te offeren op het altaar van de prijs, waardoor een uniek voorstel op de Belgische markt ontstaat.

Deze benadering vindt een bijzondere weerklank bij Belgische ${audience.primary} die op zoek zijn naar betrouwbare, transparante partners die zich engageren op lange termijn. Meer dan een gewone leverancier positioneert ${brand.name} zich als een projectbegeleider, bezorgd om echte waarde te creëren voor zijn klanten.

Een model dat vertrouwen inspireert
De evolutie van de Belgische markt bevestigt deze tendens: consumenten geven nu de voorkeur aan bedrijven die technische expertise, commerciële transparantie en engagement op lange termijn combineren. ${brand.name} belichaamt perfect deze nieuwe eis door ${storyline} voor te stellen die beantwoordt aan de huidige verwachtingen zonder compromissen op kwaliteit.

Deze filosofie, geworteld in de Belgische waarden van pragmatisme en authenticiteit, stelt ${brand.name} in staat om zich te onderscheiden in een sector die vaak als complex en ondoorzichtig wordt ervaren. Een benadering die school maakt en vertrouwen inspireert.`;
}

function generateFrenchStoryArticle(brief: ContentBrief): { title: string; content: string } {
  const { storyline, brand, audience, seo } = brief;
  
  const title = `${storyline} : la nouvelle approche qui fait la différence`;
  
  const content = `Présenté par ${brand.name}
Et si ${storyline} devenait enfin accessible ? Performance, qualité et service complet, sans coût caché ni compromis. C'est la promesse de ${brand.name} qui mise sur la transparence, l'écoute et la proposition la plus juste.

Par ${brand.name},
Publié le ${new Date().toLocaleDateString('fr-BE')} ${new Date().toLocaleTimeString('fr-BE', { hour: '2-digit', minute: '2-digit' })}

Peut-on vraiment s'offrir ${storyline} performant, bien pensé et durable… sans craindre de mauvaises surprises au moment de découvrir l'investissement réel ? Chez ${brand.name}, l'engagement est clair : offrir ${storyline} de qualité à un prix juste, transparent, tout compris et sans compromis sur les performances et la durabilité. Avec une volonté assumée de rendre le premium accessible aux ${audience.primary}.

Ici, pas de coûts cachés, pas de frais de dernière minute. La proposition annoncée inclut l'ensemble du projet : ${seo.primary_keyword}, l'accompagnement, l'installation, la formation, l'assistance… Absolument tout. Un parti pris de transparence qui rassure.

Le juste prix, sans compromis
Pour parvenir à ce résultat, ${brand.name} mise sur une organisation efficace et une connaissance précise des attentes clients. Forte de son expertise, l'enseigne a bâti un modèle où chaque solution est conçue de manière intelligente, sans surcoût inutile, en tenant compte à la fois du budget et du mode de vie de chacun. Le but n'est pas de vendre une solution standard à prix cassé, mais de construire une approche personnalisée, équilibrée, et toujours accessible.

Performance et durabilité quel que soit le montant consacré
Ce qui frappe également, c'est la qualité des prestations et des matériaux proposés. Technologies éprouvées, larges possibilités de personnalisation, choix étendu de configurations : l'offre est loin des compromis que l'on pourrait attendre dans cette gamme de prix. On entre ici dans un univers où la performance et la fonctionnalité cohabitent, quel que soit votre budget.

Que l'on cherche une solution avant tout fonctionnelle ou un accompagnement plus personnalisé, l'encadrement est identique, les garanties tout aussi solides. ${brand.name} a fait le choix de ne jamais sacrifier la qualité sur l'autel du prix, créant ainsi une proposition unique sur le marché belge.

Cette approche trouve un écho particulier auprès des ${audience.primary} belges qui recherchent des partenaires fiables, transparents et engagés dans la durée. Plus qu'un simple fournisseur, ${brand.name} se positionne comme un accompagnateur de projet, soucieux de créer de la valeur réelle pour ses clients.

Un modèle qui inspire confiance
L'évolution du marché belge confirme cette tendance : les consommateurs privilégient désormais les entreprises qui allient expertise technique, transparence commerciale et engagement sur la durée. ${brand.name} incarne parfaitement cette nouvelle exigence, en proposant ${storyline} qui répond aux attentes actuelles sans compromis sur la qualité.

Cette philosophie, ancrée dans les valeurs belges de pragmatisme et d'authenticité, permet à ${brand.name} de se démarquer dans un secteur souvent perçu comme complexe et opaque. Une approche qui fait école et inspire confiance.`;
  
  return { title, content };
}

function generateEnglishStoryArticle(brief: ContentBrief): { title: string; content: string } {
  const { storyline, brand, audience, seo } = brief;
  
  const title = `How ${audience.primary} Are Quietly Transforming Their Daily Lives`;
  
  const content = `In a bustling coffee shop near the university district, Sarah watches her fellow students with growing fascination. What strikes her most isn't what they're doing, but how differently they approach their daily routines compared to just a few years ago.

This personal observation reflects a broader transformation taking place among ${audience.primary} across the country. A quiet revolution in how they structure their days, select their tools, and define what matters most to them.

Dr. Michael Chen, a behavioral researcher, has been tracking these changes closely. "We're witnessing a generational shift toward intentional living," he explains. "Young adults are no longer passive consumers of technology—they're active curators of their digital environment."

This new mindset manifests in very practical ways. Rather than collecting the latest gadgets, ${audience.primary} carefully evaluate how each tool fits into their broader life goals. They prioritize integration and simplicity over features and specs.

"I used to upgrade everything constantly," shares Alex Thompson, a graduate student. "Now I ask myself whether something genuinely improves my life before making any purchase. It's changed everything about how I approach technology."

Companies like ${brand.name} are taking notice, shifting their focus from pure innovation to thoughtful integration. The challenge isn't creating the most advanced products, but designing solutions that enhance rather than complicate users' lives.

This evolution extends beyond individual choices. Educational institutions are rethinking their digital infrastructure, workplaces are questioning their tool selections, and even policymakers are beginning to consider the implications of this shift.

Emma Rodriguez, who works remotely from Portland, captures the essence of this change: "It's about being deliberate with your time and attention. Every technology choice becomes a life choice."

This conscious approach is gradually redefining standards for productivity, well-being, and success. It suggests the emergence of a more mature, human-centered relationship with technology—one that prioritizes enhancement over disruption.`;
  
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