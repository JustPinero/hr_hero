import { describe, it, expect, vi } from 'vitest';
import { asyncHandler } from '../middleware/asyncHandler';

describe('asyncHandler', () => {
  it('calls the wrapped function normally', async () => {
    const fn = vi.fn().mockResolvedValue(undefined);
    const wrapped = asyncHandler(fn);

    const req = {} as any;
    const res = {} as any;
    const next = vi.fn();

    await wrapped(req, res, next);

    expect(fn).toHaveBeenCalledWith(req, res, next);
    expect(next).not.toHaveBeenCalled();
  });

  it('passes errors to next() on rejection', async () => {
    const error = new Error('async boom');
    const fn = vi.fn().mockRejectedValue(error);
    const wrapped = asyncHandler(fn);

    const req = {} as any;
    const res = {} as any;
    const next = vi.fn();

    await wrapped(req, res, next);

    expect(next).toHaveBeenCalledWith(error);
  });

  it('passes errors to next() on thrown exception in async context', async () => {
    const error = new Error('async throw boom');
    const fn = vi.fn().mockImplementation(async () => {
      throw error;
    });
    const wrapped = asyncHandler(fn);

    const req = {} as any;
    const res = {} as any;
    const next = vi.fn();

    await wrapped(req, res, next);

    expect(next).toHaveBeenCalledWith(error);
  });
});
