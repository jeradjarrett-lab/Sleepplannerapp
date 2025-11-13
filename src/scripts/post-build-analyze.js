/**
 * Post-build analysis script
 * Analyzes the build output and reports optimization metrics
 */

const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

console.log('\n📊 Analyzing build output...\n');

const distDir = path.join(__dirname, '..', 'dist');

if (!fs.existsSync(distDir)) {
  console.error('❌ Dist directory not found. Run build first.');
  process.exit(1);
}

// Helper function to get file size
const getFileSize = (filePath) => {
  const stats = fs.statSync(filePath);
  return stats.size;
};

// Helper function to get gzipped size
const getGzipSize = (filePath) => {
  const content = fs.readFileSync(filePath);
  const compressed = zlib.gzipSync(content);
  return compressed.length;
};

// Helper function to get brotli size
const getBrotliSize = (filePath) => {
  const content = fs.readFileSync(filePath);
  const compressed = zlib.brotliCompressSync(content);
  return compressed.length;
};

// Format bytes to human readable
const formatBytes = (bytes) => {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

// Analyze directory recursively
const analyzeDirectory = (dir, fileStats = { js: [], css: [], html: [], other: [] }) => {
  const files = fs.readdirSync(dir, { withFileTypes: true });
  
  files.forEach(file => {
    const filePath = path.join(dir, file.name);
    
    if (file.isDirectory()) {
      analyzeDirectory(filePath, fileStats);
    } else {
      const ext = path.extname(file.name);
      const size = getFileSize(filePath);
      
      const fileInfo = {
        name: path.relative(distDir, filePath),
        size,
        gzip: null,
        brotli: null,
      };
      
      // Only compress text files
      if (['.js', '.css', '.html'].includes(ext)) {
        try {
          fileInfo.gzip = getGzipSize(filePath);
          fileInfo.brotli = getBrotliSize(filePath);
        } catch (e) {
          // Ignore compression errors
        }
      }
      
      if (ext === '.js') {
        fileStats.js.push(fileInfo);
      } else if (ext === '.css') {
        fileStats.css.push(fileInfo);
      } else if (ext === '.html') {
        fileStats.html.push(fileInfo);
      } else {
        fileStats.other.push(fileInfo);
      }
    }
  });
  
  return fileStats;
};

const stats = analyzeDirectory(distDir);

// Calculate totals
const calculateTotal = (files) => {
  return files.reduce((acc, file) => ({
    size: acc.size + file.size,
    gzip: acc.gzip + (file.gzip || 0),
    brotli: acc.brotli + (file.brotli || 0),
  }), { size: 0, gzip: 0, brotli: 0 });
};

// Sort by size
stats.js.sort((a, b) => b.size - a.size);
stats.css.sort((a, b) => b.size - a.size);

// Display results
console.log('═══════════════════════════════════════════════════');
console.log('                 📦 BUNDLE ANALYSIS                ');
console.log('═══════════════════════════════════════════════════\n');

// JavaScript files
if (stats.js.length > 0) {
  console.log('🟨 JavaScript Files:');
  console.log('───────────────────────────────────────────────────');
  stats.js.forEach(file => {
    console.log(`📄 ${file.name}`);
    console.log(`   Raw:     ${formatBytes(file.size)}`);
    if (file.gzip) console.log(`   Gzip:    ${formatBytes(file.gzip)} (${Math.round(file.gzip / file.size * 100)}%)`);
    if (file.brotli) console.log(`   Brotli:  ${formatBytes(file.brotli)} (${Math.round(file.brotli / file.size * 100)}%)`);
    console.log('');
  });
  
  const jsTotal = calculateTotal(stats.js);
  console.log('📊 JavaScript Total:');
  console.log(`   Raw:     ${formatBytes(jsTotal.size)}`);
  console.log(`   Gzip:    ${formatBytes(jsTotal.gzip)}`);
  console.log(`   Brotli:  ${formatBytes(jsTotal.brotli)}`);
  console.log('\n');
}

// CSS files
if (stats.css.length > 0) {
  console.log('🟦 CSS Files:');
  console.log('───────────────────────────────────────────────────');
  stats.css.forEach(file => {
    console.log(`📄 ${file.name}`);
    console.log(`   Raw:     ${formatBytes(file.size)}`);
    if (file.gzip) console.log(`   Gzip:    ${formatBytes(file.gzip)} (${Math.round(file.gzip / file.size * 100)}%)`);
    if (file.brotli) console.log(`   Brotli:  ${formatBytes(file.brotli)} (${Math.round(file.brotli / file.size * 100)}%)`);
    console.log('');
  });
  
  const cssTotal = calculateTotal(stats.css);
  console.log('📊 CSS Total:');
  console.log(`   Raw:     ${formatBytes(cssTotal.size)}`);
  console.log(`   Gzip:    ${formatBytes(cssTotal.gzip)}`);
  console.log(`   Brotli:  ${formatBytes(cssTotal.brotli)}`);
  console.log('\n');
}

// Overall totals
const allFiles = [...stats.js, ...stats.css, ...stats.html];
const overallTotal = calculateTotal(allFiles);

console.log('═══════════════════════════════════════════════════');
console.log('                 📈 OVERALL TOTALS                 ');
console.log('═══════════════════════════════════════════════════');
console.log(`Raw:     ${formatBytes(overallTotal.size)}`);
console.log(`Gzip:    ${formatBytes(overallTotal.gzip)} (${Math.round(overallTotal.gzip / overallTotal.size * 100)}% of raw)`);
console.log(`Brotli:  ${formatBytes(overallTotal.brotli)} (${Math.round(overallTotal.brotli / overallTotal.size * 100)}% of raw)`);
console.log('═══════════════════════════════════════════════════\n');

// Performance recommendations
console.log('💡 Performance Recommendations:\n');

const jsSize = calculateTotal(stats.js).brotli;
const cssSize = calculateTotal(stats.css).brotli;

if (jsSize > 200 * 1024) {
  console.log('⚠️  JavaScript bundle is large (> 200KB compressed)');
  console.log('   Consider: Code splitting, lazy loading, or tree shaking\n');
} else if (jsSize > 150 * 1024) {
  console.log('⚡ JavaScript bundle size is good but could be optimized');
  console.log('   Target: < 150KB compressed\n');
} else {
  console.log('✅ JavaScript bundle size is excellent!\n');
}

if (cssSize > 50 * 1024) {
  console.log('⚠️  CSS bundle is large (> 50KB compressed)');
  console.log('   Consider: Removing unused styles or CSS code splitting\n');
} else {
  console.log('✅ CSS bundle size is excellent!\n');
}

// Check for compression files
const hasGzip = fs.existsSync(path.join(distDir, 'assets')) && 
  fs.readdirSync(path.join(distDir, 'assets')).some(f => f.endsWith('.gz'));
const hasBrotli = fs.existsSync(path.join(distDir, 'assets')) && 
  fs.readdirSync(path.join(distDir, 'assets')).some(f => f.endsWith('.br'));

if (!hasGzip && !hasBrotli) {
  console.log('⚠️  No pre-compressed files found');
  console.log('   Ensure vite-plugin-compression2 is configured\n');
} else {
  if (hasGzip) console.log('✅ Gzip pre-compressed files generated');
  if (hasBrotli) console.log('✅ Brotli pre-compressed files generated');
  console.log('');
}

console.log('🎯 Next steps:');
console.log('   1. Test on real devices and slow connections');
console.log('   2. Run Lighthouse audit');
console.log('   3. Monitor Core Web Vitals in production');
console.log('   4. Consider implementing route-based code splitting\n');

console.log('✨ Build analysis complete!\n');
