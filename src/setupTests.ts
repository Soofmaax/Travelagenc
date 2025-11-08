import '@testing-library/jest-dom';

// Global polyfill for matchMedia in JSDOM test environment
if (typeof window !== 'undefined' && typeof window.matchMedia !== 'function') {
  // @ts-expect-error: JSDOM doesn't implement matchMedia; provide a lightweight mock
  window.matchMedia = (query: string) => {
    return {
      matches: false,
      media: query,
      addEventListener: () => {},
      removeEventListener: () => {},
      onchange: null,
      // Legacy APIs some code may still call
      addListener: () => {},
      removeListener: () => {},
      dispatchEvent: () => false,
    } as unknown as MediaQueryList;
  };
}