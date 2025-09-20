import { render } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { vi } from 'vitest';
import ScrollToTop from '../ScrollToTop';

describe('ScrollToTop', () => {
  const originalScrollTo = window.scrollTo;

  beforeEach(() => {
    window.scrollTo = vi.fn();
  });

  afterEach(() => {
    window.scrollTo = originalScrollTo;
  });

  it('should scroll to top on route change', () => {
    const { rerender } = render(
      <MemoryRouter initialEntries={['/']}>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<div>Home</div>} />
          <Route path="/about" element={<div>About</div>} />
        </Routes>
      </MemoryRouter>
    );

    // Check that scrollTo was called (arguments can differ depending on environment)
    expect(window.scrollTo).toHaveBeenCalled();

    // Simuler un changement de route
    rerender(
      <MemoryRouter initialEntries={['/about']}>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<div>Home</div>} />
          <Route path="/about" element={<div>About</div>} />
        </Routes>
      </MemoryRouter>
    );

    expect(window.scrollTo).toHaveBeenCalledTimes(2);
  });

  it('should handle scroll errors gracefully', () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    window.scrollTo = vi.fn().mockImplementation(() => {
      throw new Error('Scroll failed');
    });

    render(
      <MemoryRouter>
        <ScrollToTop />
      </MemoryRouter>
    );

    expect(consoleSpy).toHaveBeenCalled();
    consoleSpy.mockRestore();
  });
});