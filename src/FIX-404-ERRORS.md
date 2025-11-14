# 🚨 FIX 404 ERRORS - Step-by-Step Guide

## Problem
- `https://eyelovesleep.com/caffeine-sleep` → 404 Error
- `https://eyelovesleep.com/jet-lag` → 404 Error

## Root Cause
The HTML files aren't on the server OR Apache isn't processing `.htaccess` correctly.

---

## ✅ STEP 1: Build the Application

In your local project directory, run:

```bash
npm run build
```

This creates a `dist/` folder with these files:
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

**⚠️ IMPORTANT:** Verify `caffeine-sleep.html` and `jet-lag.html` exist in the `dist/` folder.

---

## ✅ STEP 2: Upload Files to Server

### Option A: Using FTP/SFTP (FileZilla, Cyberduck, etc.)

1. Connect to your server
2. Navigate to your website root (usually `/public_html/` or `/var/www/eyelovesleep.com/`)
3. **DELETE all old files first** (backup first!)
4. Upload **ALL** files from `dist/` folder to the server root
5. Upload the `.htaccess` file to the server root

### Option B: Using SSH/SCP

```bash
# Connect to your server
ssh user@eyelovesleep.com

# Navigate to website root
cd /path/to/eyelovesleep.com

# Backup old files
mkdir backup-$(date +%Y%m%d)
mv * backup-$(date +%Y%m%d)/ 2>/dev/null

# Exit SSH, then from your local machine:
scp -r dist/* user@eyelovesleep.com:/path/to/eyelovesleep.com/
scp .htaccess user@eyelovesleep.com:/path/to/eyelovesleep.com/
```

---

## ✅ STEP 3: Verify Files on Server

SSH into your server and check:

```bash
cd /path/to/eyelovesleep.com
ls -la *.html
```

**You should see:**
```
-rw-r--r-- index.html
-rw-r--r-- caffeine-sleep.html
-rw-r--r-- jet-lag.html
```

**Check .htaccess exists:**
```bash
ls -la .htaccess
```

**If not found:**
```bash
# .htaccess might be hidden, try:
ls -la | grep htaccess
```

---

## ✅ STEP 4: Check Apache mod_rewrite

```bash
# Check if mod_rewrite is enabled
apache2ctl -M | grep rewrite

# Expected output:
# rewrite_module (shared)
```

**If NOT enabled:**
```bash
sudo a2enmod rewrite
sudo systemctl restart apache2
```

---

## ✅ STEP 5: Check Apache Configuration

Edit your site config:

```bash
sudo nano /etc/apache2/sites-available/eyelovesleep.conf
```

**Must have:**
```apache
<VirtualHost *:80>
    ServerName eyelovesleep.com
    ServerAlias www.eyelovesleep.com
    DocumentRoot /path/to/eyelovesleep.com
    
    <Directory /path/to/eyelovesleep.com>
        Options -Indexes +FollowSymLinks
        AllowOverride All    # ← THIS IS CRITICAL!
        Require all granted
    </Directory>
</VirtualHost>
```

**Key line:** `AllowOverride All` - This allows `.htaccess` to work!

**Save and restart:**
```bash
sudo systemctl restart apache2
```

---

## ✅ STEP 6: Test URLs Directly

Test if the HTML files are accessible directly:

```bash
curl -I https://eyelovesleep.com/caffeine-sleep.html
curl -I https://eyelovesleep.com/jet-lag.html
```

**Expected response:**
```
HTTP/1.1 200 OK
Content-Type: text/html
```

**If you get 404:**
- The files aren't on the server
- Go back to Step 2

**If you get 200:**
- Files exist, but `.htaccess` isn't working
- Go to Step 7

---

## ✅ STEP 7: Debug .htaccess

Create a test file to verify `.htaccess` is working:

```bash
cd /path/to/eyelovesleep.com
echo "TEST" > test.html
```

Then test:
```bash
curl https://eyelovesleep.com/test
```

**If it works (shows "TEST"):**
- `.htaccess` is working!
- The issue is with the HTML file paths

**If it doesn't work (404):**
- `.htaccess` isn't being processed
- Check Steps 4 & 5 again

---

## ✅ STEP 8: Check File Permissions

```bash
cd /path/to/eyelovesleep.com

# Set correct permissions
chmod 644 *.html
chmod 644 .htaccess
chmod 755 assets/
chmod 644 assets/*
```

---

## ✅ STEP 9: Clear All Caches

### On Server:
```bash
# Restart Apache
sudo systemctl restart apache2

# If using PHP-FPM
sudo systemctl restart php8.1-fpm
```

### In Browser:
1. Open DevTools (F12)
2. Application → Storage → Clear site data
3. Service Workers → Unregister all
4. Hard refresh: `Ctrl+Shift+R` (Windows) or `Cmd+Shift+R` (Mac)

### Test in Private/Incognito Mode:
Open a new private/incognito window and test:
- `https://eyelovesleep.com/caffeine-sleep`
- `https://eyelovesleep.com/jet-lag`

---

## ✅ STEP 10: Check Apache Error Logs

If still getting 404s:

```bash
# View recent errors
sudo tail -f /var/log/apache2/error.log

# Then try accessing the page in browser
# Watch for errors in the log
```

Common errors:
- "File does not exist" → Files not uploaded
- "Options FollowSymLinks" → Permissions issue
- "Invalid command 'RewriteEngine'" → mod_rewrite not enabled

---

## 🎯 Quick Verification Script

Save this as `verify.sh` and run it on your server:

```bash
#!/bin/bash
echo "=== Checking Files ==="
ls -la /path/to/eyelovesleep.com/*.html

echo -e "\n=== Checking .htaccess ==="
ls -la /path/to/eyelovesleep.com/.htaccess

echo -e "\n=== Checking mod_rewrite ==="
apache2ctl -M | grep rewrite

echo -e "\n=== Testing URLs ==="
curl -I https://eyelovesleep.com/caffeine-sleep.html
curl -I https://eyelovesleep.com/jet-lag.html

echo -e "\n=== Testing Clean URLs ==="
curl -I https://eyelovesleep.com/caffeine-sleep
curl -I https://eyelovesleep.com/jet-lag
```

---

## 📊 Expected Results After Fix

| URL | Status | Page Shown |
|-----|--------|------------|
| `https://eyelovesleep.com/` | 200 OK | Sleep Calculator |
| `https://eyelovesleep.com/caffeine-sleep` | 200 OK | Caffeine Calculator |
| `https://eyelovesleep.com/jet-lag` | 200 OK | Jet Lag Calculator |
| `https://eyelovesleep.com/caffeine-sleep.html` | 200 OK | Caffeine Calculator |
| `https://eyelovesleep.com/jet-lag.html` | 200 OK | Jet Lag Calculator |

---

## ❓ Still Not Working?

### Check This Common Issue:

**Problem:** Files uploaded but wrong directory

Some hosting setups have:
- `/home/user/` ← Your files are here
- `/home/user/public_html/` ← But Apache serves from here!

**Solution:**
```bash
# Find your document root
grep DocumentRoot /etc/apache2/sites-available/*.conf

# Upload files to that directory
```

---

## 🆘 Emergency Contact Points

If none of the above works, provide this information:

1. **File listing:**
   ```bash
   ls -la /path/to/eyelovesleep.com/*.html
   ```

2. **Apache config:**
   ```bash
   cat /etc/apache2/sites-available/eyelovesleep.conf
   ```

3. **mod_rewrite status:**
   ```bash
   apache2ctl -M | grep rewrite
   ```

4. **Direct file access test:**
   ```bash
   curl -I https://eyelovesleep.com/caffeine-sleep.html
   ```

5. **Error log:**
   ```bash
   sudo tail -20 /var/log/apache2/error.log
   ```

Share these outputs for further troubleshooting.
