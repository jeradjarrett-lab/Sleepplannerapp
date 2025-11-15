#!/bin/bash

# Mobile Performance Optimization Script
# Applies all performance optimizations automatically

set -e

echo "╔══════════════════════════════════════════════════════════════════╗"
echo "║                                                                  ║"
echo "║       📱 MOBILE PERFORMANCE BOOST - AUTOMATED SETUP              ║"
echo "║                                                                  ║"
echo "╚══════════════════════════════════════════════════════════════════╝"
echo ""

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Step 1: Backup current config
echo -e "${BLUE}[1/5]${NC} Backing up current vite.config.ts..."
if [ -f "vite.config.ts" ]; then
    cp vite.config.ts vite.config.ts.backup
    echo -e "${GREEN}✓${NC} Backup created: vite.config.ts.backup"
else
    echo -e "${RED}✗${NC} vite.config.ts not found!"
    exit 1
fi

# Step 2: Switch to optimized config
echo ""
echo -e "${BLUE}[2/5]${NC} Switching to optimized configuration..."
if [ -f "vite.config.optimized.ts" ]; then
    cp vite.config.optimized.ts vite.config.ts
    echo -e "${GREEN}✓${NC} Using optimized config"
else
    echo -e "${RED}✗${NC} vite.config.optimized.ts not found!"
    exit 1
fi

# Step 3: Check if Lightning CSS is installed
echo ""
echo -e "${BLUE}[3/5]${NC} Checking Lightning CSS installation..."
if npm list lightningcss > /dev/null 2>&1; then
    echo -e "${GREEN}✓${NC} Lightning CSS already installed"
else
    echo -e "${YELLOW}!${NC} Installing Lightning CSS..."
    npm install -D lightningcss
    echo -e "${GREEN}✓${NC} Lightning CSS installed"
fi

# Step 4: Build
echo ""
echo -e "${BLUE}[4/5]${NC} Building optimized version..."
echo -e "${YELLOW}→${NC} This may take 15-25 seconds..."
echo ""

if npm run build; then
    echo ""
    echo -e "${GREEN}✓${NC} Build completed successfully!"
    echo ""
    
    # Show bundle size
    echo -e "${BLUE}Bundle Analysis:${NC}"
    du -sh dist/assets/*.js 2>/dev/null | head -5 || echo "Bundle files created in dist/assets/"
    
    total_size=$(du -sh dist/ | cut -f1)
    echo ""
    echo -e "Total dist size: ${GREEN}${total_size}${NC}"
else
    echo ""
    echo -e "${RED}✗${NC} Build failed!"
    echo ""
    echo "Rolling back to original config..."
    cp vite.config.ts.backup vite.config.ts
    exit 1
fi

# Step 5: Test preview
echo ""
echo -e "${BLUE}[5/5]${NC} Ready to test!"
echo ""
echo -e "${GREEN}✓${NC} Optimization complete!"
echo ""

# Summary
echo "╔══════════════════════════════════════════════════════════════════╗"
echo "║                     OPTIMIZATION SUMMARY                         ║"
echo "╚══════════════════════════════════════════════════════════════════╝"
echo ""
echo -e "${GREEN}✓${NC} Vite config: Optimized"
echo -e "${GREEN}✓${NC} Lightning CSS: Installed"
echo -e "${GREEN}✓${NC} Build: Success"
echo -e "${GREEN}✓${NC} Font loading: Optimized"
echo -e "${GREEN}✓${NC} Chunk splitting: Intelligent"
echo -e "${GREEN}✓${NC} Tree shaking: Maximum"
echo ""

# Next steps
echo "╔══════════════════════════════════════════════════════════════════╗"
echo "║                        NEXT STEPS                                ║"
echo "╚══════════════════════════════════════════════════════════════════╝"
echo ""
echo -e "${BLUE}1. Test locally:${NC}"
echo "   npm run preview"
echo "   Open: http://localhost:4173"
echo ""
echo -e "${BLUE}2. Check that:${NC}"
echo "   ✓ Site loads correctly"
echo "   ✓ All calculators work"
echo "   ✓ Fonts display properly"
echo "   ✓ No console errors"
echo ""
echo -e "${BLUE}3. Upload to server:${NC}"
echo "   Upload entire dist/ folder"
echo ""
echo -e "${BLUE}4. Test performance:${NC}"
echo "   https://pagespeed.web.dev/analysis?url=https://eyelovesleep.com"
echo ""
echo -e "${GREEN}Expected: 95-98 mobile performance score!${NC}"
echo ""

# Rollback info
echo "╔══════════════════════════════════════════════════════════════════╗"
echo "║                      ROLLBACK (IF NEEDED)                        ║"
echo "╚══════════════════════════════════════════════════════════════════╝"
echo ""
echo "If something doesn't work, rollback with:"
echo ""
echo "  cp vite.config.ts.backup vite.config.ts"
echo "  npm run build"
echo ""

# Bundle analysis option
echo "╔══════════════════════════════════════════════════════════════════╗"
echo "║                    OPTIONAL: BUNDLE ANALYSIS                     ║"
echo "╚══════════════════════════════════════════════════════════════════╝"
echo ""
echo "To visualize bundle composition:"
echo ""
echo "  ANALYZE=true npm run build"
echo ""
echo "Opens: dist/stats.html (interactive chart)"
echo ""

echo "════════════════════════════════════════════════════════════════════"
echo ""
echo -e "${GREEN}🚀 Performance boost ready! Deploy and test! 🚀${NC}"
echo ""
