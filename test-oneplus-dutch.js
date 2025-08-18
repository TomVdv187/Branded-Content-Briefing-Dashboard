// Test OnePlus Dutch Content Generation
const { parseBriefingToStructuredJSON } = require('./app/utils/briefingParser.js');
const { generateContent } = require('./app/utils/contentGenerator.js');

const onePlusBriefing = `OnePlus – Back to School Campagnevoorstel
Platform: Sudinfo
Campagneperiode: 15 augustus – 15 september 2025
Budget: €5.000 totaal
Productlijn
•    OnePlus Nord 5
•    OnePlus Nord CE5
•    OnePlus Watch 3 (43 mm)
•    OnePlus Pad Lite
•    OnePlus Buds 4
Campagnefocus
•    Back to school-oplossingen voor studenten en gezinnen
•    Blijven verbonden, efficiënt studeren en ontspannen met slimme technologie
Doelstelling
•    Awareness & consideration opbouwen voor het OnePlus-ecosysteem als dé ideale school- en gezinsoplossing
•    Verkeer genereren naar productpagina's en retailpartners
Doelgroep
•    Studenten
•    Jonge professionals
•    Gezinnen

Détails Bestelbon
•    Lengte: ± 4.000 tekens
•    Budget: 5000 €
•    Geschreven door ons team op basis van OnePlus-briefing
•    Garantie: minimaal 2.000 pageviews
•    Online aanwezigheid: minimaal 4 weken
•    Trafficgeneratie: via infeed-formats binnen ons netwerk
•    Hosting: artikel wordt geplaatst op de website van Sudinfo`;

console.log('🧪 Testing OnePlus Dutch Content Generation...\n');

try {
  const brief = parseBriefingToStructuredJSON(onePlusBriefing);
  
  console.log('📋 Parsed Brief:');
  console.log('- Brand:', brief.brand.name);
  console.log('- Storyline:', brief.storyline);
  console.log('- Audience:', brief.audience.primary);
  console.log('- Locale detected:', brief.audience.locale);
  console.log('- Platforms:', brief.platforms);
  console.log('');
  
  const content = generateContent(brief);
  
  if (content.article) {
    console.log('🗞️ Generated Dutch OnePlus Article:');
    console.log('==========================================\n');
    console.log('TITEL:', content.article.title);
    console.log('\nARTIKEL:\n');
    console.log(content.article.content);
    console.log('\n==========================================');
    
    // Quality checks
    const isDutch = content.article.content.includes('Nederlandse') || 
                   content.article.content.includes('bedrijf') ||
                   content.article.content.includes('consumenten');
    
    const noBullets = !content.article.content.includes('•') && 
                     !content.article.content.includes('**') &&
                     !content.article.content.includes('-');
    
    const isFlowing = content.article.content.split('.').length > 10; // Multiple sentences
    
    console.log('\n✅ Quality Check:');
    console.log('- Dutch language:', isDutch ? '✅ YES' : '❌ NO');
    console.log('- No bullet points:', noBullets ? '✅ YES' : '❌ NO'); 
    console.log('- Flowing narrative:', isFlowing ? '✅ YES' : '❌ NO');
    console.log('- Length check:', content.article.content.length > 2000 ? '✅ YES' : '❌ NO');
    
    if (isDutch && noBullets && isFlowing) {
      console.log('\n🎉 SUCCESS: Professional Dutch newspaper article generated!');
    } else {
      console.log('\n❌ FAILED: Article does not meet newspaper standards');
    }
  } else {
    console.log('❌ No article content generated');
  }

} catch (error) {
  console.error('❌ Error:', error.message);
}

export {};