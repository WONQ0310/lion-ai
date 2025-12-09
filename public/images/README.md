# 画像ディレクトリ

## プロフィール画像の配置

このディレクトリにプロフィール画像を配置してください。

### 必要なファイル

- `profile.jpg` または `profile.webp` - 岩下直人氏のプロフィール写真

### 推奨仕様

- **サイズ**: 800x800px（正方形）
- **形式**: WebP（推奨）またはJPG
- **ファイルサイズ**: 200KB以下
- **品質**: 高品質（WebPの場合はquality 80-90）

### 最適化方法

#### オンラインツール
- [Squoosh](https://squoosh.app/) - ブラウザで画像を圧縮・変換

#### コマンドライン（WebP変換）
```bash
# JPGからWebPへの変換
cwebp -q 85 profile.jpg -o profile.webp

# リサイズと変換を同時に行う
cwebp -resize 800 800 -q 85 original.jpg -o profile.webp
```

### 複数形式の配置（オプション）

フォールバック用に複数形式を配置することも可能です：

```
public/images/
  ├── profile.jpg   # フォールバック用（古いブラウザ対応）
  └── profile.webp  # 最適化版（推奨）
```

コード側で複数形式に対応する場合は、`data/profileData.ts`を更新してください。

### アクセシビリティ

画像には自動的に適切な代替テキストが設定されます：
- `{name}のプロフィール写真`

この代替テキストは`components/Header.tsx`で実装されています。
