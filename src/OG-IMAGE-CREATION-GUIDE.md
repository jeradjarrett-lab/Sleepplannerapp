# 🎨 OG Image Creation Guide

## ✅ Templates Created!

I've created 3 professional HTML templates for your OG images:

1. **Sleep Calculator:** `/public/og-templates/sleep-calculator-og.html`
2. **Caffeine Calculator:** `/public/og-templates/caffeine-calculator-og.html`
3. **Jet Lag Calculator:** `/public/og-templates/jet-lag-calculator-og.html`

Each template is **1200x630px** (Facebook/LinkedIn recommended) with:
- ✅ Relevant background image from Unsplash
- ✅ Dark gradient overlay matching your site
- ✅ Animated icon
- ✅ Large readable text
- ✅ EyeLoveSleep branding
- ✅ Professional design

---

## 🚀 Quick Method: Screenshot to Create PNG

### **Method 1: Browser Screenshot (Easiest)**

#### Step 1: Open Template in Browser
```bash
# Navigate to the public folder
cd public/og-templates

# Open each file in browser:
# - sleep-calculator-og.html
# - caffeine-calculator-og.html
# - jet-lag-calculator-og.html
```

Or just open the files directly:
- `file:///path/to/your/project/public/og-templates/sleep-calculator-og.html`
- `file:///path/to/your/project/public/og-templates/caffeine-calculator-og.html`
- `file:///path/to/your/project/public/og-templates/jet-lag-calculator-og.html`

#### Step 2: Take Screenshot (1200x630px)

**Chrome/Edge:**
1. Open template in browser (full screen)
2. Press F12 (DevTools)
3. Click "Toggle Device Toolbar" (Ctrl+Shift+M)
4. Set dimensions: **1200 x 630**
5. Right-click on page → "Capture screenshot"
6. Save as:
   - `og-sleep-calculator.png`
   - `og-caffeine-calculator.png`
   - `og-jet-lag-calculator.png`

**Firefox:**
1. Open template in browser
2. Press F12
3. Click "Responsive Design Mode" (Ctrl+Shift+M)
4. Set dimensions: **1200 x 630**
5. Click camera icon → "Take a screenshot"

**Safari:**
1. Open template
2. Develop → Enter Responsive Design Mode
3. Set to 1200x630
4. File → Export as Image

#### Step 3: Move Images to Public Folder
```bash
# Move/copy the screenshots to:
/public/og-sleep-calculator.png
/public/og-caffeine-calculator.png
/public/og-jet-lag-calculator.png
```

---

### **Method 2: Automated Screenshot (Recommended)**

I'll create a Node.js script to automatically generate the images.

**Install Puppeteer:**
```bash
npm install --save-dev puppeteer
```

**Run the script:**
```bash
node scripts/generate-og-images.js
```

This will automatically:
1. Open each HTML template
2. Take a 1200x630px screenshot
3. Save as PNG in `/public/` folder
4. Optimize file size

Let me create this script for you...

---

## 📋 After Creating Images

### **Verify Images Exist:**

Check that these 3 files are in `/public/`:
```
/public/og-sleep-calculator.png
/public/og-caffeine-calculator.png
/public/og-jet-lag-calculator.png
```

### **Test on Social Media:**

**1. Facebook Sharing Debugger:**
```
https://developers.facebook.com/tools/debug/
```

Enter:
- `https://eyelovesleep.com/`
- `https://eyelovesleep.com/caffeine-sleep`
- `https://eyelovesleep.com/jet-lag`

**Expected Result:**
- ✅ Image loads (1200x630)
- ✅ Title shows correctly
- ✅ Description shows correctly

**2. Twitter Card Validator:**
```
https://cards-dev.twitter.com/validator
```

Enter same URLs.

**Expected Result:**
- ✅ Large image card
- ✅ Image preview loads
- ✅ Text displays correctly

**3. LinkedIn Post Inspector:**
```
https://www.linkedin.com/post-inspector/
```

Enter same URLs to verify.

---

## 🎨 Design Specifications

### **Sleep Calculator OG Image:**
- **Background:** Dark blue gradient (#1a1a2e → #0f3460)
- **Accent Color:** #4f86f7 (primary blue)
- **Icon:** Clock/time icon
- **Title:** "Sleep Calculator"
- **Subtitle:** "Calculate Perfect Bedtime"
- **Description:** "Wake up refreshed with 90-minute sleep cycles"
- **Background Image:** Peaceful night sleep scene (20% opacity)

### **Caffeine Calculator OG Image:**
- **Background:** Brown/coffee gradient (#2c1810 → #6b3e2e)
- **Accent Color:** #cd7f32 (coffee bronze)
- **Icon:** Coffee cup icon
- **Title:** "Caffeine Calculator"
- **Subtitle:** "When to Stop Coffee"
- **Description:** "Track caffeine for better sleep"
- **Background Image:** Coffee cup scene (25% opacity)

### **Jet Lag Calculator OG Image:**
- **Background:** Blue travel gradient (#0a1929 → #2c5f8d)
- **Accent Color:** #5da9f7 (sky blue)
- **Icon:** Globe/world icon
- **Title:** "Jet Lag Calculator"
- **Subtitle:** "Beat Jet Lag Fast"
- **Description:** "Personalized timezone adjustment plans"
- **Background Image:** Airplane/travel scene (20% opacity)

---

## 🔧 Troubleshooting

### **Images Look Pixelated:**
- Take screenshot at 2x resolution (2400x1260)
- Then scale down to 1200x630 in image editor
- This gives sharper text on high-DPI displays

### **Text Too Small on Mobile:**
- Don't worry! OG images are for desktop/social sharing
- Mobile apps will scale appropriately
- Text is large enough (68px title, 36px subtitle)

### **Colors Don't Match Site:**
- Templates use exact color codes from your site
- Dark gradients: #1a1a2e, #16213e, #0f3460
- Primary blue: #4f86f7
- Should match perfectly

### **Background Image Not Loading:**
- Images are from Unsplash (reliable CDN)
- If offline, remove `.bg-image` div and keep solid gradient
- Or replace `background-image` URL with local image

### **File Size Too Large:**
- Original PNGs can be 200-500KB
- Compress with TinyPNG: https://tinypng.com
- Target: < 300KB per image (still good quality)

---

## 📁 File Locations

### **HTML Templates (for generating images):**
```
/public/og-templates/sleep-calculator-og.html
/public/og-templates/caffeine-calculator-og.html
/public/og-templates/jet-lag-calculator-og.html
```

### **Final PNG Images (deploy these):**
```
/public/og-sleep-calculator.png
/public/og-caffeine-calculator.png
/public/og-jet-lag-calculator.png
```

### **Referenced in Pages:**
```
/pages/SleepCalculatorPage.tsx (line 67)
/pages/CaffeineSleepPage.tsx (line 67)
/pages/JetLagPage.tsx (line 67)
```

---

## ✅ Deployment Checklist

After creating images:

- [ ] Created `og-sleep-calculator.png` (1200x630px)
- [ ] Created `og-caffeine-calculator.png` (1200x630px)
- [ ] Created `og-jet-lag-calculator.png` (1200x630px)
- [ ] All images are < 500KB each
- [ ] Images are in `/public/` folder
- [ ] Tested with Facebook Debugger
- [ ] Tested with Twitter Validator
- [ ] Verified images load on deployed site

---

## 🎉 Alternative: Use Online Tools

If you prefer not to screenshot manually, use these free online tools:

### **Option 1: Canva**
1. Go to: https://www.canva.com
2. Create design → Custom size: 1200 x 630 px
3. Use the design specs above
4. Download as PNG

### **Option 2: Figma**
1. Go to: https://www.figma.com
2. Create frame: 1200 x 630
3. Import the HTML design
4. Export as PNG

### **Option 3: OG Image Generator**
1. Go to: https://www.opengraph.xyz
2. Customize with your text
3. Download PNG

---

## 📖 Next Steps

1. **Create the 3 PNG images** using Method 1 (browser screenshot) or Method 2 (automated script)
2. **Upload to `/public/` folder** with exact names:
   - `og-sleep-calculator.png`
   - `og-caffeine-calculator.png`
   - `og-jet-lag-calculator.png`
3. **Build and deploy:**
   ```bash
   npm run build
   # Upload dist/ folder to server
   ```
4. **Verify on social media** using Facebook Debugger and Twitter Validator

---

**You're almost done! Just create the 3 images and deploy.** 🚀

The HTML templates make it super easy—just open in browser, take a screenshot at 1200x630, and save!
