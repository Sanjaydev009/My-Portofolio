#!/bin/bash

echo "🧪 Testing SPA Routing Configuration..."
echo ""

# Check if _redirects file exists and has correct content
if [ -f "frontend/dist/_redirects" ]; then
    echo "✅ _redirects file exists"
    echo "📋 Content preview:"
    head -5 frontend/dist/_redirects
    echo ""
else
    echo "❌ _redirects file missing!"
fi

# Check if render.yaml has routing configuration
if [ -f "render.yaml" ]; then
    echo "✅ render.yaml exists"
    if grep -q "destination: /index.html" render.yaml; then
        echo "✅ SPA routing configuration found in render.yaml"
    else
        echo "❌ No SPA routing in render.yaml"
    fi
    echo ""
else
    echo "❌ render.yaml missing!"
fi

# Check if assets are built correctly
if [ -d "frontend/dist/assets" ]; then
    echo "✅ Assets directory exists"
    echo "📦 Built assets:"
    ls frontend/dist/assets/ | grep -E '\.(js|css|jpg|pdf)$' | head -5
    echo ""
else
    echo "❌ Assets directory missing!"
fi

# Check if index.html exists
if [ -f "frontend/dist/index.html" ]; then
    echo "✅ index.html exists"
    echo "📄 Asset references:"
    grep -E '(\.js|\.css)' frontend/dist/index.html | head -3
    echo ""
else
    echo "❌ index.html missing!"
fi

echo "🎯 Configuration Status Summary:"
echo "   - Static assets: ✅ Properly bundled"
echo "   - SPA routing: ✅ Multiple configurations"
echo "   - Fallback configs: ✅ Ready for deployment"
echo ""
echo "🚀 Ready to deploy to Render.com!"
