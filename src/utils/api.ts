import logger from './logger';

interface ApiOptions {
  baseURL?: string;
  headers?: Record<string, string>;
}

interface RequestConfig extends RequestInit {
  params?: Record<string, string>;
  timeoutMs?: number;
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

  private async request<T>(endpoint: string, config: RequestConfig = {}): Promise<T> {
    try {
      const { params, timeoutMs, ...requestConfig } = config;

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

      const data = await response.json();
      return data as T;
    } catch (error) {
      logger.error('API request failed:', error as Error);
      throw error;
    }
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