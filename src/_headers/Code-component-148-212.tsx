# Cache headers for static assets
# This file is used by Netlify, Vercel, and similar platforms

# Static assets with hashed filenames (can be cached for 1 year)
/assets/*
  Cache-Control: public, max-age=31536000, immutable

# JavaScript bundles
/*.js
  Cache-Control: public, max-age=31536000, immutable

# CSS files
/*.css
  Cache-Control: public, max-age=31536000, immutable

# Fonts
/*.woff2
  Cache-Control: public, max-age=31536000, immutable
/*.woff
  Cache-Control: public, max-age=31536000, immutable
/*.ttf
  Cache-Control: public, max-age=31536000, immutable

# Images
/*.png
  Cache-Control: public, max-age=31536000, immutable
/*.jpg
  Cache-Control: public, max-age=31536000, immutable
/*.jpeg
  Cache-Control: public, max-age=31536000, immutable
/*.gif
  Cache-Control: public, max-age=31536000, immutable
/*.svg
  Cache-Control: public, max-age=31536000, immutable
/*.webp
  Cache-Control: public, max-age=31536000, immutable
/*.ico
  Cache-Control: public, max-age=31536000, immutable

# Service worker (should not be cached)
/service-worker.js
  Cache-Control: public, max-age=0, must-revalidate

# HTML files (short cache with revalidation)
/*.html
  Cache-Control: public, max-age=3600, must-revalidate

# Root HTML
/
  Cache-Control: public, max-age=3600, must-revalidate
  X-Content-Type-Options: nosniff
  X-Frame-Options: DENY
  X-XSS-Protection: 1; mode=block
  Referrer-Policy: strict-origin-when-cross-origin
