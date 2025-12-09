/**
 * Feature: iwashita-profile-page, Property 3: HTMLはセマンティック構造を持つ
 * 
 * **検証: 要件 7.3**
 * 
 * プロパティ: 任意の有効なHTMLドキュメントについて、header、main、footerタグが存在し、
 * 適切な階層構造を持つべきです。
 */

import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import Home from './page';
import fc from 'fast-check';

describe('プロパティベーステスト: HTMLセマンティック構造', () => {
  it('Feature: iwashita-profile-page, Property 3: HTMLはセマンティック構造を持つ', () => {
    fc.assert(
      fc.property(fc.constant(null), () => {
        // ページをレンダリング
        const { container } = render(<Home />);
        
        // header要素が存在することを確認
        const headers = container.querySelectorAll('header');
        expect(headers.length).toBeGreaterThan(0);
        
        // main要素が存在することを確認
        const mains = container.querySelectorAll('main');
        expect(mains.length).toBeGreaterThan(0);
        
        // footer要素が存在することを確認
        const footers = container.querySelectorAll('footer');
        expect(footers.length).toBeGreaterThan(0);
        
        // 各要素が1つずつ存在することを確認（適切な階層構造）
        expect(headers.length).toBe(1);
        expect(mains.length).toBe(1);
        expect(footers.length).toBe(1);
      }),
      { numRuns: 100 }
    );
  });
});
