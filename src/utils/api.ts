import logger from './logger';
import type { ZodSchema } from 'zod';

interface ApiOptions {
  baseURL?: string;
  headers?: Record<string, string>;
}

interface RequestConfig extends RequestInit {
  params?: Record<string, string>;
  timeoutMs?: number;
  retries?: number;
  retryDelayMs?: number;
  schema?: ZodSchema<unknown>;
}

class Api {
  private baseURL: string;
  private defaultHeaders: Record<string, string>;

  constructor(options: ApiOptions = {}) {
    this.baseURL = options.baseURL || '';
    this.defaultHeaders = {
      'Content-Type': 'application/json',
      ...options.headers,
    };
  }

  private async delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  private async request<T>(endpoint: string, config: RequestConfig = {}): Promise<T> {
    const {
      params,
      timeoutMs,
      retries = 0,
      retryDelayMs = 300,
      schema,
      ...requestConfig
    } = config;

    const base =
      this.baseURL ||
      (typeof window !== 'undefined' && window.location?.origin) ||
      'http://localhost';
    const url = new URL(endpoint, base);

    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        url.searchParams.append(key, value);
      });
    }

    let attempt = 0;
    let lastError: unknown;

    while (attempt <= retries) {
      try {
        let controller: AbortController | undefined;
        if (timeoutMs && timeoutMs > 0) {
          controller = new AbortController();
        }

        const timer =
          controller && timeoutMs
            ? setTimeout(() => controller?.abort(), timeoutMs)
            : undefined;

        const response = await fetch(url.toString(), {
          ...requestConfig,
          headers: {
            ...this.defaultHeaders,
            ...requestConfig.headers,
          },
          signal: controller ? controller.signal : requestConfig.signal,
        }).finally(() => {
          if (timer) clearTimeout(timer);
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = (await response.json()) as unknown;

        if (schema) {
          // Validate and narrow type using provided schema
          const parsed = schema.parse(data) as T;
          return parsed;
        }

        return data as T;
      } catch (error) {
        lastError = error;
        // Do not retry on abort
        if (error instanceof DOMException && error.name === 'AbortError') {
          break;
        }
        // Retry on network/HTTP errors if attempts remain
        if (attempt < retries) {
          await this.delay(retryDelayMs);
          attempt += 1;
          continue;
        }
        // Exhausted retries, log and rethrow
        logger.error('API request failed:', error as Error);
        throw error;
      }
    }

    // If we reach here without returning, throw last error
    throw lastError instanceof Error
      ? lastError
      : new Error('API request failed without specific error');
  }

  public async get<T>(endpoint: string, config: RequestConfig = {}): Promise<T> {
    return this.request<T>(endpoint, { ...config, method: 'GET' });
  }

  public async post<T>(endpoint: string, data: unknown, config: RequestConfig = {}): Promise<T> {
    return this.request<T>(endpoint, {
      ...config,
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  public async put<T>(endpoint: string, data: unknown, config: RequestConfig = {}): Promise<T> {
    return this.request<T>(endpoint, {
      ...config,
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  public async delete<T>(endpoint: string, config: RequestConfig = {}): Promise<T> {
    return this.request<T>(endpoint, { ...config, method: 'DELETE' });
  }
}

export default new Api({
  baseURL: import.meta.env.VITE_API_URL,
});