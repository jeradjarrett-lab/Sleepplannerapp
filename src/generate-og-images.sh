#!/bin/bash

# OG Image Generator for EyeLoveSleep
# This script automatically generates all 3 OG images

echo ""
echo "╔══════════════════════════════════════════════════════════════════╗"
echo "║                                                                  ║"
echo "║              🎨 OG Image Generator - EyeLoveSleep                ║"
echo "║                                                                  ║"
echo "╚══════════════════════════════════════════════════════════════════╝"
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Error: Node.js is not installed!"
    echo "   Please install Node.js from: https://nodejs.org"
    exit 1
fi

# Check if Puppeteer is installed
if ! npm list puppeteer &> /dev/null; then
    echo "📦 Installing Puppeteer..."
    npm install --save-dev puppeteer
    
    if [ $? -ne 0 ]; then
        echo "❌ Failed to install Puppeteer"
        echo "   Try manually: npm install --save-dev puppeteer"
        exit 1
    fi
    
    echo "✅ Puppeteer installed successfully!"
    echo ""
fi

# Run the image generator script
echo "🎨 Generating OG images..."
echo ""
node scripts/generate-og-images.js

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ All done! OG images are ready in /public/ folder"
    echo ""
    echo "📁 Generated files:"
    ls -lh public/og-*.png 2>/dev/null | awk '{print "   • " $9 " (" $5 ")"}'
    echo ""
    echo "🚀 Next steps:"
    echo "   1. Verify images look good"
    echo "   2. npm run build"
    echo "   3. Upload dist/ folder to server"
    echo "   4. Test with Facebook Debugger"
    echo ""
else
    echo ""
    echo "❌ Image generation failed"
    echo "   Check error messages above"
    exit 1
fi
