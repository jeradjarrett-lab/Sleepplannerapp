# 🚀 Single Page Application (SPA) Deployment Guide

## ✅ Website Converted Back to SPA

The EyeLoveSleep website is now a **single-page application (SPA)** with **client-side routing** using React Router.

---

## 🎯 How It Works

### Client-Side Routing

```
User visits:     https://eyelovesleep.com/caffeine-sleep
                           ↓
Server serves:   index.html (always)
                           ↓
React Router:    Loads CaffeineSleepPage component
                           ↓
Page renders:    Caffeine calculator without full page reload
```

**Navigation is instant** - no page reloads between calculators!

---

## 📁 File Structure

```
EyeLoveSleep (SPA)
├── index.html                    ← Single entry point
├── src/
│   └── main.tsx                  ← Main entry that loads App.tsx
├── App.tsx                       ← Router configuration
├── pages/
│   ├── SleepCalculatorPage.tsx   ← / route
│   ├── CaffeineSleepPage.tsx     ← /caffeine-sleep route
│   └── JetLagPage.tsx            ← /jet-lag route
└── components/
    ├── NavigationMenu.tsx        ← Uses React Router <Link>
    └── Header.tsx                ← Uses React Router <Link>
```

---

## 🔗 URL Structure

### Clean URLs (with .htaccess)

```
https://eyelovesleep.com/
https://eyelovesleep.com/caffeine-sleep
https://eyelovesleep.com/jet-lag
```

### Routes in App.tsx

```tsx
<Routes>
  <Route path="/" element={<SleepCalculatorPage />} />
  <Route path="/caffeine-sleep" element={<CaffeineSleepPage />} />
  <Route path="/jet-lag" element={<JetLagPage />} />
  <Route path="*" element={<SleepCalculatorPage />} />
</Routes>
```

---

## 📤 Deployment Steps

### 1. Build the Application

```bash
npm run build
```

This creates optimized production files in `dist/` folder.

### 2. Upload Files to Server

Upload **everything** from `dist/` to your web root:

```
dist/
├── index.html              ← Main SPA entry point
├── assets/                 ← JavaScript, CSS, images
│   ├── main.[hash].js
│   ├── react-vendor.[hash].js
│   ├── motion.[hash].js
│   └── [other files]
├── .htaccess               ← SPA routing configuration
├── robots.txt
├── sitemap.xml
└── service-worker.js
```

### 3. Verify .htaccess

The `.htaccess` file is **critical** for SPA routing. It ensures all routes serve `index.html`:

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  
  # Don't rewrite existing files
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  
  # Serve index.html for all other requests
  RewriteRule ^ index.html [L]
</IfModule>
```

### 4. Test URLs

After deployment, test these URLs:

```
✅ https://eyelovesleep.com/
✅ https://eyelovesleep.com/caffeine-sleep
✅ https://eyelovesleep.com/jet-lag
```

All should work without 404 errors!

### 5. Test Navigation

1. Visit homepage
2. Click "Caffeine & Sleep" in nav
3. URL changes to `/caffeine-sleep` (NO page reload!)
4. Click "Jet Lag"
5. URL changes to `/jet-lag` (NO page reload!)

**Navigation should be instant!**

---

## 🔧 Server Requirements

### Apache (Recommended)

**Requirements:**
- ✅ mod_rewrite enabled
- ✅ .htaccess support (AllowOverride All)

**Enable mod_rewrite:**
```bash
sudo a2enmod rewrite
sudo systemctl restart apache2
```

**Apache config:**
```apache
<Directory /var/www/eyelovesleep.com>
    AllowOverride All
</Directory>
```

### Nginx

Create this configuration:

```nginx
server {
    listen 80;
    server_name eyelovesleep.com;
    root /var/www/eyelovesleep.com;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

### Netlify

Create `netlify.toml` (already included):

```toml
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### Vercel

Create `vercel.json` (already included):

```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

---

## ✅ What Changed from Multi-Page

### Before (Multi-Page)

```
✅ index.html (sleep calculator)
✅ caffeine-sleep.html (caffeine calculator)
✅ jet-lag.html (jet lag calculator)
✅ Full page reload on navigation
✅ Three separate entry points
```

### After (SPA)

```
✅ index.html (single entry point)
✅ Client-side routing with React Router
✅ Instant navigation (no page reloads)
✅ Single entry point: src/main.tsx
✅ Lazy loaded page components
```

---

## 🎨 Navigation

### React Router Links

```tsx
// NavigationMenu.tsx
import { Link } from 'react-router-dom';

<Link to="/">Sleep Calculator</Link>
<Link to="/caffeine-sleep">Caffeine & Sleep</Link>
<Link to="/jet-lag">Jet Lag</Link>
```

### Benefits

- ✅ No full page reload
- ✅ Instant navigation
- ✅ Shared state between pages
- ✅ Smooth transitions
- ✅ Better UX

---

## 📊 SEO Configuration

### Sitemap

```xml
<url>
  <loc>https://eyelovesleep.com/</loc>
  <priority>1.0</priority>
</url>
<url>
  <loc>https://eyelovesleep.com/caffeine-sleep</loc>
  <priority>0.9</priority>
</url>
<url>
  <loc>https://eyelovesleep.com/jet-lag</loc>
  <priority>0.9</priority>
</url>
```

### Canonical URLs

```tsx
// In each page component
<Helmet>
  <link rel="canonical" href="https://eyelovesleep.com/caffeine-sleep" />
</Helmet>
```

### Meta Tags

Each page component has its own meta tags via React Helmet.

---

## 🧪 Testing

### Local Development

```bash
npm run dev
```

Visit:
- `http://localhost:5173/`
- `http://localhost:5173/caffeine-sleep`
- `http://localhost:5173/jet-lag`

### Production Build Test

```bash
npm run build
npm run preview
```

Visit the same URLs to test production build.

---

## 🚨 Common Issues

### Issue: 404 on Direct URL Access

**Symptom:** `/caffeine-sleep` gives 404 when accessed directly

**Solution:** 
- Check `.htaccess` is uploaded
- Verify mod_rewrite is enabled
- Check AllowOverride is set to All

### Issue: Blank Page

**Symptom:** Page loads but shows nothing

**Solution:**
- Check browser console for errors
- Verify all assets uploaded
- Check base URL in index.html

### Issue: Navigation Doesn't Work

**Symptom:** Clicking nav buttons doesn't change page

**Solution:**
- Clear browser cache
- Check React Router is installed
- Verify Links are using `to` prop, not `href`

---

## 🎯 Benefits of SPA

### User Experience

- ✅ **Instant navigation** - No page reloads
- ✅ **Smooth transitions** - Can add animations
- ✅ **Shared state** - Maintains state between pages
- ✅ **Faster perceived performance**

### Development

- ✅ **Single entry point** - Easier to manage
- ✅ **Code splitting** - Lazy load pages
- ✅ **Shared components** - Header, footer used once
- ✅ **React Router** - Powerful routing capabilities

### Performance

- ✅ **Smaller initial load** - Lazy loaded pages
- ✅ **No full page reloads** - Only load what's needed
- ✅ **Better caching** - Assets cached longer

---

## 📚 Technical Details

### Entry Point Flow

```
1. Browser requests any URL (e.g., /caffeine-sleep)
2. Server serves index.html (via .htaccess rewrite)
3. index.html loads /src/main.tsx
4. main.tsx renders App.tsx
5. App.tsx initializes React Router
6. React Router matches URL to route
7. Correct page component loads (lazy loaded)
8. Page renders
```

### Lazy Loading

```tsx
// App.tsx
const SleepCalculatorPage = lazy(() => import("./pages/SleepCalculatorPage"));
const CaffeineSleepPage = lazy(() => import("./pages/CaffeineSleepPage"));
const JetLagPage = lazy(() => import("./pages/JetLagPage"));
```

Pages load only when needed, reducing initial bundle size.

### Code Splitting

```
Build output:
├── main.[hash].js          ← App shell, routing
├── react-vendor.[hash].js  ← React libraries
├── SleepCalculatorPage.[hash].js    ← Lazy loaded
├── CaffeineSleepPage.[hash].js      ← Lazy loaded
└── JetLagPage.[hash].js             ← Lazy loaded
```

---

## ✅ Verification Checklist

After deployment:

- [ ] `index.html` uploaded
- [ ] `assets/` folder uploaded with all files
- [ ] `.htaccess` uploaded (Apache only)
- [ ] Homepage loads: `https://eyelovesleep.com/`
- [ ] Caffeine page loads: `https://eyelovesleep.com/caffeine-sleep`
- [ ] Jet lag page loads: `https://eyelovesleep.com/jet-lag`
- [ ] Navigation works between pages
- [ ] No full page reload on navigation
- [ ] All calculators function
- [ ] No console errors
- [ ] Direct URL access works (not just clicking nav)

---

## 🎉 Summary

**The website is now a modern SPA with:**

- ✅ Client-side routing with React Router
- ✅ Instant navigation between calculators
- ✅ Clean URLs (no .html extensions)
- ✅ Lazy loaded pages for performance
- ✅ Single entry point for simplicity
- ✅ All features preserved

**Deploy by:**
1. Running `npm run build`
2. Uploading `dist/` contents to server
3. Ensuring `.htaccess` works (Apache)

---

## 📖 Further Reading

- **React Router:** https://reactrouter.com/
- **Vite SPA deployment:** https://vitejs.dev/guide/static-deploy.html
- **Apache mod_rewrite:** https://httpd.apache.org/docs/current/mod/mod_rewrite.html

---

**Your SPA is ready to deploy!** 🚀
