import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import LanguageSwitcher from '../LanguageSwitcher';

// Mock react-i18next to control language and verify changeLanguage calls
const changeLanguage = vi.fn();
vi.mock('react-i18next', () => {
  return {
    useTranslation: () => ({
      i18n: {
        language: 'en',
        changeLanguage,
      },
    }),
  };
});

describe('LanguageSwitcher', () => {
  it('displays current language and toggles on click', () => {
    render(<LanguageSwitcher />);

    // Shows EN initially
    expect(screen.getByText('EN')).toBeInTheDocument();

    const button = screen.getByRole('button');
    fireEvent.click(button);

    // Should request switch to French
    expect(changeLanguage).toHaveBeenCalledWith('fr');
  });
});