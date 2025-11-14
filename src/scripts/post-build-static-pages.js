#!/usr/bin/env node

/**
 * Post-Build: Generate Static HTML Pages for SEO
 * 
 * This script runs AFTER the Vite build to create static HTML files
 * for each route with proper meta tags for search engine crawling.
 * 
 * Run: node scripts/post-build-static-pages.js
 */

const fs = require('fs');
const path = require('path');

const distDir = path.join(__dirname, '..', 'dist');
const indexPath = path.join(distDir, 'index.html');

// SEO data for each page
const pages = {
  'caffeine-sleep.html': {
    title: 'Caffeine & Sleep Calculator - When to Stop Drinking Coffee for Better Sleep | EyeLoveSleep',
    description: 'Free caffeine sleep calculator. Track caffeine intake and discover optimal bedtime based on caffeine half-life. Calculate how coffee, tea, and energy drinks affect your sleep quality. Science-based recommendations for caffeine cutoff times.',
    keywords: 'caffeine calculator, caffeine and sleep, caffeine half life, coffee and sleep, when to stop drinking coffee, caffeine metabolism, caffeine bedtime calculator, coffee sleep impact, energy drink sleep, tea caffeine content, how caffeine affects sleep, caffeine cutoff time, sleep quality caffeine, decaf switch time',
    url: 'https://eyelovesleep.com/caffeine-sleep',
    canonical: 'https://eyelovesleep.com/caffeine-sleep',
    ogImage: 'https://eyelovesleep.com/og-caffeine-calculator.png',
    ogTitle: 'Caffeine & Sleep Calculator - When to Stop Drinking Coffee for Better Sleep | EyeLoveSleep',
    twitterTitle: 'Caffeine & Sleep Calculator - When to Stop Drinking Coffee | EyeLoveSleep',
  },
  'jet-lag.html': {
    title: 'Jet Lag Calculator - Beat Jet Lag Fast | Time Zone Adjustment Plan | EyeLoveSleep',
    description: 'Advanced jet lag calculator with personalized adjustment plans. Calculate recovery time, get day-by-day sleep schedules, and beat jet lag faster. Works for eastward and westward travel across all time zones. Free jet lag remedy tool.',
    keywords: 'jet lag calculator, beat jet lag, time zone adjustment, jet lag remedy, jet lag cure, travel sleep tips, jet lag recovery, circadian rhythm adjustment, jet lag prevention, eastward travel jet lag, westward travel jet lag, time zone calculator, international travel sleep, jet lag symptoms, how to avoid jet lag, jet lag treatment, melatonin for jet lag, light therapy jet lag',
    url: 'https://eyelovesleep.com/jet-lag',
    canonical: 'https://eyelovesleep.com/jet-lag',
    ogImage: 'https://eyelovesleep.com/og-jet-lag-calculator.png',
    ogTitle: 'Jet Lag Calculator - Beat Jet Lag Fast | Time Zone Adjustment Plan | EyeLoveSleep',
    twitterTitle: 'Jet Lag Calculator - Beat Jet Lag Fast | EyeLoveSleep',
  }
};

/**
 * Update meta tags in HTML content
 */
function updateMetaTags(html, pageData) {
  let updated = html;
  
  // Update title
  updated = updated.replace(
    /<title>.*?<\/title>/,
    `<title>${pageData.title}</title>`
  );
  
  // Update or add description
  if (updated.includes('<meta name="description"')) {
    updated = updated.replace(
      /<meta name="description" content=".*?">/,
      `<meta name="description" content="${pageData.description}">`
    );
  } else {
    updated = updated.replace(
      /<meta name="viewport".*?>/,
      `$&\n  <meta name="description" content="${pageData.description}">`
    );
  }
  
  // Update or add keywords
  if (updated.includes('<meta name="keywords"')) {
    updated = updated.replace(
      /<meta name="keywords" content=".*?">/,
      `<meta name="keywords" content="${pageData.keywords}">`
    );
  } else {
    updated = updated.replace(
      /<meta name="description".*?>/,
      `$&\n  <meta name="keywords" content="${pageData.keywords}">`
    );
  }
  
  // Update or add canonical
  if (updated.includes('<link rel="canonical"')) {
    updated = updated.replace(
      /<link rel="canonical" href=".*?">/,
      `<link rel="canonical" href="${pageData.canonical}">`
    );
  } else {
    updated = updated.replace(
      /<meta name="keywords".*?>/,
      `$&\n  <link rel="canonical" href="${pageData.canonical}">`
    );
  }
  
  // Update Open Graph title
  if (updated.includes('property="og:title"')) {
    updated = updated.replace(
      /<meta property="og:title" content=".*?">/,
      `<meta property="og:title" content="${pageData.ogTitle}">`
    );
  } else {
    updated = updated.replace(
      /<link rel="canonical".*?>/,
      `$&\n  <meta property="og:title" content="${pageData.ogTitle}">`
    );
  }
  
  // Update Open Graph description
  if (updated.includes('property="og:description"')) {
    updated = updated.replace(
      /<meta property="og:description" content=".*?">/,
      `<meta property="og:description" content="${pageData.description}">`
    );
  } else {
    updated = updated.replace(
      /<meta property="og:title".*?>/,
      `$&\n  <meta property="og:description" content="${pageData.description}">`
    );
  }
  
  // Update Open Graph URL
  if (updated.includes('property="og:url"')) {
    updated = updated.replace(
      /<meta property="og:url" content=".*?">/,
      `<meta property="og:url" content="${pageData.url}">`
    );
  } else {
    updated = updated.replace(
      /<meta property="og:description".*?>/,
      `$&\n  <meta property="og:url" content="${pageData.url}">`
    );
  }
  
  // Update Open Graph image
  if (updated.includes('property="og:image"')) {
    updated = updated.replace(
      /<meta property="og:image" content=".*?">/,
      `<meta property="og:image" content="${pageData.ogImage}">`
    );
  } else {
    updated = updated.replace(
      /<meta property="og:url".*?>/,
      `$&\n  <meta property="og:image" content="${pageData.ogImage}">`
    );
  }
  
  // Update Twitter title
  if (updated.includes('name="twitter:title"')) {
    updated = updated.replace(
      /<meta name="twitter:title" content=".*?">/,
      `<meta name="twitter:title" content="${pageData.twitterTitle}">`
    );
  } else {
    updated = updated.replace(
      /<meta property="og:image".*?>/,
      `$&\n  <meta name="twitter:title" content="${pageData.twitterTitle}">`
    );
  }
  
  // Update Twitter description
  if (updated.includes('name="twitter:description"')) {
    updated = updated.replace(
      /<meta name="twitter:description" content=".*?">/,
      `<meta name="twitter:description" content="${pageData.description}">`
    );
  } else {
    updated = updated.replace(
      /<meta name="twitter:title".*?>/,
      `$&\n  <meta name="twitter:description" content="${pageData.description}">`
    );
  }
  
  // Update Twitter image
  if (updated.includes('name="twitter:image"')) {
    updated = updated.replace(
      /<meta name="twitter:image" content=".*?">/,
      `<meta name="twitter:image" content="${pageData.ogImage}">`
    );
  } else {
    updated = updated.replace(
      /<meta name="twitter:description".*?>/,
      `$&\n  <meta name="twitter:image" content="${pageData.ogImage}">`
    );
  }
  
  return updated;
}

/**
 * Main generation function
 */
function generateStaticPages() {
  console.log('🚀 Generating static HTML pages for SEO...\n');
  
  // Check if dist directory exists
  if (!fs.existsSync(distDir)) {
    console.error('❌ Error: dist directory not found. Run build first.');
    process.exit(1);
  }
  
  // Check if index.html exists
  if (!fs.existsSync(indexPath)) {
    console.error('❌ Error: dist/index.html not found. Run build first.');
    process.exit(1);
  }
  
  // Read base index.html
  const baseHtml = fs.readFileSync(indexPath, 'utf-8');
  console.log('✅ Read dist/index.html\n');
  
  // Generate each page
  let successCount = 0;
  Object.entries(pages).forEach(([filename, pageData]) => {
    console.log(`📝 Generating ${filename}...`);
    
    try {
      // Update meta tags
      const pageHtml = updateMetaTags(baseHtml, pageData);
      
      // Write to file
      const outputPath = path.join(distDir, filename);
      fs.writeFileSync(outputPath, pageHtml, 'utf-8');
      
      console.log(`   ✅ Created: ${outputPath}`);
      console.log(`   📄 Title: ${pageData.title.substring(0, 60)}...`);
      console.log(`   🔗 URL: ${pageData.url}\n`);
      
      successCount++;
    } catch (error) {
      console.error(`   ❌ Error creating ${filename}:`, error.message);
    }
  });
  
  console.log('✨ Static page generation complete!\n');
  console.log('📊 Summary:');
  console.log(`   Total pages: ${Object.keys(pages).length}`);
  console.log(`   Successfully created: ${successCount}`);
  console.log(`   Location: ${distDir}\n`);
  
  if (successCount === Object.keys(pages).length) {
    console.log('✅ All static pages created successfully!\n');
    console.log('🔍 Verify with:');
    console.log('   1. Check dist/ folder for .html files');
    console.log('   2. Run: npm run preview');
    console.log('   3. View source (Ctrl+U) on each page\n');
  } else {
    console.warn('⚠️  Some pages failed to generate. Check errors above.\n');
    process.exit(1);
  }
}

// Run generation
try {
  generateStaticPages();
} catch (error) {
  console.error('❌ Fatal error:', error.message);
  process.exit(1);
}
