# Ads Not Showing - Troubleshooting Guide

## Issues Fixed

### 1. ✅ Fixed `_headers` Directory Issue
**Problem:** `_headers` was incorrectly a directory with TypeScript files
**Solution:** Deleted directory and recreated as plain text file for cache headers

### 2. ✅ Replaced AMP Ads with Standard AdSense
**Problem:** AMP ads don't work in React applications (AMP is for static HTML)
**Solution:** Implemented React-compatible AdSense components using `<ins class="adsbygoogle">`

### 3. ✅ Updated AdSense Script
**Problem:** Was using AMP script which doesn't work with React
**Solution:** Updated to standard AdSense script in `/index.html.template`

## Current Ad Configuration

### Ad Slots

**Top Ad (Leaderboard)**
- Component: `AmpAdTop` (misnomer - it's actually standard AdSense now)
- Size: 728×90 (fixed)
- Ad Client: `ca-pub-0855352021512673`
- Ad Slot: `7978490572`
- File: `/components/AmpAdTop.tsx`

**Middle/Bottom Ads (Responsive)**
- Component: `AmpAdMiddle` (misnomer - it's actually standard AdSense now)
- Format: Fluid/Responsive
- Ad Client: `ca-pub-0855352021512673`
- Ad Slot: `6473288478`
- File: `/components/AmpAdMiddle.tsx`

### Script Location
File: `/index.html.template`
```html
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-0855352021512673"
   crossorigin="anonymous"></script>
```

## Why Ads Might Not Be Showing

### 1. AdSense Account Not Approved Yet ⚠️
**Most Common Reason**
- New AdSense accounts need manual approval
- Can take 24-48 hours to several days
- Check AdSense dashboard for approval status
- Ads will show blank/empty until approved

**Check:**
1. Go to: https://www.google.com/adsense/
2. Login to your account
3. Look for approval status
4. Verify ad slots are created and active

### 2. Site Not Added to AdSense
- You must add your domain to AdSense
- AdSense will verify ownership
- Ads won't show until verification complete

**Check:**
1. AdSense → Sites
2. Ensure your domain is listed and verified
3. Check if you need to add verification code

### 3. Ad Slots Not Created
- The ad slot IDs must exist in your AdSense account
- Slot `7978490572` (top ad)
- Slot `6473288478` (middle/bottom ads)

**Check:**
1. AdSense → Ads → Ad units
2. Verify these slot IDs exist
3. Create them if missing

### 4. Testing on Localhost
- Ads typically don't show on localhost
- Test on actual deployed domain
- Use a staging environment if available

### 5. Ad Blockers
- Browser extensions block ads
- Privacy mode may block ads
- Company networks often block ads

**Test:**
1. Disable all browser extensions
2. Try incognito/private mode
3. Try different browser
4. Try mobile data (not company network)

### 6. Insufficient Content
- Google requires meaningful content
- Need actual traffic (not just developer visits)
- May need more pages/content

### 7. Recent Deployment
- Ads may take 20-30 minutes to start showing after deployment
- AdSense needs to crawl your site
- First ads can take longer

### 8. Geographic Restrictions
- Some regions have fewer ads
- Test from different locations
- US/UK typically have more ads available

## Debugging Steps

### Step 1: Check Console for Errors

Open browser DevTools (F12) → Console tab

**Look for:**
- AdSense script loading errors
- "adsbygoogle.push" errors
- CORS errors
- Content Security Policy errors

**Expected:** No errors related to AdSense

### Step 2: Check Network Tab

DevTools → Network tab → Reload page

**Look for:**
1. `adsbygoogle.js` - Should load successfully (200 status)
2. Requests to `pagead2.googlesyndication.com`
3. Ad creative requests

**If no requests:** Script not loading or being blocked

### Step 3: Inspect Ad Containers

Right-click on ad area → Inspect

**Should see:**
```html
<ins class="adsbygoogle" 
     style="display: inline-block; width: 728px; height: 90px;"
     data-ad-client="ca-pub-0855352021512673"
     data-ad-slot="7978490572"
     data-adsbygoogle-status="done">
</ins>
```

**Check:**
- `data-adsbygoogle-status="done"` means script processed it
- If status is missing, script didn't run
- If status is "done" but empty, no ad fill

### Step 4: Check AdSense Script

View page source (Ctrl+U) and search for "adsbygoogle"

**Should see:**
```html
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-0855352021512673"
   crossorigin="anonymous"></script>
```

**If missing:** Build/deploy issue

### Step 5: Manual Test

Add this to your page temporarily:

```html
<!-- Test ad unit -->
<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-0855352021512673"
     data-ad-slot="7978490572"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>
<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>
```

If this shows ads, component issue. If not, AdSense configuration issue.

## Common Solutions

### Solution 1: Wait for Approval
If AdSense account is new:
- Wait 24-48 hours
- Check email for approval notification
- Check AdSense dashboard for status
- Ads will automatically start showing once approved

### Solution 2: Create Ad Units
If ad slots don't exist:
1. Go to AdSense → Ads → Overview
2. Click "By ad unit" → "+ New ad unit"
3. Create Display ad
4. Copy the ad slot ID
5. Update component with correct slot ID

### Solution 3: Verify Domain
If site not verified:
1. AdSense → Sites → Add site
2. Enter your domain (e.g., eyelovesleep.com)
3. Follow verification instructions
4. Wait for verification to complete

### Solution 4: Check ads.txt
Create `/public/ads.txt` file:
```
google.com, pub-0855352021512673, DIRECT, f08c47fec0942fa0
```

This helps Google verify your account.

### Solution 5: Force Component Remount

If ads loaded once but disappeared:

```tsx
// Add key to force remount
<AmpAdTop key={Date.now()} />
```

Or clear browser cache completely.

## Testing Checklist

- [ ] AdSense account approved and active
- [ ] Domain added and verified in AdSense
- [ ] Ad units created for both slot IDs
- [ ] Testing on deployed site (not localhost)
- [ ] Ad blocker disabled
- [ ] Trying in incognito/private mode
- [ ] Waited 30+ minutes after deployment
- [ ] Console shows no JavaScript errors
- [ ] Network tab shows adsbygoogle.js loading
- [ ] `data-adsbygoogle-status="done"` in HTML
- [ ] ads.txt file created

## Expected Behavior

### When Working Correctly

**Development (localhost):**
- Ads likely won't show
- Console may show "Ad not served" messages
- This is normal

**Production (deployed):**
- Top ad: 728×90 leaderboard (desktop) or responsive (mobile)
- Middle/Bottom ads: Responsive fluid layout
- May show placeholder while loading
- Should render within 2-3 seconds

**First Visit vs. Repeat:**
- First-time visitors may see ads faster
- Google learns from your traffic
- Fill rate improves over time

## Quick Diagnostics

Run this in browser console:

```javascript
// Check if AdSense loaded
console.log('AdSense loaded:', typeof window.adsbygoogle !== 'undefined');

// Check how many ads pushed
console.log('Ads pushed:', window.adsbygoogle ? window.adsbygoogle.length : 0);

// Check ad elements
console.log('Ad elements:', document.querySelectorAll('.adsbygoogle').length);

// Check status
document.querySelectorAll('.adsbygoogle').forEach((ad, i) => {
  console.log(`Ad ${i} status:`, ad.getAttribute('data-adsbygoogle-status'));
  console.log(`Ad ${i} filled:`, ad.getAttribute('data-ad-status'));
});
```

## If Still Not Working

### Developer Mode Test
Some AdSense accounts have "developer mode" - check your AdSense settings.

### Contact AdSense Support
1. Go to AdSense Help Center
2. Click "Contact Us"
3. Explain ads not showing
4. Provide your publisher ID
5. Include site URL

### Alternative: Use Test Ads
While waiting for approval, you can use test ad units:
- Change client to: `ca-pub-0000000000000000` (test mode)
- This shows test ads for development
- Remember to change back to real ID before production!

## Component Code Verification

### AmpAdTop.tsx Should Have:
```tsx
<ins
  className="adsbygoogle"
  style={{
    display: 'inline-block',
    width: '728px',
    height: '90px',
  }}
  data-ad-client="ca-pub-0855352021512673"
  data-ad-slot="7978490572"
/>
```

And:
```tsx
useEffect(() => {
  if (adRef.current && !isAdPushed.current) {
    (window.adsbygoogle = window.adsbygoogle || []).push({});
    isAdPushed.current = true;
  }
}, []);
```

### AmpAdMiddle.tsx Should Have:
```tsx
<ins
  className="adsbygoogle"
  style={{ display: 'block' }}
  data-ad-format="fluid"
  data-ad-layout-key="-6t+ed+2i-1n-4w"
  data-ad-client="ca-pub-0855352021512673"
  data-ad-slot="6473288478"
/>
```

## Files to Check

1. `/index.html.template` - AdSense script must be present
2. `/components/AmpAdTop.tsx` - Top ad implementation
3. `/components/AmpAdMiddle.tsx` - Middle/bottom ad implementation
4. `/components/SleepCalculator.tsx` - Uses AmpAdTop and AmpAdMiddle
5. `/components/JetLagCalculator.tsx` - Uses AmpAdTop and AmpAdMiddle
6. `/components/SleepRecommendations.tsx` - Uses AmpAdTop and AmpAdMiddle
7. `/_headers` - Should be a plain text file (not directory!)

## Last Resort

If absolutely nothing works:

1. **Revert to Old AdPlacement Component:**
   - Change imports back to `AdPlacement`
   - Use: `<AdPlacement size="leaderboard" maxHeight={90} />`

2. **Use Manual HTML:**
   - Create ads manually in AdSense
   - Copy the full code snippet
   - Use `dangerouslySetInnerHTML` to inject it

3. **Use Different Ad Network:**
   - Try Media.net
   - Try Ezoic
   - Try direct ad sales

## Status Indicators

✅ Script loading successfully
✅ Components updated to standard AdSense
✅ Proper React implementation with useEffect
✅ Type declarations added
✅ _headers file fixed

⚠️ Need to verify:
- AdSense account approval status
- Ad units created in AdSense dashboard
- Domain verified in AdSense
- Testing on production URL (not localhost)

---

**Most Likely Issue:** AdSense account not yet approved or ad units not created in AdSense dashboard.

**Next Step:** Check AdSense dashboard at https://www.google.com/adsense/
