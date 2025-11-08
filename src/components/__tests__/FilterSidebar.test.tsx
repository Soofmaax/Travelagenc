import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import FilterSidebar from '../FilterSidebar';

describe('FilterSidebar', () => {
  it('renders filters and calls change handlers', () => {
    const destinations = ['France', 'Japan', 'Peru'];
    const onDest = vi.fn();
    const onDur = vi.fn();
    const onPrice = vi.fn();
    const onReset = vi.fn();

    render(
      <FilterSidebar
        destinations={destinations}
        selectedDestination=""
        selectedDuration=""
        selectedPrice=""
        onDestinationChange={onDest}
        onDurationChange={onDur}
        onPriceChange={onPrice}
        onResetFilters={onReset}
      />
    );

    // Three selects (destination, duration, price)
    const selects = screen.getAllByRole('combobox');
    expect(selects).toHaveLength(3);

    fireEvent.change(selects[0], { target: { value: 'Japan' } });
    expect(onDest).toHaveBeenCalledWith('Japan');

    fireEvent.change(selects[1], { target: { value: 'medium' } });
    expect(onDur).toHaveBeenCalledWith('medium');

    fireEvent.change(selects[2], { target: { value: 'luxury' } });
    expect(onPrice).toHaveBeenCalledWith('luxury');

    const resetBtn = screen.getByRole('button', { name: /Reset Filters/ });
    fireEvent.click(resetBtn);
    expect(onReset).toHaveBeenCalledTimes(1);
  });
});