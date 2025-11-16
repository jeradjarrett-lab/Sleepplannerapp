#!/bin/bash

echo "╔══════════════════════════════════════════════════════════════════╗"
echo "║                                                                  ║"
echo "║         🗺️  INSTALLING LEAFLET MAP COMPONENTS                    ║"
echo "║                                                                  ║"
echo "╚══════════════════════════════════════════════════════════════════╝"
echo ""

echo "📦 Step 1: Installing Leaflet..."
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
npm install leaflet

if [ $? -eq 0 ]; then
    echo "✅ Leaflet installed successfully!"
else
    echo "❌ Failed to install Leaflet"
    exit 1
fi

echo ""
echo "📦 Step 2: Installing Leaflet TypeScript types..."
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
npm install --save-dev @types/leaflet

if [ $? -eq 0 ]; then
    echo "✅ TypeScript types installed successfully!"
else
    echo "❌ Failed to install TypeScript types"
    exit 1
fi

echo ""
echo "╔══════════════════════════════════════════════════════════════════╗"
echo "║                                                                  ║"
echo "║                    ✅ INSTALLATION COMPLETE!                     ║"
echo "║                                                                  ║"
echo "╚══════════════════════════════════════════════════════════════════╝"
echo ""
echo "📋 What was installed:"
echo "   ✅ leaflet              - Open-source mapping library"
echo "   ✅ @types/leaflet       - TypeScript definitions"
echo ""
echo "🗺️  Map Component Status:"
echo "   ✅ /components/TimeZoneMapLeaflet.tsx created"
echo "   ✅ /components/JetLagCalculator.tsx updated"
echo ""
echo "📝 Next Steps:"
echo "   1. Build the project:    npm run build"
echo "   2. Test locally:         npm run preview"
echo "   3. Open jet lag calculator"
echo "   4. Select two cities (e.g., New York → Tokyo)"
echo "   5. Verify OpenStreetMap shows with countries!"
echo ""
echo "📚 Documentation:"
echo "   See: LEAFLET-MAP-IMPLEMENTATION.md"
echo ""
echo "🎉 You now have a professional OpenStreetMap-powered jet lag map!"
echo ""
