#!/usr/bin/env node

/**
 * Generate Static HTML Pages for SEO
 * 
 * Creates separate HTML files for each calculator section with correct meta tags.
 * This ensures search engines see unique content for each URL.
 * 
 * Run after build: node scripts/generate-static-pages.js
 */

const fs = require('fs');
const path = require('path');

const distDir = path.join(__dirname, '..', 'dist');
const indexPath = path.join(distDir, 'index.html');

// SEO data for each page
const pages = {
  'index.html': {
    title: 'Sleep Calculator - Calculate Best Bedtime & Wake Time | 90-Minute Sleep Cycles | EyeLoveSleep',
    description: 'Free sleep calculator based on 90-minute sleep cycles. Calculate optimal bedtime and wake time to feel refreshed. Avoid sleep inertia with our science-based sleep cycle calculator. Get personalized sleep schedule recommendations instantly.',
    keywords: 'sleep calculator, bedtime calculator, wake time calculator, sleep cycles, 90 minute sleep cycle, REM sleep, best time to sleep, sleep schedule calculator, sleep cycle calculator, when to go to bed, optimal bedtime, sleep inertia, circadian rhythm calculator, sleep hygiene, deep sleep calculator, light sleep, wake up refreshed',
    url: 'https://eyelovesleep.com',
    canonical: 'https://eyelovesleep.com',
    ogImage: 'https://eyelovesleep.com/og-sleep-calculator.png',
    section: 'sleep',
    schemaName: 'Sleep Calculator'
  },
  'caffeine-sleep.html': {
    title: 'Caffeine & Sleep Calculator - When to Stop Drinking Coffee for Better Sleep | EyeLoveSleep',
    description: 'Free caffeine sleep calculator. Track caffeine intake and discover optimal bedtime based on caffeine half-life. Calculate how coffee, tea, and energy drinks affect your sleep quality. Science-based recommendations for caffeine cutoff times.',
    keywords: 'caffeine calculator, caffeine and sleep, caffeine half life, coffee and sleep, when to stop drinking coffee, caffeine metabolism, caffeine bedtime calculator, coffee sleep impact, energy drink sleep, tea caffeine content, how caffeine affects sleep, caffeine cutoff time, sleep quality caffeine, decaf switch time',
    url: 'https://eyelovesleep.com/caffeine-sleep',
    canonical: 'https://eyelovesleep.com/caffeine-sleep',
    ogImage: 'https://eyelovesleep.com/og-caffeine-calculator.png',
    section: 'caffeine',
    schemaName: 'Caffeine & Sleep Calculator'
  },
  'jet-lag.html': {
    title: 'Jet Lag Calculator - Beat Jet Lag Fast | Time Zone Adjustment Plan | EyeLoveSleep',
    description: 'Advanced jet lag calculator with personalized adjustment plans. Calculate recovery time, get day-by-day sleep schedules, and beat jet lag faster. Works for eastward and westward travel across all time zones. Free jet lag remedy tool.',
    keywords: 'jet lag calculator, beat jet lag, time zone adjustment, jet lag remedy, jet lag cure, travel sleep tips, jet lag recovery, circadian rhythm adjustment, jet lag prevention, eastward travel jet lag, westward travel jet lag, time zone calculator, international travel sleep, jet lag symptoms, how to avoid jet lag, jet lag treatment, melatonin for jet lag, light therapy jet lag',
    url: 'https://eyelovesleep.com/jet-lag',
    canonical: 'https://eyelovesleep.com/jet-lag',
    ogImage: 'https://eyelovesleep.com/og-jet-lag-calculator.png',
    section: 'jetlag',
    schemaName: 'Jet Lag Calculator'
  }
};

/**
 * Replace meta tags in HTML with correct values
 */
function updateMetaTags(html, pageData) {
  let updated = html;
  
  // Update title
  updated = updated.replace(
    /<title>.*?<\/title>/,
    `<title>${pageData.title}</title>`
  );
  
  // Update description
  updated = updated.replace(
    /<meta name="description" content=".*?">/,
    `<meta name="description" content="${pageData.description}">`
  );
  
  // Update keywords
  updated = updated.replace(
    /<meta name="keywords" content=".*?">/,
    `<meta name="keywords" content="${pageData.keywords}">`
  );
  
  // Update canonical
  updated = updated.replace(
    /<link rel="canonical" href=".*?">/,
    `<link rel="canonical" href="${pageData.canonical}">`
  );
  
  // Update Open Graph title
  updated = updated.replace(
    /<meta property="og:title" content=".*?">/,
    `<meta property="og:title" content="${pageData.title}">`
  );
  
  // Update Open Graph description
  updated = updated.replace(
    /<meta property="og:description" content=".*?">/,
    `<meta property="og:description" content="${pageData.description}">`
  );
  
  // Update Open Graph URL
  updated = updated.replace(
    /<meta property="og:url" content=".*?">/,
    `<meta property="og:url" content="${pageData.url}">`
  );
  
  // Update Open Graph image
  updated = updated.replace(
    /<meta property="og:image" content=".*?">/,
    `<meta property="og:image" content="${pageData.ogImage}">`
  );
  
  // Update Twitter title
  updated = updated.replace(
    /<meta name="twitter:title" content=".*?">/,
    `<meta name="twitter:title" content="${pageData.title}">`
  );
  
  // Update Twitter description
  updated = updated.replace(
    /<meta name="twitter:description" content=".*?">/,
    `<meta name="twitter:description" content="${pageData.description}">`
  );
  
  // Update Twitter image
  updated = updated.replace(
    /<meta name="twitter:image" content=".*?">/,
    `<meta name="twitter:image" content="${pageData.ogImage}">`
  );
  
  return updated;
}

/**
 * Add inline script to set initial active section
 */
function addInitialSectionScript(html, section) {
  // Add script right after opening body tag to set initial state
  const script = `
  <script>
    // Set initial section based on URL - runs before React hydrates
    window.__INITIAL_SECTION__ = '${section}';
  </script>`;
  
  return html.replace('<div id="root"></div>', `${script}\n  <div id="root"></div>`);
}

/**
 * Main generation function
 */
function generatePages() {
  console.log('🚀 Generating static HTML pages for SEO...\n');
  
  // Check if dist directory exists
  if (!fs.existsSync(distDir)) {
    console.error('❌ Error: dist directory not found. Run "npm run build" first.');
    process.exit(1);
  }
  
  // Check if index.html exists
  if (!fs.existsSync(indexPath)) {
    console.error('❌ Error: dist/index.html not found. Run "npm run build" first.');
    process.exit(1);
  }
  
  // Read base index.html
  const baseHtml = fs.readFileSync(indexPath, 'utf-8');
  console.log('✅ Read base index.html\n');
  
  // Generate each page
  Object.entries(pages).forEach(([filename, pageData]) => {
    console.log(`📝 Generating ${filename}...`);
    
    // Update meta tags
    let pageHtml = updateMetaTags(baseHtml, pageData);
    
    // Add initial section script
    pageHtml = addInitialSectionScript(pageHtml, pageData.section);
    
    // Write to file
    const outputPath = path.join(distDir, filename);
    fs.writeFileSync(outputPath, pageHtml, 'utf-8');
    
    console.log(`   ✅ Created: ${outputPath}`);
    console.log(`   📄 Title: ${pageData.title.substring(0, 60)}...`);
    console.log(`   🔗 URL: ${pageData.url}\n`);
  });
  
  console.log('✨ Static page generation complete!\n');
  console.log('📊 Summary:');
  console.log(`   Total pages: ${Object.keys(pages).length}`);
  console.log(`   Location: ${distDir}`);
  console.log('\n🔍 Test with:');
  console.log('   curl -s http://localhost:4173/caffeine-sleep | grep "<title>"');
  console.log('   curl -s http://localhost:4173/jet-lag | grep "<title>"');
  console.log('\n🚀 Next steps:');
  console.log('   1. Test locally: npm run preview');
  console.log('   2. Verify meta tags with View Source (Ctrl+U)');
  console.log('   3. Deploy to production');
  console.log('   4. Submit updated sitemap to Google Search Console');
}

// Run generation
try {
  generatePages();
} catch (error) {
  console.error('❌ Error generating pages:', error.message);
  process.exit(1);
}
