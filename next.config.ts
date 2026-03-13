import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 禁用 Turbopack，使用 webpack（避免中文路径问题）
  experimental: {
    // turbo: {
    //   rules: {},
    // },
  },
};

export default nextConfig;
