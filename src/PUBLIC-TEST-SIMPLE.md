# 🚨 SIMPLE 404 FIX - Do This First!

## Most Likely Cause: Files Not Uploaded

### Quick Test - Are the HTML files on your server?

Open these URLs in your browser:

1. **Test with .html extension:**
   - `https://eyelovesleep.com/caffeine-sleep.html`
   - `https://eyelovesleep.com/jet-lag.html`

### Result A: They Work! ✅
If those URLs work, then your files ARE on the server, but `.htaccess` isn't working.

**Fix:**
```bash
# SSH into your server
ssh user@your-server

# Enable mod_rewrite
sudo a2enmod rewrite

# Restart Apache
sudo systemctl restart apache2
```

Then test again: `https://eyelovesleep.com/caffeine-sleep`

---

### Result B: They Don't Work (404) ❌
If those URLs also give 404, then the HTML files are NOT on your server.

**Fix:**

1. **Build the app locally:**
   ```bash
   cd /path/to/your/local/project
   npm run build
   ```

2. **Check the dist folder has these files:**
   ```bash
   ls -la dist/*.html
   ```
   
   You should see:
   - `dist/index.html`
   - `dist/caffeine-sleep.html`
   - `dist/jet-lag.html`

3. **Upload EVERYTHING from dist/ to your server**

   **Via FTP/SFTP (FileZilla, etc.):**
   - Connect to your server
   - Navigate to your website root (e.g., `/public_html/` or `/var/www/eyelovesleep.com/`)
   - Upload ALL files from `dist/` folder
   - Upload `.htaccess` from project root

   **Via SSH/rsync:**
   ```bash
   # From your local machine
   rsync -avz --delete dist/ user@your-server:/path/to/eyelovesleep.com/
   scp .htaccess user@your-server:/path/to/eyelovesleep.com/
   ```

4. **Verify files are uploaded:**
   ```bash
   ssh user@your-server
   cd /path/to/eyelovesleep.com
   ls -la *.html
   ```

---

## Still Getting 404s After Upload?

### Check Apache Document Root

Your files might be in the wrong directory!

```bash
# Find where Apache is serving files from
grep DocumentRoot /etc/apache2/sites-available/*.conf

# Example output:
# DocumentRoot /var/www/eyelovesleep.com

# Make sure your files are in THAT directory, not somewhere else!
```

---

## Need to Find Where Files Should Go?

Run this on your server:

```bash
# Method 1: Check Apache config
grep -r "DocumentRoot" /etc/apache2/sites-available/ | grep eyelovesleep

# Method 2: Check where current index.html is
find /var/www -name "index.html" 2>/dev/null
find /home -name "index.html" 2>/dev/null | grep -v node_modules

# Method 3: Check which directory Apache user can access
ls -la /var/www/
ls -la /home/*/public_html/ 2>/dev/null
```

---

## Common Hosting Setups

### cPanel Hosting:
- Files go in: `/home/username/public_html/`

### Plesk Hosting:
- Files go in: `/var/www/vhosts/eyelovesleep.com/httpdocs/`

### VPS/Dedicated (Apache):
- Files go in: `/var/www/eyelovesleep.com/` or `/var/www/html/`

### Check your hosting control panel for the exact path!

---

## Test Command

After uploading, run this from your LOCAL machine:

```bash
# Test if files exist
curl -I https://eyelovesleep.com/caffeine-sleep.html
curl -I https://eyelovesleep.com/jet-lag.html

# Should return: HTTP/1.1 200 OK
# If returns: HTTP/1.1 404 Not Found - Files aren't there!
```

---

## Emergency Rebuild & Deploy

If you're not sure what's on the server, start fresh:

```bash
# 1. On your local machine - REBUILD
cd /path/to/your/project
rm -rf dist node_modules
npm install
npm run build

# 2. Verify build created the files
ls -la dist/*.html

# 3. Connect to server and backup old files
ssh user@your-server
cd /path/to/eyelovesleep.com
mkdir backup-emergency
mv * backup-emergency/ 2>/dev/null

# 4. Exit SSH, upload from local
exit
rsync -avz dist/ user@your-server:/path/to/eyelovesleep.com/
scp .htaccess user@your-server:/path/to/eyelovesleep.com/

# 5. Test immediately
curl -I https://eyelovesleep.com/caffeine-sleep.html
```

---

## Checklist

- [ ] Built the app with `npm run build`
- [ ] Verified `dist/caffeine-sleep.html` exists locally
- [ ] Verified `dist/jet-lag.html` exists locally
- [ ] Uploaded ALL files from `dist/` to server
- [ ] Uploaded `.htaccess` to server root
- [ ] Verified files exist on server (SSH check)
- [ ] Tested direct URLs with .html extension
- [ ] Enabled mod_rewrite on server
- [ ] Restarted Apache
- [ ] Cleared browser cache
- [ ] Tested clean URLs without .html

---

## Summary

**The 404 error means one of two things:**

1. **Files aren't on the server** → Upload them (Steps above)
2. **Files are there but .htaccess isn't working** → Enable mod_rewrite

**99% of the time, it's #1** - the files just aren't uploaded yet!
