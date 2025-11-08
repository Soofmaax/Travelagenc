import { useDeferredValue, useEffect, useMemo, useState } from 'react';
import Fuse from 'fuse.js';

interface UseDestinationSuggestionsOptions {
  threshold?: number;
  minMatchCharLength?: number;
  limit?: number;
}

export function useDestinationSuggestions(
  source: string[],
  query: string,
  options: UseDestinationSuggestionsOptions = {}
) {
  const { threshold = 0.3, minMatchCharLength = 1, limit = 5 } = options;

  const fuse = useMemo(
    () =>
      new Fuse(source, {
        includeScore: true,
        threshold,
        minMatchCharLength,
      }),
    [source, threshold, minMatchCharLength]
  );

  const deferredQuery = useDeferredValue(query);
  const [suggestions, setSuggestions] = useState<string[]>([]);

  useEffect(() => {
    const value = deferredQuery;
    if (value && value.length > 0) {
      const results = fuse.search(value).map(r => r.item);
      setSuggestions(results.slice(0, limit));
    } else {
      setSuggestions([]);
    }
  }, [deferredQuery, fuse, limit]);

  return suggestions;
}