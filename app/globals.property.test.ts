/**
 * Feature: iwashita-profile-page, Property 5: レスポンシブデザインのメディアクエリが存在する
 * 
 * **検証: 要件 4.1, 4.2, 4.3**
 * 
 * プロパティ: 任意のCSSファイルについて、モバイル、タブレット、デスクトップ用の
 * メディアクエリが定義されているべきです。
 */

import { describe, it, expect } from 'vitest';
import fc from 'fast-check';
import fs from 'fs';
import path from 'path';

describe('プロパティベーステスト: レスポンシブデザインのメディアクエリ', () => {
  it('Feature: iwashita-profile-page, Property 5: レスポンシブデザインのメディアクエリが存在する', () => {
    fc.assert(
      fc.property(fc.constant(null), () => {
        // globals.cssファイルを読み込む
        const cssPath = path.join(process.cwd(), 'app', 'globals.css');
        const cssContent = fs.readFileSync(cssPath, 'utf-8');
        
        // モバイル用メディアクエリが存在することを確認
        // 要件 4.1: モバイルデバイス（0-767px）
        const mobileMediaQuery = /@media\s*\([^)]*max-width\s*:\s*767px[^)]*\)/i;
        expect(cssContent).toMatch(mobileMediaQuery);
        
        // タブレット用メディアクエリが存在することを確認
        // 要件 4.2: タブレットデバイス（768px-1023px）
        const tabletMediaQuery = /@media\s*\([^)]*min-width\s*:\s*768px[^)]*\)\s*and\s*\([^)]*max-width\s*:\s*1023px[^)]*\)/i;
        expect(cssContent).toMatch(tabletMediaQuery);
        
        // デスクトップ用メディアクエリが存在することを確認
        // 要件 4.3: デスクトップブラウザ（1024px以上）
        const desktopMediaQuery = /@media\s*\([^)]*min-width\s*:\s*1024px[^)]*\)/i;
        expect(cssContent).toMatch(desktopMediaQuery);
      }),
      { numRuns: 100 }
    );
  });

  it('モバイル用メディアクエリが適切なブレークポイントを持つこと', () => {
    fc.assert(
      fc.property(fc.constant(null), () => {
        const cssPath = path.join(process.cwd(), 'app', 'globals.css');
        const cssContent = fs.readFileSync(cssPath, 'utf-8');
        
        // モバイル用メディアクエリ（max-width: 767px）が存在することを確認
        const mobileBreakpoint = /max-width\s*:\s*767px/i;
        expect(cssContent).toMatch(mobileBreakpoint);
      }),
      { numRuns: 100 }
    );
  });

  it('タブレット用メディアクエリが適切なブレークポイントを持つこと', () => {
    fc.assert(
      fc.property(fc.constant(null), () => {
        const cssPath = path.join(process.cwd(), 'app', 'globals.css');
        const cssContent = fs.readFileSync(cssPath, 'utf-8');
        
        // タブレット用メディアクエリ（min-width: 768px and max-width: 1023px）が存在することを確認
        const tabletMinBreakpoint = /min-width\s*:\s*768px/i;
        const tabletMaxBreakpoint = /max-width\s*:\s*1023px/i;
        
        expect(cssContent).toMatch(tabletMinBreakpoint);
        expect(cssContent).toMatch(tabletMaxBreakpoint);
      }),
      { numRuns: 100 }
    );
  });

  it('デスクトップ用メディアクエリが適切なブレークポイントを持つこと', () => {
    fc.assert(
      fc.property(fc.constant(null), () => {
        const cssPath = path.join(process.cwd(), 'app', 'globals.css');
        const cssContent = fs.readFileSync(cssPath, 'utf-8');
        
        // デスクトップ用メディアクエリ（min-width: 1024px）が存在することを確認
        const desktopBreakpoint = /min-width\s*:\s*1024px/i;
        expect(cssContent).toMatch(desktopBreakpoint);
      }),
      { numRuns: 100 }
    );
  });

  it('CSS変数でブレークポイントが定義されていること', () => {
    fc.assert(
      fc.property(fc.constant(null), () => {
        const cssPath = path.join(process.cwd(), 'app', 'globals.css');
        const cssContent = fs.readFileSync(cssPath, 'utf-8');
        
        // CSS変数でブレークポイントが定義されていることを確認
        expect(cssContent).toMatch(/--breakpoint-tablet\s*:\s*768px/i);
        expect(cssContent).toMatch(/--breakpoint-desktop\s*:\s*1024px/i);
      }),
      { numRuns: 100 }
    );
  });

  it('各メディアクエリ内にスタイル定義が存在すること', () => {
    fc.assert(
      fc.property(fc.constant(null), () => {
        const cssPath = path.join(process.cwd(), 'app', 'globals.css');
        const cssContent = fs.readFileSync(cssPath, 'utf-8');
        
        // モバイル用メディアクエリ内にスタイル定義が存在することを確認
        const mobileMediaQueryBlock = /@media\s*\([^)]*max-width\s*:\s*767px[^)]*\)\s*\{[^}]+\}/is;
        expect(cssContent).toMatch(mobileMediaQueryBlock);
        
        // タブレット用メディアクエリ内にスタイル定義が存在することを確認
        const tabletMediaQueryBlock = /@media\s*\([^)]*min-width\s*:\s*768px[^)]*\)\s*and\s*\([^)]*max-width\s*:\s*1023px[^)]*\)\s*\{[^}]+\}/is;
        expect(cssContent).toMatch(tabletMediaQueryBlock);
        
        // デスクトップ用メディアクエリ内にスタイル定義が存在することを確認
        const desktopMediaQueryBlock = /@media\s*\([^)]*min-width\s*:\s*1024px[^)]*\)\s*\{[^}]+\}/is;
        expect(cssContent).toMatch(desktopMediaQueryBlock);
      }),
      { numRuns: 100 }
    );
  });
});
