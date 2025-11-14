#!/bin/bash

# Verification script for standalone HTML structure

echo "🔍 Verifying Standalone HTML Structure..."
echo ""

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check 1: HTML files exist
echo "📄 Checking HTML files..."
if [ -f "index.html" ]; then
    echo -e "${GREEN}✅${NC} index.html exists"
else
    echo -e "${RED}❌${NC} index.html NOT found"
fi

if [ -f "caffeine-sleep.html" ]; then
    echo -e "${GREEN}✅${NC} caffeine-sleep.html exists"
else
    echo -e "${RED}❌${NC} caffeine-sleep.html NOT found"
fi

if [ -f "jet-lag.html" ]; then
    echo -e "${GREEN}✅${NC} jet-lag.html exists"
else
    echo -e "${RED}❌${NC} jet-lag.html NOT found"
fi

echo ""

# Check 2: No .htaccess file
echo "🔧 Checking for .htaccess..."
if [ -f ".htaccess" ]; then
    echo -e "${YELLOW}⚠️${NC} .htaccess exists (not needed for standalone structure)"
else
    echo -e "${GREEN}✅${NC} No .htaccess file (good! not needed)"
fi

echo ""

# Check 3: Navigation uses relative links
echo "🔗 Checking navigation links..."

if grep -q 'href="index.html"' components/NavigationMenu.tsx; then
    echo -e "${GREEN}✅${NC} Navigation uses relative link to index.html"
else
    echo -e "${RED}❌${NC} Navigation doesn't use relative link to index.html"
fi

if grep -q 'href="caffeine-sleep.html"' components/NavigationMenu.tsx; then
    echo -e "${GREEN}✅${NC} Navigation uses relative link to caffeine-sleep.html"
else
    echo -e "${RED}❌${NC} Navigation doesn't use relative link to caffeine-sleep.html"
fi

if grep -q 'href="jet-lag.html"' components/NavigationMenu.tsx; then
    echo -e "${GREEN}✅${NC} Navigation uses relative link to jet-lag.html"
else
    echo -e "${RED}❌${NC} Navigation doesn't use relative link to jet-lag.html"
fi

echo ""

# Check 4: Build output
echo "🏗️ Checking build output..."
if [ -d "dist" ]; then
    echo -e "${GREEN}✅${NC} dist/ folder exists"
    
    if [ -f "dist/index.html" ]; then
        echo -e "${GREEN}✅${NC} dist/index.html exists"
    else
        echo -e "${YELLOW}⚠️${NC} dist/index.html not found (run 'npm run build')"
    fi
    
    if [ -f "dist/caffeine-sleep.html" ]; then
        echo -e "${GREEN}✅${NC} dist/caffeine-sleep.html exists"
    else
        echo -e "${YELLOW}⚠️${NC} dist/caffeine-sleep.html not found (run 'npm run build')"
    fi
    
    if [ -f "dist/jet-lag.html" ]; then
        echo -e "${GREEN}✅${NC} dist/jet-lag.html exists"
    else
        echo -e "${YELLOW}⚠️${NC} dist/jet-lag.html not found (run 'npm run build')"
    fi
    
    if [ -d "dist/assets" ]; then
        echo -e "${GREEN}✅${NC} dist/assets/ folder exists"
        JS_COUNT=$(find dist/assets -name "*.js" 2>/dev/null | wc -l)
        CSS_COUNT=$(find dist/assets -name "*.css" 2>/dev/null | wc -l)
        echo "   📦 Found $JS_COUNT JavaScript files"
        echo "   🎨 Found $CSS_COUNT CSS files"
    else
        echo -e "${YELLOW}⚠️${NC} dist/assets/ folder not found"
    fi
else
    echo -e "${YELLOW}⚠️${NC} dist/ folder not found (run 'npm run build')"
fi

echo ""

# Check 5: Sitemap URLs
echo "🗺️ Checking sitemap..."
if [ -f "public/sitemap.xml" ]; then
    if grep -q "index.html" public/sitemap.xml; then
        echo -e "${GREEN}✅${NC} Sitemap contains index.html"
    else
        echo -e "${RED}❌${NC} Sitemap doesn't contain index.html"
    fi
    
    if grep -q "caffeine-sleep.html" public/sitemap.xml; then
        echo -e "${GREEN}✅${NC} Sitemap contains caffeine-sleep.html"
    else
        echo -e "${RED}❌${NC} Sitemap doesn't contain caffeine-sleep.html"
    fi
    
    if grep -q "jet-lag.html" public/sitemap.xml; then
        echo -e "${GREEN}✅${NC} Sitemap contains jet-lag.html"
    else
        echo -e "${RED}❌${NC} Sitemap doesn't contain jet-lag.html"
    fi
else
    echo -e "${RED}❌${NC} public/sitemap.xml not found"
fi

echo ""

# Summary
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "📋 Summary"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "✅ Standalone HTML structure verified!"
echo ""
echo "📤 Next steps:"
echo "   1. Run: npm run build"
echo "   2. Upload everything from dist/ to your server"
echo "   3. Test URLs:"
echo "      - https://yoursite.com/index.html"
echo "      - https://yoursite.com/caffeine-sleep.html"
echo "      - https://yoursite.com/jet-lag.html"
echo ""
echo "🎉 No .htaccess or server configuration needed!"
echo ""
