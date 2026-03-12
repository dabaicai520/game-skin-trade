# SkinTrade 前端

游戏饰品交易平台前端项目，类似 Buff.163.com

## 技术栈

- **框架**: Next.js 15 (App Router)
- **语言**: TypeScript
- **样式**: Tailwind CSS
- **包管理**: npm

## 项目结构

```
src/
├── app/                    # Next.js App Router 页面
│   ├── globals.css        # 全局样式
│   ├── layout.tsx         # 根布局
│   ├── page.tsx           # 首页
│   └── skins/             # 饰品相关页面
│       ├── page.tsx       # 饰品列表页
│       └── [id]/          # 饰品详情页（动态路由）
│           └── page.tsx
└── components/            # React 组件
    └── Navigation.tsx     # 导航栏组件
```

## 开发

### 安装依赖

```bash
npm install
```

### 启动开发服务器

```bash
npm run dev
```

访问 http://localhost:3000

### 构建生产版本

```bash
npm run build
npm start
```

## 功能特性

- ✅ 响应式设计，支持移动端
- ✅ 深色模式支持
- ✅ 首页展示：平台特色、热门饰品、游戏分类
- ✅ 饰品列表：筛选、搜索、分页功能
- ✅ 饰品详情：完整信息展示、相关推荐
- ✅ 导航栏：固定顶部、玻璃态效果

## 下一步计划

- [ ] 接入真实 API 数据
- [ ] 用户认证系统
- [ ] 购物车功能
- [ ] 订单管理
- [ ] 支付集成
- [ ] 用户个人中心
- [ ] 饰品上架/出售功能
- [ ] 实时价格更新
- [ ] 交易历史记录

## 许可证

MIT
