import React, { createContext, useContext, useMemo, useState } from 'react';
import type { Currency } from '../types';
import { currencies } from '../utils/currency';

type CurrencyContextValue = {
  currency: Currency;
  setCurrency: (c: Currency) => void;
  locale: string;
};

const CurrencyContext = createContext<CurrencyContextValue | undefined>(undefined);

export const CurrencyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currency, setCurrency] = useState<Currency>('EUR');

  const locale = useMemo(
    () => currencies.find(c => c.code === currency)?.locale || 'en-US',
    [currency]
  );

  const value = useMemo(() => ({ currency, setCurrency, locale }), [currency, locale]);

  return <CurrencyContext.Provider value={value}>{children}</CurrencyContext.Provider>;
};

export const useCurrency = (): CurrencyContextValue => {
  const ctx = useContext(CurrencyContext);
  if (!ctx) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return ctx;
};