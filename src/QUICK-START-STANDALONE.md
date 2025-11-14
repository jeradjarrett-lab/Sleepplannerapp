# ⚡ Quick Start - Standalone HTML

## 🎯 3 Steps to Deploy

### 1️⃣ Build
```bash
npm run build
```

### 2️⃣ Upload
Upload everything from `dist/` to your server's web root.

### 3️⃣ Done!
```
✅ https://eyelovesleep.com/index.html
✅ https://eyelovesleep.com/caffeine-sleep.html
✅ https://eyelovesleep.com/jet-lag.html
```

---

## 📁 What Gets Uploaded

```
dist/
├── index.html              ← Sleep calculator
├── caffeine-sleep.html     ← Caffeine calculator
├── jet-lag.html            ← Jet lag calculator
├── assets/                 ← JS, CSS, images
├── robots.txt
├── sitemap.xml
└── service-worker.js
```

---

## ✅ What's Changed

### Navigation Now Uses Simple Links

**Before:**
```tsx
path: '/caffeine-sleep'  // Required .htaccess
```

**After:**
```tsx
path: 'caffeine-sleep.html'  // Direct file link
```

### No Server Configuration Needed

**Before:**
```
❌ Required .htaccess
❌ Required mod_rewrite
❌ Required Apache configuration
```

**After:**
```
✅ No .htaccess
✅ No server config
✅ Works everywhere
```

---

## 🧪 Verify

```bash
# Run verification script
chmod +x verify-standalone.sh
./verify-standalone.sh
```

---

## 🚀 Deploy Methods

### FTP/SFTP
1. Open FileZilla/WinSCP
2. Connect to server
3. Upload all files from `dist/`

### rsync
```bash
rsync -avz dist/ user@server:/path/to/webroot/
```

### scp
```bash
scp -r dist/* user@server:/path/to/webroot/
```

---

## ✨ Result

Three standalone HTML pages that work on **any web server** with **zero configuration**!

---

## 📚 More Info

See `DEPLOY-STANDALONE-HTML.md` for detailed guide.

---

**That's it! Simple, reliable, works everywhere.** 🎉
