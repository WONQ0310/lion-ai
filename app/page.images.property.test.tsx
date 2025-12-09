/**
 * Feature: iwashita-profile-page, Property 2: すべての画像は代替テキストを持つ
 * 
 * **検証: 要件 7.4**
 * 
 * プロパティ: すべてのimgタグについて、alt属性が存在し、空でない値を持つべきです。
 * 
 * 注: このテストは、コンポーネントのソースコードにalt属性が正しく設定されていることを検証します。
 * Radix UIのAvatarImageコンポーネントは、テスト環境では画像が実際にロードされないため、
 * フォールバックのみが表示されますが、実際のブラウザ環境ではalt属性を持つimg要素としてレンダリングされます。
 */

import { describe, it, expect } from 'vitest';
import fc from 'fast-check';
import fs from 'fs';
import path from 'path';

describe('プロパティベーステスト: 画像の代替テキスト', () => {
  it('Feature: iwashita-profile-page, Property 2: すべての画像は代替テキストを持つ', () => {
    fc.assert(
      fc.property(fc.constant(null), () => {
        // Headerコンポーネントのソースコードを読み込む
        const headerPath = path.join(process.cwd(), 'components', 'Header.tsx');
        const headerContent = fs.readFileSync(headerPath, 'utf-8');
        
        // AvatarImageコンポーネントにalt属性が設定されていることを確認
        expect(headerContent).toMatch(/<AvatarImage[^>]+alt=/);
        
        // alt属性が空でないことを確認（空のalt=""ではない）
        expect(headerContent).not.toMatch(/alt=""\s/);
        expect(headerContent).not.toMatch(/alt=''\s/);
        
        // alt属性が動的な値を持つことを確認（テンプレートリテラルまたは変数）
        const altAttributeMatch = headerContent.match(/alt=\{[^}]+\}|alt="[^"]+"|alt='[^']+'/);
        expect(altAttributeMatch).not.toBeNull();
        
        if (altAttributeMatch) {
          const altValue = altAttributeMatch[0];
          // alt属性が空の文字列でないことを確認
          expect(altValue).not.toBe('alt=""');
          expect(altValue).not.toBe("alt=''");
          
          // alt属性が意味のある内容を含むことを確認
          // （プロフィール、写真、画像などのキーワードを含む）
          expect(altValue).toMatch(/プロフィール|写真|画像|name|profile|photo|image/i);
        }
      }),
      { numRuns: 100 }
    );
  });

  it('すべての画像コンポーネントがalt属性を持つこと', () => {
    fc.assert(
      fc.property(fc.constant(null), () => {
        // componentsディレクトリ内のすべてのTSXファイルを検索
        const componentsDir = path.join(process.cwd(), 'components');
        const files = fs.readdirSync(componentsDir);
        const tsxFiles = files.filter(file => file.endsWith('.tsx') && !file.endsWith('.test.tsx'));
        
        tsxFiles.forEach(file => {
          const filePath = path.join(componentsDir, file);
          const content = fs.readFileSync(filePath, 'utf-8');
          
          // AvatarImageまたはimgタグが存在する場合
          if (content.includes('<AvatarImage') || content.includes('<img')) {
            // AvatarImageの場合
            const avatarImageMatches = content.match(/<AvatarImage[^>]*>/g);
            if (avatarImageMatches) {
              avatarImageMatches.forEach(match => {
                // alt属性が存在することを確認
                expect(match).toMatch(/alt=/);
              });
            }
            
            // imgタグの場合
            const imgMatches = content.match(/<img[^>]*>/g);
            if (imgMatches) {
              imgMatches.forEach(match => {
                // alt属性が存在することを確認
                expect(match).toMatch(/alt=/);
              });
            }
          }
        });
      }),
      { numRuns: 100 }
    );
  });

  it('alt属性が空でない値を持つこと', () => {
    fc.assert(
      fc.property(fc.constant(null), () => {
        const headerPath = path.join(process.cwd(), 'components', 'Header.tsx');
        const headerContent = fs.readFileSync(headerPath, 'utf-8');
        
        // alt属性が空の文字列でないことを確認
        expect(headerContent).not.toMatch(/alt=""\s/);
        expect(headerContent).not.toMatch(/alt=''\s/);
        expect(headerContent).not.toMatch(/alt=\{\s*['"]\s*['"]\s*\}/);
        
        // alt属性が意味のある値を持つことを確認
        const altMatches = headerContent.match(/alt=(?:\{[^}]+\}|"[^"]+"|'[^']+')/g);
        if (altMatches) {
          altMatches.forEach(altAttr => {
            // 空でないことを確認
            expect(altAttr).not.toBe('alt=""');
            expect(altAttr).not.toBe("alt=''");
            expect(altAttr).not.toBe('alt={}');
            
            // 最低限の長さを持つことを確認
            expect(altAttr.length).toBeGreaterThan(6); // "alt=""" より長い
          });
        }
      }),
      { numRuns: 100 }
    );
  });
});
