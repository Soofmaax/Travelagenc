# API Client conventions

This project includes a minimal fetch-based API client in `src/utils/api.ts` with a small set of conventions to keep calls consistent and testable.

## Overview

- Base URL: `import.meta.env.VITE_API_URL` (client-side env). If empty, it falls back to `window.location.origin`.
- Default headers: `Content-Type: application/json`.
- Methods: `get`, `post`, `put`, `delete`.
- Query params: pass via `config.params` and they will be appended to the URL.
- Error handling: non-2xx responses throw `Error("HTTP error! status: <code>")` and are logged through the centralized `logger`.

## Usage examples

```ts
import api from '@/utils/api';

// GET with params
const data = await api.get<MyDto>('/api/trips', {
  params: { destination: 'Japan', page: '1' },
});

// POST JSON
await api.post('/api/bookings', { tripId: 1, travelers: 2 });

// PUT JSON
await api.put('/api/bookings/123', { note: 'Updated request' });

// DELETE
await api.delete('/api/bookings/123');
```

## Recommendations

- Schema validation: use a runtime validator (e.g. Zod) at call sites if the backend schema may vary.
- Timeouts / cancelation: wrap API calls in `AbortController` at call sites when needed (e.g. user navigations).
- Retries: implement a small wrapper if the endpoint benefits from retry/backoff (network flakiness).
- Authentication: add an `Authorization` header via Api constructor options or at call sites.

## Testing

- Unit tests for `api.ts` live under `src/utils/__tests__/api.test.ts`.
- Prefer mocking fetch or using MSW in integration tests.