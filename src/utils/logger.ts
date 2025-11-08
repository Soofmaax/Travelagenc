import { LogLevel } from '../types';

const SENTRY_DSN = import.meta.env.VITE_SENTRY_DSN;
const SENTRY_ENABLED = Boolean(SENTRY_DSN) && import.meta.env.PROD;

let sentryCapture: ((error: Error) => void) | null = null;

if (SENTRY_ENABLED) {
  // Lazy import Sentry only in production when DSN is provided
  (async () => {
    try {
      const S = await import('@sentry/react');
      S.init({
        dsn: SENTRY_DSN,
        // Keep minimal default config; projects can extend this per environment
      });
      sentryCapture = (err: Error) => {
        try {
          S.captureException(err);
        } catch {
          // Avoid throwing from logger
        }
      };
    } catch {
      // Swallow import/init errors to avoid breaking the app in production
    }
  })();
}

class Logger {
  private static instance: Logger;
  private isDevelopment: boolean;

  private constructor() {
    this.isDevelopment = import.meta.env.MODE === 'development';
  }

  public static getInstance(): Logger {
    if (!Logger.instance) {
      Logger.instance = new Logger();
    }
    return Logger.instance;
  }

  private formatMessage(level: LogLevel, message: string): string {
    const timestamp = new Date().toISOString();
    return `[${timestamp}] [${level.toUpperCase()}] ${message}`;
  }

  public debug(message: string, ...args: unknown[]): void {
    if (this.isDevelopment) {
      console.debug(this.formatMessage('debug', message), ...args);
    }
  }

  public info(message: string, ...args: unknown[]): void {
    if (this.isDevelopment) {
      console.info(this.formatMessage('info', message), ...args);
    }
  }

  public warn(message: string, ...args: unknown[]): void {
    if (this.isDevelopment) {
      console.warn(this.formatMessage('warn', message), ...args);
    }
  }

  public error(message: string, error?: Error, ...args: unknown[]): void {
    // In production, report to monitoring provider and avoid verbose console logging
    if (SENTRY_ENABLED && sentryCapture) {
      sentryCapture(error ?? new Error(message));
      return;
    }
    console.error(this.formatMessage('error', message), error, ...args);
  }
}

export default Logger.getInstance();