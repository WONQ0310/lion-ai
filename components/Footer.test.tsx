import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Footer } from './Footer';

describe('Footer Component', () => {
  const defaultProps = {
    copyright: '© 2025 岩下直人. All rights reserved.',
  };

  describe('著作権表示の検証', () => {
    it('著作権表示が正しく表示されること', () => {
      render(<Footer {...defaultProps} />);
      
      const copyrightText = screen.getByText('© 2025 岩下直人. All rights reserved.');
      expect(copyrightText).toBeInTheDocument();
    });

    it('著作権表示が適切なHTML要素で表示されること', () => {
      render(<Footer {...defaultProps} />);
      
      const copyrightText = screen.getByText('© 2025 岩下直人. All rights reserved.');
      expect(copyrightText.tagName).toBe('P');
    });

    it('footer要素が存在すること', () => {
      const { container } = render(<Footer {...defaultProps} />);
      
      const footer = container.querySelector('footer');
      expect(footer).toBeInTheDocument();
    });
  });

  describe('異なるプロップスでの動作', () => {
    it('異なる著作権表示が正しく表示されること', () => {
      const customProps = {
        copyright: '© 2025 Test Company. All rights reserved.',
      };
      render(<Footer {...customProps} />);
      
      expect(screen.getByText('© 2025 Test Company. All rights reserved.')).toBeInTheDocument();
    });

    it('空の著作権表示でも正常にレンダリングされること', () => {
      const emptyProps = {
        copyright: '',
      };
      const { container } = render(<Footer {...emptyProps} />);
      
      const footer = container.querySelector('footer');
      expect(footer).toBeInTheDocument();
    });
  });
});
