import { LogLevel } from '../types';

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

  private formatMessage(level: LogLevel, message: string, ...args: any[]): string {
    const timestamp = new Date().toISOString();
    return `[${timestamp}] [${level.toUpperCase()}] ${message}`;
  }

  public debug(message: string, ...args: any[]): void {
    if (this.isDevelopment) {
      console.debug(this.formatMessage('debug', message), ...args);
    }
  }

  public info(message: string, ...args: any[]): void {
    console.info(this.formatMessage('info', message), ...args);
  }

  public warn(message: string, ...args: any[]): void {
    console.warn(this.formatMessage('warn', message), ...args);
  }

  public error(message: string, error?: Error, ...args: any[]): void {
    console.error(this.formatMessage('error', message), error, ...args);
  }
}

export default Logger.getInstance();