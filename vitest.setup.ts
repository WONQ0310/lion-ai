import '@testing-library/jest-dom';
import { vi } from 'vitest';

// Next.jsのフォント関数をモック
vi.mock('next/font/google', () => ({
  Inter: () => ({
    className: 'mocked-inter',
    variable: '--font-inter',
    style: { fontFamily: 'Inter' },
  }),
}));
