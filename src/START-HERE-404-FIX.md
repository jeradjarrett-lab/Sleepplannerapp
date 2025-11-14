# 🎯 START HERE - Fix 404 Errors in 3 Steps

## Problem
- ❌ `https://eyelovesleep.com/caffeine-sleep` → 404 Error
- ❌ `https://eyelovesleep.com/jet-lag` → 404 Error

## Solution (3 Steps)

---

### STEP 1: Test What's Actually on Your Server

**Open these URLs in your browser:**

1. `https://eyelovesleep.com/caffeine-sleep.html` (with .html)
2. `https://eyelovesleep.com/jet-lag.html` (with .html)

**What happened?**

#### ✅ OPTION A: Both URLs Work (Show the correct pages)
**Good news!** Your files ARE on the server. The problem is just the `.htaccess` file.

➡️ **Go to STEP 2A** below

---

#### ❌ OPTION B: Both URLs Show 404 Errors
**The files are NOT on your server yet.** You need to build and upload them.

➡️ **Go to STEP 2B** below

---

### STEP 2A: Fix .htaccess (Files Already on Server)

Your HTML files are on the server, but Apache isn't processing clean URLs.

**Fix it:**

```bash
# 1. SSH into your server
ssh user@your-server

# 2. Enable mod_rewrite
sudo a2enmod rewrite

# 3. Edit Apache config to allow .htaccess
sudo nano /etc/apache2/sites-available/eyelovesleep.conf

# Make sure you have:
<Directory /path/to/eyelovesleep.com>
    AllowOverride All    ← Must be "All" not "None"!
    Require all granted
</Directory>

# 4. Save and restart Apache
sudo systemctl restart apache2

# 5. Make sure .htaccess is on the server
cd /path/to/eyelovesleep.com
ls -la .htaccess

# If .htaccess is missing, create it:
nano .htaccess
# Copy content from htaccess-production.txt file
```

**Test again:**
- `https://eyelovesleep.com/caffeine-sleep` → Should work! ✅
- `https://eyelovesleep.com/jet-lag` → Should work! ✅

➡️ **If still not working, go to STEP 3**

---

### STEP 2B: Build and Upload Files (Files NOT on Server)

**On your local computer:**

```bash
# 1. Navigate to your project
cd /path/to/eyelovesleep-project

# 2. Build the application
npm run build

# 3. Verify files were created
ls -la dist/*.html

# You should see:
# dist/index.html
# dist/caffeine-sleep.html
# dist/jet-lag.html
```

**Upload to your server:**

**Option 1: Using FTP/SFTP (FileZilla, Cyberduck, etc.)**
1. Open your FTP client
2. Connect to your server
3. Navigate to your website root directory
   - Usually: `/public_html/` or `/var/www/eyelovesleep.com/`
4. **Delete old files** (make a backup first!)
5. Upload **ALL files** from the `dist/` folder
6. Upload `.htaccess` file from project root (use `htaccess-production.txt` and rename it to `.htaccess`)

**Option 2: Using rsync (faster)**
```bash
# From your local machine, NOT on the server
rsync -avz --delete dist/ user@your-server:/path/to/eyelovesleep.com/
scp htaccess-production.txt user@your-server:/path/to/eyelovesleep.com/.htaccess
```

**Verify files uploaded:**
```bash
ssh user@your-server
cd /path/to/eyelovesleep.com
ls -la *.html

# Should show:
# index.html
# caffeine-sleep.html
# jet-lag.html
```

**Test again:**
- `https://eyelovesleep.com/caffeine-sleep.html` → Should work! ✅
- `https://eyelovesleep.com/jet-lag.html` → Should work! ✅

**If those work, but clean URLs don't:**
➡️ **Go back to STEP 2A** to fix .htaccess

---

### STEP 3: Advanced Troubleshooting

If nothing above worked, run diagnostics:

**On your server:**

```bash
# 1. Find where Apache serves files from
grep DocumentRoot /etc/apache2/sites-available/*.conf

# 2. Make sure files are in THAT directory
cd /var/www/eyelovesleep.com  # Or whatever path you found
ls -la *.html

# 3. Check Apache error log
sudo tail -50 /var/log/apache2/error.log

# 4. Test mod_rewrite
apache2ctl -M | grep rewrite
# Should show: rewrite_module (shared)

# 5. Check .htaccess permissions
ls -la .htaccess
chmod 644 .htaccess

# 6. Test URL rewriting manually
curl -I https://eyelovesleep.com/caffeine-sleep
# Should return: HTTP/1.1 200 OK
```

---

## 📋 Files You Need

### In Project (for local development):
```
eyelovesleep-project/
├── .htaccess                    ← Copy this to server
├── index.html
├── caffeine-sleep.html
├── jet-lag.html
├── components/
├── src/
└── vite.config.ts
```

### On Server (after deployment):
```
/path/to/eyelovesleep.com/
├── .htaccess                    ← Must be here!
├── index.html                   ← From dist/
├── caffeine-sleep.html          ← From dist/
├── jet-lag.html                 ← From dist/
├── assets/
│   ├── [hashed-files].js
│   ├── [hashed-files].css
│   └── ...
├── robots.txt
├── sitemap.xml
└── service-worker.js
```

---

## 🚨 Common Mistakes

### ❌ Mistake 1: Uploaded to wrong directory
**Symptoms:** Direct file access works in browser but server shows old version

**Fix:** Find the correct DocumentRoot and upload there

### ❌ Mistake 2: Didn't build before uploading
**Symptoms:** Console shows React/TypeScript errors

**Fix:** Run `npm run build` first, upload from `dist/` folder

### ❌ Mistake 3: .htaccess not uploaded or wrong name
**Symptoms:** Files work with .html but not without

**Fix:** Make sure file is named `.htaccess` (with dot!) not `htaccess` or `htaccess.txt`

### ❌ Mistake 4: mod_rewrite not enabled
**Symptoms:** .htaccess uploaded but clean URLs still 404

**Fix:** `sudo a2enmod rewrite && sudo systemctl restart apache2`

### ❌ Mistake 5: Apache config blocks .htaccess
**Symptoms:** Everything uploaded correctly but .htaccess ignored

**Fix:** Change `AllowOverride None` to `AllowOverride All` in Apache config

---

## ✅ Success Checklist

After completing the steps above, verify:

- [ ] `https://eyelovesleep.com/` → Sleep Calculator (200 OK)
- [ ] `https://eyelovesleep.com/caffeine-sleep` → Caffeine Calculator (200 OK)
- [ ] `https://eyelovesleep.com/jet-lag` → Jet Lag Calculator (200 OK)
- [ ] `https://eyelovesleep.com/caffeine-sleep.html` → Also works (200 OK)
- [ ] `https://eyelovesleep.com/jet-lag.html` → Also works (200 OK)
- [ ] Navigation menu clicks work
- [ ] Browser console shows correct page (🌙 / ☕ / ✈️)
- [ ] No 404 errors in console

---

## 📞 Need More Help?

**Provide this information:**

1. **Test direct file access:**
   ```bash
   curl -I https://eyelovesleep.com/caffeine-sleep.html
   ```

2. **Check if files exist on server:**
   ```bash
   ssh user@server
   ls -la /path/to/eyelovesleep.com/*.html
   ```

3. **Check mod_rewrite:**
   ```bash
   apache2ctl -M | grep rewrite
   ```

4. **Check Apache config:**
   ```bash
   cat /etc/apache2/sites-available/eyelovesleep.conf
   ```

5. **Check error log:**
   ```bash
   sudo tail -20 /var/log/apache2/error.log
   ```

Share these outputs for help!
