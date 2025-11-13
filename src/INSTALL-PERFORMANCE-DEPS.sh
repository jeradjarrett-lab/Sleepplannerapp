#!/bin/bash

# Performance Optimization Dependencies Installation Script
# This script installs all required packages for performance optimizations

echo "📦 Installing performance optimization dependencies..."

# Install compression plugins
npm install -D vite-plugin-compression2

# Install HTML minification
npm install -D html-minifier-terser @types/html-minifier-terser

# Install bundle analyzer
npm install -D rollup-plugin-visualizer

# Install babel plugins for production optimization
npm install -D babel-plugin-transform-react-remove-prop-types

echo "✅ All performance dependencies installed successfully!"
echo ""
echo "🚀 You can now run:"
echo "   npm run build          - Standard production build"
echo "   ANALYZE=1 npm run build - Build with bundle analysis"
echo ""
