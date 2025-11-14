#!/usr/bin/env node

/**
 * Manual IndexNow Submission Script
 * 
 * Run this script after deploying or updating content to immediately
 * notify search engines (Bing, Yandex, etc.) about the changes.
 * 
 * Usage:
 *   node scripts/submit-indexnow.js
 *   node scripts/submit-indexnow.js https://eyelovesleep.com/caffeine-sleep
 */

const https = require('https');

// Your IndexNow API Key
const INDEXNOW_KEY = '8f7e9a2b4c1d6e3f5a8b7c9d2e4f6a1b';

// Your website base URL
const BASE_URL = process.env.SITE_URL || 'https://eyelovesleep.com';

// All pages to submit (or get from command line)
const allPages = [
  BASE_URL,
  `${BASE_URL}/caffeine-sleep`,
  `${BASE_URL}/jet-lag`
];

// Get URLs from command line or use all pages
const urlsToSubmit = process.argv.slice(2).length > 0 
  ? process.argv.slice(2) 
  : allPages;

console.log('\n🚀 IndexNow Submission Tool\n');
console.log('📝 Submitting URLs to search engines...\n');

// Prepare the request
const host = new URL(urlsToSubmit[0]).host;
const data = JSON.stringify({
  host: host,
  key: INDEXNOW_KEY,
  keyLocation: `https://${host}/${INDEXNOW_KEY}.txt`,
  urlList: urlsToSubmit
});

const options = {
  hostname: 'api.indexnow.org',
  port: 443,
  path: '/indexnow',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
    'Content-Length': Buffer.byteLength(data)
  }
};

console.log('📤 URLs to submit:');
urlsToSubmit.forEach((url, index) => {
  console.log(`   ${index + 1}. ${url}`);
});
console.log('');

// Make the request
const req = https.request(options, (res) => {
  let responseData = '';

  res.on('data', (chunk) => {
    responseData += chunk;
  });

  res.on('end', () => {
    if (res.statusCode === 200 || res.statusCode === 202) {
      console.log('✅ SUCCESS! URLs submitted to IndexNow');
      console.log('\n📊 Search engines notified:');
      console.log('   • Bing');
      console.log('   • Yandex');
      console.log('   • Naver');
      console.log('   • Seznam.cz');
      console.log('   • Yep');
      console.log('\n⏱️  Indexing should happen within:');
      console.log('   • Bing: Minutes to hours');
      console.log('   • Yandex: Minutes to hours');
      console.log('   • Others: Hours to 1 day');
      console.log('\n📋 Next steps:');
      console.log('   1. Wait 1-2 hours');
      console.log('   2. Check Bing: site:eyelovesleep.com');
      console.log('   3. Monitor Bing Webmaster Tools');
      console.log('\n✨ Done!\n');
    } else {
      console.error(`❌ Error: HTTP ${res.statusCode}`);
      if (responseData) {
        console.error(`Response: ${responseData}`);
      }
      console.log('\n💡 Troubleshooting:');
      console.log('   1. Verify key file exists: https://eyelovesleep.com/8f7e9a2b4c1d6e3f5a8b7c9d2e4f6a1b.txt');
      console.log('   2. Check if URLs are accessible');
      console.log('   3. Try again in a few minutes');
      console.log('');
      process.exit(1);
    }
  });
});

req.on('error', (error) => {
  console.error('❌ Request failed:', error.message);
  console.log('\n💡 Check your internet connection and try again.\n');
  process.exit(1);
});

// Send the request
req.write(data);
req.end();
