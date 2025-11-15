@echo off
REM Ultra-Minified Build Script for EyeLoveSleep (Windows)
REM Builds with maximum compression and minification

echo.
echo ╔══════════════════════════════════════════════════════════════════╗
echo ║                                                                  ║
echo ║          🗜️  ULTRA-MINIFIED BUILD - EyeLoveSleep                 ║
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

REM Check if npm is installed
where npm >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo ❌ Error: npm is not installed!
    pause
    exit /b 1
)

echo 📦 Checking dependencies...

REM Check html-minifier-terser
call npm list html-minifier-terser >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo ⚠️  html-minifier-terser not found. Installing...
    call npm install -D html-minifier-terser
)

REM Check vite-plugin-compression2
call npm list vite-plugin-compression2 >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo ⚠️  vite-plugin-compression2 not found. Installing...
    call npm install -D vite-plugin-compression2
)

REM Check lightningcss
call npm list lightningcss >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo ⚠️  lightningcss not found. Installing...
    call npm install -D lightningcss
)

echo ✅ Dependencies ready!
echo.

REM Clean dist folder
if exist dist (
    echo 🧹 Cleaning old build...
    rmdir /s /q dist
    echo ✅ Clean complete
    echo.
)

REM Build with optimized config
echo 🚀 Building with ultra-minification...
echo.
call npx vite build --config vite.config.optimized.ts

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ✅ Build successful!
    echo.
    
    echo 📊 Bundle Analysis:
    echo ─────────────────────────────────────────────────────────────
    
    REM Show directory size (Windows doesn't have du)
    dir dist /s | find "File(s)"
    
    if exist dist\assets (
        echo.
        echo 📁 Generated Files:
        dir /b dist\assets\*.js 2>nul | find /c /v "" > temp.txt
        set /p JS_COUNT=<temp.txt
        echo   JavaScript files: %JS_COUNT%
        
        dir /b dist\assets\*.css 2>nul | find /c /v "" > temp.txt
        set /p CSS_COUNT=<temp.txt
        echo   CSS files: %CSS_COUNT%
        
        dir /b dist\assets\*.gz 2>nul | find /c /v "" > temp.txt
        set /p GZ_COUNT=<temp.txt
        echo   Gzip files: %GZ_COUNT%
        
        dir /b dist\assets\*.br 2>nul | find /c /v "" > temp.txt
        set /p BR_COUNT=<temp.txt
        echo   Brotli files: %BR_COUNT%
        
        del temp.txt
        
        echo.
        echo 📁 Largest Files:
        echo ─────────────────────────────────────────────────────────────
        dir dist\assets\*.js /o-s | find "."
    )
    
    echo.
    echo ✅ Minification Complete!
    echo.
    echo 📋 What was minified:
    echo   ✅ JavaScript (Terser - 4 passes)
    echo   ✅ HTML (html-minifier-terser)
    echo   ✅ CSS (Lightning CSS + cssnano)
    echo   ✅ Gzip compression (all files ^> 512B)
    echo   ✅ Brotli compression (all files ^> 512B)
    echo.
    
    echo 🚀 Next Steps:
    echo   1. Test locally: npm run preview
    echo   2. Upload dist\ folder to server
    echo   3. Test with PageSpeed Insights
    echo   4. Expected score: 95-98 mobile
    echo.
    
    echo 📦 Build Location: .\dist\
    echo.
    
) else (
    echo.
    echo ❌ Build failed!
    echo   Check error messages above
    echo.
    pause
    exit /b 1
)

pause
