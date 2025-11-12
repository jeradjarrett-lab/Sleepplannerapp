import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { visualizer } from 'rollup-plugin-visualizer';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    // Bundle analyzer - only in analyze mode
    process.env.ANALYZE && visualizer({
      open: true,
      gzipSize: true,
      brotliSize: true,
    }),
  ].filter(Boolean),
  
  build: {
    // Output directory
    outDir: 'dist',
    
    // Generate sourcemaps for debugging (disable in production)
    sourcemap: false,
    
    // Minification
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true, // Remove console.logs in production
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info', 'console.debug'],
        passes: 2,
      },
      mangle: {
        safari10: true,
      },
      format: {
        comments: false,
      },
    },
    
    // Chunk splitting strategy for better caching
    rollupOptions: {
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
  
  // Esbuild configuration
  esbuild: {
    logOverride: { 'this-is-undefined-in-esm': 'silent' },
    legalComments: 'none',
    // Tree shaking
    treeShaking: true,
  },
  
  // CSS configuration
  css: {
    devSourcemap: false,
    postcss: './postcss.config.js',
  },
});
