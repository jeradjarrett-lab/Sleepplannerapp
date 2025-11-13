# ⚡ Performance Optimization Quick Reference

## 🚀 Quick Start

```bash
# 1. Install performance dependencies
chmod +x INSTALL-PERFORMANCE-DEPS.sh
./INSTALL-PERFORMANCE-DEPS.sh

# 2. Build with optimizations
npm run build

# 3. Analyze bundle (optional)
ANALYZE=1 npm run build
```

## 📋 Optimization Checklist

### ✅ Implemented Optimizations

- [x] **JavaScript Minification** - Terser with 3 passes
- [x] **CSS Minification** - Vite + Netlify processing
- [x] **HTML Minification** - Custom plugin with html-minifier-terser
- [x] **Brotli Compression** - All text files > 1KB
- [x] **Gzip Compression** - Fallback for older browsers
- [x] **Code Splitting** - Manual chunks + lazy loading
- [x] **Tree Shaking** - Dead code elimination
- [x] **Cache Headers** - 1 year for assets, 1 hour for HTML
- [x] **Service Worker** - Cache-first for assets, network-first for HTML
- [x] **Asset Optimization** - Inline files < 4KB
- [x] **Content Hashing** - Automatic cache busting
- [x] **Remove Console Logs** - Production build cleanup
- [x] **Modern Target** - ES2015 for smaller bundles

## 📊 Performance Targets

| Metric | Target | Current |
|--------|--------|---------|
| First Contentful Paint | < 1.8s | ✅ |
| Largest Contentful Paint | < 2.5s | ✅ |
| Total Blocking Time | < 300ms | ✅ |
| Cumulative Layout Shift | < 0.1 | ✅ |
| Lighthouse Performance | 90+ | ✅ |
| Total JS (Brotli) | < 150KB | ✅ |
| Total CSS (Brotli) | < 30KB | ✅ |

## 🔧 Key Files

### Build Configuration
- `vite.config.ts` - Main build config with minification & compression
- `vite-plugin-html-minify.ts` - HTML minification plugin
- `netlify.toml` - Cache headers & server config
- `postcss.config.js` - CSS processing

### Service Worker
- `public/service-worker.js` - Offline caching & performance

### Scripts
- `scripts/pre-build-optimize.js` - Pre-build checks
- `scripts/post-build-analyze.js` - Bundle size analysis

## 📦 Cache Strategy

### Immutable (1 year)
```
/assets/*.{js,css}
*.{woff2,woff,ttf}
*.{png,jpg,jpeg,gif,svg,webp,ico}
```

### Revalidate (1 hour)
```
/*.html
/
```

### No Cache
```
/service-worker.js
```

## 🎯 Common Commands

```bash
# Development
npm run dev                    # Start dev server

# Production Build
npm run build                  # Build with optimizations
npm run build:analyze          # Build + bundle analysis
npm run preview                # Preview production build

# Analysis Only
npm run optimize               # Pre-build checks
npm run analyze                # Post-build analysis

# Dependencies
npm run install:perf           # Install perf dependencies
```

## 🔍 Debugging Performance Issues

### 1. Bundle Too Large?
```bash
ANALYZE=1 npm run build
# Opens visualization showing chunk sizes
```

### 2. Check Compression
```bash
npm run build
# Look for .gz and .br files in dist/assets/
```

### 3. Verify Minification
```bash
# Check dist/ files - should be single line with no comments
cat dist/assets/*.js | head
```

### 4. Test Service Worker
```bash
npm run build
npm run preview
# Open DevTools > Application > Service Workers
```

### 5. Measure Real Performance
```bash
# Use Lighthouse in Chrome DevTools
# Or: npx lighthouse http://localhost:4173
```

## ⚡ Performance Tips

### DO ✅
- Keep dependencies minimal
- Use code splitting for large features
- Lazy load below-fold components
- Compress images before importing
- Use modern image formats (WebP)
- Implement virtual scrolling for long lists
- Defer non-critical scripts
- Use CSS containment where appropriate

### DON'T ❌
- Import entire libraries (use tree-shakable imports)
- Include unused dependencies
- Inline large assets
- Skip minification in production
- Forget to test on slow connections
- Ignore bundle size warnings
- Use blocking scripts in <head>
- Skip service worker version updates

## 🚨 Troubleshooting

### Build fails with "Cannot find module"
```bash
npm run install:perf
```

### Bundle size not reducing
1. Check if minification is enabled in `vite.config.ts`
2. Verify terser is installed: `npm list terser`
3. Clear cache: `rm -rf node_modules/.vite`

### Compression files not generated
1. Check `vite-plugin-compression2` is installed
2. Verify plugin is added to `vite.config.ts`
3. Rebuild: `npm run build`

### Service Worker not updating
1. Increment `CACHE_VERSION` in `public/service-worker.js`
2. Rebuild and redeploy
3. Hard refresh browser (Ctrl+Shift+R)

### Cache headers not working
1. Check `netlify.toml` configuration
2. Verify deployment on Netlify
3. Check headers in Network tab (DevTools)

## 📈 Monitoring Production

### Netlify Analytics
- Check "Analytics" tab in Netlify dashboard
- Monitor Core Web Vitals

### Google Search Console
- Check "Core Web Vitals" report
- Monitor "Experience" metrics

### Real User Monitoring (RUM)
- Add Google Analytics 4
- Monitor Web Vitals events
- Set up custom performance alerts

## 🔄 Regular Maintenance

### Weekly
- [ ] Check bundle size trends
- [ ] Review performance scores
- [ ] Monitor error rates

### Monthly
- [ ] Update dependencies
- [ ] Re-analyze bundle composition
- [ ] Review and update service worker cache

### Per Deploy
- [ ] Run `npm run build:analyze`
- [ ] Check post-build analysis report
- [ ] Verify compression files exist
- [ ] Update service worker version if needed

## 📚 Further Reading

- [Vite Build Optimizations](https://vitejs.dev/guide/build.html)
- [Web.dev Performance](https://web.dev/performance/)
- [Chrome DevTools Performance](https://developer.chrome.com/docs/devtools/performance/)
- [Lighthouse Scoring](https://developer.chrome.com/docs/lighthouse/performance/performance-scoring/)

---

**Last Updated**: 2024
**Maintained By**: EyeLoveSleep Team
