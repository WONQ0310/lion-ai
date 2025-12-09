/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // 静的エクスポート（GitHub Pages用）
  images: {
    unoptimized: true, // 静的エクスポート時は必須
  },
  // パフォーマンス最適化
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production', // 本番環境でconsole.logを削除
  },
  // コード分割の最適化
  experimental: {
    optimizePackageImports: ['lucide-react', '@radix-ui/react-avatar', '@radix-ui/react-separator'],
  },
  // 静的エクスポート時のトレイリングスラッシュ設定
  trailingSlash: true,
};

module.exports = nextConfig;
