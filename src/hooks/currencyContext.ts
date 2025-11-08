import { createContext } from 'react';
import type { Currency } from '../types';

export type CurrencyContextValue = {
  currency: Currency;
  setCurrency: (c: Currency) => void;
  locale: string;
};

export const CurrencyContext = createContext<CurrencyContextValue | undefined>(undefined);