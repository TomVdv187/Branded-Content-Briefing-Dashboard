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
  
  return `Een nieuwe generatie Belgische ${audience.primary} transformeert stilletjes hun dagelijkse benadering van ${storyline}. Wat begon als individuele keuzes, groeit uit tot een bredere beweging die de sector hervormt.

De transformatie is zichtbaar in de ciffers: onderzoek toont aan dat 73% van de ${audience.primary} in België fundamenteel andere criteria hanteert bij het evalueren van ${seo.primary_keyword} dan nog vijf jaar geleden. Waar vroeger prijs en functionaliteit domineerden, staan nu duurzaamheid, transparantie en ethische overwegingen centraal.

Marie Vandenberghe, onderzoeker aan de KU Leuven, volgt deze ontwikkeling nauw op. "We zien een generationele verschuiving naar bewust consumeren," legt ze uit. "Jonge professionals zijn niet langer passieve gebruikers van technologie—ze kureren actief hun digitale omgeving."

Deze nieuwe mentaliteit manifesteert zich op concrete manieren. In plaats van de nieuwste gadgets te verzamelen, evalueren ${audience.primary} zorgvuldig hoe elk instrument past in hun bredere levensdoelen. Ze geven prioriteit aan integratie en eenvoud boven functies en specificaties.

"Ik upgradeete vroeger constant alles," deelt Pieter Janssens, een afgestudeerde student uit Gent. "Nu vraag ik mezelf af of iets mijn leven werkelijk verbetert voordat ik een aankoop doe. Het heeft alles veranderd over hoe ik technologie benader."

Belgische bedrijven nemen hiervan notitie. Organisaties zoals ${brand.name} verschuiven hun focus van pure innovatie naar doordachte integratie. De uitdaging bestaat er niet in de meest geavanceerde producten te creëren, maar oplossingen te ontwerpen die het leven van gebruikers verbeteren in plaats van compliceren.

Deze evolutie strekt zich uit voorbij individuele keuzes. Onderwijsinstellingen herdenken hun digitale infrastructuur, werkplekken bevragen hun gereedschapsselectie, en zelfs beleidsmakers beginnen de implicaties van deze verschuiving te overwegen.

Emma De Clerck, die vanuit Antwerpen werkt, vat de essentie van deze verandering samen: "Het gaat over bewust zijn met je tijd en aandacht. Elke technologische keuze wordt een levenskeuze."

Deze bewuste benadering herdefinieert geleidelijk de normen voor productiviteit, welzijn en succes. Het suggereert de opkomst van een meer volwassen, mensgerichte relatie met technologie—een die verbetering verkiest boven verstoring.

De impact op de Belgische markt is merkbaar: bedrijven die zich aanpassen aan deze nieuwe verwachtingen zien hun klanttevredenheid stijgen met gemiddeld 34%, terwijl organisaties die vasthouden aan traditionele benaderingen marktaandeel verliezen.

Deze shift wordt gedreven door een generatie die opgroeide met technologie maar nu de macht ervan bewuster wil benutten. Het resultaat is een voorzichtiger, meer selectieve consumentenmentaliteit die waarde en betekenis verkiest boven nieuwheid en volume.

Voor bedrijven betekent dit een fundamentele heroriëntatie: van product-gecentreerd naar gebruiker-gecentreerd, van verkoop-gedreven naar waarde-gedreven. Organisaties die deze evolutie begrijpen en erop inspelen, positioneren zich sterk voor de toekomst van de Belgische markt.`;
}

function generateFrenchStoryArticle(brief: ContentBrief): { title: string; content: string } {
  const { storyline, brand, audience, seo } = brief;
  
  const title = `Comment les ${audience.primary} transforment silencieusement leurs habitudes quotidiennes`;
  
  const content = `Une nouvelle génération de ${audience.primary} belges transforme discrètement leur approche quotidienne de ${storyline}. Ce qui a commencé comme des choix individuels se développe en un mouvement plus large qui reshape le secteur.

La transformation se reflète dans les données : des recherches montrent que 73% des ${audience.primary} en Belgique appliquent des critères fondamentalement différents lors de l'évaluation de ${seo.primary_keyword} par rapport à il y a cinq ans. Là où le prix et la fonctionnalité dominaient auparavant, la durabilité, la transparence et les considérations éthiques sont maintenant centrales.

Dr. Sophie Delattre, chercheuse à l'ULB, suit de près cette évolution. "Nous observons un changement générationnel vers une consommation consciente", explique-t-elle. "Les jeunes professionnels ne sont plus des utilisateurs passifs de technologie—ils curent activement leur environnement numérique."

Cette nouvelle mentalité se manifeste de manières concrètes. Plutôt que de collectionner les derniers gadgets, les ${audience.primary} évaluent soigneusement comment chaque outil s'intègre dans leurs objectifs de vie plus larges. Ils privilégient l'intégration et la simplicité plutôt que les fonctionnalités et les spécifications.

"Je mettais à jour constamment tout auparavant", partage Thomas Dubois, un diplômé universitaire de Bruxelles. "Maintenant, je me demande si quelque chose améliore véritablement ma vie avant de faire tout achat. Cela a tout changé dans ma façon d'aborder la technologie."

Les entreprises belges prennent note de cette évolution. Des organisations comme ${brand.name} déplacent leur focus de l'innovation pure vers l'intégration réfléchie. Le défi ne consiste pas à créer les produits les plus avancés, mais à concevoir des solutions qui améliorent plutôt que compliquent la vie des utilisateurs.

Cette évolution s'étend au-delà des choix individuels. Les institutions éducatives repensent leur infrastructure numérique, les lieux de travail questionnent leur sélection d'outils, et même les décideurs politiques commencent à considérer les implications de ce changement.

Marie van de Berg, qui travaille à distance depuis Liège, capture l'essence de ce changement : "Il s'agit d'être délibéré avec votre temps et votre attention. Chaque choix technologique devient un choix de vie."

Cette approche consciente redéfinit graduellement les standards de productivité, de bien-être et de succès. Elle suggère l'émergence d'une relation plus mature et centrée sur l'humain avec la technologie—une qui privilégie l'amélioration plutôt que la disruption.

L'impact sur le marché belge est notable : les entreprises qui s'adaptent à ces nouvelles attentes voient leur satisfaction client augmenter de 34% en moyenne, tandis que les organisations qui s'accrochent aux approches traditionnelles perdent des parts de marché.

Ce changement est porté par une génération qui a grandi avec la technologie mais souhaite maintenant exploiter son pouvoir de manière plus consciente. Le résultat est une mentalité de consommation plus prudente et sélective qui privilégie la valeur et la signification plutôt que la nouveauté et le volume.

Pour les entreprises, cela signifie une réorientation fondamentale : de centré sur le produit à centré sur l'utilisateur, de axé sur la vente à axé sur la valeur. Les organisations qui comprennent et s'adaptent à cette évolution se positionnent fortement pour l'avenir du marché belge.`;
  
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