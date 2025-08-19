import { ContentBrief } from '../types';

/**
 * Storytelling Content Generator
 * Creates educational, engaging narratives that happen to involve brands
 * Focus on human stories, trends, insights - not promotion
 */

export function generateStorytellingArticle(brief: ContentBrief, language: string = 'nl'): { title: string; content: string } {
  if (language.startsWith('nl')) {
    return generateDutchStoryArticle(brief);
  } else if (language.startsWith('fr')) {
    return generateFrenchStoryArticle(brief);
  } else {
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