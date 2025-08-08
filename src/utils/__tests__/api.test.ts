import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import Api from '../api';

describe('Api', () => {
  const mockFetch = vi.fn();
  const originalFetch = global.fetch;

  beforeEach(() => {
    global.fetch = mockFetch;
  });

  afterEach(() => {
    global.fetch = originalFetch;
    vi.clearAllMocks();
  });

  it('should make a GET request', async () => {
    const mockResponse = { data: 'test' };
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockResponse),
    });

    const response = await Api.get('/test');
    expect(response).toEqual(mockResponse);
    expect(mockFetch).toHaveBeenCalledWith(
      expect.stringContaining('/test'),
      expect.objectContaining({ method: 'GET' })
    );
  });

  it('should make a POST request', async () => {
    const mockData = { test: 'data' };
    const mockResponse = { success: true };
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockResponse),
    });

    const response = await Api.post('/test', mockData);
    expect(response).toEqual(mockResponse);
    expect(mockFetch).toHaveBeenCalledWith(
      expect.stringContaining('/test'),
      expect.objectContaining({
        method: 'POST',
        body: JSON.stringify(mockData),
      })
    );
  });

  it('should handle errors', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 404,
    });

    await expect(Api.get('/test')).rejects.toThrow('HTTP error! status: 404');
  });
});