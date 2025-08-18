// Test storytelling transformation with OnePlus briefing
const { parseRealWorldBriefing } = require('./app/utils/enhancedBriefingParser.js');
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
•    Gezinnen`;

console.log('🎭 TESTING STORYTELLING TRANSFORMATION\n');
console.log('From: Promotional briefing');
console.log('To: Educational storytelling content\n');

try {
  const brief = parseRealWorldBriefing(onePlusBriefing);
  const content = generateContent(brief);
  
  if (content.article) {
    console.log('📖 STORYTELLING ARTICLE GENERATED:\n');
    console.log('='.repeat(80));
    console.log('TITEL:', content.article.title);
    console.log('='.repeat(80));
    console.log(content.article.content);
    console.log('='.repeat(80));
    
    // Analysis: Is it storytelling vs promotional?
    console.log('\n🔍 STORYTELLING ANALYSIS:\n');
    
    const title = content.article.title;
    const text = content.article.content;
    
    // Check for promotional language
    const promotional = [
      text.includes('OnePlus heeft aangekondigd'),
      text.includes('lanceert'),
      text.includes('nieuwe strategie'),
      text.includes('marktleider'),
      text.includes('uitbreidt aanbod'),
      title.includes('OnePlus lanceert'),
      title.includes('introduceert'),
      text.includes('woordvoerder van OnePlus')
    ].filter(Boolean).length;
    
    // Check for storytelling elements
    const storytelling = [
      text.includes('Sarah') || text.includes('Emma') || text.includes('Kevin') || text.includes('Lisa'),
      text.includes('vertelt') || text.includes('observeert') || text.includes('ervaart'),
      text.includes('Dr.') || text.includes('Prof.'),
      text.includes('onderzoek') && !text.includes('OnePlus onderzoek'),
      text.includes('studenten') && text.includes('bibliotheek'),
      text.includes('generatie') || text.includes('generationeel'),
      title.includes('Hoe') || title.includes('Waarom') || title.includes('Het verhaal'),
      text.includes('fenomeen') || text.includes('verschuiving') || text.includes('trend'),
      text.includes('huishoudens') || text.includes('gezinnen') && !text.includes('OnePlus gezinnen')
    ].filter(Boolean).length;
    
    // Check for human elements
    const humanElements = [
      text.includes('"') && !text.includes('"OnePlus'),
      text.includes('koffietentje') || text.includes('bibliotheek') || text.includes('huiskamer'),
      text.includes('ochtend') || text.includes('dinsdagochtend'),
      text.includes('vrienden') || text.includes('familie'),
      text.includes('studie') || text.includes('studeren')
    ].filter(Boolean).length;
    
    console.log('📊 Content Analysis:');
    console.log(`- Promotional elements: ${promotional}/8`);
    console.log(`- Storytelling elements: ${storytelling}/9`);
    console.log(`- Human elements: ${humanElements}/5`);
    
    const isEducational = storytelling >= 6;
    const isEngaging = humanElements >= 3;
    const isNotPromotional = promotional <= 2;
    
    console.log('\n✅ Quality Assessment:');
    console.log('- Educational storytelling:', isEducational ? '✅ YES' : '❌ NO');
    console.log('- Engaging human stories:', isEngaging ? '✅ YES' : '❌ NO'); 
    console.log('- Not promotional:', isNotPromotional ? '✅ YES' : '❌ STILL PROMOTIONAL');
    
    if (isEducational && isEngaging && isNotPromotional) {
      console.log('\n🎉 SUCCESS: Transformed to educational storytelling!');
      console.log('✨ This reads like real journalism that people want to read');
      console.log('✨ Brand is mentioned naturally within the story context');
      console.log('✨ Focus is on human insights and societal trends');
    } else {
      console.log('\n⚠️  NEEDS WORK: Still too promotional or not engaging enough');
      if (!isNotPromotional) console.log('❌ Too much brand promotion');
      if (!isEducational) console.log('❌ Not enough storytelling elements');
      if (!isEngaging) console.log('❌ Lacks human/personal stories');
    }
    
    console.log('\n📝 STORY APPROACH:');
    if (text.includes('Dr.') || text.includes('Prof.')) {
      console.log('✅ Uses expert sources for credibility');
    }
    if (text.includes('Sarah') || text.includes('Emma') || text.includes('Kevin')) {
      console.log('✅ Features real human characters');  
    }
    if (text.includes('fenomeen') || text.includes('trend')) {
      console.log('✅ Focuses on societal trends/phenomena');
    }
    if (title.includes('Hoe') || title.includes('Waarom')) {
      console.log('✅ Uses curiosity-driven headlines');
    }
    
  } else {
    console.log('❌ No content generated');
  }

} catch (error) {
  console.error('❌ Error:', error.message);
}

export {};