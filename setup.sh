#!/bin/bash

# Setup script for Algorithm Learning Platform

echo "🎓 Algorithm Learning Platform - Setup Script"
echo "=============================================="
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed!"
    echo "Please install Node.js 18 or higher from https://nodejs.org/"
    exit 1
fi

# Check Node version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "⚠️  Node.js version is $NODE_VERSION"
    echo "Please upgrade to Node.js 18 or higher"
    exit 1
fi

echo "✅ Node.js version: $(node -v)"
echo "✅ npm version: $(npm -v)"
echo ""

# Check if Git is installed
if ! command -v git &> /dev/null; then
    echo "⚠️  Git is not installed (required for version control)"
    echo "Install from: https://git-scm.com/"
else
    echo "✅ Git version: $(git --version)"
fi
echo ""

# Install dependencies
echo "📦 Installing dependencies..."
npm install

if [ $? -eq 0 ]; then
    echo "✅ Dependencies installed successfully!"
else
    echo "❌ Failed to install dependencies"
    exit 1
fi
echo ""

# Initialize git repository if not already initialized
if [ ! -d .git ]; then
    echo "🔧 Initializing Git repository..."
    git init
    git add .
    git commit -m "Initial commit: Algorithm Learning Platform"
    echo "✅ Git repository initialized!"
else
    echo "✅ Git repository already initialized"
fi
echo ""

echo "🎉 Setup complete!"
echo ""
echo "Next steps:"
echo "1. Start development server: npm run dev"
echo "2. Open http://localhost:5173 in your browser"
echo ""
echo "For deployment to GitHub and Netlify, see DEPLOYMENT.md"
echo ""
echo "Happy coding! 🚀"
