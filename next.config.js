/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // 允许的图片域名白名单（Steam CDN + 其他常用图源）
    domains: [
      'community.cloudflare.steamstatic.com',   // Steam 饰品图片 CDN
      'steamcommunity-a.akamaihd.net',           // Steam 备用 CDNs
      'images.steampowered.com',                  // Steam 官方图库
      'i.imgur.com',                              // Imgur（临时占位图）
      'via.placeholder.com',                      // Placeholder services
      'placehold.co',                             // Modern placeholder service
      'picsum.photos',                            // Unsplash source (placeholder)
      'ui-avatars.com',                           // 用户头像生成
      
      // Buff 相关图片源 (如使用)
      'steamcommunity-a.akamaihd.net',
      'steamcdn-a.akamaihd.net',
    ],
    
    // 远程图片优化配置
    unoptimized: false,       // 启用自动优化（WebP/AVIF）
    deviceSizes: [640, 750, 828, 1080, 1920],  // 响应式断点
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    
    // 远程图片元数据缓存时间 (ms)
    remotePatterns: [
      { 
        protocol: 'https',
        hostname: '**.akamaihd.net',  // AkamaíCDN wildcard
        port: '',
        pathname: '/economy/**'       // Steam economy images path
      },
    ]
  },
  
  // React strict mode & SSR settings (optional)
  reactStrictMode: true,
  
  // Turbopack optimizations (already enabled in dev)
  experimental: {
    optimizePackageImports: ['lucide-react', 'recharts'],
  }
};

module.exports = nextConfig;
