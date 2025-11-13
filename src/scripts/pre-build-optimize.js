/**
 * Pre-build optimization script
 * Run before building to ensure optimal bundle size
 */

const fs = require('fs');
const path = require('path');

console.log('🔧 Running pre-build optimizations...\n');

// 1. Clean dist directory
const distDir = path.join(__dirname, '..', 'dist');
if (fs.existsSync(distDir)) {
  console.log('🧹 Cleaning dist directory...');
  fs.rmSync(distDir, { recursive: true, force: true });
  console.log('✅ Dist directory cleaned\n');
}

// 2. Verify required dependencies
console.log('📦 Verifying dependencies...');
const packageJson = require('../package.json');
const requiredDevDeps = [
  'vite-plugin-compression2',
  'html-minifier-terser',
  'rollup-plugin-visualizer',
];

const missingDeps = requiredDevDeps.filter(dep => 
  !packageJson.devDependencies?.[dep] && !packageJson.dependencies?.[dep]
);

if (missingDeps.length > 0) {
  console.warn('⚠️  Missing optimization dependencies:');
  missingDeps.forEach(dep => console.warn(`   - ${dep}`));
  console.warn('\n💡 Run: npm install -D ' + missingDeps.join(' ') + '\n');
} else {
  console.log('✅ All optimization dependencies present\n');
}

// 3. Check for large files in src
console.log('🔍 Checking for large source files...');
const srcDir = path.join(__dirname, '..', 'components');
const checkDirectory = (dir) => {
  const files = fs.readdirSync(dir, { withFileTypes: true });
  
  files.forEach(file => {
    const filePath = path.join(dir, file.name);
    
    if (file.isDirectory()) {
      checkDirectory(filePath);
    } else if (file.name.endsWith('.tsx') || file.name.endsWith('.ts')) {
      const stats = fs.statSync(filePath);
      const sizeKB = stats.size / 1024;
      
      if (sizeKB > 100) {
        console.warn(`⚠️  Large file detected: ${path.relative(process.cwd(), filePath)} (${sizeKB.toFixed(2)} KB)`);
        console.warn('   Consider splitting into smaller components\n');
      }
    }
  });
};

if (fs.existsSync(srcDir)) {
  checkDirectory(srcDir);
}

console.log('✅ Pre-build checks complete\n');

// 4. Update service worker version if needed
const swPath = path.join(__dirname, '..', 'public', 'service-worker.js');
if (fs.existsSync(swPath)) {
  const swContent = fs.readFileSync(swPath, 'utf-8');
  const versionMatch = swContent.match(/CACHE_VERSION = ['"]v([\d.]+)['"]/);
  
  if (versionMatch) {
    console.log(`📱 Service Worker version: v${versionMatch[1]}`);
    console.log('💡 Remember to update CACHE_VERSION if you made breaking changes\n');
  }
}

console.log('🚀 Ready to build!\n');
