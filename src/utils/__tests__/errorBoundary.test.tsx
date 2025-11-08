import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import ErrorBoundary from '../errorBoundary';
import logger from '../logger';

function Thrower() {
  throw new Error('boom');
}

describe('ErrorBoundary', () => {
  it('renders fallback UI and logs error via logger', () => {
    const spy = vi.spyOn(logger, 'error').mockImplementation(() => {});
    render(
      <ErrorBoundary fallback={<div data-testid="fallback">fallback</div>}>
        <Thrower />
      </ErrorBoundary>
    );

    expect(screen.getByTestId('fallback')).toBeInTheDocument();
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy.mock.calls[0][0]).toContain('React Error Boundary');
    spy.mockRestore();
  });
});