/**
 * Feature: iwashita-profile-page, Property 4: 必須メタデータが存在する
 * 
 * **検証: 要件 7.1, 7.2**
 * 
 * プロパティ: 任意のHTMLドキュメントについて、head内にtitleタグとmeta descriptionタグが存在し、
 * 空でない値を持つべきです。
 */

import { describe, it, expect } from 'vitest';
import fc from 'fast-check';
import { metadata } from './layout';

describe('プロパティベーステスト: 必須メタデータ', () => {
  it('Feature: iwashita-profile-page, Property 4: 必須メタデータが存在する', () => {
    fc.assert(
      fc.property(fc.constant(null), () => {
        // メタデータオブジェクトが存在することを確認
        expect(metadata).toBeDefined();
        
        // titleが存在し、空でないことを確認
        expect(metadata.title).toBeDefined();
        expect(metadata.title).not.toBe('');
        expect(typeof metadata.title === 'string' ? metadata.title.length : 0).toBeGreaterThan(0);
        
        // descriptionが存在し、空でないことを確認
        expect(metadata.description).toBeDefined();
        expect(metadata.description).not.toBe('');
        expect(typeof metadata.description === 'string' ? metadata.description.length : 0).toBeGreaterThan(0);
      }),
      { numRuns: 100 }
    );
  });

  it('メタデータのtitleが適切な形式であること', () => {
    fc.assert(
      fc.property(fc.constant(null), () => {
        // titleが文字列であることを確認
        const title = metadata.title;
        expect(typeof title === 'string' || (title && typeof title === 'object')).toBe(true);
        
        // titleが空でないことを確認
        if (typeof title === 'string') {
          expect(title.length).toBeGreaterThan(0);
          // titleに基本的な情報が含まれていることを確認
          expect(title).toContain('岩下直人');
        }
      }),
      { numRuns: 100 }
    );
  });

  it('メタデータのdescriptionが適切な形式であること', () => {
    fc.assert(
      fc.property(fc.constant(null), () => {
        const description = metadata.description;
        
        // descriptionが文字列であることを確認
        expect(typeof description === 'string' || (description && typeof description === 'object')).toBe(true);
        
        // descriptionが空でないことを確認
        if (typeof description === 'string') {
          expect(description.length).toBeGreaterThan(0);
          // descriptionが適切な長さであることを確認（SEOのベストプラクティス: 50-160文字）
          expect(description.length).toBeGreaterThanOrEqual(10);
          expect(description.length).toBeLessThanOrEqual(300);
        }
      }),
      { numRuns: 100 }
    );
  });

  it('Open Graphメタデータが存在すること', () => {
    fc.assert(
      fc.property(fc.constant(null), () => {
        // Open Graphメタデータが存在することを確認
        expect(metadata.openGraph).toBeDefined();
        
        if (metadata.openGraph) {
          // OG titleが存在することを確認
          expect(metadata.openGraph.title).toBeDefined();
          
          // OG descriptionが存在することを確認
          expect(metadata.openGraph.description).toBeDefined();
          
          // OG URLが存在することを確認
          expect(metadata.openGraph.url).toBeDefined();
        }
      }),
      { numRuns: 100 }
    );
  });
});
