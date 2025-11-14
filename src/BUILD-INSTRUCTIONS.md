# 🏗️ Build Instructions for EyeLoveSleep

## 📋 Overview

This document explains how to build the EyeLoveSleep website with proper SEO-optimized static HTML files for each calculator page.

---

## 🚀 Quick Build

### Option 1: Manual Build (Recommended)

```bash
# Step 1: Build the app with Vite
npm run build

# Step 2: Generate static pages with proper meta tags
node scripts/post-build-static-pages.js

# Step 3: Preview locally
npm run preview

# Step 4: Deploy dist/ folder to Netlify/Vercel
```

### Option 2: Automated Build Script

Create a custom npm script in your `package.json`:

```json
{
  "scripts": {
    "build": "vite build",
    "build:seo": "vite build && node scripts/post-build-static-pages.js",
    "preview": "vite preview"
  }
}
```

Then run:
```bash
npm run build:seo
npm run preview
```

---

## 📂 What Gets Generated

### After `npm run build`:
```
dist/
├── index.html          ← Homepage (Sleep Calculator)
├── assets/
│   ├── *.js            ← JavaScript bundles
│   └── *.css           ← CSS files
└── (other static assets from /public/)
```

### After `node scripts/post-build-static-pages.js`:
```
dist/
├── index.html                ← Sleep Calculator (/)
├── caffeine-sleep.html       ← Caffeine Calculator (/caffeine-sleep)
├── jet-lag.html              ← Jet Lag Calculator (/jet-lag)
├── assets/
│   ├── *.js
│   └── *.css
└── (other static assets)
```

---

## 🔍 How It Works

### 1. Vite Build Process

```
index.html → Vite → dist/index.html
                    + bundled assets
```

- Processes `/index.html`
- Bundles all JavaScript and CSS
- Optimizes images and fonts
- Generates hashed filenames for caching

### 2. Static Page Generation

```
dist/index.html → post-build-static-pages.js → dist/caffeine-sleep.html
                                              → dist/jet-lag.html
```

The script:
1. Reads `dist/index.html`
2. Replaces meta tags with page-specific values
3. Creates `caffeine-sleep.html` with Caffeine Calculator meta tags
4. Creates `jet-lag.html` with Jet Lag Calculator meta tags

### 3. Result

Each HTML file has:
- ✅ Unique `<title>` tag
- ✅ Unique `<meta name="description">`
- ✅ Unique `<link rel="canonical">`
- ✅ Unique Open Graph tags (og:title, og:image, og:url)
- ✅ Unique Twitter Card tags
- ✅ Same bundled JavaScript and CSS
- ✅ Same performance optimizations

---

## 🧪 Verification

### Test Locally Before Deploy

```bash
# Build with SEO pages
npm run build
node scripts/post-build-static-pages.js

# Start preview server
npm run preview
```

Then verify:

#### 1. Check Files Exist
```bash
ls -la dist/*.html
```
Should show:
- `index.html`
- `caffeine-sleep.html`
- `jet-lag.html`

#### 2. View Source in Browser

Visit http://localhost:4173/ and:

**Homepage:**
- Visit: http://localhost:4173/
- Press: Ctrl+U (View Source)
- Check: `<title>Sleep Calculator - Calculate Best Bedtime...</title>`

**Caffeine Page:**
- Visit: http://localhost:4173/caffeine-sleep
- Press: Ctrl+U (View Source)  
- Check: `<title>Caffeine & Sleep Calculator - When to Stop...</title>`

**Jet Lag Page:**
- Visit: http://localhost:4173/jet-lag
- Press: Ctrl+U (View Source)
- Check: `<title>Jet Lag Calculator - Beat Jet Lag Fast...</title>`

✅ **Each page should show DIFFERENT title in source**

#### 3. Verify Meta Tags

Use curl to check:

```bash
# Check caffeine page
curl -s http://localhost:4173/caffeine-sleep | grep -E "<title|<meta name=\"description\""

# Check jet lag page
curl -s http://localhost:4173/jet-lag | grep -E "<title|<meta name=\"description\""
```

Each should show unique content.

#### 4. Test Navigation

- Start on any page
- Click navigation menu
- Page should transition smoothly (no reload)
- URL should update
- Content should change

✅ **Client-side routing should still work perfectly**

---

## 🚀 Deployment

### Netlify

#### Method 1: CLI

```bash
# Build
npm run build
node scripts/post-build-static-pages.js

# Deploy
netlify deploy --prod --dir=dist
```

#### Method 2: Git Integration

In Netlify dashboard:
- **Build command:** `npm run build && node scripts/post-build-static-pages.js`
- **Publish directory:** `dist`

#### Method 3: netlify.toml (Already configured)

The `netlify.toml` file already has:
```toml
[build]
  publish = "dist"
  command = "npm run build"
```

Update to:
```toml
[build]
  publish = "dist"
  command = "npm run build && node scripts/post-build-static-pages.js"
```

### Vercel

#### Method 1: CLI

```bash
# Build
npm run build
node scripts/post-build-static-pages.js

# Deploy
vercel --prod
```

#### Method 2: Git Integration

In Vercel dashboard:
- **Build Command:** `npm run build && node scripts/post-build-static-pages.js`
- **Output Directory:** `dist`

#### Method 3: vercel.json (Add build config)

Add to `vercel.json`:
```json
{
  "buildCommand": "npm run build && node scripts/post-build-static-pages.js",
  "outputDirectory": "dist",
  "rewrites": [
    {
      "source": "/caffeine-sleep",
      "destination": "/caffeine-sleep.html"
    },
    {
      "source": "/jet-lag",
      "destination": "/jet-lag.html"
    },
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

---

## ⚙️ Build Configuration

### Current Setup

**File:** `/scripts/post-build-static-pages.js`

Generates:
- `caffeine-sleep.html` - Caffeine & Sleep Calculator
- `jet-lag.html` - Jet Lag Calculator

### Adding New Pages

To add a new calculator page (e.g., `nap-calculator`):

#### 1. Update the script

Edit `/scripts/post-build-static-pages.js`:

```javascript
const pages = {
  'caffeine-sleep.html': { /* existing */ },
  'jet-lag.html': { /* existing */ },
  'nap-calculator.html': {  // ADD THIS
    title: 'Nap Calculator - Perfect Nap Time | EyeLoveSleep',
    description: 'Calculate optimal nap duration...',
    keywords: 'nap calculator, power nap, nap time...',
    url: 'https://eyelovesleep.com/nap-calculator',
    canonical: 'https://eyelovesleep.com/nap-calculator',
    ogImage: 'https://eyelovesleep.com/og-nap-calculator.png',
    ogTitle: 'Nap Calculator - Perfect Nap Time | EyeLoveSleep',
    twitterTitle: 'Nap Calculator | EyeLoveSleep',
  }
};
```

#### 2. Update routing

Add to `netlify.toml`:
```toml
[[redirects]]
  from = "/nap-calculator"
  to = "/nap-calculator.html"
  status = 200
```

Add to `vercel.json`:
```json
{
  "source": "/nap-calculator",
  "destination": "/nap-calculator.html"
}
```

#### 3. Update sitemap

Add to `/public/sitemap.xml`:
```xml
<url>
  <loc>https://eyelovesleep.com/nap-calculator</loc>
  <lastmod>2025-11-13</lastmod>
  <changefreq>weekly</changefreq>
  <priority>0.9</priority>
</url>
```

#### 4. Rebuild and deploy

```bash
npm run build
node scripts/post-build-static-pages.js
# Deploy
```

---

## 🐛 Troubleshooting

### Issue: Script says "dist directory not found"

**Solution:** Run `npm run build` first
```bash
npm run build
node scripts/post-build-static-pages.js
```

### Issue: All pages show same title in View Source

**Cause:** Static pages not generated or not deployed

**Solution:**
1. Check if script ran: `ls dist/*.html`
2. Verify files exist: `caffeine-sleep.html` and `jet-lag.html`
3. Re-run: `node scripts/post-build-static-pages.js`
4. Re-deploy: Upload entire `dist/` folder

### Issue: 404 error on /caffeine-sleep

**Cause:** Routing not configured or files not deployed

**Solution:**
1. Verify `netlify.toml` or `vercel.json` has correct redirects
2. Check files exist in deployed `dist/` folder
3. Re-deploy with proper build command

### Issue: Script fails with error

**Cause:** Missing dependencies or corrupted dist/index.html

**Solution:**
1. Clean build: `rm -rf dist && npm run build`
2. Re-run script: `node scripts/post-build-static-pages.js`
3. Check for errors in console output

---

## 📊 Build Performance

### Typical Build Times

- **Vite build:** 10-30 seconds
- **Static page generation:** 1-2 seconds
- **Total:** ~15-35 seconds

### Build Output Size

```
dist/
├── index.html              ~15 KB
├── caffeine-sleep.html     ~15 KB
├── jet-lag.html            ~15 KB
├── assets/
│   ├── main.[hash].js      ~150 KB (gzipped)
│   ├── vendor.[hash].js    ~200 KB (gzipped)
│   └── *.css               ~30 KB (gzipped)
Total: ~400-500 KB
```

---

## ✅ Checklist

Before deploying:

- [ ] ✅ Run `npm run build`
- [ ] ✅ Run `node scripts/post-build-static-pages.js`
- [ ] ✅ Verify `dist/caffeine-sleep.html` exists
- [ ] ✅ Verify `dist/jet-lag.html` exists
- [ ] ✅ Test with `npm run preview`
- [ ] ✅ Check View Source shows different titles
- [ ] ✅ Verify navigation works smoothly
- [ ] ✅ Deploy `dist/` folder to hosting
- [ ] ✅ Test deployed site with View Source
- [ ] ✅ Submit to search engines

---

## 📚 Related Documentation

- `BING-CRAWL-FIX.md` - Why static pages are needed
- `VERIFY-BING-FIX.txt` - How to verify after deployment
- `DEPLOY-CHECKLIST-BING-FIX.md` - Complete deployment checklist
- `SEO-FILES-FIXED.md` - Robots.txt and sitemap info

---

## 🎯 Summary

**Build Process:**
```
1. npm run build
2. node scripts/post-build-static-pages.js
3. npm run preview (optional - test locally)
4. Deploy dist/ folder
```

**Result:**
- ✅ Each route has its own HTML file with proper meta tags
- ✅ Search engines see correct content without JavaScript
- ✅ Users get fast client-side navigation
- ✅ Social media shows correct previews
- ✅ SEO optimized for all search engines

**Deploy to Netlify/Vercel with:**
```bash
npm run build && node scripts/post-build-static-pages.js
```

---

**Last Updated:** November 14, 2025
**Status:** ✅ Ready for Production
