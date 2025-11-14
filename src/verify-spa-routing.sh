#!/bin/bash

# Verification script for SPA routing
# Run this after deployment to verify everything works

echo "🔍 Verifying SPA Routing for EyeLoveSleep..."
echo ""

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

SITE_URL="${1:-https://eyelovesleep.com}"

echo -e "${BLUE}Testing site: $SITE_URL${NC}"
echo ""

# Test 1: Homepage
echo "📄 Test 1: Homepage"
HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" "$SITE_URL/")
if [ "$HTTP_CODE" = "200" ]; then
    echo -e "${GREEN}✅ Homepage works (200 OK)${NC}"
else
    echo -e "${RED}❌ Homepage failed (HTTP $HTTP_CODE)${NC}"
fi
echo ""

# Test 2: Caffeine Sleep Page
echo "☕ Test 2: Caffeine Sleep Page"
HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" "$SITE_URL/caffeine-sleep")
if [ "$HTTP_CODE" = "200" ]; then
    echo -e "${GREEN}✅ Caffeine page works (200 OK)${NC}"
else
    echo -e "${RED}❌ Caffeine page failed (HTTP $HTTP_CODE) - .htaccess issue!${NC}"
fi
echo ""

# Test 3: Jet Lag Page
echo "✈️  Test 3: Jet Lag Page"
HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" "$SITE_URL/jet-lag")
if [ "$HTTP_CODE" = "200" ]; then
    echo -e "${GREEN}✅ Jet lag page works (200 OK)${NC}"
else
    echo -e "${RED}❌ Jet lag page failed (HTTP $HTTP_CODE) - .htaccess issue!${NC}"
fi
echo ""

# Test 4: Check if .htaccess is accessible (should be 403 Forbidden)
echo "🔧 Test 4: .htaccess Protection"
HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" "$SITE_URL/.htaccess")
if [ "$HTTP_CODE" = "403" ]; then
    echo -e "${GREEN}✅ .htaccess exists and is protected (403 Forbidden)${NC}"
elif [ "$HTTP_CODE" = "404" ]; then
    echo -e "${RED}❌ .htaccess not found (404) - Did you upload it?${NC}"
else
    echo -e "${YELLOW}⚠️  .htaccess returned HTTP $HTTP_CODE${NC}"
fi
echo ""

# Test 5: Check if robots.txt exists
echo "🤖 Test 5: robots.txt"
HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" "$SITE_URL/robots.txt")
if [ "$HTTP_CODE" = "200" ]; then
    echo -e "${GREEN}✅ robots.txt exists (200 OK)${NC}"
else
    echo -e "${YELLOW}⚠️  robots.txt not found (HTTP $HTTP_CODE)${NC}"
fi
echo ""

# Test 6: Check if sitemap.xml exists
echo "🗺️  Test 6: sitemap.xml"
HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" "$SITE_URL/sitemap.xml")
if [ "$HTTP_CODE" = "200" ]; then
    echo -e "${GREEN}✅ sitemap.xml exists (200 OK)${NC}"
else
    echo -e "${YELLOW}⚠️  sitemap.xml not found (HTTP $HTTP_CODE)${NC}"
fi
echo ""

# Test 7: Check if content is HTML (not JSON error)
echo "📝 Test 7: Content Type Check"
CONTENT_TYPE=$(curl -s -I "$SITE_URL/caffeine-sleep" | grep -i "content-type" | awk '{print $2}')
if [[ "$CONTENT_TYPE" == *"html"* ]]; then
    echo -e "${GREEN}✅ Serving HTML content${NC}"
else
    echo -e "${RED}❌ Not serving HTML (got: $CONTENT_TYPE)${NC}"
fi
echo ""

# Summary
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "📋 Summary"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Count successes
CAFFEINE_OK=$( [ "$(curl -s -o /dev/null -w "%{http_code}" "$SITE_URL/caffeine-sleep")" = "200" ] && echo "yes" || echo "no" )
JETLAG_OK=$( [ "$(curl -s -o /dev/null -w "%{http_code}" "$SITE_URL/jet-lag")" = "200" ] && echo "yes" || echo "no" )

if [ "$CAFFEINE_OK" = "yes" ] && [ "$JETLAG_OK" = "yes" ]; then
    echo -e "${GREEN}✅ SPA ROUTING WORKS!${NC}"
    echo ""
    echo "All routes return 200 OK. Your SPA is configured correctly!"
    echo ""
    echo "You can now:"
    echo "  • Refresh any page without 404 errors"
    echo "  • Access URLs directly"
    echo "  • Use browser back/forward buttons"
    echo ""
else
    echo -e "${RED}❌ SPA ROUTING HAS ISSUES${NC}"
    echo ""
    echo "Some routes are returning errors. This usually means:"
    echo ""
    echo "1. .htaccess not uploaded"
    echo "   → Check: ls -la /path/to/webroot/.htaccess"
    echo "   → Enable 'Show hidden files' in FTP client"
    echo ""
    echo "2. mod_rewrite not enabled"
    echo "   → Run: sudo a2enmod rewrite"
    echo "   → Restart: sudo systemctl restart apache2"
    echo ""
    echo "3. AllowOverride not set to All"
    echo "   → Edit Apache config"
    echo "   → Set: AllowOverride All"
    echo "   → Restart Apache"
    echo ""
    echo "See FIX-404-NOW.txt for detailed troubleshooting"
    echo ""
fi

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Test URLs in browser
echo "🌐 Manual Browser Test:"
echo ""
echo "Visit these URLs and try refreshing (F5):"
echo "  1. $SITE_URL/"
echo "  2. $SITE_URL/caffeine-sleep"
echo "  3. $SITE_URL/jet-lag"
echo ""
echo "All should load without 404 errors!"
echo ""
