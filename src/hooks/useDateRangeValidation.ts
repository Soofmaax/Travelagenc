import { useMemo } from 'react';

export function useDateRangeValidation(
  startDate: string | null,
  endDate: string | null
) {
  const isValidRange = useMemo(() => {
    if (!startDate || !endDate) return true;
    return new Date(startDate) <= new Date(endDate);
  }, [startDate, endDate]);

  const error =
    !isValidRange && startDate && endDate
      ? 'La date de retour doit être après le départ.'
      : '';

  return { isValidRange, error };
}