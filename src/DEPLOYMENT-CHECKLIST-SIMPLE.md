# ✅ Deployment Checklist - Simple .html Structure

## 📋 Pre-Deployment Checks

### Local Verification

- [ ] **File Structure**
  - [ ] `index.html` exists at root
  - [ ] `caffeine-sleep.html` exists at root
  - [ ] `jet-lag.html` exists at root

- [ ] **Navigation Links**
  - [ ] Open `components/NavigationMenu.tsx`
  - [ ] Verify paths: `/index.html`, `/caffeine-sleep.html`, `/jet-lag.html`
  - [ ] All paths have `.html` extension

- [ ] **Canonical URLs**
  - [ ] `index.html` → canonical: `https://eyelovesleep.com/index.html`
  - [ ] `caffeine-sleep.html` → canonical: `https://eyelovesleep.com/caffeine-sleep.html`
  - [ ] `jet-lag.html` → canonical: `https://eyelovesleep.com/jet-lag.html`

- [ ] **Sitemap**
  - [ ] Open `public/sitemap.xml`
  - [ ] All URLs use `.html` extension

- [ ] **Local Dev Test**
  - [ ] Run `npm run dev`
  - [ ] Click each navigation button
  - [ ] Verify pages load correctly
  - [ ] Check URLs in address bar have `.html`

---

## 🏗️ Build Process

- [ ] **Clean Build**
  ```bash
  rm -rf dist/
  npm run build
  ```

- [ ] **Verify Build Output**
  ```bash
  ls -la dist/*.html
  ```
  - [ ] `dist/index.html` exists
  - [ ] `dist/caffeine-sleep.html` exists
  - [ ] `dist/jet-lag.html` exists
  - [ ] `dist/assets/` folder exists

- [ ] **Check Build Size**
  - [ ] Total size reasonable (< 5MB recommended)
  - [ ] No missing assets
  - [ ] All JavaScript bundles present

---

## 📤 Upload to Server

### Prepare for Upload

- [ ] **Backup Current Site**
  - [ ] Download/backup existing files
  - [ ] Note current site structure
  - [ ] Save backup with timestamp

- [ ] **Identify Web Root**
  - [ ] Know exact path: `/var/www/eyelovesleep.com/` or `/public_html/`
  - [ ] Verify write permissions
  - [ ] Test access via FTP/SSH

### Upload Files

- [ ] **Method 1: FTP/SFTP**
  - [ ] Connect to server
  - [ ] Navigate to web root
  - [ ] Enable "Show Hidden Files" (to see .htaccess)
  - [ ] Delete old files (after backup!)
  - [ ] Upload ALL files from `dist/`
  - [ ] Verify `.htaccess` uploaded
  - [ ] Verify all `.html` files uploaded
  - [ ] Verify `assets/` folder uploaded

- [ ] **Method 2: rsync (faster)**
  ```bash
  rsync -avz --delete dist/ user@eyelovesleep.com:/path/to/webroot/
  ```
  - [ ] Command completed without errors
  - [ ] All files transferred

### Verify Upload

- [ ] **SSH into server and check:**
  ```bash
  cd /path/to/webroot
  ls -la *.html
  ls -la .htaccess
  ls -la assets/
  ```

- [ ] **File count matches build:**
  - [ ] 3 HTML files
  - [ ] 1 .htaccess file
  - [ ] assets/ folder with JS/CSS
  - [ ] robots.txt
  - [ ] sitemap.xml
  - [ ] service-worker.js

---

## 🧪 Post-Deployment Testing

### Direct File Access

- [ ] **Test each HTML file:**
  ```bash
  curl -I https://eyelovesleep.com/index.html
  curl -I https://eyelovesleep.com/caffeine-sleep.html
  curl -I https://eyelovesleep.com/jet-lag.html
  ```
  - [ ] All return `HTTP/1.1 200 OK`
  - [ ] No 404 errors
  - [ ] Correct content-type: `text/html`

### Browser Testing

- [ ] **Open in browser:**
  - [ ] `https://eyelovesleep.com/index.html` loads
  - [ ] `https://eyelovesleep.com/caffeine-sleep.html` loads
  - [ ] `https://eyelovesleep.com/jet-lag.html` loads

- [ ] **Navigation Test:**
  - [ ] Click "Sleep Calculator" → Goes to `/index.html`
  - [ ] Click "Caffeine & Sleep" → Goes to `/caffeine-sleep.html`
  - [ ] Click "Jet Lag" → Goes to `/jet-lag.html`
  - [ ] URLs in address bar show `.html`

- [ ] **Functionality Test:**
  - [ ] Sleep calculator works
  - [ ] Caffeine calculator works
  - [ ] Jet lag calculator works
  - [ ] All inputs respond
  - [ ] Results display correctly

### Content Verification

- [ ] **Each page displays:**
  - [ ] Header with logo
  - [ ] Navigation menu (highlighted correctly)
  - [ ] Calculator interface
  - [ ] Educational content
  - [ ] FAQ section
  - [ ] Footer
  - [ ] Share buttons

- [ ] **No Console Errors:**
  - [ ] Open DevTools (F12)
  - [ ] Check Console tab
  - [ ] No red errors (warnings OK)
  - [ ] Scripts loading correctly

### SEO Check

- [ ] **Meta tags present:**
  - [ ] View page source
  - [ ] Check title tag
  - [ ] Check meta description
  - [ ] Check canonical URL
  - [ ] Check Open Graph tags

- [ ] **Sitemap accessible:**
  - [ ] `https://eyelovesleep.com/sitemap.xml` loads
  - [ ] Contains all three URLs with `.html`

- [ ] **Robots.txt accessible:**
  - [ ] `https://eyelovesleep.com/robots.txt` loads
  - [ ] Contains sitemap reference

---

## 🔍 Advanced Checks

### Mobile Testing

- [ ] **Responsive design:**
  - [ ] Test on mobile device
  - [ ] Or use Chrome DevTools mobile emulation
  - [ ] All pages render correctly
  - [ ] Navigation works on mobile
  - [ ] Touch interactions work

### Performance

- [ ] **Load times:**
  - [ ] Pages load in < 3 seconds
  - [ ] No blocking resources
  - [ ] Images load properly

- [ ] **Lighthouse Test:**
  - [ ] Run Lighthouse audit
  - [ ] Performance score > 80
  - [ ] SEO score > 90
  - [ ] Accessibility score > 90

### Cross-Browser

- [ ] **Test in multiple browsers:**
  - [ ] Chrome
  - [ ] Firefox
  - [ ] Safari (if possible)
  - [ ] Edge

---

## 🎯 Final Verification

### All URLs Working

- [ ] `https://eyelovesleep.com/` → Redirects to or shows index.html
- [ ] `https://eyelovesleep.com/index.html` → Sleep Calculator ✅
- [ ] `https://eyelovesleep.com/caffeine-sleep.html` → Caffeine Calculator ✅
- [ ] `https://eyelovesleep.com/jet-lag.html` → Jet Lag Calculator ✅

### No Errors

- [ ] No 404 errors
- [ ] No 500 errors
- [ ] No broken links
- [ ] No missing images
- [ ] No console errors

### Functionality

- [ ] All calculators work
- [ ] Navigation works
- [ ] Share buttons work (if applicable)
- [ ] Forms submit correctly
- [ ] Results display correctly

---

## 📊 Success Metrics

### Must Have

✅ All three pages accessible with `.html` URLs  
✅ Navigation works between pages  
✅ All calculators functional  
✅ No console errors  
✅ Mobile responsive  

### Nice to Have

✅ Fast load times (< 2s)  
✅ High Lighthouse scores  
✅ Social sharing works  
✅ Analytics tracking  

---

## 🆘 Troubleshooting

### Issue: 404 Errors

**Symptom:** Pages not found  
**Solution:**
- [ ] Verify files uploaded to correct directory
- [ ] Check file permissions (644 for HTML)
- [ ] Verify web server document root

### Issue: Navigation Doesn't Work

**Symptom:** Clicking nav doesn't change pages  
**Solution:**
- [ ] Clear browser cache
- [ ] Hard refresh (Ctrl+Shift+R)
- [ ] Check browser console for errors
- [ ] Verify `.html` in URLs

### Issue: Old Content Shows

**Symptom:** Changes not visible  
**Solution:**
- [ ] Clear browser cache
- [ ] Clear server cache (if applicable)
- [ ] Restart web server
- [ ] Test in incognito mode

### Issue: Broken Styling

**Symptom:** CSS not loading  
**Solution:**
- [ ] Verify `assets/` folder uploaded
- [ ] Check CSS file paths in HTML
- [ ] Check browser console for 404s
- [ ] Verify file permissions

---

## ✅ Deployment Complete!

Once all checkboxes are ticked:

🎉 **Website successfully deployed with simple .html structure!**

- Simple URLs with `.html` extensions
- No complex routing
- Works on any web server
- All content preserved
- All functionality intact

---

## 📝 Post-Deployment Tasks

- [ ] **Update DNS** (if needed)
- [ ] **Submit to Google Search Console:**
  - [ ] Submit sitemap
  - [ ] Request indexing of main pages

- [ ] **Update any external links:**
  - [ ] Social media profiles
  - [ ] Directory listings
  - [ ] Business cards, etc.

- [ ] **Monitor for 24 hours:**
  - [ ] Check server logs
  - [ ] Monitor analytics
  - [ ] Watch for errors

---

**Deployment checklist complete! Website is live! 🚀**
