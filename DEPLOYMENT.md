# デプロイメントガイド

このドキュメントでは、岩下直人プロフィールページのデプロイ手順を詳しく説明します。

## 目次

1. [Vercelへのデプロイ（推奨）](#vercelへのデプロイ推奨)
2. [GitHub Pagesへのデプロイ](#github-pagesへのデプロイ)
3. [環境変数の設定](#環境変数の設定)
4. [カスタムドメインの設定](#カスタムドメインの設定)
5. [デプロイ後の確認](#デプロイ後の確認)
6. [トラブルシューティング](#トラブルシューティング)

## Vercelへのデプロイ（推奨）

Vercelは、Next.jsの開発元であるVercel社が提供するホスティングプラットフォームです。Next.jsとの統合が最も優れており、以下のメリットがあります：

- 自動デプロイ（GitHubプッシュ時）
- プレビュー環境の自動生成（プルリクエスト時）
- エッジネットワークによる高速配信
- 無料SSL証明書
- 画像最適化（オプション）
- アナリティクス機能

### 前提条件

- GitHubアカウント
- Vercelアカウント（無料プランで十分）
- Node.js 20.x以上

### ステップ1: GitHubリポジトリの準備

```bash
# プロジェクトディレクトリに移動
cd iwashita-profile-page

# Gitリポジトリの初期化（まだの場合）
git init

# すべてのファイルをステージング
git add .

# 初回コミット
git commit -m "Initial commit: Profile page for Naoto Iwashita"

# GitHubリポジトリを作成（GitHub CLIを使用する場合）
gh repo create iwashita-profile-page --public --source=. --remote=origin

# または、GitHubウェブサイトでリポジトリを作成してから
git remote add origin https://github.com/your-username/iwashita-profile-page.git

# リモートリポジトリにプッシュ
git push -u origin main
```

### ステップ2: Vercelアカウントの作成

1. [Vercel](https://vercel.com/)にアクセス
2. 「Sign Up」をクリック
3. 「Continue with GitHub」を選択してGitHubアカウントで連携
4. 必要な権限を承認

### ステップ3: プロジェクトのインポート

1. Vercelダッシュボードで「Add New...」→「Project」をクリック
2. 「Import Git Repository」セクションでGitHubリポジトリを検索
3. `iwashita-profile-page`リポジトリを選択して「Import」をクリック

### ステップ4: プロジェクト設定

Vercelが自動的に以下の設定を検出します：

- **Framework Preset**: Next.js
- **Root Directory**: `./`
- **Build Command**: `npm run build`
- **Output Directory**: `out`
- **Install Command**: `npm install`
- **Node.js Version**: 20.x

設定を確認して「Deploy」をクリックします。

### ステップ5: デプロイの完了

- ビルドログがリアルタイムで表示されます
- 数分でデプロイが完了します
- デプロイが成功すると、URLが発行されます（例: `https://iwashita-profile-page.vercel.app`）

### ステップ6: 動作確認

発行されたURLにアクセスして、以下を確認します：

- [ ] ページが正常に表示される
- [ ] プロフィール画像が表示される
- [ ] Lion AIとWONQへのリンクが機能する
- [ ] レスポンシブデザインが機能する

## GitHub Pagesへのデプロイ

GitHub Pagesは、GitHubが提供する無料の静的サイトホスティングサービスです。

### 前提条件

- GitHubアカウント
- Node.js 20.x以上

### ステップ1: GitHub Actionsワークフローの作成

`.github/workflows/deploy.yml`を作成します：

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Build
        run: npm run build
      
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: ./out

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

### ステップ2: GitHub Pagesの有効化

1. GitHubリポジトリの「Settings」タブを開く
2. 左サイドバーの「Pages」をクリック
3. 「Source」で「GitHub Actions」を選択
4. 「Save」をクリック

### ステップ3: デプロイ

```bash
# ワークフローファイルをコミット
git add .github/workflows/deploy.yml
git commit -m "Add GitHub Actions workflow for deployment"
git push origin main
```

GitHub Actionsが自動的に実行され、数分後にサイトが公開されます。

### ステップ4: URLの確認

- リポジトリの「Settings」→「Pages」でURLを確認
- 通常は`https://your-username.github.io/iwashita-profile-page/`

## 環境変数の設定

### Vercelでの環境変数設定

1. Vercelダッシュボードでプロジェクトを選択
2. 「Settings」タブをクリック
3. 左サイドバーの「Environment Variables」をクリック
4. 以下の環境変数を追加：

| 変数名 | 値 | 環境 |
|--------|-----|------|
| `NEXT_PUBLIC_SITE_URL` | `https://your-project.vercel.app` | Production, Preview, Development |

5. 「Save」をクリック
6. 再デプロイが必要な場合は「Deployments」タブから最新のデプロイを「Redeploy」

### ローカル開発での環境変数

`.env.local`ファイルを作成（`.env.example`をコピー）：

```bash
cp .env.example .env.local
```

`.env.local`を編集：

```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

**注意**: `.env.local`はGitにコミットしないでください（`.gitignore`に含まれています）。

## カスタムドメインの設定

### Vercelでのカスタムドメイン設定

#### ステップ1: ドメインの追加

1. Vercelダッシュボードでプロジェクトを選択
2. 「Settings」タブをクリック
3. 左サイドバーの「Domains」をクリック
4. カスタムドメインを入力（例: `iwashita.example.com`）
5. 「Add」をクリック

#### ステップ2: DNSレコードの設定

Vercelが推奨するDNS設定が表示されます。ドメインレジストラ（お名前.com、ムームードメイン等）で以下のレコードを追加：

**オプション1: Aレコード（推奨）**

| タイプ | 名前 | 値 |
|--------|------|-----|
| A | @ | 76.76.21.21 |
| A | www | 76.76.21.21 |

**オプション2: CNAMEレコード**

| タイプ | 名前 | 値 |
|--------|------|-----|
| CNAME | @ | cname.vercel-dns.com |
| CNAME | www | cname.vercel-dns.com |

#### ステップ3: SSL証明書の発行

- DNSレコードが正しく設定されると、Vercelが自動的にSSL証明書を発行します（Let's Encrypt）
- 通常、数分から数時間で完了します
- 証明書は自動的に更新されます

### GitHub Pagesでのカスタムドメイン設定

1. リポジトリの「Settings」→「Pages」を開く
2. 「Custom domain」にドメインを入力（例: `iwashita.example.com`）
3. 「Save」をクリック
4. DNSレコードを設定：

| タイプ | 名前 | 値 |
|--------|------|-----|
| A | @ | 185.199.108.153 |
| A | @ | 185.199.109.153 |
| A | @ | 185.199.110.153 |
| A | @ | 185.199.111.153 |
| CNAME | www | your-username.github.io |

5. 「Enforce HTTPS」にチェックを入れる

## デプロイ後の確認

デプロイが完了したら、以下のチェックリストを確認してください：

### 基本機能

- [ ] ページが正常に表示される
- [ ] HTTPSでアクセスできる
- [ ] プロフィール画像が表示される
- [ ] 氏名、役職、会社名が表示される
- [ ] 経歴情報が表示される
- [ ] 専門分野が表示される

### リンク

- [ ] Lion AIリンクが機能する（https://www.lion-ai.co.jp/）
- [ ] WONQリンクが機能する（https://www.wonq-xr.jp/）
- [ ] リンクが新しいタブで開く
- [ ] rel="noopener noreferrer"が設定されている

### レスポンシブデザイン

- [ ] モバイル（375px）で正常に表示される
- [ ] タブレット（768px）で正常に表示される
- [ ] デスクトップ（1024px以上）で正常に表示される
- [ ] 画像が適切にリサイズされる

### SEO

- [ ] titleタグが設定されている
- [ ] meta descriptionが設定されている
- [ ] Open Graphタグが設定されている
- [ ] robots.txtが配信される
- [ ] sitemap.xmlが配信される
- [ ] すべての画像にalt属性がある

### パフォーマンス

- [ ] ページの読み込みが3秒以内
- [ ] 画像が最適化されている
- [ ] CSSが最小化されている
- [ ] JavaScriptが最小化されている

### ブラウザ互換性

- [ ] Chrome（最新版）で動作する
- [ ] Firefox（最新版）で動作する
- [ ] Safari（最新版）で動作する
- [ ] Edge（最新版）で動作する

## トラブルシューティング

### ビルドエラー

#### エラー: "Module not found"

```bash
# 依存関係を再インストール
rm -rf node_modules package-lock.json
npm install

# ローカルでビルドを確認
npm run build
```

#### エラー: "Type error"

```bash
# TypeScriptの型チェック
npx tsc --noEmit

# 型定義の更新
npm install --save-dev @types/node @types/react @types/react-dom
```

### 画像が表示されない

#### 原因1: 画像ファイルが存在しない

```bash
# 画像ファイルの確認
ls -la public/images/

# 画像ファイルを配置
cp /path/to/profile.jpg public/images/profile.jpg
```

#### 原因2: 画像パスが間違っている

- 正しいパス: `/images/profile.jpg`
- 間違ったパス: `./images/profile.jpg`、`images/profile.jpg`

#### 原因3: 静的エクスポートモードでの画像最適化

静的エクスポートモード（`output: 'export'`）では、Next.jsの画像最適化が無効化されています。`next.config.js`で`images.unoptimized: true`が設定されていることを確認してください。

### リンクが機能しない

#### 原因: 相対パスの問題

静的エクスポートモードでは、トレイリングスラッシュが必要な場合があります。`next.config.js`で`trailingSlash: true`が設定されていることを確認してください。

### 環境変数が反映されない

#### Vercel

1. 環境変数が正しく設定されているか確認
2. `NEXT_PUBLIC_`プレフィックスが付いているか確認（クライアントサイドで使用する場合）
3. 環境変数を変更した後、再デプロイが必要

```bash
# Vercel CLIで再デプロイ
vercel --prod
```

#### GitHub Pages

GitHub Pagesでは環境変数を直接設定できません。ビルド時に環境変数を埋め込む必要があります。

### デプロイが失敗する

#### Vercel

1. ビルドログを確認（Vercelダッシュボード→「Deployments」→失敗したデプロイをクリック）
2. Node.jsバージョンを確認（20.x以上）
3. ローカルでビルドが成功するか確認

```bash
npm run build
```

#### GitHub Pages

1. GitHub Actionsのログを確認（リポジトリ→「Actions」タブ）
2. ワークフローファイルの構文を確認
3. GitHub Pagesが有効になっているか確認

### パフォーマンスが悪い

#### 画像の最適化

```bash
# WebP形式に変換（cwebpツールが必要）
cwebp -q 80 public/images/profile.jpg -o public/images/profile.webp

# 画像サイズの縮小
# macOSの場合
sips -Z 800 public/images/profile.jpg

# Linuxの場合（ImageMagickが必要）
convert public/images/profile.jpg -resize 800x800 public/images/profile.jpg
```

#### CSSの最適化

Tailwind CSSは自動的に未使用のスタイルを削除します。`tailwind.config.ts`の`content`設定が正しいことを確認してください。

#### JavaScriptの最適化

Next.jsは自動的にコード分割を行います。さらに最適化する場合は、動的インポートを使用してください：

```typescript
import dynamic from 'next/dynamic';

const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
  loading: () => <p>Loading...</p>,
});
```

## サポート

問題が解決しない場合は、以下のリソースを参照してください：

- [Next.js公式ドキュメント](https://nextjs.org/docs)
- [Vercel公式ドキュメント](https://vercel.com/docs)
- [GitHub Pages公式ドキュメント](https://docs.github.com/pages)
- [プロジェクトのGitHubリポジトリ](https://github.com/your-username/iwashita-profile-page)

## まとめ

このガイドでは、岩下直人プロフィールページをVercelまたはGitHub Pagesにデプロイする方法を説明しました。推奨されるデプロイ方法はVercelです。Vercelを使用することで、自動デプロイ、プレビュー環境、エッジネットワーク配信などの高度な機能を利用できます。

デプロイ後は、必ず動作確認を行い、すべての機能が正常に動作することを確認してください。
