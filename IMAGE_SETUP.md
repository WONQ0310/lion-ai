# 画像セットアップガイド

このドキュメントでは、プロフィールページに画像を配置する手順を説明します。

## 📋 チェックリスト

- [ ] プロフィール画像を準備（800x800px推奨）
- [ ] 画像を最適化（WebP形式、200KB以下）
- [ ] `public/images/profile.jpg`または`profile.webp`に配置
- [ ] ローカルで動作確認（`npm run dev`）
- [ ] ビルドして確認（`npm run build`）

## 🖼️ 画像の準備

### 1. 画像の要件

- **サイズ**: 800x800px（正方形）
- **形式**: WebP（推奨）またはJPG
- **ファイルサイズ**: 200KB以下
- **品質**: 高品質（WebPの場合はquality 80-90）

### 2. 画像の最適化

#### オプション A: オンラインツール（推奨）

1. [Squoosh](https://squoosh.app/)にアクセス
2. 画像をドラッグ&ドロップ
3. 右側のパネルで設定：
   - Resize: 800x800px
   - Compress: WebP, Quality 85
4. ダウンロードして`profile.webp`として保存

#### オプション B: コマンドライン

```bash
# cwebpツールをインストール（Macの場合）
brew install webp

# JPGからWebPへの変換
cwebp -q 85 -resize 800 800 original.jpg -o profile.webp

# 品質を確認しながら調整
cwebp -q 90 -resize 800 800 original.jpg -o profile-high.webp
cwebp -q 80 -resize 800 800 original.jpg -o profile-medium.webp
cwebp -q 70 -resize 800 800 original.jpg -o profile-low.webp
```

### 3. 画像の配置

最適化した画像を以下のパスに配置：

```
public/images/profile.jpg
```

または

```
public/images/profile.webp
```

WebP形式を使用する場合は、`data/profileData.ts`を更新：

```typescript
export const profileData: ProfileData = {
  // ...
  profileImage: "/images/profile.webp", // .jpg から .webp に変更
  // ...
};
```

## 🧪 動作確認

### ローカル環境で確認

```bash
# 開発サーバーを起動
npm run dev

# ブラウザで http://localhost:3000 を開く
# プロフィール画像が表示されることを確認
```

### ビルドして確認

```bash
# 静的ファイルを生成
npm run build

# outディレクトリが生成される
# out/images/profile.jpg が存在することを確認
ls -lh out/images/
```

## 🔍 トラブルシューティング

### 画像が表示されない

1. **ファイルパスを確認**
   - `public/images/profile.jpg`に配置されているか
   - ファイル名が正確か（大文字小文字を含む）

2. **ブラウザのキャッシュをクリア**
   - 開発サーバーを再起動
   - ブラウザのハードリロード（Cmd+Shift+R / Ctrl+Shift+R）

3. **コンソールエラーを確認**
   - ブラウザの開発者ツールを開く
   - Consoleタブでエラーメッセージを確認

### 画像が大きすぎる

```bash
# ファイルサイズを確認
ls -lh public/images/profile.jpg

# 200KBを超える場合は、品質を下げて再圧縮
cwebp -q 75 -resize 800 800 original.jpg -o profile.webp
```

### WebP形式が表示されない

古いブラウザではWebPがサポートされていない可能性があります。
その場合は、JPG形式を使用してください：

```typescript
// data/profileData.ts
profileImage: "/images/profile.jpg", // WebPではなくJPGを使用
```

## 📚 参考リンク

- [Squoosh - 画像圧縮ツール](https://squoosh.app/)
- [WebP公式サイト](https://developers.google.com/speed/webp)
- [Next.js Image Optimization](https://nextjs.org/docs/app/building-your-application/optimizing/images)

## ✅ アクセシビリティ

画像には自動的に適切な代替テキストが設定されます：

```tsx
<AvatarImage src={profileImage} alt={`${name}のプロフィール写真`} />
```

この実装により、スクリーンリーダーを使用するユーザーにも適切な情報が提供されます。

## 🚀 デプロイ前の最終チェック

- [ ] 画像が正しく表示される
- [ ] 画像のファイルサイズが200KB以下
- [ ] ブラウザの開発者ツールでエラーがない
- [ ] モバイル表示でも画像が適切に表示される
- [ ] すべてのテストが通過する（`npm run test`）

```bash
# 最終確認
npm run test
npm run build
```

すべて問題なければ、デプロイの準備完了です！
