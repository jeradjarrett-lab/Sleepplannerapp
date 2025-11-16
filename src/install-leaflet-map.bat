@echo off
echo ═══════════════════════════════════════════════════════════════════
echo.
echo          🗺️  INSTALLING LEAFLET MAP COMPONENTS
echo.
echo ═══════════════════════════════════════════════════════════════════
echo.

echo 📦 Step 1: Installing Leaflet...
echo ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
call npm install leaflet

if %errorlevel% neq 0 (
    echo ❌ Failed to install Leaflet
    exit /b 1
)

echo ✅ Leaflet installed successfully!
echo.

echo 📦 Step 2: Installing Leaflet TypeScript types...
echo ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
call npm install --save-dev @types/leaflet

if %errorlevel% neq 0 (
    echo ❌ Failed to install TypeScript types
    exit /b 1
)

echo ✅ TypeScript types installed successfully!
echo.

echo ═══════════════════════════════════════════════════════════════════
echo.
echo                    ✅ INSTALLATION COMPLETE!
echo.
echo ═══════════════════════════════════════════════════════════════════
echo.
echo 📋 What was installed:
echo    ✅ leaflet              - Open-source mapping library
echo    ✅ @types/leaflet       - TypeScript definitions
echo.
echo 🗺️  Map Component Status:
echo    ✅ /components/TimeZoneMapLeaflet.tsx created
echo    ✅ /components/JetLagCalculator.tsx updated
echo.
echo 📝 Next Steps:
echo    1. Build the project:    npm run build
echo    2. Test locally:         npm run preview
echo    3. Open jet lag calculator
echo    4. Select two cities (e.g., New York → Tokyo)
echo    5. Verify OpenStreetMap shows with countries!
echo.
echo 📚 Documentation:
echo    See: LEAFLET-MAP-IMPLEMENTATION.md
echo.
echo 🎉 You now have a professional OpenStreetMap-powered jet lag map!
echo.
pause
