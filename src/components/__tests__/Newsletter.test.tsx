import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Newsletter from '../Newsletter';

describe('Newsletter', () => {
  it('submits email and shows subscription message', () => {
    render(<Newsletter />);

    const input = screen.getByPlaceholderText(/Votre adresse email/i) as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'user@example.com' } });

    const button = screen.getByRole('button', { name: /S'abonner/i });
    fireEvent.click(button);

    expect(screen.getByText(/Merci de votre inscription/i)).toBeInTheDocument();
    expect(input.value).toBe('');
  });
});