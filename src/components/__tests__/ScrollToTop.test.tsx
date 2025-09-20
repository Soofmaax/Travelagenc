import { render, waitFor } from '@testing-library/react';
import { useEffect } from 'react';
import { MemoryRouter, Route, Routes, useNavigate } from 'react-router-dom';
import { vi } from 'vitest';
import ScrollToTop from '../ScrollToTop';

function NavigateOnce({ to }: { to: string }) {
  const navigate = useNavigate();
  useEffect(() => {
    navigate(to);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return null;
}

describe('ScrollToTop', () => {
  const originalScrollTo = window.scrollTo;

  beforeEach(() => {
    window.scrollTo = vi.fn();
  });

  afterEach(() => {
    window.scrollTo = originalScrollTo;
  });

  it('should scroll to top on route change', async () => {
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

    // Simuler un changement de route à l'aide de useNavigate
    rerender(
      <MemoryRouter initialEntries={['/']}>
        <ScrollToTop />
        <NavigateOnce to="/about" />
        <Routes>
          <Route path="/" element={<div>Home</div>} />
          <Route path="/about" element={<div>About</div>} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => expect(window.scrollTo).toHaveBeenCalledTimes(2));
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