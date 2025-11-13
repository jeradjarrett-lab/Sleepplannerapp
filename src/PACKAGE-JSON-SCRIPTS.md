# Package.json Scripts Configuration

Add these scripts to your `package.json` file for optimal build and performance analysis:

```json
{
  "scripts": {
    "dev": "vite",
    "build": "node scripts/pre-build-optimize.js && vite build && node scripts/post-build-analyze.js",
    "build:analyze": "ANALYZE=1 npm run build",
    "preview": "vite preview",
    "lint": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0",
    "type-check": "tsc --noEmit",
    "optimize": "node scripts/pre-build-optimize.js",
    "analyze": "node scripts/post-build-analyze.js",
    "install:perf": "chmod +x INSTALL-PERFORMANCE-DEPS.sh && ./INSTALL-PERFORMANCE-DEPS.sh"
  },
  "devDependencies": {
    "vite-plugin-compression2": "^1.0.0",
    "html-minifier-terser": "^7.2.0",
    "@types/html-minifier-terser": "^7.0.0",
    "rollup-plugin-visualizer": "^5.12.0",
    "babel-plugin-transform-react-remove-prop-types": "^0.4.24"
  }
}
```

## Script Descriptions

### `npm run dev`
Start development server with HMR

### `npm run build`
Production build with:
- Pre-build optimization checks
- Full Vite build with minification and compression
- Post-build analysis report

### `npm run build:analyze`
Build with bundle size visualization
- Opens interactive bundle analysis in browser
- Shows chunk sizes and dependencies

### `npm run preview`
Preview production build locally

### `npm run optimize`
Run pre-build optimization checks only

### `npm run analyze`
Analyze existing build output (run after build)

### `npm run install:perf`
Install all performance optimization dependencies

## Environment Variables

### `ANALYZE=1`
Enable bundle visualization
```bash
ANALYZE=1 npm run build
```

### `NODE_ENV=production`
Set production mode (automatically set by Vite build)
```bash
NODE_ENV=production npm run build
```

## Build Output

After running `npm run build`, you'll see:

1. **Pre-build checks**: Validates dependencies and checks for large files
2. **Vite build**: Compiles, minifies, and compresses all assets
3. **Post-build analysis**: Detailed size report with:
   - Individual file sizes (raw, gzip, brotli)
   - Total bundle sizes
   - Performance recommendations
   - Compression verification

## Example Build Output

```
🔧 Running pre-build optimizations...
✅ Dist directory cleaned
✅ All optimization dependencies present
✅ Pre-build checks complete
🚀 Ready to build!

vite v5.0.0 building for production...
✓ 127 modules transformed.
dist/index.html                   2.14 kB │ gzip:  1.01 kB
dist/assets/index-a1b2c3d4.css   24.56 kB │ gzip: 6.23 kB │ brotli: 4.89 kB
dist/assets/index-e5f6g7h8.js   156.42 kB │ gzip: 51.34 kB │ brotli: 45.12 kB
✓ built in 12.34s

📊 Analyzing build output...
✅ JavaScript bundle size is excellent!
✅ CSS bundle size is excellent!
✅ Gzip pre-compressed files generated
✅ Brotli pre-compressed files generated
✨ Build analysis complete!
```
