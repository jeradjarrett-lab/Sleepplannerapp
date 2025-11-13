#!/usr/bin/env node

/**
 * Create redirect files after build
 * This script runs after `vite build` to ensure redirect files exist in dist/
 */

import { writeFileSync, existsSync } from 'fs';
import { join } from 'path';

const distDir = 'dist';

// Content for _redirects file (Netlify)
const redirectsContent = `/*    /index.html   200
`;

// Content for .htaccess file (Apache)
const htaccessContent = `<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
`;

// Ensure dist directory exists
if (!existsSync(distDir)) {
  console.error('❌ Error: dist directory does not exist. Run build first.');
  process.exit(1);
}

try {
  // Create _redirects file for Netlify
  const redirectsPath = join(distDir, '_redirects');
  writeFileSync(redirectsPath, redirectsContent, 'utf8');
  console.log('✅ Created _redirects file for Netlify');

  // Create .htaccess file for Apache
  const htaccessPath = join(distDir, '.htaccess');
  writeFileSync(htaccessPath, htaccessContent, 'utf8');
  console.log('✅ Created .htaccess file for Apache');

  console.log('\n🎉 Redirect files created successfully!');
  console.log('📁 Files created:');
  console.log(`   - ${redirectsPath}`);
  console.log(`   - ${htaccessPath}`);
  
} catch (error) {
  console.error('❌ Error creating redirect files:', error.message);
  process.exit(1);
}
