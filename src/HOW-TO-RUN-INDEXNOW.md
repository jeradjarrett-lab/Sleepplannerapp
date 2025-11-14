# 🚀 How to Run IndexNow - Quick Guide

## What is IndexNow?
IndexNow instantly notifies search engines (Bing, Yandex, Naver, etc.) when your content changes, getting you indexed 50-100x faster (hours instead of days/weeks).

---

## ✅ Current Setup Status
- ✅ IndexNow API key: `8f7e9a2b4c1d6e3f5a8b7c9d2e4f6a1b`
- ✅ Verification file: `/public/8f7e9a2b4c1d6e3f5a8b7c9d2e4f6a1b.txt`
- ✅ Automatic notifications: Enabled in App.tsx
- ✅ Manual submission script: `/scripts/submit-indexnow.js`

---

## 🎯 Three Ways to Run IndexNow

### **Method 1: Automatic (Already Running!)**
IndexNow automatically submits your pages when users visit them in production.

**How it works:**
- When someone visits your site on the live domain
- The app automatically submits that page to search engines
- Happens once per browser session (doesn't spam)
- Only works on production domain (not localhost)

**Status:** ✅ Already enabled in `App.tsx` line 62

**To verify it's working:**
1. Deploy your app to production
2. Visit your live site (https://eyelovesleep.com)
3. Open browser console (F12)
4. Look for: `✅ IndexNow: Auto-notification sent for: <url>`

---

### **Method 2: Manual Submission (After Deployment)**
Submit all pages immediately after deploying or updating content.

**Command:**
```bash
node scripts/submit-indexnow.js
```

**What happens:**
```
🚀 IndexNow Submission Tool

📝 Submitting URLs to search engines...

📤 URLs to submit:
   1. https://eyelovesleep.com
   2. https://eyelovesleep.com/caffeine-sleep
   3. https://eyelovesleep.com/jet-lag

✅ SUCCESS! URLs submitted to IndexNow

📊 Search engines notified:
   • Bing
   • Yandex
   • Naver
   • Seznam.cz
   • Yep

⏱️  Indexing should happen within:
   • Bing: Minutes to hours
   • Yandex: Minutes to hours
   • Others: Hours to 1 day

✨ Done!
```

**When to use:**
- Right after deploying your site
- After publishing new content
- After major content updates
- When you want to ensure immediate indexing

---

### **Method 3: Submit Specific URLs**
Submit only specific pages that changed.

**Command:**
```bash
# Single URL
node scripts/submit-indexnow.js https://eyelovesleep.com/caffeine-sleep

# Multiple URLs
node scripts/submit-indexnow.js https://eyelovesleep.com https://eyelovesleep.com/jet-lag
```

**When to use:**
- After updating a specific calculator
- After fixing bugs on certain pages
- When you don't want to submit all pages

---

## 📋 Recommended Workflow

### **Initial Deployment:**
```bash
# 1. Deploy your site
npm run build
# (upload to your hosting)

# 2. Immediately submit all pages
node scripts/submit-indexnow.js

# 3. Verify the key file is accessible
curl https://eyelovesleep.com/8f7e9a2b4c1d6e3f5a8b7c9d2e4f6a1b.txt
# Should return: 8f7e9a2b4c1d6e3f5a8b7c9d2e4f6a1b
```

### **Content Updates:**
```bash
# After updating specific calculator
node scripts/submit-indexnow.js https://eyelovesleep.com/caffeine-sleep
```

### **Ongoing Operations:**
- Let automatic notifications handle normal traffic
- Manual submission not needed regularly
- Only submit manually after major updates

---

## 🔍 How to Verify It's Working

### **1. Check Browser Console (Automatic Method)**
Visit your live site and open browser console:
```
✅ IndexNow: Auto-notification sent for: https://eyelovesleep.com
```

### **2. Check Script Output (Manual Method)**
Run the script and look for:
```
✅ SUCCESS! URLs submitted to IndexNow
```

### **3. Verify API Key File**
Make sure this URL works:
```
https://eyelovesleep.com/8f7e9a2b4c1d6e3f5a8b7c9d2e4f6a1b.txt
```
Should return: `8f7e9a2b4c1d6e3f5a8b7c9d2e4f6a1b`

### **4. Check Bing Indexing (1-2 hours later)**
Search on Bing:
```
site:eyelovesleep.com
```
Your pages should appear!

### **5. Bing Webmaster Tools**
- Go to: https://www.bing.com/webmasters
- Add your site
- Check "URL Inspection" tool
- Should show "Discovered via IndexNow"

---

## ❗ Important Notes

### **Won't Work Locally**
IndexNow is disabled when running on:
- `localhost`
- `127.0.0.1`
- Port `5173` (Vite dev)
- Port `3000` (dev server)
- Figma preview domains

You'll see: `📝 IndexNow: Skipped (not on production domain)`

**This is normal!** It only works on your live domain.

### **CORS Warnings in Development**
If you see:
```
⚠️ IndexNow: Could not reach IndexNow API (this is normal if testing locally)
```

**Don't worry!** This is expected in development. The automatic method only works on production.

### **Use Manual Script to Test**
To test IndexNow functionality before deploying:
```bash
# This works from anywhere (your local machine)
node scripts/submit-indexnow.js
```

This bypasses CORS and works even if your site isn't deployed yet.

---

## 🎯 Quick Reference

| Method | When to Use | Command |
|--------|-------------|---------|
| **Automatic** | Always (already running) | Nothing - it's automatic! |
| **Manual (all pages)** | After deployment/updates | `node scripts/submit-indexnow.js` |
| **Manual (specific)** | After fixing specific page | `node scripts/submit-indexnow.js <URL>` |

---

## 🚨 Troubleshooting

### **Script shows "HTTP 400" or "HTTP 403"**
1. Verify key file exists: https://eyelovesleep.com/8f7e9a2b4c1d6e3f5a8b7c9d2e4f6a1b.txt
2. Make sure URLs are accessible (not 404)
3. Check that URLs use the correct domain

### **No errors but pages not indexing**
1. Wait 1-2 hours (Bing can take time)
2. Check Bing Webmaster Tools for verification
3. Make sure your site doesn't block Bing crawler in robots.txt

### **"Failed to fetch" in browser console**
This is normal in development. IndexNow only works on production domain.

---

## 📚 More Information

- IndexNow Protocol: https://www.indexnow.org/
- Bing Webmaster Tools: https://www.bing.com/webmasters
- Your key file: https://eyelovesleep.com/8f7e9a2b4c1d6e3f5a8b7c9d2e4f6a1b.txt

---

## ✨ Summary

**For most users:**
Just deploy your site! IndexNow is already running automatically. 🎉

**For maximum speed:**
Run `node scripts/submit-indexnow.js` right after deploying.

**For specific updates:**
Run `node scripts/submit-indexnow.js <URL>` after updating content.

That's it! Your pages will be indexed in hours instead of weeks. 🚀
