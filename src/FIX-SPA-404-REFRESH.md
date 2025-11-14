# 🔧 Fix: 404 Error on Page Refresh in SPA

## 🐛 Problem

- ✅ Clicking navigation links works fine
- ❌ Refreshing the page on `/caffeine-sleep` gives 404 error
- ❌ Direct URL access to `/caffeine-sleep` gives 404 error

## 🎯 Root Cause

This is a classic **Single Page Application (SPA) routing issue**:

1. **When clicking a link:** React Router handles navigation client-side (works ✅)
2. **When refreshing/direct access:** Browser makes a real HTTP request to server (fails ❌)
3. **Server doesn't have a file** at `/caffeine-sleep`, so it returns 404

## ✅ Solution

The `.htaccess` file must rewrite all requests to `index.html` so React Router can handle routing.

### Correct .htaccess Configuration

I've created the correct `.htaccess` file at `/public/.htaccess`:

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  
  # Don't rewrite files that actually exist
  RewriteCond %{REQUEST_FILENAME} !-f
  
  # Don't rewrite directories that actually exist
  RewriteCond %{REQUEST_FILENAME} !-d
  
  # Don't rewrite service worker
  RewriteCond %{REQUEST_URI} !^/service-worker\.js
  
  # Rewrite everything else to index.html
  RewriteRule ^ index.html [L]
</IfModule>
```

**Key points:**
- ✅ Simple and focused on SPA routing
- ✅ Only rewrites if file/directory doesn't exist
- ✅ Preserves service worker access
- ✅ No conflicting rules

### What Was Wrong Before

The old `.htaccess` (in `htaccess-production.txt`) had this conflicting rule:

```apache
# Add .html to clean URLs if file exists
RewriteCond %{REQUEST_FILENAME}.html -f
RewriteRule ^(.+)$ $1.html [L]
```

This tried to add `.html` extensions, which conflicts with SPA routing!

---

## 🚀 Deploy Steps

### 1. Build with New .htaccess

```bash
npm run build
```

The `.htaccess` file will be copied from `/public/.htaccess` to `/dist/.htaccess` automatically.

### 2. Verify Build Output

```bash
ls -la dist/.htaccess
```

Should show the `.htaccess` file exists in dist folder.

### 3. Upload to Server

Upload **everything** from `dist/` folder, including:
- ✅ `index.html`
- ✅ `.htaccess` **(CRITICAL!)**
- ✅ `assets/` folder
- ✅ All other files

**Important:** Make sure `.htaccess` is uploaded! It's a hidden file, so some FTP clients might not show it by default.

### 4. Verify .htaccess on Server

```bash
# SSH into your server and check
ls -la /path/to/webroot/.htaccess

# Or via FTP: Enable "Show hidden files"
```

### 5. Test

Visit these URLs directly (type in address bar or refresh):

```
✅ https://eyelovesleep.com/
✅ https://eyelovesleep.com/caffeine-sleep
✅ https://eyelovesleep.com/jet-lag
```

All should work without 404 errors!

---

## 🔍 Troubleshooting

### Issue: Still getting 404 after upload

**Possible causes:**

#### 1. .htaccess Not Uploaded

**Check:**
```bash
# Via SSH
ls -la /var/www/yoursite/.htaccess

# Via browser (should see 403 Forbidden, not 404)
https://eyelovesleep.com/.htaccess
```

**Solution:**
- Enable "Show hidden files" in your FTP client
- Re-upload `.htaccess` manually
- Check file permissions (should be 644)

#### 2. mod_rewrite Not Enabled

**Check:**
```bash
# On Ubuntu/Debian
apache2ctl -M | grep rewrite

# Should output: rewrite_module (shared)
```

**Solution:**
```bash
sudo a2enmod rewrite
sudo systemctl restart apache2
```

#### 3. AllowOverride Not Set

The server must allow `.htaccess` to override settings.

**Check Apache config:**
```apache
# In /etc/apache2/sites-available/your-site.conf
<Directory /var/www/yoursite>
    AllowOverride All
</Directory>
```

**If it says `AllowOverride None`:**
```bash
# Change to AllowOverride All
sudo nano /etc/apache2/sites-available/000-default.conf

# Then restart
sudo systemctl restart apache2
```

#### 4. Wrong RewriteBase

If your site is in a subdirectory (e.g., `example.com/myapp/`):

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /myapp/  # ← Add subdirectory here
  
  # ... rest of rules
</IfModule>
```

#### 5. Caching Issues

**Clear all caches:**
```bash
# Browser
Ctrl+Shift+R (Windows/Linux)
Cmd+Shift+R (Mac)

# Or test in Incognito/Private mode

# Server (if using proxy/CDN)
# Purge CloudFlare cache, etc.
```

---

## 🧪 Test .htaccess Locally

You can test if `.htaccess` works on your server:

### Create test.html

```bash
# SSH into server
cd /var/www/yoursite/
echo "htaccess works!" > test.html
```

### Test URL Rewriting

```bash
# This should show "htaccess works!" (not 404)
curl https://eyelovesleep.com/test-page-that-doesnt-exist
```

If it returns 404, `.htaccess` is not working.

---

## 📊 Verification Checklist

After fixing:

- [ ] `.htaccess` exists in `/dist/` after build
- [ ] `.htaccess` uploaded to server web root
- [ ] `.htaccess` file permissions are 644
- [ ] mod_rewrite is enabled (`apache2ctl -M | grep rewrite`)
- [ ] AllowOverride is set to All in Apache config
- [ ] Refreshing `/caffeine-sleep` works (no 404)
- [ ] Direct URL access works: type URL in address bar
- [ ] Browser back button works
- [ ] All calculators function correctly

---

## 🎯 Quick Fix Commands

### On Your Local Machine

```bash
# 1. Verify .htaccess exists
ls -la public/.htaccess

# 2. Build
npm run build

# 3. Verify it's in dist
ls -la dist/.htaccess

# 4. Upload dist/* to server (including .htaccess)
```

### On Your Server (via SSH)

```bash
# 1. Check if .htaccess exists
ls -la /var/www/eyelovesleep.com/.htaccess

# 2. Check mod_rewrite
apache2ctl -M | grep rewrite

# 3. Enable mod_rewrite (if not enabled)
sudo a2enmod rewrite
sudo systemctl restart apache2

# 4. Check Apache config
cat /etc/apache2/sites-available/000-default.conf | grep -A 5 "Directory"

# 5. Edit if needed
sudo nano /etc/apache2/sites-available/000-default.conf
# Set AllowOverride All

# 6. Restart Apache
sudo systemctl restart apache2

# 7. Test
curl https://eyelovesleep.com/caffeine-sleep
```

---

## 📝 Alternative Solutions

### Option 1: Use Nginx Instead

If your server uses Nginx, use this config:

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

### Option 2: Use Static Hosting

Deploy to platforms with built-in SPA support:

**Netlify:** Already configured via `netlify.toml`
**Vercel:** Already configured via `vercel.json`
**GitHub Pages:** Use hash routing instead

---

## 🎯 Expected Behavior After Fix

### ✅ What Should Work

1. **Homepage:** `https://eyelovesleep.com/` → Loads sleep calculator
2. **Caffeine page:** `https://eyelovesleep.com/caffeine-sleep` → Loads caffeine calculator
3. **Jet lag page:** `https://eyelovesleep.com/jet-lag` → Loads jet lag calculator
4. **Navigation:** Click links → Instant page change (no reload)
5. **Refresh:** Press F5 on any page → Page reloads correctly (no 404)
6. **Direct access:** Type URL in address bar → Page loads correctly (no 404)
7. **Browser back:** Click back button → Previous page loads (no 404)
8. **Browser forward:** Click forward button → Next page loads (no 404)

### ❌ What Should NOT Happen

1. 404 error on page refresh
2. 404 error on direct URL access
3. 404 error when using browser back button
4. Blank page after navigation

---

## 🆘 Still Not Working?

### Enable Debug Mode in .htaccess

Add this to see what's happening:

```apache
# At the top of .htaccess
RewriteEngine On
RewriteLog /tmp/rewrite.log
RewriteLogLevel 9
```

Then check the log:
```bash
tail -f /tmp/rewrite.log
```

### Check Apache Error Logs

```bash
# Ubuntu/Debian
tail -f /var/log/apache2/error.log

# CentOS/RHEL
tail -f /var/log/httpd/error_log
```

### Test with curl

```bash
# Test direct access
curl -I https://eyelovesleep.com/caffeine-sleep

# Should return: HTTP/1.1 200 OK
# Not: HTTP/1.1 404 Not Found
```

---

## 📚 Understanding the Flow

### Before Fix (Broken)

```
User visits: /caffeine-sleep
    ↓
Browser requests: GET /caffeine-sleep
    ↓
Server looks for file: /caffeine-sleep (doesn't exist)
    ↓
Server returns: 404 Not Found ❌
```

### After Fix (Working)

```
User visits: /caffeine-sleep
    ↓
Browser requests: GET /caffeine-sleep
    ↓
.htaccess intercepts: File doesn't exist
    ↓
.htaccess rewrites to: index.html
    ↓
Server returns: index.html (200 OK) ✅
    ↓
React loads: Parses URL /caffeine-sleep
    ↓
React Router: Matches route → CaffeineSleepPage
    ↓
Page renders: Caffeine calculator ✅
```

---

## ✅ Summary

**Problem:** 404 on page refresh  
**Cause:** Missing or incorrect .htaccess  
**Solution:** Use correct SPA .htaccess configuration  

**Files fixed:**
- ✅ `/public/.htaccess` - Created with correct SPA routing

**Next steps:**
1. Build: `npm run build`
2. Upload: Everything from `dist/` (including `.htaccess`)
3. Test: Refresh `/caffeine-sleep` - should work!

---

## 🎉 After Fix

Your SPA will work perfectly:
- ✅ Navigation works
- ✅ Refresh works
- ✅ Direct URL access works
- ✅ Browser back/forward works
- ✅ All routes work without 404

**No more 404 errors!** 🚀
