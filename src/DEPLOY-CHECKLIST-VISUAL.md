# ✅ Deployment Checklist - Fix 404 Errors

## 🎯 Your Mission
Get `https://eyelovesleep.com/caffeine-sleep` and `https://eyelovesleep.com/jet-lag` working.

---

## 📦 PHASE 1: BUILD (On Your Local Machine)

```
┌─────────────────────────────────────────┐
│  YOUR LOCAL COMPUTER                    │
│                                         │
│  📁 eyelovesleep-project/              │
│     ├── index.html                      │
│     ├── caffeine-sleep.html             │
│     ├── jet-lag.html                    │
│     ├── .htaccess                       │
│     ├── components/                     │
│     ├── src/                            │
│     └── vite.config.ts                  │
└─────────────────────────────────────────┘
                   │
                   │ npm run build
                   ▼
┌─────────────────────────────────────────┐
│  📁 dist/  (BUILD OUTPUT)               │
│     ├── index.html              ✅      │
│     ├── caffeine-sleep.html     ✅      │
│     ├── jet-lag.html            ✅      │
│     ├── assets/                         │
│     │   ├── main.[hash].js              │
│     │   ├── [other-files]               │
│     ├── robots.txt                      │
│     ├── sitemap.xml                     │
│     └── service-worker.js               │
│                                         │
│  ⚠️  .htaccess NOT included by default! │
│      Copy it manually: cp .htaccess dist/│
└─────────────────────────────────────────┘
```

### Commands:
```bash
cd /path/to/eyelovesleep-project
npm install                    # If first time
npm run build                  # Creates dist/ folder
cp .htaccess dist/.htaccess    # Copy .htaccess to dist/
ls -la dist/*.html             # Verify HTML files exist
```

### ✅ Checklist:
- [ ] `dist/index.html` exists
- [ ] `dist/caffeine-sleep.html` exists
- [ ] `dist/jet-lag.html` exists
- [ ] `dist/.htaccess` exists (copied manually)
- [ ] `dist/assets/` folder exists with JS/CSS files

---

## 🚀 PHASE 2: DEPLOY (Upload to Server)

```
┌─────────────────────────────────────────��
│  YOUR LOCAL COMPUTER                    │
│  📁 dist/                               │
│     ├── index.html                      │
│     ├── caffeine-sleep.html             │
│     ├── jet-lag.html                    │
│     ├── .htaccess                       │
│     └── assets/                         │
└─────────────────────────────────────────┘
                   │
                   │ FTP/rsync/upload
                   │ (ALL FILES)
                   ▼
┌─────────────────────────────────────────┐
│  🌐 PRODUCTION SERVER                   │
│  eyelovesleep.com                       │
│                                         │
│  📁 /var/www/eyelovesleep.com/         │
│  (or /home/user/public_html/)           │
│                                         │
│     ├── index.html              ✅      │
│     ├── caffeine-sleep.html     ✅      │
│     ├── jet-lag.html            ✅      │
│     ├── .htaccess               ✅      │
│     ├── assets/                         │
│     │   ├── main.[hash].js              │
│     │   ├── [other-files]               │
│     ├── robots.txt                      │
│     ├── sitemap.xml                     │
│     └── service-worker.js               │
└─────────────────────────────────────────┘
```

### Method A: Using FTP/SFTP
1. Open FileZilla/Cyberduck/WinSCP
2. Connect to your server
3. Navigate to web root (`public_html/` or `/var/www/eyelovesleep.com/`)
4. **Enable "Show Hidden Files"** (to see .htaccess)
5. Delete old files (backup first!)
6. Upload **ALL** files from local `dist/` folder
7. Verify .htaccess was uploaded

### Method B: Using rsync (faster)
```bash
rsync -avz --delete dist/ user@eyelovesleep.com:/path/to/web/directory/
```

### ✅ Checklist:
- [ ] Found the correct web directory on server
- [ ] Backed up old files
- [ ] Uploaded all files from `dist/`
- [ ] Verified `.htaccess` is on server (it's hidden!)
- [ ] Verified HTML files are on server

---

## 🧪 PHASE 3: TEST

```
┌─────────────────────────────────────────┐
│  TEST 1: Direct File Access             │
│  (with .html extension)                 │
└─────────────────────────────────────────┘

https://eyelovesleep.com/index.html
  ↓
  Status: 200 OK? 
  YES ✅ → Files uploaded correctly!
  NO  ❌ → Files NOT on server, go back to Phase 2

https://eyelovesleep.com/caffeine-sleep.html
  ↓
  Status: 200 OK?
  YES ✅ → Files uploaded correctly!
  NO  ❌ → Files NOT on server, go back to Phase 2

https://eyelovesleep.com/jet-lag.html
  ↓
  Status: 200 OK?
  YES ✅ → Files uploaded correctly!
  NO  ❌ → Files NOT on server, go back to Phase 2

┌─────────────────────────────────────────┐
│  TEST 2: Clean URLs                     │
│  (without .html extension)              │
└─────────────────────────────────────────┘

https://eyelovesleep.com/caffeine-sleep
  ↓
  Status: 200 OK?
  YES ✅ → SUCCESS! .htaccess working!
  NO  ❌ → Go to Phase 4 (fix Apache)

https://eyelovesleep.com/jet-lag
  ↓
  Status: 200 OK?
  YES ✅ → SUCCESS! .htaccess working!
  NO  ❌ → Go to Phase 4 (fix Apache)
```

### ✅ Checklist:
- [ ] Test 1 passed (direct URLs with .html work)
- [ ] Test 2 passed (clean URLs without .html work)
- [ ] Navigation menu clicks work
- [ ] No console errors
- [ ] Tested in incognito mode (to avoid cache)

---

## 🔧 PHASE 4: FIX APACHE (If Test 2 Failed)

```
┌─────────────────────────────────────────┐
│  If Test 1 ✅ but Test 2 ❌             │
│  → Files are uploaded                   │
│  → But .htaccess not working            │
│  → Need to enable mod_rewrite           │
└─────────────────────────────────────────┘
```

### SSH into Server:
```bash
ssh user@your-server

# 1. Enable mod_rewrite
sudo a2enmod rewrite

# 2. Check if it's enabled
apache2ctl -M | grep rewrite
# Should show: rewrite_module (shared)

# 3. Edit Apache config
sudo nano /etc/apache2/sites-available/eyelovesleep.conf

# Make sure you have:
<Directory /var/www/eyelovesleep.com>
    AllowOverride All    ← MUST BE "All"
    Require all granted
</Directory>

# 4. Test config
sudo apache2ctl configtest

# 5. Restart Apache
sudo systemctl restart apache2

# 6. Test again
exit
```

### ✅ Checklist:
- [ ] mod_rewrite enabled
- [ ] `AllowOverride All` set in Apache config
- [ ] Apache restarted
- [ ] Clean URLs now work

---

## 🎉 SUCCESS CRITERIA

All of these should work:

| URL | Status | Page |
|-----|--------|------|
| `https://eyelovesleep.com/` | 200 OK | 🌙 Sleep Calculator |
| `https://eyelovesleep.com/caffeine-sleep` | 200 OK | ☕ Caffeine Calculator |
| `https://eyelovesleep.com/jet-lag` | 200 OK | ✈️ Jet Lag Calculator |
| `https://eyelovesleep.com/caffeine-sleep.html` | 200 OK | ☕ Caffeine Calculator |
| `https://eyelovesleep.com/jet-lag.html` | 200 OK | ✈️ Jet Lag Calculator |

### Browser Console Should Show:
```
Console:
  🌙 Sleep Calculator Page Loaded
  or
  ☕ Caffeine Sleep Calculator Page Loaded
  or
  ✈️ Jet Lag Calculator Page Loaded
```

---

## 🐛 TROUBLESHOOTING FLOWCHART

```
404 Error on /caffeine-sleep
         |
         ▼
Test: https://eyelovesleep.com/caffeine-sleep.html
         |
    ┌────┴────┐
    |         |
  Works    404 Error
    |         |
    ▼         ▼
.htaccess    Files NOT
not working  on server
    |         |
    ▼         ▼
Enable       Upload
mod_rewrite  files from
             dist/
```

### Common Issues:

**Issue:** Both URLs (with and without .html) return 404
- **Cause:** Files not uploaded
- **Fix:** Go back to Phase 2, upload all files from `dist/`

**Issue:** URLs with .html work, but without .html return 404
- **Cause:** .htaccess not working
- **Fix:** Go to Phase 4, enable mod_rewrite

**Issue:** Uploaded files but still showing old version
- **Cause:** Browser/server cache
- **Fix:** Hard refresh (Ctrl+Shift+R), clear cache, test in incognito

**Issue:** .htaccess uploaded but not working
- **Cause 1:** mod_rewrite not enabled
- **Fix:** `sudo a2enmod rewrite && sudo systemctl restart apache2`
- **Cause 2:** AllowOverride set to None
- **Fix:** Change to `AllowOverride All` in Apache config

---

## 🆘 EMERGENCY COMMANDS

```bash
# On your local machine:
npm run build
ls -la dist/*.html
cp .htaccess dist/.htaccess

# Upload to server:
rsync -avz --delete dist/ user@server:/path/to/web/directory/

# On server:
ls -la /path/to/web/directory/*.html
ls -la /path/to/web/directory/.htaccess
apache2ctl -M | grep rewrite
sudo systemctl restart apache2

# Test:
curl -I https://eyelovesleep.com/caffeine-sleep.html
curl -I https://eyelovesleep.com/caffeine-sleep
```

---

## 📞 NEED HELP?

Run these commands and share the output:

```bash
# 1. Local files
ls -la dist/*.html

# 2. Server files
ssh user@server "ls -la /path/to/web/directory/"

# 3. Apache modules
ssh user@server "apache2ctl -M | grep rewrite"

# 4. Test URLs
curl -I https://eyelovesleep.com/caffeine-sleep.html
curl -I https://eyelovesleep.com/caffeine-sleep

# 5. Error log
ssh user@server "sudo tail -30 /var/log/apache2/error.log"
```

---

**You got this! 🚀**
