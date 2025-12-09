import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import * as fc from 'fast-check';
import { Links } from './Links';
import { ExternalLink } from '@/types/profile';

/**
 * Feature: iwashita-profile-page, Property 1: すべての外部リンクは有効なURL形式を持つ
 * Validates: Requirements 2.1, 2.2, 6.1, 6.2
 */
describe('Links Component - Property Based Tests', () => {
  describe('プロパティ 1: すべての外部リンクは有効なURL形式を持つ', () => {
    it('任意のExternalLink配列について、すべてのリンクが有効なURL形式を持つこと', () => {
      // URL形式のジェネレーター（http://またはhttps://で始まる）
      const validUrlArbitrary = fc.webUrl({ validSchemes: ['http', 'https'] });

      // ExternalLinkオブジェクトのジェネレーター
      const externalLinkArbitrary = fc.record({
        name: fc.string({ minLength: 1, maxLength: 50 }),
        url: validUrlArbitrary,
        description: fc.string({ minLength: 1, maxLength: 200 }),
        isExternal: fc.constant(true),
      });

      // ExternalLink配列のジェネレーター（0〜5個のリンク）
      const linksArrayArbitrary = fc.array(externalLinkArbitrary, { minLength: 0, maxLength: 5 });

      fc.assert(
        fc.property(linksArrayArbitrary, (links: ExternalLink[]) => {
          // コンポーネントをレンダリング
          const { container } = render(<Links links={links} />);

          // すべてのaタグを取得
          const anchorElements = container.querySelectorAll('a');

          // 各aタグについて検証
          anchorElements.forEach((anchor) => {
            const href = anchor.getAttribute('href');

            // href属性が存在することを確認
            expect(href).toBeTruthy();

            // href属性が有効なURL形式（http://またはhttps://で始まる）であることを確認
            expect(href).toMatch(/^https?:\/\/.+/);
          });

          // レンダリングされたリンクの数が入力データと一致することを確認
          expect(anchorElements.length).toBe(links.length);
        }),
        { numRuns: 100 } // 100回の反復実行
      );
    });

    it('空のリンク配列でも正常に動作すること', () => {
      fc.assert(
        fc.property(fc.constant([]), (links: ExternalLink[]) => {
          const { container } = render(<Links links={links} />);
          const anchorElements = container.querySelectorAll('a');

          // 空の配列の場合、リンクが存在しないことを確認
          expect(anchorElements.length).toBe(0);
        }),
        { numRuns: 100 }
      );
    });

    it('すべてのリンクがrel="noopener noreferrer"とtarget="_blank"を持つこと', () => {
      const validUrlArbitrary = fc.webUrl({ validSchemes: ['http', 'https'] });

      const externalLinkArbitrary = fc.record({
        name: fc.string({ minLength: 1, maxLength: 50 }),
        url: validUrlArbitrary,
        description: fc.string({ minLength: 1, maxLength: 200 }),
        isExternal: fc.constant(true),
      });

      const linksArrayArbitrary = fc.array(externalLinkArbitrary, { minLength: 1, maxLength: 5 });

      fc.assert(
        fc.property(linksArrayArbitrary, (links: ExternalLink[]) => {
          const { container } = render(<Links links={links} />);
          const anchorElements = container.querySelectorAll('a');

          // すべてのaタグについて検証
          anchorElements.forEach((anchor) => {
            // rel属性が"noopener noreferrer"であることを確認
            expect(anchor.getAttribute('rel')).toBe('noopener noreferrer');

            // target属性が"_blank"であることを確認
            expect(anchor.getAttribute('target')).toBe('_blank');
          });
        }),
        { numRuns: 100 }
      );
    });
  });
});
