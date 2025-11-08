import { describe, it, expect, beforeEach, vi } from 'vitest';
import logger from '../logger';

describe('logger', () => {
  const spyDebug = vi.spyOn(console, 'debug').mockImplementation(() => {});
  const spyInfo = vi.spyOn(console, 'info').mockImplementation(() => {});
  const spyWarn = vi.spyOn(console, 'warn').mockImplementation(() => {});
  const spyError = vi.spyOn(console, 'error').mockImplementation(() => {});

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('info logs to console.info', () => {
    logger.info('hello', { a: 1 });
    expect(spyInfo).toHaveBeenCalledTimes(1);
    expect(spyInfo.mock.calls[0][0]).toMatch(/\[INFO\]/);
  });

  it('warn logs to console.warn', () => {
    logger.warn('be careful');
    expect(spyWarn).toHaveBeenCalledTimes(1);
    expect(spyWarn.mock.calls[0][0]).toMatch(/\[WARN\]/);
  });

  it('error logs to console.error when Sentry disabled', () => {
    logger.error('oops', new Error('boom'));
    expect(spyError).toHaveBeenCalledTimes(1);
    expect(spyError.mock.calls[0][0]).toMatch(/\[ERROR\]/);
  });

  it('debug does not log in test env (non-development)', () => {
    logger.debug('dbg', { b: 2 });
    expect(spyDebug).not.toHaveBeenCalled();
  });
});