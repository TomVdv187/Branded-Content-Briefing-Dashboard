// Complete workflow test for OnePlus briefing
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
•    Gezinnen

Détails Bestelbon
•    Lengte: ± 4.000 tekens
•    Budget: 5000 €
•    Geschreven door ons team op basis van OnePlus-briefing
•    Garantie: minimaal 2.000 pageviews
•    Online aanwezigheid: minimaal 4 weken
•    Trafficgeneratie: via infeed-formats binnen ons netwerk
•    Hosting: artikel wordt geplaatst op de website van Sudinfo`;

console.log('🧪 TESTING COMPLETE WORKFLOW: Copy-Paste → Auto-Fill → Generate\n');

// Step 1: Parse the briefing (simulates auto-fill)
console.log('📋 STEP 1: Auto-filling form from briefing...');
try {
  const parsedBrief = parseRealWorldBriefing(onePlusBriefing);
  
  console.log('✅ Form Auto-Fill Results:');
  console.log('- Brand Name:', parsedBrief.brand.name);
  console.log('- Storyline:', parsedBrief.storyline);
  console.log('- Primary Audience:', parsedBrief.audience.primary);
  console.log('- Language Detected:', parsedBrief.audience.locale);
  console.log('- Primary Keyword:', parsedBrief.seo.primary_keyword);
  console.log('- Secondary Keywords:', parsedBrief.seo.secondary_keywords.join(', '));
  console.log('- Platforms:', parsedBrief.platforms.join(', '));
  console.log('');

  // Step 2: Generate content
  console.log('🚀 STEP 2: Generating content...');
  const generatedContent = generateContent(parsedBrief);
  
  if (generatedContent.article) {
    console.log('✅ Content Generation Results:');
    console.log('📰 ARTICLE GENERATED:\n');
    console.log('TITEL:', generatedContent.article.title);
    console.log('\n' + '='.repeat(60));
    console.log(generatedContent.article.content);
    console.log('='.repeat(60) + '\n');
    
    // Quality Assessment
    const content = generatedContent.article.content;
    const title = generatedContent.article.title;
    
    console.log('🔍 QUALITY ASSESSMENT:');
    
    // Language check
    const isDutch = (content.includes('Nederlandse') || content.includes('bedrijf') || 
                    content.includes('consumenten') || content.includes('markt') ||
                    title.includes('OnePlus') && (title.includes('lanceert') || title.includes('Nederlandse')));
    
    // Format check
    const noBullets = !content.includes('•') && !content.includes('**') && 
                     !content.includes('- ') && !content.includes('1.') && !content.includes('2.');
    
    // Content quality
    const isFlowing = content.split('.').length > 15; // Many sentences = flowing narrative
    const hasQuotes = content.includes('"') || content.includes('aldus') || content.includes('volgens');
    const hasData = content.includes('%') || content.includes('ROI') || content.includes('onderzoek');
    const properLength = content.length > 2000 && content.length < 8000; // Newspaper article length
    
    // Newspaper standards
    const hasNewsStructure = content.includes('heeft aangekondigd') || content.includes('volgens onderzoek');
    const professionalTone = !content.includes('!!') && !content.includes('wow') && !content.includes('amazing');
    
    console.log('- Dutch Language:', isDutch ? '✅ YES' : '❌ NO - Still English!');
    console.log('- No Bullet Points:', noBullets ? '✅ YES' : '❌ NO - Still has lists!'); 
    console.log('- Flowing Narrative:', isFlowing ? '✅ YES' : '❌ NO');
    console.log('- Has Quotes/Data:', hasQuotes ? '✅ YES' : '❌ NO');
    console.log('- Includes Research:', hasData ? '✅ YES' : '❌ NO');
    console.log('- Proper Length:', properLength ? '✅ YES' : `❌ NO (${content.length} chars)`);
    console.log('- News Structure:', hasNewsStructure ? '✅ YES' : '❌ NO');
    console.log('- Professional Tone:', professionalTone ? '✅ YES' : '❌ NO');
    
    const totalScore = [isDutch, noBullets, isFlowing, hasQuotes, hasData, properLength, hasNewsStructure, professionalTone]
      .filter(Boolean).length;
    
    console.log(`\n📊 OVERALL SCORE: ${totalScore}/8`);
    
    if (totalScore >= 7) {
      console.log('🎉 SUCCESS: Ready for newspaper publication!');
    } else if (totalScore >= 5) {
      console.log('⚠️  GOOD: Minor improvements needed');
    } else {
      console.log('❌ FAILED: Major issues - not ready for publication');
    }
    
    // Critical issues
    if (!isDutch) {
      console.log('\n🚨 CRITICAL: Content is still in English! Dutch detection failed.');
    }
    if (!noBullets) {
      console.log('\n🚨 CRITICAL: Content still contains bullet points/lists!');
    }
    
  } else {
    console.log('❌ FAILED: No article content was generated');
  }

} catch (error) {
  console.error('❌ ERROR during workflow:', error.message);
  console.error('Stack:', error.stack);
}

export {};