#!/bin/bash
# GitHub Deployment Script - Alternative Methods  
# Game Skin Trade Platform v1.1.0

PROJECT_PATH="/Users/tst/Documents/CoyleAGI/00_Openclaw_Inbox/projects/game-skin-trade/frontend"

echo "🚀 Game Skin Trade Platform - GitHub Deployment Helper"
echo "=================================================="
echo ""
echo "Repository: dabaicai520/game-skin-trade"
echo ""

cd "$PROJECT_PATH" || exit 1

# Method 1: Try HTTPS with token (easiest)  
git remote rm origin 2>/dev/null
git remote add origin https://dabaicai520@github.com/dabaicai520/game-skin-trade.git

echo "✅ Step 1: Remote URL updated to GitHub"
echo ""
echo "📝 Step 2: You need a GitHub Personal Access Token"
echo "   Visit: https://github.com/settings/tokens"
echo "   Create new token with 'repo' scope"
echo ""

# Show latest commits  
echo "🔗 Latest commits ready to push:"
git log --oneline -3
echo ""
echo "👆 When prompted for password, paste your GitHub Token there!"
echo ""

read -p "Press Enter when you have the token, then we'll push..."  dummy

echo "🚀 Pushing code to GitHub..."  
git push -u origin main

echo ""
echo "✅ Done! Check: https://github.com/dabaicai520/game-skin-trade"
