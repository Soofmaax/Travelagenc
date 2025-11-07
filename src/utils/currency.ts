import type { Currency } from '../types';

export const currencies: { code: Currency; symbol: string; label: string; locale: string }[] = [
  { code: 'EUR', symbol: '€', label: 'Euro (EUR)', locale: 'fr-FR' },
  { code: 'USD', symbol: '$', label: 'US Dollar (USD)', locale: 'en-US' },
  { code: 'GBP', symbol: '£', label: 'British Pound (GBP)', locale: 'en-GB' }
];

export function formatPrice(amount: number, currency: Currency, locale?: string): string {
  const l = locale || currencies.find(c => c.code === currency)?.locale || 'en-US';
  return new Intl.NumberFormat(l, { style: 'currency', currency }).format(amount);
}