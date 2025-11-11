/**
 * Build-time Performance Hints
 * These recommendations should be implemented in your build configuration
 */

/**
 * Vite Configuration Recommendations
 * 
 * Add this to vite.config.ts for optimal performance:
 */

export const viteConfigRecommendations = `
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { visualizer } from 'rollup-plugin-visualizer';
import viteCompression from 'vite-plugin-compression';

export default defineConfig({
  plugins: [
    react(),
    
    // Brotli and Gzip compression
    viteCompression({
      algorithm: 'brotliCompress',
      ext: '.br',
      threshold: 1024, // Only compress files larger than 1KB
    }),
    viteCompression({
      algorithm: 'gzip',
      ext: '.gz',
    }),
    
    // Bundle analyzer (optional, for dev)
    visualizer({
      open: false,
      gzipSize: true,
      brotliSize: true,
    }),
  ],
  
  build: {
    // Optimize chunks
    rollupOptions: {
      output: {
        manualChunks: {
          // Vendor chunks
          'react-vendor': ['react', 'react-dom'],
          'ui-vendor': ['lucide-react', 'sonner'],
          
          // Feature chunks
          'calculator': [
            './src/components/SleepCalculator',
            './src/components/JetLagCalculator',
          ],
          'seo': [
            './src/components/FAQSection',
            './src/components/SEOContent',
          ],
        },
        
        // Use content hash for cache busting
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]',
      },
    },
    
    // Enable minification
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true, // Remove console.logs in production
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info'], // Remove specific console methods
        passes: 2, // Run minifier twice for better compression
      },
      format: {
        comments: false, // Remove all comments
      },
    },
    
    // CSS code splitting
    cssCodeSplit: true,
    
    // Report compressed size
    reportCompressedSize: true,
    
    // Chunk size warning limit
    chunkSizeWarningLimit: 300, // Warn if chunk > 300KB
    
    // Target modern browsers for smaller bundle
    target: 'es2020',
    
    // Source maps only for errors
    sourcemap: false, // Or 'hidden' for error reporting
  },
  
  // Optimize dependencies
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'lucide-react',
    ],
    exclude: [
      // Exclude large dev dependencies
    ],
  },
  
  // Performance optimizations
  esbuild: {
    // Remove console logs in production
    drop: process.env.NODE_ENV === 'production' ? ['console', 'debugger'] : [],
    
    // Optimize JSX
    jsxInject: \`import React from 'react'\`,
    
    // Target modern browsers
    target: 'es2020',
    
    // Pure annotations for better tree shaking
    pure: ['console.log', 'console.info'],
  },
  
  // Server configuration
  server: {
    // Enable compression in dev
    middlewareMode: false,
  },
  
  // Preview configuration
  preview: {
    // Enable compression
    headers: {
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  },
});
`;

/**
 * Package.json scripts recommendations
 */
export const packageJsonScripts = `
{
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "build:analyze": "vite build --mode analyze",
    "preview": "vite preview",
    "lint": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0",
    "type-check": "tsc --noEmit",
    
    // Performance testing scripts
    "perf:lighthouse": "lighthouse http://localhost:4173 --view --preset=desktop",
    "perf:lighthouse:mobile": "lighthouse http://localhost:4173 --view --preset=mobile",
    "perf:bundle-size": "npm run build && bundlesize",
    
    // Build and analyze
    "build:prod": "npm run type-check && npm run build",
    "postbuild": "echo 'Build complete! Check bundle size:' && du -sh dist/"
  },
  
  "devDependencies": {
    "rollup-plugin-visualizer": "^5.9.2",
    "vite-plugin-compression": "^0.5.1",
    "lighthouse": "^11.0.0",
    "bundlesize": "^0.18.1"
  },
  
  "bundlesize": [
    {
      "path": "./dist/assets/*.js",
      "maxSize": "300 KB"
    }
  ]
}
`;

/**
 * Environment-specific optimizations
 */
export const environmentOptimizations = {
  development: {
    recommendations: [
      'Enable source maps for debugging',
      'Keep console.logs for development',
      'Use React Profiler for performance analysis',
      'Enable hot module replacement (HMR)',
      'Skip compression for faster builds',
    ],
    config: {
      sourcemap: true,
      minify: false,
      dropConsole: false,
    },
  },
  
  production: {
    recommendations: [
      'Remove all console.logs',
      'Enable aggressive minification',
      'Generate Brotli and Gzip compressed files',
      'Split chunks for optimal caching',
      'Use content hashes for cache busting',
      'Target modern browsers (es2020)',
      'Remove source maps (or use "hidden")',
      'Enable CSS code splitting',
      'Optimize images (WebP/AVIF)',
      'Set proper cache headers',
    ],
    config: {
      sourcemap: false,
      minify: 'terser',
      dropConsole: true,
      compression: ['br', 'gz'],
    },
  },
};

/**
 * CDN Configuration Recommendations
 */
export const cdnRecommendations = `
# Cloudflare / Netlify / Vercel Configuration

## Cache Headers (netlify.toml / vercel.json):

[[headers]]
  for = "/*.js"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"
    
[[headers]]
  for = "/*.css"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"
    
[[headers]]
  for = "/*.woff2"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"
    
[[headers]]
  for = "/*.webp"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"
    
[[headers]]
  for = "/index.html"
  [headers.values]
    Cache-Control = "public, max-age=0, must-revalidate"

## Compression:
- Enable Brotli (priority)
- Enable Gzip (fallback)
- Minimum compress size: 1KB

## Performance:
- Enable HTTP/2
- Enable HTTP/3 if available
- Enable TLS 1.3
- Enable OCSP stapling
`;

/**
 * Image Optimization Recommendations
 */
export const imageOptimizations = {
  formats: {
    recommended: ['WebP', 'AVIF'],
    fallback: ['JPEG', 'PNG'],
  },
  
  tools: [
    'sharp (Node.js)',
    'imagemin',
    'squoosh-cli',
    'vite-plugin-imagemin',
  ],
  
  implementation: `
// Install vite-plugin-imagemin
npm install vite-plugin-imagemin --save-dev

// Add to vite.config.ts
import viteImagemin from 'vite-plugin-imagemin';

export default defineConfig({
  plugins: [
    viteImagemin({
      gifsicle: {
        optimizationLevel: 7,
        interlaced: false,
      },
      optipng: {
        optimizationLevel: 7,
      },
      mozjpeg: {
        quality: 80,
      },
      pngquant: {
        quality: [0.8, 0.9],
        speed: 4,
      },
      svgo: {
        plugins: [
          {
            name: 'removeViewBox',
          },
          {
            name: 'removeEmptyAttrs',
            active: false,
          },
        ],
      },
    }),
  ],
});
  `,
};

/**
 * Performance Monitoring Setup
 */
export const monitoringSetup = `
// Install Web Vitals library
npm install web-vitals

// Create monitoring utility
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';

function sendToAnalytics(metric) {
  // Send to your analytics endpoint
  console.log(metric);
  
  // Example: Send to Google Analytics
  if (window.gtag) {
    window.gtag('event', metric.name, {
      value: Math.round(metric.value),
      metric_id: metric.id,
      metric_value: metric.value,
      metric_delta: metric.delta,
    });
  }
}

// Initialize monitoring
getCLS(sendToAnalytics);
getFID(sendToAnalytics);
getFCP(sendToAnalytics);
getLCP(sendToAnalytics);
getTTFB(sendToAnalytics);
`;

/**
 * Performance Budget Configuration
 */
export const performanceBudget = {
  budgets: {
    javascript: '300 KB',
    css: '50 KB',
    images: '200 KB',
    fonts: '100 KB',
    total: '650 KB',
  },
  
  metrics: {
    FCP: '< 1.0s',
    LCP: '< 2.0s',
    FID: '< 100ms',
    CLS: '< 0.1',
    TBT: '< 200ms',
  },
  
  implementation: `
// lighthouse-budget.json
{
  "budgets": [
    {
      "path": "/*",
      "resourceSizes": [
        {
          "resourceType": "script",
          "budget": 300
        },
        {
          "resourceType": "stylesheet",
          "budget": 50
        },
        {
          "resourceType": "image",
          "budget": 200
        },
        {
          "resourceType": "font",
          "budget": 100
        },
        {
          "resourceType": "total",
          "budget": 650
        }
      ],
      "resourceCounts": [
        {
          "resourceType": "script",
          "budget": 10
        },
        {
          "resourceType": "third-party",
          "budget": 5
        }
      ]
    }
  ]
}

// Run Lighthouse with budget
lighthouse http://localhost:4173 --budget-path=lighthouse-budget.json
  `,
};

// Console output for developers
if (typeof console !== 'undefined' && process.env.NODE_ENV === 'development') {
  console.log(
    '%c⚡ Performance Build Hints Available',
    'background: #4f86f7; color: white; padding: 4px 8px; border-radius: 4px; font-weight: bold;'
  );
  console.log('Check /utils/build-performance-hints.ts for:');
  console.log('  • Vite configuration recommendations');
  console.log('  • Build scripts and bundle analysis');
  console.log('  • CDN and caching setup');
  console.log('  • Image optimization tools');
  console.log('  • Performance monitoring');
}

export default {
  viteConfigRecommendations,
  packageJsonScripts,
  environmentOptimizations,
  cdnRecommendations,
  imageOptimizations,
  monitoringSetup,
  performanceBudget,
};
