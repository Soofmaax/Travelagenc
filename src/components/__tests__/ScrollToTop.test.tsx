import { render } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import ScrollToTop from '../ScrollToTop';

describe('ScrollToTop', () => {
  const originalScrollTo = window.scrollTo;

  beforeEach(() => {
    window.scrollTo = jest.fn();
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

    expect(window.scrollTo).toHaveBeenCalledWith({
      top: 0,
      behavior: 'smooth'
    });

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
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    window.scrollTo = jest.fn().mockImplementation(() => {
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