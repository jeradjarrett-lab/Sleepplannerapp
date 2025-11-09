# 🚀 Quick Start - Getting Ads to Show

## TL;DR - 3 Steps to See Ads

### 1️⃣ Refresh the Page
The API fix is now live - refresh to load the full config.

### 2️⃣ Check for Placeholders
You should now see **gray placeholder boxes** with:
- "Advertisement (Placeholder)" text
- Ad slot names (headerBanner, sidebarTop, etc.)
- Instructions to add code

**If you see placeholders = ✅ It's working!**

### 3️⃣ Add Real Ad Code (Optional)
To show real ads instead of placeholders:
1. Go to `#admin`
2. Click "Ad Management" tab
3. Toggle placements ON
4. Paste your ad code
5. Click "Save Changes"

---

## What Changed?

### Before ❌
- API only returned SEO config
- No ad data reached the frontend
- Ads never rendered

### After ✅
- API returns full config (ads + SEO)
- Frontend receives ad settings
- Placeholders show where ads will be
- Real ads render when code is added

---

## Console Check (30 seconds)

Open console (F12) and look for:

```
📡 ConfigContext: Fetched config:
  - adsEnabled: true ✅
  - adPlacements: Array(6) ✅
```

If you see this = **Everything is working!**

---

## Test Ad Code

Want to test immediately? Use this test ad:

```html
<div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 20px; color: white; text-align: center; border-radius: 8px;">
  <h3 style="margin: 0 0 10px 0;">🎯 Test Advertisement</h3>
  <p style="margin: 0;">Your real ad will appear here</p>
</div>
```

Paste this in any ad slot in the admin panel to see it work!

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| No placeholders visible | Check console - adsEnabled might be false |
| Console says "adsEnabled: false" | Go to admin → Toggle "Enable All Ads" ON |
| Console says "adPlacements: undefined" | Clear cache and refresh |
| Placeholder shows but I want real ads | Add ad code in admin panel |

---

## Google AdSense Setup

Using Google AdSense? Here's the quick process:

1. **Get your AdSense code** from Google
2. **Copy the `<script>` tag** for each ad unit
3. **Go to admin panel** (`#admin`)
4. **Paste code** in the appropriate slot:
   - `headerBanner` → Top leaderboard (728x90)
   - `sidebarTop` → Medium rectangle (300x250)
   - `sidebarBottom` → Medium rectangle (300x250)
   - `contentTop` → Mobile banner (320x100)
   - `contentBottom` → Mobile banner (320x100)
   - `footerBanner` → Bottom leaderboard (728x90)
5. **Save changes**
6. **Return to app** → Ads appear! 🎉

---

## Expected Behavior

### On Page Load:
1. Config fetches from API (with ads data)
2. AdPlacement components check config
3. If code exists → Render real ad
4. If no code → Show placeholder with instructions

### In Console:
```
📡 ConfigContext: Fetched config
🎯 AdPlacement: size=leaderboard, placementKey=headerBanner
⚠️ AdPlacement: headerBanner has no ad code - showing placeholder
✅ (or) AdPlacement: Rendering ad for headerBanner
```

---

## Still Not Working?

Check the full debugging guide: `/ADS_NOT_SHOWING_FIX.md`

Or check console for these specific messages:
- `🔴 Config not loaded` → API issue
- `🔴 Ads globally disabled` → Enable in admin
- `🔴 No ad config found` → Config structure problem
- `⚠️ has no ad code` → Expected (shows placeholder)
- `✅ Rendering ad` → Working perfectly!

---

**The fix is deployed - just refresh and you should see placeholders (or real ads if you've added code)!** 🎉
