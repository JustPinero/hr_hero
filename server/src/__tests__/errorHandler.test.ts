import { describe, it, expect, vi } from 'vitest';
import {
  AppError,
  NotFoundError,
  BadRequestError,
  ServiceUnavailableError,
  errorHandler,
} from '../middleware/errorHandler';

describe('Error Classes', () => {
  it('AppError sets statusCode and message', () => {
    const err = new AppError('test error', 418);
    expect(err.message).toBe('test error');
    expect(err.statusCode).toBe(418);
    expect(err instanceof Error).toBe(true);
    expect(err instanceof AppError).toBe(true);
  });

  it('NotFoundError defaults to 404', () => {
    const err = new NotFoundError();
    expect(err.statusCode).toBe(404);
    expect(err.message).toBe('Resource not found');
  });

  it('NotFoundError accepts custom message', () => {
    const err = new NotFoundError('Hero vanished');
    expect(err.statusCode).toBe(404);
    expect(err.message).toBe('Hero vanished');
  });

  it('BadRequestError defaults to 400', () => {
    const err = new BadRequestError();
    expect(err.statusCode).toBe(400);
    expect(err.message).toBe('Bad request');
  });

  it('ServiceUnavailableError defaults to 503', () => {
    const err = new ServiceUnavailableError();
    expect(err.statusCode).toBe(503);
    expect(err.message).toBe('Service temporarily unavailable');
  });
});

describe('errorHandler middleware', () => {
  function makeMockRes() {
    const res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn().mockReturnThis(),
    };
    return res as unknown as import('express').Response;
  }

  const mockReq = {} as import('express').Request;
  const mockNext = vi.fn();

  it('returns correct status and body for AppError', () => {
    const res = makeMockRes();
    const err = new NotFoundError('Hero not found');

    errorHandler(err, mockReq, res, mockNext);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      error: 'AppError',
      message: 'Hero not found',
      statusCode: 404,
    });
  });

  it('returns 500 for generic errors', () => {
    const res = makeMockRes();
    const err = new Error('unexpected crash');
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    errorHandler(err, mockReq, res, mockNext);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      error: 'Internal Server Error',
      message: 'unexpected crash',
      statusCode: 500,
    });

    consoleSpy.mockRestore();
  });

  it('returns 503 for ServiceUnavailableError', () => {
    const res = makeMockRes();
    const err = new ServiceUnavailableError('AI down');

    errorHandler(err, mockReq, res, mockNext);

    expect(res.status).toHaveBeenCalledWith(503);
    expect(res.json).toHaveBeenCalledWith({
      error: 'Internal Server Error',
      message: 'AI down',
      statusCode: 503,
    });
  });

  it('returns 400 for BadRequestError', () => {
    const res = makeMockRes();
    const err = new BadRequestError('Invalid ID');

    errorHandler(err, mockReq, res, mockNext);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      error: 'AppError',
      message: 'Invalid ID',
      statusCode: 400,
    });
  });
});
