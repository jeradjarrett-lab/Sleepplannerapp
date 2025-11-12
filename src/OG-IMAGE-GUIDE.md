# Open Graph Images - Quick Guide

## 📐 Image Specifications

**Dimensions:** 1200 × 630 pixels
**Format:** PNG or JPG (PNG recommended)
**File size:** < 300 KB (optimized)
**Aspect ratio:** 1.91:1
**Color mode:** RGB

---

## 🎨 Required Images

### 1. General Image
**Filename:** `og-image.png`
**Location:** `/public/og-image.png`
**Usage:** Default/homepage

**Content:**
```
┌────────────────────────────────────────┐
│                                        │
│       🌙 EyeLoveSleep                  │
│                                        │
│   Sleep Calculator & Jet Lag Tool      │
│                                        │
│   Calculate optimal bedtimes based     │
│   on 90-minute sleep cycles           │
│                                        │
└────────────────────────────────────────┘
```

### 2. Sleep Calculator Image
**Filename:** `og-sleep-calculator.png`
**Location:** `/public/og-sleep-calculator.png`
**Usage:** Sleep calculator section

**Content:**
```
┌────────────────────────────────────────┐
│                                        │
│    🌙  Sleep Calculator                │
│                                        │
│    Calculate Optimal Bedtime           │
│    & Wake Time                         │
│                                        │
│    Based on 90-minute sleep cycles     │
│                                        │
└────────────────────────────────────────┘
```

### 3. Sleep Recommendations Image
**Filename:** `og-sleep-by-age.png`
**Location:** `/public/og-sleep-by-age.png`
**Usage:** Sleep recommendations section

**Content:**
```
┌────────────────────────────────────────┐
│                                        │
│    👶 Sleep Recommendations by Age     │
│                                        │
│    Newborns: 14-17h                   │
│    Children: 9-11h                     │
│    Adults: 7-9h                       │
│                                        │
│    NSF Guidelines                     │
│                                        │
└────────────────────────────────────────┘
```

### 4. Jet Lag Calculator Image
**Filename:** `og-jet-lag-calculator.png`
**Location:** `/public/og-jet-lag-calculator.png`
**Usage:** Jet lag calculator section

**Content:**
```
┌────────────────────────────────────────┐
│                                        │
│    ✈️  Jet Lag Calculator              │
│                                        │
│    Beat Jet Lag Fast                   │
│                                        │
│    Get personalized timezone           │
│    adjustment plans                    │
│                                        │
└────────────────────────────────────────┘
```

---

## 🎨 Design Template

### Color Palette
```css
Background: linear-gradient(135deg, #0f172a, #1e293b, #0f172a)
Primary: #4f86f7 (Blue)
Text: #f8fafc (White)
Accent: #60a5fa (Light blue)
```

### Typography
```
Font: Inter or similar sans-serif
Title: 64-80px, Bold (font-weight: 700)
Subtitle: 32-48px, Medium (font-weight: 500)
Body: 24-32px, Regular (font-weight: 400)
```

### Layout
```
Padding: 80px (all sides)
Text alignment: Center or Left
Icon size: 120-150px
Logo: Top-left or centered
```

---

## 🛠️ How to Create Images

### Option 1: Canva (Easiest)

1. **Go to Canva:** https://www.canva.com/
2. **Create design:** Select "Custom size" → 1200 × 630 px
3. **Set background:**
   - Click "Background color"
   - Use gradient: Dark blue (#0f172a) to slate (#1e293b)
4. **Add text:**
   - Title: 70-80px, Bold, White
   - Subtitle: 36-48px, Medium, White
   - Body: 28-32px, Regular, White/80% opacity
5. **Add elements:**
   - Search for icons: "moon", "airplane", "sleep"
   - Use #4f86f7 color for icons
6. **Download:**
   - File type: PNG
   - Quality: Standard (don't need high, keeps file small)
   - Download

### Option 2: Figma (Professional)

1. **Create frame:** 1200 × 630 px
2. **Add gradient background:**
   ```
   Type: Linear
   Angle: 135°
   Stop 1: #0f172a (0%)
   Stop 2: #1e293b (50%)
   Stop 3: #0f172a (100%)
   ```
3. **Add text layers:**
   - Inter font family
   - Colors: #f8fafc (white) for titles
   - Use proper hierarchy
4. **Add icons:**
   - From Lucide or Feather icon sets
   - Size: 120-150px
   - Color: #4f86f7
5. **Export:**
   - Format: PNG
   - Scale: 1x
   - Optimize for export

### Option 3: Photoshop

1. **New document:** 1200 × 630 px, RGB, 72 DPI
2. **Gradient background:**
   - Gradient Tool (G)
   - Colors: #0f172a to #1e293b to #0f172a
   - Angle: 135°
3. **Add text:**
   - Type Tool (T)
   - Font: Inter or Helvetica
   - Anti-aliasing: Sharp
4. **Add graphics:**
   - Icons from Noun Project or similar
   - Color overlay: #4f86f7
5. **Export:**
   - File → Export → Export As
   - Format: PNG-8 or PNG-24
   - Optimize for web

### Option 4: Online Tools

**MetaTags.io Image Generator:**
1. Go to: https://metatags.io/
2. Fill in: Title, Description, URL
3. Customize: Colors, fonts, layout
4. Download: Click "Download image"

**OpenGraph.xyz:**
1. Go to: https://www.opengraph.xyz/
2. Choose template or start from scratch
3. Customize colors and text
4. Download PNG

---

## 📏 Safe Area Guide

When designing, keep important content within safe area:

```
┌──────────────────────────────────────┐
│  80px padding                        │
│  ┌────────────────────────────────┐ │
│  │                                │ │
│  │     SAFE AREA                  │ │
│  │     1040 × 470 px              │ │
│  │                                │ │
│  │  Keep all text and important   │ │
│  │  elements within this area     │ │
│  │                                │ │
│  └────────────────────────────────┘ │
│  80px padding                        │
└──────────────────────────────────────┘
```

**Why?** Some platforms crop or zoom images slightly.

---

## ✅ Checklist for Each Image

Before saving:
- [ ] Dimensions: 1200 × 630 px
- [ ] Format: PNG
- [ ] File size: < 300 KB
- [ ] Text is readable at small sizes
- [ ] High contrast (dark bg, light text)
- [ ] Includes branding (EyeLoveSleep name/logo)
- [ ] Icon/visual element included
- [ ] No important content near edges
- [ ] Saved in `/public/` directory
- [ ] Correct filename

---

## 🎨 Example Design Layouts

### Layout 1: Centered
```
┌────────────────────────────────────────┐
│                                        │
│              🌙                        │
│                                        │
│        EyeLoveSleep                    │
│    Sleep Calculator Tool               │
│                                        │
│  Calculate optimal bedtimes based      │
│    on 90-minute sleep cycles          │
│                                        │
└────────────────────────────────────────┘
```

### Layout 2: Split
```
┌────────────────────────────────────────┐
│                    │                   │
│                    │  EyeLoveSleep     │
│       🌙          │                   │
│     Icon          │  Sleep Calculator │
│                    │                   │
│                    │  Calculate your   │
│                    │  optimal bedtime  │
│                    │                   │
└────────────────────────────────────────┘
```

### Layout 3: Top-aligned
```
┌────────────────────────────────────────┐
│  🌙 EyeLoveSleep                       │
│                                        │
│  Sleep Calculator                      │
│                                        │
│  Calculate optimal bedtimes and wake   │
│  times based on 90-minute sleep        │
│  cycles. Wake up refreshed.            │
│                                        │
└────────────────────────────────────────┘
```

---

## 🔧 Optimization Tips

### Reduce File Size
1. **TinyPNG:** https://tinypng.com/
   - Upload PNG
   - Downloads optimized version
   - Usually 50-70% smaller

2. **Squoosh:** https://squoosh.app/
   - Drag and drop image
   - Adjust quality slider
   - Compare before/after
   - Download

3. **Export settings:**
   - Use PNG-8 if possible (256 colors)
   - Reduce quality to 80-85%
   - Remove metadata
   - No transparency needed

### Test File Size
```bash
# Command line (Mac/Linux):
ls -lh og-image.png

# Should show size like: 245K
# Goal: < 300K
```

### Load Testing
Visit these URLs to verify images load:
- `https://yourdomain.com/og-image.png`
- `https://yourdomain.com/og-sleep-calculator.png`
- `https://yourdomain.com/og-sleep-by-age.png`
- `https://yourdomain.com/og-jet-lag-calculator.png`

---

## 📱 Preview on Devices

### Desktop Preview
On Facebook/Twitter share dialog, the image will show at approximately:
- **Facebook:** ~470px wide
- **Twitter:** ~500px wide
- **LinkedIn:** ~550px wide

### Mobile Preview
On mobile devices:
- **Facebook:** ~280px wide
- **Twitter:** ~320px wide
- **WhatsApp:** ~260px wide

**Tip:** Design for mobile first, ensure text is readable at small sizes.

---

## 🐛 Common Issues

### Text Too Small
**Problem:** Text unreadable in social media preview
**Solution:** Increase font size to minimum 64px for titles

### File Too Large
**Problem:** Image over 8 MB (or loads slowly)
**Solution:** Compress using TinyPNG, reduce quality to 80-85%

### Colors Look Different
**Problem:** Colors appear washed out or different
**Solution:** Use RGB color mode (not CMYK), test on actual platforms

### Image Stretched
**Problem:** Image appears distorted
**Solution:** Verify exact 1200 × 630 dimensions, don't scale

### Blurry Image
**Problem:** Image appears fuzzy
**Solution:** Export at exact size (no upscaling), use PNG format

---

## 📊 Testing Checklist

After creating images:

### File System
- [ ] Files saved in `/public/` directory
- [ ] Correct filenames (exact match)
- [ ] All 4 images created

### Image Properties
- [ ] Dimensions: 1200 × 630 px
- [ ] Format: PNG
- [ ] File size: < 300 KB each
- [ ] Color mode: RGB

### Content
- [ ] Text readable at small size
- [ ] High contrast
- [ ] Branding visible
- [ ] No content cut off at edges

### Deployment
- [ ] Deployed to production
- [ ] Images accessible via URL
- [ ] Correct MIME type (image/png)

### Social Media
- [ ] Test on Facebook Debugger
- [ ] Test on Twitter Card Validator
- [ ] Share on WhatsApp (verify preview)
- [ ] Share on Discord (verify embed)

---

## 🎉 You're Done!

Once you've created and uploaded all 4 images, your social media sharing will look professional and engaging.

**Result:** Rich, beautiful previews when users share your site on:
- ✅ Facebook
- ✅ Twitter/X
- ✅ LinkedIn
- ✅ WhatsApp
- ✅ Discord
- ✅ Slack
- ✅ Reddit
- ✅ And more!

---

## 🔗 Quick Links

- **Canva (Free):** https://www.canva.com/
- **TinyPNG (Compress):** https://tinypng.com/
- **Facebook Debugger:** https://developers.facebook.com/tools/debug/
- **Twitter Validator:** https://cards-dev.twitter.com/validator
- **MetaTags.io:** https://metatags.io/

Need help? Check `/SOCIAL-MEDIA-SHARING.md` for detailed documentation.
