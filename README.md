# 岩下直人 プロフィールページ

WONQ株式会社 代表取締役 岩下直人のプロフィールページです。

## 技術スタック

- **Next.js 15** (App Router) - 静的エクスポートモード
- **React 19** with TypeScript
- **Tailwind CSS** - スタイリング
- **Shadcn UI** - UIコンポーネント
- **Vitest** - テストフレームワーク

## セットアップ

```bash
# 依存関係のインストール
npm install

# 開発サーバーの起動
npm run dev

# ビルド（静的エクスポート）
npm run build

# テストの実行
npm run test
```

## 画像の配置と最適化

### プロフィール画像の配置

プロフィール画像は `public/images/profile.jpg` に配置してください。

### 画像最適化のガイドライン

1. **ファイル形式**: WebP形式を推奨（フォールバック用にJPGも可）
2. **画像サイズ**: 
   - プロフィール画像: 800x800px（正方形）
   - 最大ファイルサイズ: 200KB以下
3. **最適化ツール**:
   - [Squoosh](https://squoosh.app/) - ブラウザベースの画像圧縮
   - [ImageOptim](https://imageoptim.com/) - Mac用画像最適化
   - `cwebp` コマンドラインツール（WebP変換）

### WebP変換コマンド例

```bash
# JPGからWebPへの変換
cwebp -q 80 profile.jpg -o profile.webp

# 複数形式を配置する場合
public/images/
  ├── profile.jpg   # フォールバック用
  └── profile.webp  # 最適化版
```

### アクセシビリティ

すべての画像には適切な代替テキスト（alt属性）が設定されています：
- プロフィール画像: `{name}のプロフィール写真`

## ビルドとパフォーマンス最適化

### ビルド設定

`next.config.js`には以下の最適化が適用されています：

- **静的エクスポート**: GitHub Pages対応の完全静的サイト生成
- **コンソール削除**: 本番環境でconsole.logを自動削除
- **パッケージ最適化**: lucide-react、Radix UIコンポーネントの最適化インポート
- **トレイリングスラッシュ**: 静的ホスティング向けURL設定

### ビルドサイズ

- **初回ロードJS**: 約113KB（gzip圧縮前）
- **CSSファイル**: 約15KB
- **総出力サイズ**: 約1.2MB（画像含む）

### パフォーマンス最適化

1. **コード分割**: Next.jsが自動的にページとコンポーネントを分割
2. **CSS最適化**: Tailwind CSSの未使用スタイルを自動削除
3. **画像最適化**: WebP形式の使用を推奨
4. **遅延読み込み**: 必要に応じて動的インポートを使用可能

## デプロイ

このプロジェクトは静的サイトとしてエクスポートされ、GitHub PagesまたはVercelにデプロイできます。

### Vercelへのデプロイ（推奨）

Vercelは、Next.jsの開発元が提供するホスティングプラットフォームで、最適なパフォーマンスとDX（開発者体験）を提供します。

#### 初回デプロイ手順

1. **Vercelアカウントの作成**
   - [Vercel](https://vercel.com/)にアクセスしてアカウントを作成
   - GitHubアカウントで連携することを推奨

2. **GitHubリポジトリの準備**
   ```bash
   # Gitリポジトリの初期化（まだの場合）
   git init
   git add .
   git commit -m "Initial commit"
   
   # GitHubリポジトリにプッシュ
   git remote add origin https://github.com/your-username/your-repo.git
   git push -u origin main
   ```

3. **Vercelプロジェクトの作成**
   - Vercelダッシュボードで「New Project」をクリック
   - GitHubリポジトリをインポート
   - プロジェクト設定:
     - **Framework Preset**: Next.js（自動検出）
     - **Root Directory**: `./`（デフォルト）
     - **Build Command**: `npm run build`（自動設定）
     - **Output Directory**: `out`（自動設定）
     - **Install Command**: `npm install`（自動設定）

4. **環境変数の設定（オプション）**
   - Vercelダッシュボードの「Settings」→「Environment Variables」
   - `.env.example`を参考に必要な環境変数を設定:
     ```
     NEXT_PUBLIC_SITE_URL=https://your-project.vercel.app
     ```

5. **デプロイ**
   - 「Deploy」ボタンをクリック
   - 数分でデプロイが完了し、URLが発行されます

#### Vercel CLIを使用したデプロイ

```bash
# Vercel CLIのインストール
npm install -g vercel

# ログイン
vercel login

# デプロイ（初回）
vercel

# 本番環境へのデプロイ
vercel --prod
```

#### 自動デプロイ

GitHubリポジトリとVercelを連携すると、以下の自動デプロイが有効になります：

- **mainブランチへのプッシュ**: 本番環境に自動デプロイ
- **プルリクエスト**: プレビュー環境を自動生成
- **コミット毎**: ビルドとテストを自動実行

#### カスタムドメインの設定

1. Vercelダッシュボードで「Settings」→「Domains」
2. カスタムドメインを追加（例: `iwashita.example.com`）
3. DNSレコードを設定:
   - **Aレコード**: `76.76.21.21`
   - または**CNAMEレコード**: `cname.vercel-dns.com`
4. SSL証明書が自動的に発行されます（Let's Encrypt）

### GitHub Pagesへのデプロイ

静的エクスポートモードを使用してGitHub Pagesにデプロイすることも可能です。

#### 手動デプロイ

```bash
# 静的ファイルの生成
npm run build

# outディレクトリに静的ファイルが生成されます
# GitHub Pagesの設定でoutディレクトリを公開ディレクトリに指定
```

#### GitHub Actionsを使用した自動デプロイ

`.github/workflows/deploy.yml`を作成:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Build
        run: npm run build
      
      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./out
```

### デプロイ後の確認事項

デプロイが完了したら、以下の項目を確認してください：

- [ ] ページが正常に表示される
- [ ] すべてのリンクが機能する（Lion AI、WONQ）
- [ ] 画像が正しく表示される
- [ ] レスポンシブデザインが機能する（モバイル、タブレット、デスクトップ）
- [ ] HTTPSでアクセスできる
- [ ] メタタグが正しく設定されている（title、description、OGP）
- [ ] SEO: robots.txt、sitemap.xmlが配信される

### トラブルシューティング

#### ビルドエラー

```bash
# ローカルでビルドを確認
npm run build

# 依存関係の再インストール
rm -rf node_modules package-lock.json
npm install
```

#### 画像が表示されない

- `public/images/`に画像ファイルが配置されているか確認
- 画像パスが正しいか確認（`/images/profile.jpg`）
- 静的エクスポートモードでは`next/image`の最適化が無効化されています

#### 環境変数が反映されない

- Vercelダッシュボードで環境変数を確認
- `NEXT_PUBLIC_`プレフィックスが必要（クライアントサイドで使用する場合）
- 環境変数を変更した後は再デプロイが必要

### パフォーマンス最適化

Vercelでは以下の最適化が自動的に適用されます：

- **Edge Network**: 世界中のエッジロケーションから配信
- **自動キャッシング**: 静的アセットの効率的なキャッシング
- **Brotli圧縮**: 高効率な圧縮アルゴリズム
- **HTTP/2**: 高速なプロトコル
- **自動SSL**: Let's Encryptによる無料SSL証明書

## プロジェクト構造

```
/app                    # Next.js App Router
  layout.tsx           # ルートレイアウト
  page.tsx             # ホームページ
  globals.css          # グローバルスタイル

/components            # Reactコンポーネント
  /ui                  # UIプリミティブ
  Header.tsx           # ヘッダーコンポーネント
  Profile.tsx          # プロフィールセクション
  Links.tsx            # 外部リンク
  Footer.tsx           # フッター

/types                 # TypeScript型定義
/data                  # 静的データ
/lib                   # ユーティリティ関数
/public               # 静的アセット
  /images             # 画像ファイル
```

## ライセンス

© 2024 WONQ株式会社