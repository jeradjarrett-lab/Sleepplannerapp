# 🚀 DEPLOY NOW - Fix 404 Errors

## ⚠️ PROBLEM IDENTIFIED

Your `.htaccess` file is **correct**, but the HTML files are **NOT on your production server** yet.

The files exist in your development environment (what I can see), but they haven't been built and uploaded to `eyelovesleep.com`.

---

## ✅ SOLUTION: Build and Deploy in 5 Steps

### STEP 1: Build the Application (On Your Local Machine)

Open your terminal in the project directory and run:

```bash
# Install dependencies (if not already installed)
npm install

# Build the production files
npm run build
```

**What this does:**
- Creates a `dist/` folder with optimized, production-ready files
- Generates `index.html`, `caffeine-sleep.html`, `jet-lag.html`
- Bundles and minifies all JavaScript and CSS
- Optimizes images and assets

**Expected output:**
```
dist/
├── index.html                    ← Homepage
├── caffeine-sleep.html           ← Caffeine calculator page
├── jet-lag.html                  ← Jet lag calculator page
├── assets/
│   ├── main.[hash].js
│   ├── caffeine-sleep.[hash].js
│   ├── jet-lag.[hash].js
│   ├── [other-hashed-files].css
│   └── ...
├── robots.txt
├── sitemap.xml
└── service-worker.js
```

---

### STEP 2: Verify the Build Created the Files

**Check that the HTML files were created:**

```bash
# List all HTML files in dist/
ls -la dist/*.html
```

**You MUST see:**
```
dist/index.html
dist/caffeine-sleep.html
dist/jet-lag.html
```

**If these files don't exist, the build failed.** Check for errors in Step 1.

---

### STEP 3: Prepare the .htaccess File

The `.htaccess` file is at the root of your project (NOT in dist/).

**Copy it to the dist folder:**

```bash
cp .htaccess dist/.htaccess
```

**Or manually create it in the dist/ folder** with this exact content:

```apache
# EyeLoveSleep .htaccess Configuration
<FilesMatch \.php$>
  SetHandler proxy:fcgi://eyelovesleepcom-php81
</FilesMatch>

<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  
  RewriteCond %{THE_REQUEST} /index\.html [NC]
  RewriteRule ^index\.html$ / [R=301,L]
  
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteCond %{REQUEST_URI} (.+)/$
  RewriteRule ^ %1 [R=301,L]
  
  RewriteCond %{REQUEST_FILENAME} -f
  RewriteRule ^ - [L]
  
  RewriteCond %{REQUEST_FILENAME} -d
  RewriteRule ^ - [L]
  
  RewriteCond %{REQUEST_FILENAME}.html -f
  RewriteRule ^(.+)$ $1.html [L]
  
  RewriteRule ^ index.html [L]
</IfModule>
```

---

### STEP 4: Upload to Your Production Server

You need to upload **everything from the `dist/` folder** to your production server.

#### Option A: Using FTP/SFTP (FileZilla, Cyberduck, WinSCP)

1. **Open your FTP client** and connect to your server
   
2. **Navigate to your website's root directory:**
   - Common paths:
     - cPanel: `/home/username/public_html/`
     - Plesk: `/var/www/vhosts/eyelovesleep.com/httpdocs/`
     - VPS/Dedicated: `/var/www/eyelovesleep.com/` or `/var/www/html/`

3. **IMPORTANT: Backup existing files first!**
   - Create a folder called `backup-old`
   - Move all current files into `backup-old`
   - Or download everything to your local machine

4. **Upload EVERYTHING from the `dist/` folder:**
   - All `.html` files (index, caffeine-sleep, jet-lag)
   - The `assets/` folder (entire folder with all contents)
   - `robots.txt`
   - `sitemap.xml`
   - `service-worker.js`
   - `.htaccess` (IMPORTANT: Make sure hidden files are visible in your FTP client!)

5. **Verify the upload:**
   - Refresh the server directory view
   - You should see all the files listed above

#### Option B: Using SSH/rsync (Faster, Recommended)

```bash
# Replace with your actual server details
SERVER_USER="your-username"
SERVER_HOST="eyelovesleep.com"
SERVER_PATH="/var/www/eyelovesleep.com"  # Or your actual path

# Backup existing files on server
ssh $SERVER_USER@$SERVER_HOST "cd $SERVER_PATH && mkdir -p backup-$(date +%Y%m%d) && mv * backup-$(date +%Y%m%d)/ 2>/dev/null"

# Upload dist/ contents to server
rsync -avz --delete dist/ $SERVER_USER@$SERVER_HOST:$SERVER_PATH/

# Verify .htaccess was uploaded (it's hidden)
ssh $SERVER_USER@$SERVER_HOST "ls -la $SERVER_PATH/.htaccess"
```

#### Option C: Using cPanel File Manager

1. Log into cPanel
2. Open **File Manager**
3. Navigate to `public_html/`
4. Create a backup folder and move old files
5. Click **Upload**
6. Select ALL files from your local `dist/` folder
7. Upload them
8. Make sure to upload `.htaccess` (you may need to enable "Show Hidden Files")

---

### STEP 5: Verify the Deployment

**Test 1: Direct file access (with .html extension)**

Open these URLs in your browser:
- `https://eyelovesleep.com/index.html` → Should work ✅
- `https://eyelovesleep.com/caffeine-sleep.html` → Should work ✅
- `https://eyelovesleep.com/jet-lag.html` → Should work ✅

**If these work, proceed to Test 2.**
**If these DON'T work, files aren't uploaded correctly. Go back to Step 4.**

---

**Test 2: Clean URLs (without .html extension)**

Open these URLs in your browser:
- `https://eyelovesleep.com/` → Should work ✅
- `https://eyelovesleep.com/caffeine-sleep` → Should work ✅
- `https://eyelovesleep.com/jet-lag` → Should work ✅

**If Test 1 works but Test 2 doesn't:**
The files are uploaded, but `.htaccess` isn't working. Continue to Step 6.

**If Test 2 works:**
🎉 **SUCCESS!** Your site is now live with clean URLs!

---

### STEP 6: Enable Apache mod_rewrite (If Test 2 Failed)

If Test 1 worked but Test 2 didn't, Apache's mod_rewrite module isn't enabled.

**SSH into your server:**

```bash
ssh user@your-server

# Enable mod_rewrite
sudo a2enmod rewrite

# Edit Apache site configuration
sudo nano /etc/apache2/sites-available/eyelovesleep.conf
# Or try:
sudo nano /etc/apache2/sites-available/000-default.conf
```

**Make sure your configuration has:**

```apache
<VirtualHost *:80>
    ServerName eyelovesleep.com
    ServerAlias www.eyelovesleep.com
    DocumentRoot /var/www/eyelovesleep.com
    
    <Directory /var/www/eyelovesleep.com>
        Options -Indexes +FollowSymLinks
        AllowOverride All          ← MUST BE "All"
        Require all granted
    </Directory>
</VirtualHost>

# If you have HTTPS (SSL)
<VirtualHost *:443>
    ServerName eyelovesleep.com
    ServerAlias www.eyelovesleep.com
    DocumentRoot /var/www/eyelovesleep.com
    
    <Directory /var/www/eyelovesleep.com>
        Options -Indexes +FollowSymLinks
        AllowOverride All          ← MUST BE "All"
        Require all granted
    </Directory>
    
    # SSL Certificate settings
    SSLEngine on
    SSLCertificateFile /path/to/cert.pem
    SSLCertificateKeyFile /path/to/key.pem
</VirtualHost>
```

**Save and restart Apache:**

```bash
# Save the file (Ctrl+X, then Y, then Enter)

# Test Apache configuration
sudo apache2ctl configtest

# If OK, restart Apache
sudo systemctl restart apache2
```

**Test again:**
- `https://eyelovesleep.com/caffeine-sleep` → Should work now! ✅
- `https://eyelovesleep.com/jet-lag` → Should work now! ✅

---

## 📋 Quick Checklist

Before considering the deployment complete, verify:

- [ ] Built the app with `npm run build`
- [ ] Verified `dist/caffeine-sleep.html` exists locally
- [ ] Verified `dist/jet-lag.html` exists locally
- [ ] Verified `dist/index.html` exists locally
- [ ] Copied `.htaccess` to `dist/` folder
- [ ] Uploaded ALL files from `dist/` to production server
- [ ] Verified files exist on server (via FTP or SSH)
- [ ] Tested direct URLs: `/caffeine-sleep.html` and `/jet-lag.html` work
- [ ] Tested clean URLs: `/caffeine-sleep` and `/jet-lag` work
- [ ] Cleared browser cache and tested in incognito mode
- [ ] Verified navigation menu links work

---

## 🔍 Troubleshooting Commands

If something isn't working, run these diagnostic commands:

**On your server (via SSH):**

```bash
# Find your actual DocumentRoot
grep -r "DocumentRoot" /etc/apache2/sites-available/

# List files in your web directory
cd /var/www/eyelovesleep.com  # Or your actual path
ls -la *.html

# Check if .htaccess exists (it's hidden)
ls -la .htaccess

# Check if mod_rewrite is enabled
apache2ctl -M | grep rewrite

# Test direct file access
curl -I https://eyelovesleep.com/caffeine-sleep.html

# Test clean URL
curl -I https://eyelovesleep.com/caffeine-sleep

# View Apache error log
sudo tail -50 /var/log/apache2/error.log
```

---

## ❓ Common Issues and Solutions

### Issue 1: "npm run build" fails

**Error:** `command not found: npm`

**Solution:** Install Node.js and npm first
```bash
# macOS (using Homebrew)
brew install node

# Ubuntu/Debian
sudo apt update
sudo apt install nodejs npm

# Windows
# Download from https://nodejs.org/
```

---

### Issue 2: Build succeeds but no HTML files in dist/

**Possible causes:**
1. Build script is configured incorrectly
2. Vite isn't finding the HTML template files

**Solution:** Check if `index.html`, `caffeine-sleep.html`, and `jet-lag.html` exist in your project root (not in dist/). If they don't exist, the build can't create them.

---

### Issue 3: .htaccess uploaded but not working

**Symptoms:** Direct URLs work (.html) but clean URLs don't

**Solutions:**

1. **Make sure filename is correct:**
   - Must be `.htaccess` (with dot at the beginning)
   - NOT `htaccess` or `htaccess.txt`

2. **Check file permissions:**
   ```bash
   chmod 644 .htaccess
   ```

3. **Enable mod_rewrite:**
   ```bash
   sudo a2enmod rewrite
   sudo systemctl restart apache2
   ```

4. **Check AllowOverride:**
   - Must be `AllowOverride All` in Apache config
   - NOT `AllowOverride None`

---

### Issue 4: Files uploaded but showing old version

**Solution:** Clear all caches

```bash
# On server - restart Apache
sudo systemctl restart apache2

# In browser - hard refresh
# Windows/Linux: Ctrl + Shift + R
# Mac: Cmd + Shift + R

# Or use incognito/private mode
```

---

## 🎯 Expected Results After Deployment

| URL | Status | Page Shown |
|-----|--------|------------|
| `https://eyelovesleep.com/` | 200 OK | Sleep Calculator 🌙 |
| `https://eyelovesleep.com/caffeine-sleep` | 200 OK | Caffeine Calculator ☕ |
| `https://eyelovesleep.com/jet-lag` | 200 OK | Jet Lag Calculator ✈️ |
| `https://eyelovesleep.com/index.html` | 301 → `/` | Redirects to homepage |
| `https://eyelovesleep.com/caffeine-sleep.html` | 200 OK | Caffeine Calculator ☕ |
| `https://eyelovesleep.com/jet-lag.html` | 200 OK | Jet Lag Calculator ✈️ |

---

## 🆘 Still Not Working?

If you've followed all steps and it's still not working, provide:

1. **Output of build command:**
   ```bash
   npm run build 2>&1 | tee build-output.txt
   ```

2. **List of files in dist/:**
   ```bash
   ls -la dist/
   ```

3. **List of files on server:**
   ```bash
   ssh user@server "ls -la /path/to/web/directory/"
   ```

4. **Test results:**
   ```bash
   curl -I https://eyelovesleep.com/caffeine-sleep.html
   curl -I https://eyelovesleep.com/caffeine-sleep
   ```

5. **Apache error log:**
   ```bash
   ssh user@server "sudo tail -50 /var/log/apache2/error.log"
   ```

Share these outputs and I can help troubleshoot further!

---

## 🚀 Quick Deploy Script (Advanced Users)

Save this as `deploy.sh` and run `chmod +x deploy.sh && ./deploy.sh`:

```bash
#!/bin/bash

# Configuration - UPDATE THESE
SERVER_USER="your-username"
SERVER_HOST="eyelovesleep.com"
SERVER_PATH="/var/www/eyelovesleep.com"

echo "🔨 Building application..."
npm run build

if [ ! -f "dist/index.html" ]; then
    echo "❌ Build failed - dist/index.html not found"
    exit 1
fi

if [ ! -f "dist/caffeine-sleep.html" ]; then
    echo "❌ Build failed - dist/caffeine-sleep.html not found"
    exit 1
fi

if [ ! -f "dist/jet-lag.html" ]; then
    echo "❌ Build failed - dist/jet-lag.html not found"
    exit 1
fi

echo "✅ Build successful"

echo "📋 Copying .htaccess to dist/..."
cp .htaccess dist/.htaccess

echo "📤 Uploading to server..."
rsync -avz --delete dist/ $SERVER_USER@$SERVER_HOST:$SERVER_PATH/

echo "🔍 Verifying deployment..."
ssh $SERVER_USER@$SERVER_HOST "ls -la $SERVER_PATH/*.html"

echo "🧪 Testing URLs..."
HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" "https://eyelovesleep.com/caffeine-sleep.html")
if [ "$HTTP_CODE" = "200" ]; then
    echo "✅ caffeine-sleep.html is accessible"
else
    echo "❌ caffeine-sleep.html returned $HTTP_CODE"
fi

HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" "https://eyelovesleep.com/caffeine-sleep")
if [ "$HTTP_CODE" = "200" ]; then
    echo "✅ /caffeine-sleep is accessible"
else
    echo "❌ /caffeine-sleep returned $HTTP_CODE"
fi

echo "🎉 Deployment complete!"
echo "🌐 Visit: https://eyelovesleep.com"
```

---

**Good luck with the deployment!** 🚀
