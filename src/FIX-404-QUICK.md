# ⚡ FIX 404 ERRORS - Quick Version

## The Problem
Your `.htaccess` is correct, but **the HTML files aren't on your server yet**.

## The Solution (3 Commands)

### 1️⃣ Build Locally
```bash
cd /path/to/eyelovesleep-project
npm install
npm run build
```

### 2️⃣ Copy .htaccess to dist/
```bash
cp .htaccess dist/.htaccess
```

### 3️⃣ Upload to Server
```bash
# Option A: Using rsync (fastest)
rsync -avz --delete dist/ user@eyelovesleep.com:/path/to/web/directory/

# Option B: Using FTP
# - Connect to server with FileZilla/Cyberduck
# - Upload EVERYTHING from dist/ folder
# - Make sure .htaccess is uploaded (enable "Show Hidden Files")
```

## Verify It Worked

**Test these URLs:**
- ✅ `https://eyelovesleep.com/caffeine-sleep` → Should work now!
- ✅ `https://eyelovesleep.com/jet-lag` → Should work now!

**If still 404, enable mod_rewrite:**
```bash
ssh user@server
sudo a2enmod rewrite
sudo systemctl restart apache2
```

## Files That MUST Be on Server

```
/path/to/web/directory/
├── .htaccess              ← CRITICAL
├── index.html             ← From dist/
├── caffeine-sleep.html    ← From dist/
├── jet-lag.html           ← From dist/
├── assets/                ← Entire folder from dist/
├── robots.txt
├── sitemap.xml
└── service-worker.js
```

## Common Mistakes

❌ Uploaded source files instead of dist/ files
❌ Didn't include .htaccess (it's hidden)
❌ Uploaded to wrong directory
❌ mod_rewrite not enabled

## Quick Test Commands

```bash
# Verify files on server
ssh user@server "ls -la /path/to/web/directory/*.html"

# Test URLs
curl -I https://eyelovesleep.com/caffeine-sleep.html
curl -I https://eyelovesleep.com/caffeine-sleep

# Check mod_rewrite
ssh user@server "apache2ctl -M | grep rewrite"
```

---

**Need detailed instructions?** See `DEPLOY-STEPS-NOW.md`
