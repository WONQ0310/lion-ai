/** @type {import('next').NextConfig} */
/**
 * Vercel用のNext.js設定
 * 
 * この設定ファイルは、Vercelで全機能（画像最適化、ISR等）を活用する場合に使用します。
 * 使用方法:
 * 1. next.config.jsをnext.config.static.jsにリネーム（バックアップ）
 * 2. このファイルをnext.config.jsにリネーム
 * 3. Vercelにデプロイ
 */
const nextConfig = {
  // 静的エクスポートを無効化（Vercelの全機能を使用）
  // output: 'export', // この行をコメントアウト
  
  // 画像最適化を有効化
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    domains: [], // 外部画像ドメインを追加する場合
  },
  
  // パフォーマンス最適化
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  
  // コード分割の最適化
  experimental: {
    optimizePackageImports: ['lucide-react', '@radix-ui/react-avatar', '@radix-ui/react-separator'],
  },
  
  // セキュリティヘッダー
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
