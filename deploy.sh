#!/bin/bash

# Dark Futuristic - Vercel Deployment Script
# Run this script to deploy your project to Vercel

echo "🚀 Dark Futuristic - Vercel Deployment"
echo "======================================"

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "📦 Installing Vercel CLI..."
    npm install -g vercel
fi

# Check if user is logged in
echo "🔐 Checking Vercel authentication..."
if ! vercel whoami &> /dev/null; then
    echo "❌ Not logged in to Vercel"
    echo "Please run: vercel login"
    echo "Or use the one-click deploy button in DEPLOY_NOW.md"
    exit 1
fi

# Verify build works
echo "🔨 Testing build..."
if ! pnpm run build; then
    echo "❌ Build failed. Please fix errors before deploying."
    exit 1
fi

echo "✅ Build successful!"

# Deploy to production
echo "🚀 Deploying to Vercel..."
vercel --prod

echo "🎉 Deployment complete!"
echo "Your site should be live at the URL shown above."