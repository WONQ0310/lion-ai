import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Profile } from './Profile';
import { profileData } from '@/data/profileData';

describe('Profile Component - Integration with Real Data', () => {
  it('renders with actual profile data', () => {
    render(
      <Profile
        biography={profileData.biography}
        expertise={profileData.expertise}
      />
    );

    // Verify biography section exists
    expect(screen.getByText('経歴')).toBeInTheDocument();

    // Verify at least one biography paragraph is rendered
    expect(screen.getByText(/WONQ株式会社の代表取締役/)).toBeInTheDocument();

    // Verify expertise section exists
    expect(screen.getByText('専門分野')).toBeInTheDocument();

    // Verify some expertise items are rendered
    expect(screen.getByText('XR技術')).toBeInTheDocument();
    expect(screen.getByText('AI技術')).toBeInTheDocument();
  });
});
