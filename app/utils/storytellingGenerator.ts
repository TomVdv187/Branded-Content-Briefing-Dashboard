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
  const { audience } = brief;
  
  const titleTemplates = {
    'generational-shift': [
      `Hoe Belgische ${audience.primary} hun dag anders inrichten dan hun ouders`,
      `De stille revolutie in Belgische studentenhuizen en gezinswoningen`,
      `Waarom een hele generatie België opnieuw uitvindt hoe ze leeft`,
      `Het verhaal van Belgische ${audience.primary} die controle terugnemen`
    ],
    'lifestyle-evolution': [
      `Van chaos naar rust: Belgische huishoudens herontdekken hun ochtend`,
      `Hoe Belgische ${audience.primary} hun prioriteiten hertekenen`,
      `De nieuwe Belgische dagindeling die iedereen stil wil houden`,
      `Waarom Belgische gezinnen hun hele routine ombouwen`
    ],
    'cultural-observation': [
      `Het Belgische karakter in een digitale tijd`,
      `Hoe Belgische ${audience.primary} balans vinden in een hectische wereld`,
      `De stille kracht van Belgische nuchtere technologiekeuzes`,
      `Belgische efficiëntie krijgt een modern gezicht`
    ],
    'behavioral-trend': [
      `Waarom Belgische ${audience.primary} bewuster worden in hun keuzes`,
      `De opkomst van 'intentioneel leven' onder Belgische jongeren`,
      `Hoe Belgische studenten en professionals focus terugwinnen`,
      `Belgische ${audience.primary} kiezen kwaliteit boven kwantiteit`
    ],
    'social-change': [
      `Een generatie Belgische ${audience.primary} die anders denkt over succes`,
      `Hoe Belgische huishoudens hun relatiepatronen veranderen`,
      `De nieuwe Belgische definitie van een goed leven`,
      `Belgische ${audience.primary} schrijven nieuwe regels voor productiviteit`
    ]
  };
  
  const templates = titleTemplates[storyType as keyof typeof titleTemplates] || titleTemplates['lifestyle-evolution'];
  return templates[Math.floor(Math.random() * templates.length)];
}

function generateDutchStoryContent(brief: ContentBrief, storyType: string): string {
  const { storyline, brand, audience, seo } = brief;
  
  // Create human-centered stories that educate and engage
  const storyIntros = [
    `Het is dinsdagochtend, 7:30, in een rijtjeshuis in Utrecht. Waar vijf jaar geleden nog de chaos heerste van vergeten huiswerk en verloren telefoonladers, verloopt nu alles met een bijna Japanse sereniteit.`,
    
    `Sarah van der Berg (24) zit in de bibliotheek van de Universiteit van Amsterdam en observeert haar medestudenten. Wat haar opvalt is hoe anders iedereen werkt vergeleken met toen zij begon met studeren.`,
    
    `In het koffietentje naast de TU Delft zitten drie vrienden te discussiëren over iets wat hun ouders waarschijnlijk niet zouden begrijpen: hoe je bewust keuzes maakt over welke technologie je wel en niet gebruikt.`,
    
    `Familie Janssen uit Eindhoven heeft iets ontdekt wat hun leven fundamenteel heeft veranderd. Het is niet spectaculair, geen grote doorbraak, maar het heeft hun manier van samenleven getransformeerd.`,
    
    `Lisa de Jong werkt vanuit huis in Amsterdam-Noord en merkt dat ze de laatste twee jaar heel anders is gaan denken over hoe ze haar dag indeelt. Het is een verschuiving die ze ook bij vrienden en collega's ziet.`
  ];
  
  const selectedIntro = storyIntros[Math.floor(Math.random() * storyIntros.length)];
  
  return `${selectedIntro}

Het fenomeen dat zich hier afspeelt, speelt zich af in duizenden Belgische huishoudens, studentenhuizen en kantoren. Er is een stille revolutie gaande in hoe ${audience.primary} omgaan met hun dagelijkse routine, hun technologiekeuzes, en uiteindelijk hun leven.

Dr. Marijke Visser, gedragswetenschapper aan de Vrije Universiteit Brussel, heeft deze verschuiving van dichtbij bestudeerd. "We zien een generationele omslag waarin jongere Belgen veel bewuster worden in hun keuzes," legt ze uit tijdens ons gesprek in haar kantoor. "Het gaat niet meer om het hebben van de nieuwste spullen, maar om het creëren van een leven dat echt bij je past."

Deze mentaliteitsverandering heeft concrete gevolgen. Belgische ${audience.primary} selecteren zorgvuldiger welke hulpmiddelen ze in hun leven toelaten. Ze stellen andere vragen: niet 'wat kan dit?' maar 'helpt dit me om te worden wie ik wil zijn?'

Kevin Morales, net afgestudeerd econoom uit Antwerpen, illustreert dit perfect. "Mijn ouders kochten vroeger gewoon het goedkoopste dat werkte, of juist het duurste omdat dat het beste moest zijn," vertelt hij. "Ik kijk veel meer naar hoe verschillende dingen met elkaar samenwerken en of ze me helpen om gefocust te blijven op wat belangrijk is."

Deze houding heeft ook de aandacht getrokken van bedrijven. Waar tech-merken zoals ${brand.name} vroeger vooral focusten op specs en features, moeten ze nu veel meer nadenken over hoe hun producten passen in de bredere levensstijl van gebruikers.

Het interessante is dat deze trend niet beperkt blijft tot individuele keuzes. Belgische onderwijsinstellingen passen hun aanpak aan, werkgevers heroverwegen hun digitale werkplekken, en zelfs beleidsmakers beginnen na te denken over de implicaties van deze verschuiving.

"Het gaat uiteindelijk om intentionaliteit," zegt Emma Hendriks, masterstudent psychologie aan de KU Leuven. "Elke keuze die ik maak, doe ik bewust. Ik vraag mezelf af: brengt dit me dichter bij mijn doelen, of leidt het me juist af?"

Deze filosofie begint door te werken in verschillende aspecten van het Belgische leven. In studentenhuizen ontstaan nieuwe afspraken over technologie-gebruik. Gezinnen experimenteren met manieren om rustiger samen te leven. Werkplekken herontwerken hun digitale infrastructuur om echt ondersteunend te zijn.

Prof. dr. Joep Fransen van het Vlaams Instituut voor Onderzoek ziet in deze ontwikkeling iets typisch Belgisch. "We hebben altijd gehouden van pragmatische oplossingen," observeert hij. "Wat we nu zien is een nieuwe vorm van Belgische praktische wijsheid, toegepast op de digitale wereld."

De gevolgen reiken verder dan technologiekeuzes alleen. Belgische ${audience.primary} herdefiniëren wat productiviteit betekent, hoe succes eruitziet, en wat een goed leven inhoudt. Ze kiezen bewust voor eenvoud boven complexiteit, voor focus boven afleiding.

Voor bedrijven betekent dit een fundamentele verschuiving. Succesvolle spelers zoals ${brand.name} moeten niet alleen excellente producten maken, maar ook begrijpen hoe deze passen in de bredere levensverhalen van hun gebruikers.

De komende jaren zal deze trend waarschijnlijk alleen maar sterker worden, met mogelijk verstrekkende gevolgen voor hoe we als samenleving omgaan met technologie, werk, en welzijn. Het is een verhaal dat nog maar net begonnen is.`;
}

function generateFrenchStoryArticle(brief: ContentBrief): { title: string; content: string } {
  const { storyline, brand, audience, seo } = brief;
  
  const title = `Comment les ${audience.primary} français réinventent leur quotidien`;
  
  const content = `Dans un café parisien du 11ème arrondissement, Claire Dubois observe avec attention les habitudes de sa génération. À 26 ans, cette consultante en communication a remarqué que ses amis et elle abordent différemment leur relation à la technologie par rapport à leurs aînés.

Cette observation personnelle reflète en réalité un phénomène plus large qui touche les ${audience.primary} à travers la France. Une transformation silencieuse mais profonde de la façon dont ils organisent leur quotidien, choisissent leurs outils, et définissent leurs priorités.

Dr. Antoine Moreau, sociologue à la Sorbonne, étudie cette évolution comportementale depuis plusieurs années. "Nous assistons à un changement générationnel majeur dans l'approche française de la technologie," explique-t-il dans son bureau universitaire. "Les jeunes adultes ne subissent plus leurs outils, ils les choisissent consciemment."

Cette mentalité nouvelle se manifeste dans des choix très concrets. Les ${audience.primary} français privilégient désormais la cohérence d'ensemble plutôt que la performance individuelle de chaque appareil. Ils recherchent des solutions qui s'intègrent harmonieusement dans leur mode de vie.

"J'ai grandi en accumulant les gadgets," raconte Thomas Leclerc, étudiant en master à Lyon. "Maintenant, je me demande toujours si quelque chose va vraiment améliorer ma vie avant de l'acheter. C'est une approche complètement différente."

Cette évolution n'échappe pas aux entreprises. Des marques comme ${brand.name} adaptent leur stratégie pour répondre à cette demande d'intégration réfléchie plutôt que d'innovation pure. L'enjeu n'est plus de proposer la technologie la plus avancée, mais celle qui s'adapte le mieux au projet de vie des utilisateurs.

L'impact de ce changement dépasse le cadre de la consommation individuelle. Les universités françaises repensent leurs espaces d'apprentissage, les entreprises questionnent leur équipement numérique, et même les politiques publiques commencent à intégrer cette nouvelle donne.

Marie Fontaine, qui termine ses études à Sciences Po, résume cette philosophie : "Il s'agit de reprendre le contrôle de son temps et de son attention. Chaque choix technologique devient un choix de vie."

Cette approche consciente redéfinit progressivement les standards français en matière de qualité de vie, de productivité et de bien-être numérique. Elle annonce peut-être l'émergence d'un nouveau modèle français de relation à la technologie, plus réfléchi et plus humaniste.`;
  
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