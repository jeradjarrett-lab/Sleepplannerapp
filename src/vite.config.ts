import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { visualizer } from 'rollup-plugin-visualizer';
import { compression } from 'vite-plugin-compression2';
import { htmlMinify } from './vite-plugin-html-minify';
import { preloadAssets } from './vite-plugin-preload-assets';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [
          // Remove PropTypes in production
          ['babel-plugin-transform-react-remove-prop-types', { removeImport: true }],
        ],
      },
    }),
    // Preload critical assets
    preloadAssets(),
    // HTML minification
    htmlMinify(),
    // Gzip compression
    compression({
      algorithm: 'gzip',
      exclude: [/\.(br)$/, /\.(gz)$/],
      threshold: 1024, // Only compress files larger than 1KB
      deleteOriginFile: false,
    }),
    // Brotli compression (better than gzip)
    compression({
      algorithm: 'brotliCompress',
      exclude: [/\.(br)$/, /\.(gz)$/],
      threshold: 1024,
      deleteOriginFile: false,
    }),
    // Bundle analyzer - only in analyze mode
    process.env.ANALYZE && visualizer({
      open: true,
      gzipSize: true,
      brotliSize: true,
      filename: 'dist/stats.html',
    }),
  ].filter(Boolean),
  
  build: {
    // Output directory
    outDir: 'dist',
    
    // Generate sourcemaps for debugging (disable in production)
    sourcemap: false,
    
    // Minification with aggressive settings
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true, // Remove console.logs in production
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info', 'console.debug', 'console.warn'],
        passes: 3, // More passes for better compression
        dead_code: true,
        conditionals: true,
        evaluate: true,
        booleans: true,
        loops: true,
        unused: true,
        hoist_funs: true,
        hoist_vars: false,
        if_return: true,
        join_vars: true,
        side_effects: true,
        warnings: false,
      },
      mangle: {
        safari10: true,
        toplevel: true,
      },
      format: {
        comments: false,
        ecma: 2015,
      },
    },
    
    // Chunk splitting strategy for better caching
    rollupOptions: {
      // Multiple page entry points
      input: {
        main: '/index.html',
        'caffeine-sleep': '/caffeine-sleep.html',
        'jet-lag': '/jet-lag.html',
      },
      output: {
        // Manual chunk splitting
        manualChunks: {
          // React core
          'react-vendor': ['react', 'react-dom', 'react/jsx-runtime'],
          
          // Router and state management
          'motion': ['motion/react'],
          
          // UI components library
          'ui-components': [
            './components/ui/button',
            './components/ui/card',
            './components/ui/tabs',
            './components/ui/input',
            './components/ui/label',
            './components/ui/slider',
          ],
          
          // Icons
          'icons': ['lucide-react'],
          
          // Calculators - lazy loaded separately
          // These are already lazy loaded in App.tsx
        },
        
        // Asset naming with content hash for cache busting
        chunkFileNames: 'assets/[name].[hash].js',
        entryFileNames: 'assets/[name].[hash].js',
        assetFileNames: 'assets/[name].[hash].[ext]',
      },
    },
    
    // Increase chunk size warning limit
    chunkSizeWarningLimit: 1000,
    
    // CSS code splitting
    cssCodeSplit: true,
    
    // Optimize dependencies
    commonjsOptions: {
      include: [/node_modules/],
      transformMixedEsModules: true,
    },
    
    // Target modern browsers for smaller bundles
    target: 'es2015',
    
    // Optimize asset inlining
    assetsInlineLimit: 4096, // 4kb - inline smaller assets as base64
    
    // Report compressed size (slower but useful for optimization)
    reportCompressedSize: true,
    
    // Module preload polyfill
    modulePreload: {
      polyfill: true,
    },
  },
  
  // Dependency optimization
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'lucide-react',
      'motion/react',
    ],
    exclude: [],
  },
  
  // Server configuration for development
  server: {
    port: 3000,
    strictPort: false,
    open: false,
    cors: true,
    hmr: {
      overlay: true,
    },
  },
  
  // Preview server configuration
  preview: {
    port: 4173,
    strictPort: false,
    open: false,
  },
  
  // Resolve configuration
  resolve: {
    alias: {
      // Add aliases if needed
    },
  },
  
  // Esbuild configuration for faster builds
  esbuild: {
    logOverride: { 'this-is-undefined-in-esm': 'silent' },
    legalComments: 'none',
    // Tree shaking
    treeShaking: true,
    // Additional minification
    minifyIdentifiers: true,
    minifySyntax: true,
    minifyWhitespace: true,
    // Drop debug code
    drop: ['console', 'debugger'],
    // Optimize for production
    pure: ['console.log', 'console.info', 'console.debug'],
  },
  
  // CSS configuration
  css: {
    devSourcemap: false,
    postcss: './postcss.config.js',
    // CSS modules optimization
    modules: {
      localsConvention: 'camelCaseOnly',
    },
    preprocessorOptions: {
      // Optimize CSS processing
    },
  },
  
  // Performance optimizations
  define: {
    // Replace these with static values for better tree-shaking
    'process.env.NODE_ENV': JSON.stringify('production'),
  },
});
