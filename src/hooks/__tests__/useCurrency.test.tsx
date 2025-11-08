import React from 'react';
import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { CurrencyProvider } from '../CurrencyProvider';
import { useCurrency } from '../useCurrency';

describe('useCurrency + CurrencyProvider', () => {
  it('provides default currency EUR and locale', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <CurrencyProvider>{children}</CurrencyProvider>
    );

    const { result } = renderHook(() => useCurrency(), { wrapper });
    expect(result.current.currency).toBe('EUR');
    // Locale for EUR is fr-FR per currencies definition
    expect(result.current.locale).toBe('fr-FR');
  });

  it('updates currency and recomputes locale', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <CurrencyProvider>{children}</CurrencyProvider>
    );

    const { result } = renderHook(() => useCurrency(), { wrapper });

    act(() => {
      result.current.setCurrency('USD');
    });

    expect(result.current.currency).toBe('USD');
    expect(result.current.locale).toBe('en-US');
  });
});