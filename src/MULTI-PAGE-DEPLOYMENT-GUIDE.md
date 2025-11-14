# Multi-Page Deployment Guide for EyeLoveSleep

## 🎯 Overview

Your app has been converted from a Single-Page Application (SPA) to a true Multi-Page Application with clean URLs.

**Clean URLs (No .html extension):**
- `https://eyelovesleep.com/` → Sleep Calculator
- `https://eyelovesleep.com/caffeine-sleep` → Caffeine Calculator  
- `https://eyelovesleep.com/jet-lag` → Jet Lag Calculator

## ✅ Changes Made

### 1. Updated `.htaccess` File
The `.htaccess` has been updated to:
- **Route clean URLs** to `.html` files (e.g., `/jet-lag` → `/jet-lag.html`)
- **Remove the old SPA rewrite rule** that was sending everything to `index.html`
- **Add caching headers** for better performance
- **Add security headers** for better security
- **Enable compression** for faster loading

### 2. Updated Navigation Links
All navigation links now use clean URLs without `.html`:
- `NavigationMenu.tsx` - Main navigation menu
- `Header.tsx` - Logo link

### 3. Verified Meta Tags
All HTML files already have correct clean URLs in:
- Canonical tags
- Open Graph tags  
- Sitemap.xml

## 📋 Deployment Steps

### Step 1: Build the Application

```bash
npm run build
```

This will create a `dist` folder with:
```
dist/
├── index.html
├── caffeine-sleep.html
├── jet-lag.html
├── assets/
│   ├── [hashed-js-files].js
│   ├── [hashed-css-files].css
│   └── [other-assets]
├── robots.txt
├── sitemap.xml
└── service-worker.js
```

### Step 2: Upload to Server

Upload **ALL** files from the `dist` folder to your server root, including:
- ✅ `index.html`
- ✅ `caffeine-sleep.html`
- ✅ `jet-lag.html`
- ✅ `assets/` folder (entire folder)
- ✅ `.htaccess` (from project root, NOT from dist)
- ✅ `robots.txt`
- ✅ `sitemap.xml`
- ✅ `service-worker.js`

### Step 3: Verify .htaccess is Active

SSH into your server and verify:

```bash
# Check if .htaccess exists
ls -la /path/to/your/site/.htaccess

# Verify Apache mod_rewrite is enabled
apache2ctl -M | grep rewrite
# Should output: rewrite_module (shared)
```

If `mod_rewrite` is not enabled, enable it:

```bash
sudo a2enmod rewrite
sudo systemctl restart apache2
```

### Step 4: Clear All Caches

**On Server:**
```bash
# Clear PHP opcache if applicable
sudo systemctl reload php-fpm

# Clear Apache cache
sudo systemctl restart apache2
```

**In Browser:**
1. Open DevTools (F12)
2. Go to Application → Storage → Clear site data
3. Check "Unregister service workers"
4. Click "Clear site data"
5. Hard refresh: `Ctrl+Shift+R` (Windows) or `Cmd+Shift+R` (Mac)

### Step 5: Test All URLs

Test these URLs in your browser (should all work):

**With .html extension (direct file access):**
- `https://eyelovesleep.com/index.html` → Redirects to `/`
- `https://eyelovesleep.com/caffeine-sleep.html` → Works
- `https://eyelovesleep.com/jet-lag.html` → Works

**Without .html extension (clean URLs):**
- `https://eyelovesleep.com/` → Works (Sleep Calculator)
- `https://eyelovesleep.com/caffeine-sleep` → Works (Caffeine Calculator)
- `https://eyelovesleep.com/jet-lag` → Works (Jet Lag Calculator)

### Step 6: Test Navigation

1. Click navigation menu items - should navigate correctly
2. Click jump-to-section links in sidebar - should scroll to sections
3. Check browser console for any errors

## 🔧 Troubleshooting

### Issue: All Pages Show Sleep Calculator

**Cause:** .htaccess is rewriting everything to index.html

**Solutions:**
1. Verify `.htaccess` file was uploaded correctly
2. Check that the new `.htaccess` content is active (not cached)
3. Ensure `mod_rewrite` is enabled in Apache
4. Check file permissions: `chmod 644 .htaccess`
5. Verify HTML files were uploaded: `ls -la /path/to/site/*.html`

### Issue: 404 Errors on Clean URLs

**Cause:** .htaccess not working or mod_rewrite not enabled

**Solutions:**
1. Enable `mod_rewrite`: `sudo a2enmod rewrite`
2. Check Apache config allows `.htaccess` overrides:
   ```apache
   <Directory /path/to/your/site>
       AllowOverride All
   </Directory>
   ```
3. Restart Apache: `sudo systemctl restart apache2`

### Issue: Navigation Doesn't Work After Clearing Cache

**Cause:** Service worker is still caching old files

**Solutions:**
1. Increment service worker version in `/public/service-worker.js`
2. Rebuild: `npm run build`
3. Redeploy service-worker.js
4. Force unregister service worker in browser:
   - DevTools → Application → Service Workers → Unregister

### Issue: Console Shows Wrong Page Loading

**Example:** Console shows "🌙 Loading Sleep Calculator Page" on all pages

**Cause:** JavaScript files are being cached

**Solutions:**
1. Check that built files in `dist/assets/` have unique hashes
2. Clear browser cache completely
3. Check Network tab in DevTools - JS files should have 200 status, not (disk cache)
4. Update service worker cache version

## 🎨 How the .htaccess Works

```apache
# This rule adds .html to URLs that don't have file extensions
RewriteCond %{REQUEST_FILENAME} !-f          # File doesn't exist
RewriteCond %{REQUEST_FILENAME} !-d          # Directory doesn't exist  
RewriteCond %{REQUEST_FILENAME}.html -f      # But .html version exists
RewriteRule ^(.*)$ $1.html [L]               # Add .html extension

# Example: /jet-lag → /jet-lag.html
```

## 🚀 Performance Optimizations in .htaccess

The new `.htaccess` includes:

1. **Browser Caching**
   - HTML: No cache (always fresh)
   - CSS/JS: 1 year cache with immutable flag
   - Images: 1 year cache

2. **Compression**
   - Gzip enabled for text files
   - Reduces bandwidth by ~70%

3. **Security Headers**
   - X-Content-Type-Options: nosniff
   - X-Frame-Options: SAMEORIGIN
   - X-XSS-Protection: 1; mode=block

## 📊 Verification Checklist

After deployment, verify:

- [ ] Sleep calculator loads at `/`
- [ ] Caffeine calculator loads at `/caffeine-sleep`
- [ ] Jet lag calculator loads at `/jet-lag`
- [ ] Navigation menu works correctly
- [ ] Jump-to-section links scroll smoothly
- [ ] Console logs show correct page loading (🌙, ☕, ✈️)
- [ ] No console errors
- [ ] Social sharing shows correct OG images
- [ ] Sitemap accessible at `/sitemap.xml`
- [ ] Robots.txt accessible at `/robots.txt`

## 🆘 Getting Help

If you're still having issues:

1. Check browser console for error messages
2. Check Apache error logs: `sudo tail -f /var/log/apache2/error.log`
3. Verify file structure matches expected structure above
4. Test with a different browser (no cache)
5. Test in private/incognito mode

## 📝 Notes

- The old `App.tsx` file with React Router is no longer used
- Each page has its own entry point: `sleep-main.tsx`, `caffeine-main.tsx`, `jet-lag-main.tsx`
- Service worker caches JavaScript files with network-first strategy to prevent stale code
- All meta tags (canonical, OG, Twitter) use clean URLs without .html
