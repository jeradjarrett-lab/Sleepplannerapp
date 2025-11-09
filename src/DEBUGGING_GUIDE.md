# Debugging Guide - Ads & SEO Not Showing

## Added Debug Logging

I've added comprehensive console.log debugging to help identify why ads and titles aren't working:

### 1. **Config Loading** (`/utils/ConfigContext.tsx`)
When the app loads, you'll see:
```
📡 ConfigContext: Fetched config: {adsEnabled: true, adPlacements: {...}, ...}
  - adsEnabled: true
  - adPlacements: Array(6) ["headerBanner", "sidebarTop", ...]
  - seo.siteName: EyeLoveSleep
```

### 2. **Ad Placement** (`/components/AdPlacement.tsx`)
For each ad location, you'll see one of:
```
✅ AdPlacement: Rendering ad for headerBanner
🔴 AdPlacement: Config not loaded
🔴 AdPlacement: Ads globally disabled
🔴 AdPlacement: No ad config found for headerBanner
🔴 AdPlacement: headerBanner is disabled
⚠️ AdPlacement: headerBanner has no ad code
```

### 3. **SEO Title Updates** (`/App.tsx`)
When switching sections:
```
📝 SEO: Setting title to "Sleep Calculator - Calculate Best Bedtime"
```

## How to Debug

### Step 1: Open Browser Console
1. Open your web browser
2. Press F12 (or right-click → Inspect)
3. Click the "Console" tab
4. Refresh the page

### Step 2: Check Config Loading
Look for the `📡 ConfigContext` message:

**If you see:**
- `adsEnabled: true` ✅ Ads are enabled globally
- `adsEnabled: false` ❌ Ads are disabled - go to admin panel and enable
- `adPlacements: Array(6)` ✅ Ad placements exist
- `adPlacements: Array(0)` or `undefined` ❌ No ad placements configured

### Step 3: Check Ad Placement
Look for `AdPlacement` messages:

**Common Issues:**
- `🔴 headerBanner is disabled` → Go to admin, enable that specific placement
- `⚠️ headerBanner has no ad code` → Go to admin, add ad code to that placement
- `🔴 Ads globally disabled` → Go to admin, toggle "Enable All Ads" to ON

### Step 4: Check SEO Titles
Look for `📝 SEO` messages:

- Should see title updates when switching between Sleep/Recommendations/Jet Lag
- If no messages appear, the SEO effect isn't running

## Troubleshooting Steps

### Problem: No Config Logs at All
**Solution:** The API might not be responding
1. Check network tab for `/public/config` request
2. Verify it returns 200 OK
3. Check the response body has config data

### Problem: Config Loaded But No Ads
**Possible Causes:**
1. **adsEnabled is false** → Enable in admin panel
2. **Individual placements disabled** → Enable specific placements in admin
3. **No ad code** → Add ad code in admin panel
4. **Wrong placement keys** → Check console for which keys are being requested

### Problem: Title Not Changing
**Possible Causes:**
1. **seoConfig is null** → Database config not loaded
2. **SEO effect not running** → Check console for SEO logs
3. **Missing dependency** → Fixed by adding `seoConfig` to useEffect deps

## Quick Fix Checklist

### To Show Ads:
1. ✅ Go to admin panel (#admin)
2. ✅ Toggle "Enable All Ads" to ON
3. ✅ For each placement (headerBanner, sidebarTop, etc):
   - Toggle the switch to ON (enabled)
   - Paste ad code in the textarea
4. ✅ Click "Save Changes"
5. ✅ Return to main app
6. ✅ Check console - should see `✅ AdPlacement: Rendering ad`

### To Change Titles:
1. ✅ Go to admin panel (#admin)
2. ✅ Click "SEO Settings" tab
3. ✅ Update "Site Name"
4. ✅ Update page titles for each section
5. ✅ Click "Save Changes"
6. ✅ Return to main app
7. ✅ Switch sections - titles should update

## Expected Console Output (Working)

```
📡 ConfigContext: Fetched config: {...}
  - adsEnabled: true
  - adPlacements: Array(6) ["headerBanner", "sidebarTop", "sidebarBottom", ...]
  - seo.siteName: EyeLoveSleep

🎯 AdPlacement: size=leaderboard, placementKey=headerBanner
✅ AdPlacement: Rendering ad for headerBanner

🎯 AdPlacement: size=medium, placementKey=sidebarTop
✅ AdPlacement: Rendering ad for sidebarTop

📝 SEO: Setting title to Sleep Calculator - Calculate Best Bedtime
```

## Next Steps

1. **Open console and refresh the page**
2. **Look for the debug messages**
3. **Identify which check is failing**
4. **Go to admin panel and fix the configuration**
5. **Save and return to app**

The debug logs will tell you exactly what's wrong! 🔍
