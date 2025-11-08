import React, { useMemo, useState } from 'react';
import type { Currency } from '../types';
import { currencies } from '../utils/currency';
import { CurrencyContext, type CurrencyContextValue } from './currencyContext';

export const CurrencyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currency, setCurrency] = useState<Currency>('EUR');

  const locale = useMemo(
    () => currencies.find(c => c.code === currency)?.locale || 'en-US',
    [currency]
  );

  const value: CurrencyContextValue = useMemo(
    () => ({ currency, setCurrency, locale }),
    [currency, locale]
  );

  return <CurrencyContext.Provider value={value}>{children}</CurrencyContext.Provider>;
};

export default CurrencyProvider;