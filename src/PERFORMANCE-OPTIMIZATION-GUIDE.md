# Performance Optimization Guide

This document outlines all the performance optimizations implemented in the EyeLoveSleep application to ensure fast loading times and optimal user experience.

## 🚀 Build Optimizations

### 1. Code Minification
- **JavaScript Minification**: Terser with aggressive settings
  - 3 compression passes
  - Console statements removed in production
  - Dead code elimination
  - Variable mangling with Safari 10 compatibility
  - Pure function marking for better tree-shaking

- **CSS Minification**: Enabled in both Vite and Netlify
  - Whitespace removal
  - Comment removal
  - Property optimization

- **HTML Minification**: Custom plugin with html-minifier-terser
  - Whitespace collapse
  - Comment removal
  - Attribute optimization
  - Inline CSS/JS minification

### 2. Compression
- **Brotli Compression**: Applied to all text-based assets (better than gzip)
- **Gzip Compression**: Fallback for older browsers
- Files > 1KB are compressed
- Both `.br` and `.gz` files generated during build

### 3. Code Splitting
- **Manual Chunks**:
  - `react-vendor`: React core libraries
  - `motion`: Animation library
  - `ui-components`: Reusable UI components
  - `icons`: Lucide React icons
  
- **Lazy Loading**: Calculator components loaded on-demand
- **CSS Code Splitting**: Enabled for better caching

### 4. Tree Shaking
- **ES Module format**: All imports use ESM for better tree-shaking
- **Side effects**: Marked for elimination
- **Pure functions**: Annotated for dead code removal
- **Unused code**: Automatically removed during build

## 📦 Caching Strategy

### Browser Caching (Cache-Control Headers)

#### Immutable Assets (1 year cache)
- JavaScript files: `/assets/*.js`, `/*.js`
- CSS files: `/assets/*.css`, `/*.css`
- Fonts: `.woff`, `.woff2`, `.ttf`
- Images: `.png`, `.jpg`, `.jpeg`, `.gif`, `.svg`, `.webp`, `.ico`
- All assets in `/assets/*` directory

#### Short Cache (1 hour, revalidate)
- HTML files: `/*.html`, `/`
- Service Worker: `/service-worker.js` (no cache)

### Service Worker Caching

#### Cache-First Strategy (Static Assets)
- JavaScript bundles
- CSS stylesheets
- Fonts
- Images
- Fast repeat visits

#### Network-First Strategy (HTML)
- Always fetch fresh HTML
- Fallback to cache if offline
- Ensures latest version

#### Network-Only Strategy (Third-party)
- Ad scripts (Google AdSense)
- Analytics (Google Tag Manager)
- Social sharing (ShareThis)

#### Cache Size Limits
- Runtime cache: 50 items max
- Image cache: 30 items max
- Automatic cleanup of oldest items

## ⚡ Performance Features

### 1. Asset Optimization
- **Inline Small Assets**: Files < 4KB inlined as base64
- **Content Hashing**: All assets have hash in filename for cache busting
- **Asset Prioritization**: Critical resources prioritized

### 2. Bundle Size Optimization
- **Target**: ES2015 (smaller bundles for modern browsers)
- **Module Preload**: Polyfill included
- **Compressed Size Reporting**: Enabled for monitoring

### 3. Development Optimizations
- **HMR**: Hot Module Replacement for faster development
- **Dependency Pre-bundling**: Common dependencies optimized
- **No Source Maps**: Disabled in production

## 🌐 Network Optimizations

### Resource Hints
- Preconnect to external domains
- DNS prefetch for faster resolution
- Preload critical assets

### Compression Headers
- `Content-Encoding: br, gzip`
- `Vary: Accept-Encoding`
- Proper MIME types set

### Security Headers
- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: DENY`
- `X-XSS-Protection: 1; mode=block`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Content-Security-Policy: upgrade-insecure-requests`

## 📊 Monitoring

### Build Analysis
Run `ANALYZE=1 npm run build` to generate bundle visualization at `dist/stats.html`

### Performance Metrics to Track
1. **First Contentful Paint (FCP)**: < 1.8s
2. **Largest Contentful Paint (LCP)**: < 2.5s
3. **Total Blocking Time (TBT)**: < 300ms
4. **Cumulative Layout Shift (CLS)**: < 0.1
5. **Time to Interactive (TTI)**: < 3.8s

### Lighthouse CI
- Automated performance testing via Netlify plugin
- Target score: 90+ for Performance

## 🔧 Build Commands

```bash
# Standard production build
npm run build

# Build with bundle analysis
ANALYZE=1 npm run build

# Preview production build locally
npm run preview
```

## 📝 Installation Requirements

To enable all optimizations, install these packages:

```bash
npm install -D vite-plugin-compression2
npm install -D html-minifier-terser
npm install -D rollup-plugin-visualizer
npm install -D @types/html-minifier-terser
```

## 🎯 Expected Results

After implementing all optimizations:

- **Initial Load**: 
  - Total JS: ~150-200KB (gzipped)
  - Total CSS: ~20-30KB (gzipped)
  - Load time: < 2s on 3G

- **Repeat Visits**:
  - Service Worker cache hit
  - Load time: < 500ms
  - Fully offline capable

- **Lighthouse Scores**:
  - Performance: 90-95+
  - Accessibility: 95+
  - Best Practices: 95+
  - SEO: 100

## 🚨 Important Notes

1. **Service Worker**: Update `CACHE_VERSION` when deploying breaking changes
2. **Cache Busting**: Vite handles this automatically with content hashes
3. **Compression**: Netlify automatically serves `.br` or `.gz` based on browser support
4. **Build Time**: Aggressive optimizations increase build time by ~30-50%
5. **Testing**: Always test on real devices and slow 3G connections

## 🔄 Future Optimizations

- [ ] Implement HTTP/2 Server Push
- [ ] Add WebP/AVIF image format support
- [ ] Implement route-based code splitting
- [ ] Add critical CSS extraction
- [ ] Implement lazy hydration for below-fold content
- [ ] Add prefetch for likely next pages
- [ ] Implement adaptive loading based on connection speed
