import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Profile } from './Profile';

describe('Profile Component', () => {
  const mockBiography = [
    'First paragraph of biography',
    'Second paragraph of biography',
  ];

  const mockExpertise = ['XR技術', 'AI技術', '事業開発'];

  it('renders biography section with all paragraphs', () => {
    render(<Profile biography={mockBiography} expertise={mockExpertise} />);

    // Check section title
    expect(screen.getByText('経歴')).toBeInTheDocument();

    // Check all biography paragraphs are rendered
    mockBiography.forEach((paragraph) => {
      expect(screen.getByText(paragraph)).toBeInTheDocument();
    });
  });

  it('renders expertise section with all skills', () => {
    render(<Profile biography={mockBiography} expertise={mockExpertise} />);

    // Check section title
    expect(screen.getByText('専門分野')).toBeInTheDocument();

    // Check all expertise badges are rendered
    mockExpertise.forEach((skill) => {
      expect(screen.getByText(skill)).toBeInTheDocument();
    });
  });

  it('renders empty biography gracefully', () => {
    render(<Profile biography={[]} expertise={mockExpertise} />);

    // Section should still exist
    expect(screen.getByText('経歴')).toBeInTheDocument();
  });

  it('renders empty expertise gracefully', () => {
    render(<Profile biography={mockBiography} expertise={[]} />);

    // Section should still exist
    expect(screen.getByText('専門分野')).toBeInTheDocument();
  });
});
