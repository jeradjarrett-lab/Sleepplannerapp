#!/bin/bash

# Ultra-Minified Build Script for EyeLoveSleep
# Builds with maximum compression and minification

echo ""
echo "╔══════════════════════════════════════════════════════════════════╗"
echo "║                                                                  ║"
echo "║          🗜️  ULTRA-MINIFIED BUILD - EyeLoveSleep                 ║"
echo "║                                                                  ║"
echo "╚══════════════════════════════════════════════════════════════════╝"
echo ""

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ Error: Node.js is not installed!${NC}"
    echo "   Please install Node.js from: https://nodejs.org"
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo -e "${RED}❌ Error: npm is not installed!${NC}"
    exit 1
fi

echo -e "${BLUE}📦 Checking dependencies...${NC}"

# Check if html-minifier-terser is installed
if ! npm list html-minifier-terser &> /dev/null; then
    echo -e "${YELLOW}⚠️  html-minifier-terser not found. Installing...${NC}"
    npm install -D html-minifier-terser
fi

# Check if vite-plugin-compression2 is installed
if ! npm list vite-plugin-compression2 &> /dev/null; then
    echo -e "${YELLOW}⚠️  vite-plugin-compression2 not found. Installing...${NC}"
    npm install -D vite-plugin-compression2
fi

# Check if lightningcss is installed
if ! npm list lightningcss &> /dev/null; then
    echo -e "${YELLOW}⚠️  lightningcss not found. Installing...${NC}"
    npm install -D lightningcss
fi

echo -e "${GREEN}✅ Dependencies ready!${NC}"
echo ""

# Clean dist folder
if [ -d "dist" ]; then
    echo -e "${BLUE}🧹 Cleaning old build...${NC}"
    rm -rf dist
    echo -e "${GREEN}✅ Clean complete${NC}"
    echo ""
fi

# Build with optimized config
echo -e "${BLUE}🚀 Building with ultra-minification...${NC}"
echo ""
npx vite build --config vite.config.optimized.ts

# Check if build succeeded
if [ $? -eq 0 ]; then
    echo ""
    echo -e "${GREEN}✅ Build successful!${NC}"
    echo ""
    
    # Show file sizes
    echo -e "${BLUE}📊 Bundle Analysis:${NC}"
    echo "─────────────────────────────────────────────────────────────"
    
    # Total size
    TOTAL_SIZE=$(du -sh dist/ 2>/dev/null | awk '{print $1}')
    echo -e "  ${GREEN}Total Size:${NC} $TOTAL_SIZE"
    
    # JavaScript files
    if [ -d "dist/assets" ]; then
        JS_COUNT=$(find dist/assets -name "*.js" -type f 2>/dev/null | wc -l | tr -d ' ')
        CSS_COUNT=$(find dist/assets -name "*.css" -type f 2>/dev/null | wc -l | tr -d ' ')
        GZ_COUNT=$(find dist/assets -name "*.gz" -type f 2>/dev/null | wc -l | tr -d ' ')
        BR_COUNT=$(find dist/assets -name "*.br" -type f 2>/dev/null | wc -l | tr -d ' ')
        
        echo "  JavaScript files: $JS_COUNT"
        echo "  CSS files: $CSS_COUNT"
        echo "  Gzip files: $GZ_COUNT"
        echo "  Brotli files: $BR_COUNT"
    fi
    
    echo ""
    echo -e "${BLUE}📁 Largest Files:${NC}"
    echo "─────────────────────────────────────────────────────────────"
    find dist/assets -name "*.js" -type f -exec ls -lh {} \; 2>/dev/null | \
        awk '{print "  " $5 "  " $9}' | \
        sort -hr | \
        head -10
    
    echo ""
    echo -e "${GREEN}✅ Minification Complete!${NC}"
    echo ""
    echo -e "${BLUE}📋 What was minified:${NC}"
    echo "  ✅ JavaScript (Terser - 4 passes)"
    echo "  ✅ HTML (html-minifier-terser)"
    echo "  ✅ CSS (Lightning CSS + cssnano)"
    echo "  ✅ Gzip compression (all files > 512B)"
    echo "  ✅ Brotli compression (all files > 512B)"
    echo ""
    
    echo -e "${YELLOW}🚀 Next Steps:${NC}"
    echo "  1. Test locally: npm run preview"
    echo "  2. Upload dist/ folder to server"
    echo "  3. Test with PageSpeed Insights"
    echo "  4. Expected score: 95-98 mobile"
    echo ""
    
    echo -e "${GREEN}📦 Build Location:${NC} ./dist/"
    echo ""
    
else
    echo ""
    echo -e "${RED}❌ Build failed!${NC}"
    echo "  Check error messages above"
    echo ""
    exit 1
fi
