# Performance Fixes Deployment Guide

## 🚀 Quick Deployment Steps

### 1. Pre-Deployment Checklist

```bash
# Install any missing dependencies
npm install -D vite-plugin-compression2 html-minifier-terser @types/html-minifier-terser rollup-plugin-visualizer babel-plugin-transform-react-remove-prop-types

# Verify all files are present
ls vite-plugin-*.ts
# Should show:
# - vite-plugin-html-minify.ts
# - vite-plugin-preload-assets.ts

# Run build with analysis
ANALYZE=1 npm run build

# Check for errors
echo $?  # Should output: 0
```

### 2. Verify Build Output

Check that these files exist in `dist/`:

```bash
# Check main assets
ls dist/assets/*.js
ls dist/assets/*.css

# Check compression files
ls dist/assets/*.br   # Brotli compressed
ls dist/assets/*.gz   # Gzip compressed

# Check HTML is minified
head -n 1 dist/index.html  # Should be single line
```

### 3. Test Locally

```bash
# Preview production build
npm run preview

# Open in browser
open http://localhost:4173
```

### 4. Verify Performance Locally

1. Open Chrome DevTools
2. Go to Lighthouse tab
3. Select "Performance" only
4. Click "Analyze page load"
5. **Verify score is 90+**

### 5. Check Critical Optimizations

**A. No Render-Blocking CSS**
- DevTools → Performance → Record page load
- Look for render-blocking resources
- **Should see none** (CSS is inlined)

**B. Assets Preloaded**
- DevTools → Network tab
- Reload page
- Look for `<link rel="modulepreload">` and `<link rel="preload">`
- **Should see critical assets with high priority**

**C. No Forced Reflow**
- DevTools → Performance → Record scroll
- Look for "Forced reflow" warnings
- **Should see none during scroll**

**D. Compression Working**
- DevTools → Network tab
- Check any JS/CSS file
- Headers should show: `Content-Encoding: br` or `gzip`

### 6. Deploy to Netlify

```bash
# Commit changes
git add .
git commit -m "fix: Optimize Lighthouse performance (eliminate render-blocking, forced reflow, improve caching)"
git push origin main

# Or manual deploy
netlify deploy --prod
```

### 7. Post-Deployment Verification

**A. Check Live Site**
```bash
# Run Lighthouse on live site
npx lighthouse https://eyelovesleep.com --view
```

**B. Verify Cache Headers**
```bash
# Check asset cache headers (should be 1 year)
curl -I https://eyelovesleep.com/assets/index-*.js | grep -i cache-control
# Expected: Cache-Control: public, max-age=31536000, immutable

# Check HTML cache headers (should be 0)
curl -I https://eyelovesleep.com/ | grep -i cache-control
# Expected: Cache-Control: public, max-age=0, must-revalidate
```

**C. Verify Compression**
```bash
# Check Brotli compression
curl -I -H "Accept-Encoding: br" https://eyelovesleep.com/assets/index-*.js | grep -i content-encoding
# Expected: Content-Encoding: br

# Check file sizes
curl -H "Accept-Encoding: br" https://eyelovesleep.com/assets/index-*.js | wc -c
```

### 8. Monitor Core Web Vitals

**Google Search Console:**
1. Go to Experience → Core Web Vitals
2. Wait 24-48 hours for data
3. Verify all metrics are "Good" (green)

**Expected Results:**
- LCP: < 2.5s ✅
- FID: < 100ms ✅
- CLS: < 0.1 ✅

---

## 🐛 Troubleshooting

### Issue: Build Fails

**Error:** `Cannot find module 'vite-plugin-compression2'`

**Solution:**
```bash
npm install -D vite-plugin-compression2
```

**Error:** `Cannot find module './vite-plugin-html-minify'`

**Solution:**
```bash
# Verify file exists
ls vite-plugin-html-minify.ts

# If missing, it should be in the project root
```

### Issue: No Compression Files Generated

**Check:**
```bash
# Verify plugins are in vite.config.ts
grep "compression" vite.config.ts

# Should see both gzip and brotli compression configs
```

**Solution:**
- Ensure `vite-plugin-compression2` is installed
- Check build logs for compression plugin errors
- Verify `deleteOriginFile: false` in config

### Issue: Lighthouse Still Shows Render-Blocking

**Check:**
1. Verify critical CSS is in `index.html`
2. View page source, look for `<style id="critical-css">`
3. Ensure external stylesheets are removed or deferred

**Solution:**
- Check `index.html.template` was properly updated
- Build and deploy again
- Clear CDN cache

### Issue: Forced Reflow Still Appearing

**Check:**
1. Open DevTools → Performance
2. Record scrolling
3. Look for layout operations in scroll handler

**Solution:**
- Verify `ScrollNav.tsx` has RAF batching
- Check for other components reading layout properties
- Use `will-change` CSS property sparingly

### Issue: Cache Headers Not Applied

**Check:**
```bash
curl -I https://eyelovesleep.com/assets/index-*.js | grep -i cache
```

**Solution:**
- Verify `netlify.toml` has correct headers
- Check Netlify dashboard → Headers
- Clear CDN cache
- Wait 5-10 minutes for propagation

---

## 📊 Expected Performance Metrics

### Before Optimization
```
Performance Score: 75-85
FCP: 1.5s
LCP: 2.3s
TBT: 240ms
CLS: 0.05
SI: 2.1s
```

### After Optimization
```
Performance Score: 90-95+ ✅
FCP: 1.0-1.2s ⬇️ (-300ms)
LCP: 1.8-2.0s ⬇️ (-350ms)
TBT: 0-50ms ⬇️ (-200ms)
CLS: 0.02-0.05 ✅
SI: 1.6-1.8s ⬇️ (-400ms)
```

### Key Improvements
- **-200ms** Render blocking eliminated
- **-37ms** Forced reflow eliminated
- **-200-300ms** Critical path optimized
- **-220 KiB** Network transfer on repeat visits

---

## 🎯 Success Criteria

✅ **Lighthouse Performance: 90+**  
✅ **No render-blocking resources**  
✅ **All assets compressed (Brotli/Gzip)**  
✅ **Proper cache headers set**  
✅ **No forced reflow warnings**  
✅ **Critical assets preloaded**  
✅ **FCP < 1.5s**  
✅ **LCP < 2.5s**  
✅ **TBT < 100ms**  

---

## 📞 Support

If issues persist after following this guide:

1. Check the main documentation: `/LIGHTHOUSE-PERFORMANCE-FIXES.md`
2. Review build logs for errors
3. Test with `npm run build:analyze` to see bundle composition
4. Verify all files from "Files Modified" section are updated

---

**Last Updated:** 2024-11-13  
**Status:** Ready for Production ✅
