import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { visualizer } from 'rollup-plugin-visualizer';
import { compression } from 'vite-plugin-compression2';
import { htmlMinify } from './vite-plugin-html-minify';
import { preloadAssets } from './vite-plugin-preload-assets';

// MOBILE PERFORMANCE OPTIMIZED CONFIG
// Target: 95+ mobile performance score
export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [
          // Remove PropTypes in production
          ['babel-plugin-transform-react-remove-prop-types', { removeImport: true }],
        ],
      },
      // Fast Refresh for development
      fastRefresh: true,
    }),
    // Preload critical assets
    preloadAssets(),
    // HTML minification
    htmlMinify(),
    // Gzip compression
    compression({
      algorithm: 'gzip',
      exclude: [/\.(br)$/, /\.(gz)$/],
      threshold: 512, // Compress files larger than 512B (was 1KB)
      deleteOriginFile: false,
    }),
    // Brotli compression (better than gzip)
    compression({
      algorithm: 'brotliCompress',
      exclude: [/\.(br)$/, /\.(gz)$/],
      threshold: 512, // Compress files larger than 512B
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
    
    // Minification with ULTRA-AGGRESSIVE settings for mobile
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true, // Remove console.logs
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info', 'console.debug', 'console.warn'],
        passes: 4, // 4 passes for maximum compression (was 3)
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
        // Additional aggressive optimizations
        collapse_vars: true,
        reduce_vars: true,
        inline: 3, // Maximum inlining
        reduce_funcs: true,
        toplevel: true,
        keep_fargs: false,
        keep_infinity: false,
        unsafe: true, // Enable unsafe optimizations (test thoroughly!)
        unsafe_math: true,
        unsafe_proto: true,
        unsafe_regexp: true,
        unsafe_undefined: true,
      },
      mangle: {
        safari10: true,
        toplevel: true,
        properties: {
          // Mangle property names for extra compression
          // Only if you're sure it won't break your code
          regex: /^_/,
        },
      },
      format: {
        comments: false,
        ecma: 2020, // Target newer ES for smaller code
        ascii_only: false,
        beautify: false,
        quote_style: 1, // Use single quotes
      },
    },
    
    // Chunk splitting strategy for MAXIMUM caching efficiency
    rollupOptions: {
      output: {
        // Ultra-aggressive manual chunk splitting
        manualChunks: (id) => {
          // React core - separate chunk (changes rarely)
          if (id.includes('react') || id.includes('react-dom') || id.includes('react/jsx-runtime')) {
            return 'react-vendor';
          }
          
          // React Router - separate chunk
          if (id.includes('react-router')) {
            return 'router';
          }
          
          // Motion library
          if (id.includes('motion/react') || id.includes('framer-motion')) {
            return 'motion';
          }
          
          // Lucide icons - separate chunk (large)
          if (id.includes('lucide-react')) {
            return 'icons';
          }
          
          // Radix UI primitives
          if (id.includes('@radix-ui')) {
            return 'radix-ui';
          }
          
          // UI components
          if (id.includes('/components/ui/')) {
            return 'ui-components';
          }
          
          // Calculator components
          if (id.includes('Calculator')) {
            return 'calculators';
          }
          
          // Utils and helpers
          if (id.includes('/utils/')) {
            return 'utils';
          }
          
          // Everything else in node_modules
          if (id.includes('node_modules')) {
            return 'vendor';
          }
        },
        
        // Asset naming with content hash for cache busting
        chunkFileNames: 'assets/[name].[hash].js',
        entryFileNames: 'assets/[name].[hash].js',
        assetFileNames: (assetInfo) => {
          // Organize assets by type
          const ext = assetInfo.name?.split('.').pop();
          if (ext === 'css') return 'assets/[name].[hash].css';
          if (['png', 'jpg', 'jpeg', 'gif', 'svg', 'webp', 'avif'].includes(ext || '')) {
            return 'assets/images/[name].[hash].[ext]';
          }
          if (['woff', 'woff2', 'ttf', 'otf', 'eot'].includes(ext || '')) {
            return 'assets/fonts/[name].[hash].[ext]';
          }
          return 'assets/[name].[hash].[ext]';
        },
        
        // Optimize chunk loading
        inlineDynamicImports: false,
        
        // Compact output
        compact: true,
        
        // Hoist transitive imports
        hoistTransitiveImports: true,
        
        // Remove external live bindings (smaller chunks)
        externalLiveBindings: false,
      },
      
      // Tree-shaking optimization
      treeshake: {
        moduleSideEffects: false,
        propertyReadSideEffects: false,
        tryCatchDeoptimization: false,
        correctVarValueBeforeDeclaration: false,
        preset: 'smallest',
      },
    },
    
    // Increase chunk size warning limit
    chunkSizeWarningLimit: 800, // Reduced from 1000 (smaller chunks = better caching)
    
    // CSS code splitting for parallel loading
    cssCodeSplit: true,
    
    // Optimize dependencies
    commonjsOptions: {
      include: [/node_modules/],
      transformMixedEsModules: true,
      strictRequires: true,
    },
    
    // Target modern browsers for smaller bundles
    target: 'es2020', // Updated from es2015 for better compression
    
    // Optimize asset inlining (smaller threshold = fewer HTTP requests)
    assetsInlineLimit: 2048, // 2kb (was 4kb) - inline smaller assets
    
    // Report compressed size
    reportCompressedSize: true,
    
    // Module preload polyfill
    modulePreload: {
      polyfill: true,
      resolveDependencies: (filename, deps, { hostType }) => {
        // Only preload critical chunks
        return deps.filter(dep => 
          dep.includes('react-vendor') || 
          dep.includes('router') ||
          !dep.includes('Calculator')
        );
      },
    },
  },
  
  // Dependency optimization
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      'react/jsx-runtime',
    ],
    exclude: [
      // Exclude large libraries that are lazy-loaded
      'lucide-react',
      'motion/react',
    ],
    // Force pre-bundling for faster dev startup
    force: false,
    // ESBuild options for optimizing dependencies
    esbuildOptions: {
      target: 'es2020',
      supported: {
        'top-level-await': true,
      },
    },
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
    // Warm up frequently used files
    warmup: {
      clientFiles: [
        './App.tsx',
        './pages/SleepCalculatorPage.tsx',
        './components/**/*.tsx',
      ],
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
  
  // Esbuild configuration for faster builds and better optimization
  esbuild: {
    logOverride: { 'this-is-undefined-in-esm': 'silent' },
    legalComments: 'none',
    // Aggressive tree shaking
    treeShaking: true,
    // Maximum minification
    minifyIdentifiers: true,
    minifySyntax: true,
    minifyWhitespace: true,
    // Drop debug code
    drop: ['console', 'debugger'],
    // Optimize for production
    pure: ['console.log', 'console.info', 'console.debug', 'console.trace'],
    // Target newer JS for better optimization
    target: 'es2020',
    // Supported features
    supported: {
      'dynamic-import': true,
      'import-meta': true,
    },
    // Charset
    charset: 'utf8',
  },
  
  // CSS configuration
  css: {
    devSourcemap: false,
    postcss: './postcss.config.js',
    // CSS modules optimization
    modules: {
      localsConvention: 'camelCaseOnly',
      generateScopedName: '[hash:base64:8]', // Shorter class names
    },
    preprocessorOptions: {
      // Optimize CSS processing
    },
    // Lightning CSS for faster, smaller CSS
    transformer: 'lightningcss',
    lightningcss: {
      // Optimize CSS with Lightning CSS
      minify: true,
      drafts: {
        nesting: true,
      },
      targets: {
        // Target modern browsers
        chrome: 90,
        firefox: 88,
        safari: 14,
        edge: 90,
      },
    },
  },
  
  // Performance optimizations
  define: {
    // Replace these with static values for better tree-shaking
    'process.env.NODE_ENV': JSON.stringify('production'),
    '__DEV__': false,
  },
  
  // JSON optimization
  json: {
    stringify: true, // Import JSON as strings (faster parsing)
  },
  
  // Worker configuration
  worker: {
    format: 'es',
    plugins: [],
    rollupOptions: {
      output: {
        format: 'es',
      },
    },
  },
});
