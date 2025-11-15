#!/usr/bin/env node

/**
 * Generate OG Images from HTML Templates
 * 
 * This script automatically creates PNG images from HTML templates
 * for social media sharing (Open Graph images).
 * 
 * Usage:
 *   npm install --save-dev puppeteer
 *   node scripts/generate-og-images.js
 */

const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

// Configuration
const OG_IMAGE_WIDTH = 1200;
const OG_IMAGE_HEIGHT = 630;

const templates = [
  {
    name: 'Sleep Calculator',
    input: 'public/og-templates/sleep-calculator-og.html',
    output: 'public/og-sleep-calculator.png',
  },
  {
    name: 'Caffeine Calculator',
    input: 'public/og-templates/caffeine-calculator-og.html',
    output: 'public/og-caffeine-calculator.png',
  },
  {
    name: 'Jet Lag Calculator',
    input: 'public/og-templates/jet-lag-calculator-og.html',
    output: 'public/og-jet-lag-calculator.png',
  },
];

/**
 * Generate PNG from HTML template
 */
async function generateOGImage(templatePath, outputPath, name) {
  console.log(`\n📸 Generating OG image: ${name}`);
  console.log(`   Input:  ${templatePath}`);
  console.log(`   Output: ${outputPath}`);

  // Check if template exists
  if (!fs.existsSync(templatePath)) {
    console.error(`   ❌ Template not found: ${templatePath}`);
    return false;
  }

  try {
    // Launch browser
    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });

    const page = await browser.newPage();

    // Set viewport to exact OG image dimensions
    await page.setViewport({
      width: OG_IMAGE_WIDTH,
      height: OG_IMAGE_HEIGHT,
      deviceScaleFactor: 2, // 2x for retina displays (sharper text)
    });

    // Load HTML template
    const templateFullPath = path.resolve(process.cwd(), templatePath);
    await page.goto(`file://${templateFullPath}`, {
      waitUntil: 'networkidle0', // Wait for all resources to load
    });

    // Wait a bit for animations to settle
    await page.waitForTimeout(1000);

    // Take screenshot
    const outputFullPath = path.resolve(process.cwd(), outputPath);
    await page.screenshot({
      path: outputFullPath,
      type: 'png',
      clip: {
        x: 0,
        y: 0,
        width: OG_IMAGE_WIDTH,
        height: OG_IMAGE_HEIGHT,
      },
    });

    await browser.close();

    // Check file size
    const stats = fs.statSync(outputFullPath);
    const fileSizeKB = (stats.size / 1024).toFixed(2);

    console.log(`   ✅ Success! File size: ${fileSizeKB} KB`);

    if (stats.size > 500 * 1024) {
      console.log(`   ⚠️  Warning: File size > 500 KB. Consider optimizing.`);
    }

    return true;
  } catch (error) {
    console.error(`   ❌ Error generating image: ${error.message}`);
    return false;
  }
}

/**
 * Main function
 */
async function main() {
  console.log('\n╔══════════════════════════════════════════════════════════════════╗');
  console.log('║                                                                  ║');
  console.log('║              🎨 OG Image Generator for EyeLoveSleep              ║');
  console.log('║                                                                  ║');
  console.log('╚══════════════════════════════════════════════════════════════════╝\n');

  console.log('📋 Configuration:');
  console.log(`   Dimensions: ${OG_IMAGE_WIDTH}x${OG_IMAGE_HEIGHT}px`);
  console.log(`   Templates:  ${templates.length}`);
  console.log(`   Format:     PNG (2x scale for retina)`);

  // Check if Puppeteer is installed
  try {
    require.resolve('puppeteer');
  } catch (error) {
    console.error('\n❌ Error: Puppeteer not installed!');
    console.error('\nPlease install it first:');
    console.error('   npm install --save-dev puppeteer');
    console.error('\nThen run this script again:');
    console.error('   node scripts/generate-og-images.js\n');
    process.exit(1);
  }

  // Ensure output directory exists
  const publicDir = path.resolve(process.cwd(), 'public');
  if (!fs.existsSync(publicDir)) {
    console.error(`\n❌ Error: public/ directory not found!`);
    console.error('   Make sure you are running this from the project root.\n');
    process.exit(1);
  }

  // Generate all images
  let successCount = 0;
  let failCount = 0;

  for (const template of templates) {
    const success = await generateOGImage(
      template.input,
      template.output,
      template.name
    );

    if (success) {
      successCount++;
    } else {
      failCount++;
    }
  }

  // Summary
  console.log('\n' + '═'.repeat(68));
  console.log('\n📊 Generation Summary:');
  console.log(`   ✅ Successful: ${successCount}/${templates.length}`);
  
  if (failCount > 0) {
    console.log(`   ❌ Failed:     ${failCount}/${templates.length}`);
  }

  if (successCount === templates.length) {
    console.log('\n🎉 All OG images generated successfully!');
    console.log('\n📁 Generated files:');
    templates.forEach(t => {
      console.log(`   • ${t.output}`);
    });
    console.log('\n✅ Next steps:');
    console.log('   1. Verify images look good (open in image viewer)');
    console.log('   2. Optimize if needed: https://tinypng.com');
    console.log('   3. Build: npm run build');
    console.log('   4. Deploy: Upload dist/ folder to server');
    console.log('   5. Test: Facebook Debugger + Twitter Validator');
  } else {
    console.log('\n⚠️  Some images failed to generate.');
    console.log('   Check error messages above and try again.');
  }

  console.log('\n' + '═'.repeat(68) + '\n');
}

// Run script
main().catch(error => {
  console.error('\n❌ Fatal error:', error);
  process.exit(1);
});
