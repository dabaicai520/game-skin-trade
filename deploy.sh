#!/bin/bash
# ==============================================================================
# Game Skin Trade Platform — Deployment Script
# ==============================================================================
# Usage: ./deploy.sh [github|gitlab|vercel]

PROJECT_ROOT="/Users/tst/Documents/CoyleAGI/00_Openclaw_Inbox/projects/game-skin-trade/frontend"

echo "🚀 Starting deployment process..."
cd "$PROJECT_ROOT" || exit 1

case "$1" in
    github)
        echo "=== GitHub Deployment ===\n"
        echo "Step 1: Create a new repository on https://github.com/new"
        echo "Step 2: Run the following command with your URL:"
        echo ""
        echo "git remote set-url origin https://github.com/YOUR_USERNAME/game-skin-trade.git"
        echo "git push -u origin main"
        ;;
        
    gitlab)
        echo "=== GitLab Deployment ===\n"
        echo "Step 1: Create a new project on https://gitlab.com/projects/new"  
        echo "Step 2: Configure remote URL:"
        echo ""
        echo "git remote set-url origin https://gitlab.com/YOUR_USERNAME/game-skin-trade.git"
        echo "git push -u origin main"
        ;;

    vercel)
        echo "=== Vercel Direct Deploy ===\n"
        if command -v vercel &> /dev/null; then
            echo "Vercel CLI detected. Running deployment..."
            vercel --prod
        else
            echo "⚠️  Vercel CLI not found. Install via:"
            echo "npm i -g vercel"
            echo "\nAlternative: Deploy via https://vercel.com → Import Git repo"
        fi
        ;;

    status)
        echo "=== Current Status ===\n"
        git log --oneline -3
        echo ""
        echo "Latest Version:"  
        cat VERSION.md | grep "Current Version" | head -1
        ;;

    *)
        echo "📋 Deployment Options:"
        echo "  github   → Push to GitHub repository"
        echo "  gitlab   → Push to GitLab repository"  
        echo "  vercel   → Deploy to Vercel (needs CLI or Web Import)"
        echo "  status   → Check current commit history & version info"
        echo ""
        echo "Usage: ./deploy.sh [github|gitlab|vercel|status]"
        ;;
esac

echo "\n✅ Deployment script completed.\n"
