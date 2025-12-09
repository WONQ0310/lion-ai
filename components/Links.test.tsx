import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Links } from './Links';
import { ExternalLink } from '@/types/profile';

describe('Links Component', () => {
  const mockLinks: ExternalLink[] = [
    {
      name: 'Lion AI',
      url: 'https://www.lion-ai.co.jp/',
      description: 'AI技術の研究開発における協業パートナー',
      isExternal: true,
    },
    {
      name: 'WONQ株式会社',
      url: 'https://www.wonq-xr.jp/',
      description: '会社公式サイト',
      isExternal: true,
    },
  ];

  describe('要件 2.1, 2.2: Lion AIリンクの存在と正しいURL', () => {
    it('Lion AIリンクが存在すること', () => {
      render(<Links links={mockLinks} />);

      // すべてのリンクを取得して、Lion AIのリンクが存在することを確認
      const links = screen.getAllByRole('link', { name: /サイトを訪問/i });
      expect(links.length).toBeGreaterThanOrEqual(1);
      
      // Lion AIのリンクが存在することを確認
      const lionAILink = links.find(link => link.getAttribute('href') === 'https://www.lion-ai.co.jp/');
      expect(lionAILink).toBeInTheDocument();
    });

    it('Lion AIリンクが正しいURLを持つこと', () => {
      render(<Links links={mockLinks} />);

      // Lion AIのリンクを取得
      const links = screen.getAllByRole('link', { name: /サイトを訪問/i });
      const lionAILink = links[0]; // 最初のリンクがLion AI

      expect(lionAILink).toHaveAttribute('href', 'https://www.lion-ai.co.jp/');
    });

    it('Lion AIの名前と説明が表示されること', () => {
      render(<Links links={mockLinks} />);

      expect(screen.getByText('Lion AI')).toBeInTheDocument();
      expect(screen.getByText('AI技術の研究開発における協業パートナー')).toBeInTheDocument();
    });
  });

  describe('要件 6.1, 6.2: WONQリンクの存在と正しいURL', () => {
    it('WONQリンクが存在すること', () => {
      render(<Links links={mockLinks} />);

      const links = screen.getAllByRole('link', { name: /サイトを訪問/i });
      expect(links.length).toBeGreaterThanOrEqual(2);
    });

    it('WONQリンクが正しいURLを持つこと', () => {
      render(<Links links={mockLinks} />);

      // WONQのリンクを取得
      const links = screen.getAllByRole('link', { name: /サイトを訪問/i });
      const wonqLink = links[1]; // 2番目のリンクがWONQ

      expect(wonqLink).toHaveAttribute('href', 'https://www.wonq-xr.jp/');
    });

    it('WONQの名前と説明が表示されること', () => {
      render(<Links links={mockLinks} />);

      expect(screen.getByText('WONQ株式会社')).toBeInTheDocument();
      expect(screen.getByText('会社公式サイト')).toBeInTheDocument();
    });
  });

  describe('要件 2.3: rel="noopener noreferrer"の設定', () => {
    it('すべての外部リンクにrel="noopener noreferrer"が設定されていること', () => {
      render(<Links links={mockLinks} />);

      const links = screen.getAllByRole('link', { name: /サイトを訪問/i });

      links.forEach((link) => {
        expect(link).toHaveAttribute('rel', 'noopener noreferrer');
      });
    });

    it('すべての外部リンクがtarget="_blank"を持つこと', () => {
      render(<Links links={mockLinks} />);

      const links = screen.getAllByRole('link', { name: /サイトを訪問/i });

      links.forEach((link) => {
        expect(link).toHaveAttribute('target', '_blank');
      });
    });
  });

  describe('要件 2.4: リンクのコンテキスト（説明文）', () => {
    it('各リンクに適切な説明文が表示されること', () => {
      render(<Links links={mockLinks} />);

      mockLinks.forEach((link) => {
        expect(screen.getByText(link.description)).toBeInTheDocument();
      });
    });
  });

  describe('異なるリンクデータでの動作', () => {
    it('空のリンク配列でも正常にレンダリングされること', () => {
      render(<Links links={[]} />);

      expect(screen.getByText('関連リンク')).toBeInTheDocument();
      expect(screen.getByText('協業パートナーと関連サイト')).toBeInTheDocument();
    });

    it('単一のリンクでも正常にレンダリングされること', () => {
      const singleLink: ExternalLink[] = [
        {
          name: 'Test Link',
          url: 'https://example.com/',
          description: 'Test description',
          isExternal: true,
        },
      ];

      render(<Links links={singleLink} />);

      expect(screen.getByText('Test Link')).toBeInTheDocument();
      expect(screen.getByText('Test description')).toBeInTheDocument();

      const link = screen.getByRole('link', { name: /サイトを訪問/i });
      expect(link).toHaveAttribute('href', 'https://example.com/');
    });

    it('複数のリンクが正しい順序で表示されること', () => {
      render(<Links links={mockLinks} />);

      const linkNames = screen.getAllByRole('heading', { level: 3 });
      expect(linkNames[0]).toHaveTextContent('Lion AI');
      expect(linkNames[1]).toHaveTextContent('WONQ株式会社');
    });
  });
});
