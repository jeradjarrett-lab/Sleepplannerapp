#!/bin/bash

# Color codes for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo "==================================="
echo "EyeLoveSleep Server Diagnostics"
echo "==================================="
echo ""

# Set your actual path here
SITE_PATH="/path/to/eyelovesleep.com"
DOMAIN="eyelovesleep.com"

echo "🔍 1. Checking HTML files..."
if [ -f "$SITE_PATH/index.html" ]; then
    echo -e "${GREEN}✓${NC} index.html exists"
else
    echo -e "${RED}✗${NC} index.html MISSING"
fi

if [ -f "$SITE_PATH/caffeine-sleep.html" ]; then
    echo -e "${GREEN}✓${NC} caffeine-sleep.html exists"
else
    echo -e "${RED}✗${NC} caffeine-sleep.html MISSING"
fi

if [ -f "$SITE_PATH/jet-lag.html" ]; then
    echo -e "${GREEN}✓${NC} jet-lag.html exists"
else
    echo -e "${RED}✗${NC} jet-lag.html MISSING"
fi

echo ""
echo "🔍 2. Checking .htaccess..."
if [ -f "$SITE_PATH/.htaccess" ]; then
    echo -e "${GREEN}✓${NC} .htaccess exists"
    echo "   First 5 lines:"
    head -5 "$SITE_PATH/.htaccess" | sed 's/^/   /'
else
    echo -e "${RED}✗${NC} .htaccess MISSING"
fi

echo ""
echo "🔍 3. Checking file permissions..."
ls -lh "$SITE_PATH"/*.html 2>/dev/null | awk '{print "   " $1 " " $9}'

echo ""
echo "🔍 4. Checking Apache mod_rewrite..."
if apache2ctl -M 2>/dev/null | grep -q rewrite; then
    echo -e "${GREEN}✓${NC} mod_rewrite is enabled"
else
    echo -e "${RED}✗${NC} mod_rewrite is NOT enabled"
    echo "   Run: sudo a2enmod rewrite && sudo systemctl restart apache2"
fi

echo ""
echo "🔍 5. Testing direct file access..."
HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" "https://$DOMAIN/caffeine-sleep.html")
if [ "$HTTP_CODE" = "200" ]; then
    echo -e "${GREEN}✓${NC} caffeine-sleep.html is accessible (HTTP $HTTP_CODE)"
else
    echo -e "${RED}✗${NC} caffeine-sleep.html returned HTTP $HTTP_CODE"
fi

HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" "https://$DOMAIN/jet-lag.html")
if [ "$HTTP_CODE" = "200" ]; then
    echo -e "${GREEN}✓${NC} jet-lag.html is accessible (HTTP $HTTP_CODE)"
else
    echo -e "${RED}✗${NC} jet-lag.html returned HTTP $HTTP_CODE"
fi

echo ""
echo "🔍 6. Testing clean URLs..."
HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" "https://$DOMAIN/caffeine-sleep")
if [ "$HTTP_CODE" = "200" ]; then
    echo -e "${GREEN}✓${NC} /caffeine-sleep works (HTTP $HTTP_CODE)"
else
    echo -e "${RED}✗${NC} /caffeine-sleep returned HTTP $HTTP_CODE"
fi

HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" "https://$DOMAIN/jet-lag")
if [ "$HTTP_CODE" = "200" ]; then
    echo -e "${GREEN}✓${NC} /jet-lag works (HTTP $HTTP_CODE)"
else
    echo -e "${RED}✗${NC} /jet-lag returned HTTP $HTTP_CODE"
fi

echo ""
echo "🔍 7. Checking Apache error log (last 5 errors)..."
if [ -f "/var/log/apache2/error.log" ]; then
    echo "   Last 5 lines:"
    tail -5 /var/log/apache2/error.log | sed 's/^/   /'
else
    echo -e "${YELLOW}⚠${NC}  Cannot access error log (need sudo)"
fi

echo ""
echo "==================================="
echo "Diagnostics Complete"
echo "==================================="
