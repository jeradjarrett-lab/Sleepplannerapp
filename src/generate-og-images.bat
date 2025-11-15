@echo off
REM OG Image Generator for EyeLoveSleep (Windows)
REM This script automatically generates all 3 OG images

echo.
echo ╔══════════════════════════════════════════════════════════════════╗
echo ║                                                                  ║
echo ║              🎨 OG Image Generator - EyeLoveSleep                ║
echo ║                                                                  ║
echo ╚══════════════════════════════════════════════════════════════════╝
echo.

REM Check if Node.js is installed
where node >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo ❌ Error: Node.js is not installed!
    echo    Please install Node.js from: https://nodejs.org
    pause
    exit /b 1
)

REM Check if Puppeteer is installed
call npm list puppeteer >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo 📦 Installing Puppeteer...
    call npm install --save-dev puppeteer
    
    if %ERRORLEVEL% NEQ 0 (
        echo ❌ Failed to install Puppeteer
        echo    Try manually: npm install --save-dev puppeteer
        pause
        exit /b 1
    )
    
    echo ✅ Puppeteer installed successfully!
    echo.
)

REM Run the image generator script
echo 🎨 Generating OG images...
echo.
call node scripts/generate-og-images.js

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ✅ All done! OG images are ready in /public/ folder
    echo.
    echo 📁 Generated files:
    dir /b public\og-*.png 2>nul
    echo.
    echo 🚀 Next steps:
    echo    1. Verify images look good
    echo    2. npm run build
    echo    3. Upload dist/ folder to server
    echo    4. Test with Facebook Debugger
    echo.
) else (
    echo.
    echo ❌ Image generation failed
    echo    Check error messages above
    pause
    exit /b 1
)

pause
