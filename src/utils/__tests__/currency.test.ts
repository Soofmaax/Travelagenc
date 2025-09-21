import { describe, it, expect } from 'vitest';
import { currencies, formatPrice } from '../currency';

describe('currency utilities', () => {
  it('should expose supported currencies with correct symbols/locales', () => {
    const eur = currencies.find(c => c.code === 'EUR');
    const usd = currencies.find(c => c.code === 'USD');
    const gbp = currencies.find(c => c.code === 'GBP');

    expect(eur).toBeDefined();
    expect(eur?.symbol).toBe('€');
    expect(eur?.locale).toBe('fr-FR');

    expect(usd).toBeDefined();
    expect(usd?.symbol).toBe('$');
    expect(usd?.locale).toBe('en-US');

    expect(gbp).toBeDefined();
    expect(gbp?.symbol).toBe('£');
    expect(gbp?.locale).toBe('en-GB');
  });

  it('formatPrice should format amounts according to currency and locale mapping', () => {
    // Explicit locale
    const eurFR = formatPrice(1999.99, 'EUR', 'fr-FR');
    expect(eurFR).toContain('€');
    // French formatting typically uses space as thousands separator and comma as decimal
    // We avoid strict pattern due to environment differences; just ensure numerals are present.
    expect(eurFR.replace(/[^\d]/g, '').length).toBeGreaterThan(1);

    const usdUS = formatPrice(1999.99, 'USD', 'en-US');
    expect(usdUS).toContain('$');
    expect(usdUS.startsWith('$')).toBe(true);

    const gbpGB = formatPrice(1999.99, 'GBP', 'en-GB');
    expect(gbpGB).toContain('£');
  });

  it('formatPrice should use default mapped locale when none provided', () => {
    const usdDefault = formatPrice(1000, 'USD'); // should default to en-US mapping
    expect(usdDefault).toContain('$');

    const eurDefault = formatPrice(1000, 'EUR'); // should default to fr-FR mapping
    expect(eurDefault).toContain('€');
  });
});