// Test script for Dutch newspaper-quality content generation
import { parseBriefingToStructuredJSON } from './app/utils/briefingParser.js';
import { generateContent } from './app/utils/contentGenerator.js';

// Test briefing in Dutch
const dutchBriefing = `
Briefing voor nieuwsartikel:
Bedrijf: TechnoloVibe Nederland
Onderwerp: Digitale transformatie in Nederlandse mkb-bedrijven
Doelgroep: Nederlandse ondernemers en bedrijfsleiders
Taal: Nederlands
Platform: nieuwsartikel voor zakelijke krant
Hoek: onderzoek en marktanalyse
SEO woorden: digitale transformatie, Nederlandse bedrijven, mkb, technologie
Tone: professioneel, zakelijk, informatief
`;

console.log('🧪 Testing Dutch newspaper content generation...\n');

try {
  // Parse the briefing
  const brief = parseBriefingToStructuredJSON(dutchBriefing);
  console.log('✅ Briefing parsed successfully:');
  console.log('- Brand:', brief.brand.name);
  console.log('- Locale:', brief.audience.locale);
  console.log('- Storyline:', brief.storyline);
  console.log('- Primary audience:', brief.audience.primary);
  console.log('');

  // Generate content
  const content = generateContent(brief);
  
  if (content.article) {
    console.log('🗞️ Generated Dutch newspaper article:');
    console.log('=====================================\n');
    console.log('HEADLINE:', content.article.title);
    console.log('\nARTICLE BODY:');
    console.log(content.article.content);
    console.log('\n=====================================');
    console.log('✅ Content generated successfully!');
    
    // Verify it's proper Dutch content
    const isDutchContent = content.article.content.includes('Nederlandse') && 
                          content.article.content.includes('bedrijven') &&
                          !content.article.content.includes('•') &&
                          !content.article.content.includes('**');
    
    console.log('\n📊 Content Quality Check:');
    console.log('- Contains Dutch text:', isDutchContent ? '✅' : '❌');
    console.log('- No bullet points:', !content.article.content.includes('•') ? '✅' : '❌');
    console.log('- Newspaper style:', content.article.content.length > 1000 ? '✅' : '❌');
    console.log('- Professional tone:', content.article.content.includes('analyse') ? '✅' : '❌');
  } else {
    console.log('❌ Failed to generate article content');
  }

} catch (error) {
  console.error('❌ Error during content generation:', error);
}