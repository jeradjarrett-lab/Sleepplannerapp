# 🚨 QUICK FIX: Navigation Not Working

## The Problem
All pages are showing the Sleep Calculator because the old `.htaccess` is rewriting everything to `index.html`.

## The Solution (5 Steps)

### 1️⃣ Upload New .htaccess
Replace the `.htaccess` file on your server with the new one from the project root.

**Old (BROKEN):**
```apache
RewriteRule . /index.html [L]
```

**New (FIXED):**
```apache
# Route clean URLs to .html files
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteCond %{REQUEST_FILENAME}.html -f
RewriteRule ^(.*)$ $1.html [L]
```

### 2️⃣ Verify HTML Files Exist
SSH into your server and check:

```bash
cd /path/to/eyelovesleep.com
ls -la *.html
```

You should see:
- `index.html`
- `caffeine-sleep.html`
- `jet-lag.html`

### 3️⃣ Restart Apache
```bash
sudo systemctl restart apache2
```

### 4️⃣ Clear Browser Cache
1. Open DevTools (F12)
2. Application → Clear Storage → Clear site data
3. Hard refresh: `Ctrl+Shift+R`

### 5️⃣ Test URLs
These should now work:
- `https://eyelovesleep.com/` → Sleep Calculator
- `https://eyelovesleep.com/caffeine-sleep` → Caffeine Calculator
- `https://eyelovesleep.com/jet-lag` → Jet Lag Calculator

## 🔍 Verify It's Fixed

Open browser console. You should see different messages on each page:
- Sleep page: `🌙 Loading Sleep Calculator Page`
- Caffeine page: `☕ Loading Caffeine & Sleep Calculator Page`
- Jet Lag page: `✈️ Loading Jet Lag Calculator Page`

## ❓ Still Not Working?

### Check if mod_rewrite is enabled:
```bash
apache2ctl -M | grep rewrite
```

If not listed, enable it:
```bash
sudo a2enmod rewrite
sudo systemctl restart apache2
```

### Check Apache allows .htaccess overrides:
Edit: `/etc/apache2/sites-available/eyelovesleep.conf`

Should have:
```apache
<Directory /path/to/eyelovesleep.com>
    AllowOverride All
</Directory>
```

Then restart:
```bash
sudo systemctl restart apache2
```

### Force clear service worker:
1. DevTools (F12) → Application tab
2. Service Workers → Click "Unregister"
3. Refresh page

## 📞 Debug Checklist

- [ ] New `.htaccess` uploaded to server
- [ ] All 3 HTML files exist on server
- [ ] `mod_rewrite` enabled in Apache
- [ ] Apache restarted
- [ ] Browser cache cleared
- [ ] Service worker unregistered
- [ ] Testing in private/incognito mode

## 🎯 Expected Behavior

**Navigation Menu:**
- Clicking "Sleep Calculator" → Goes to `/`
- Clicking "Caffeine & Sleep" → Goes to `/caffeine-sleep`
- Clicking "Jet Lag" → Goes to `/jet-lag`

**Jump-to-Section:**
- Clicking sidebar links → Smooth scroll to section
- Active section highlighted in sidebar

**Console Logs:**
- Different emoji for each page (🌙, ☕, ✈️)
- "Navigation click: [Page] → [Path]" when clicking menu
- "NavigationMenu - Path: [current], Prop: [expected], Detected: [detected]"
