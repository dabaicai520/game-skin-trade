#!/bin/bash
# 🚀 Game Skin Trade - GitHub Push Fix Script  
# 解决路径变更导致的 SSH 认证问题

echo "🔧 修复 GitHub 推送配置中..."
cd /Users/tst/Documents/CoyleAGI/00_Openclaw_Inbox/projects/game-skin-trade/frontend || exit 1

# 1. 设置正确的 Git 用户配置（确保和昨天的一致）
git config user.email "cuiila@example.com"
git config user.name "库伊拉"

# 2. 切换到 SSH 协议（最可靠）
git remote remove origin 2>/dev/null
git remote add -f origin git@github.com:dabaicai520/game-skin-trade.git

echo "✅ Git 配置完成"
echo ""
echo "📦 本地代码状态:"  
git log --oneline -3
echo ""

# 3. 尝试推送（如果失败会提示你手动操作）
echo "🚀 开始推送到 GitHub..."
if git push -u origin main 2>&1 | head -15; then
    echo ""
    echo "✅✅✅ 推送成功！请查看:"
    echo "🔗 https://github.com/dabaicai520/game-skin-trade"
else
    echo ""
    echo "⚠️ SSH 可能仍未生效，尝试 HTTPS 方式:"
    read -p "要使用 HTTPS+Token 方式吗？(y/n): " choice
    if [ "$choice" = "y" ]; then
        git remote set-url origin https://github.com/dabaicai520/game-skin-trade.git
        echo ""
        echo "📝 请按以下步骤获取 Token:"
        echo "1. 访问：https://github.com/settings/tokens"
        echo "2. Generate new token (classic)"  
        echo "3. Name: game-skin-trade-deploy"
        echo "4. Scopes: [x] repo"
        echo "5. 复制生成的 Token"
        echo ""
        read -p "准备好 Token 后，按 Enter 继续..." dummy
        git push -u origin main 2>&1 | head -20
    fi
fi

echo ""
echo "====== 完成 ======"
