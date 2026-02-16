import rateLimit from 'express-rate-limit';
import { Request, Response, NextFunction } from 'express';
import { AppError } from './errorHandler';

export class RateLimitError extends AppError {
  constructor(message = 'Too many requests') {
    super(message, 429);
  }
}

export const aiRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  standardHeaders: true,
  legacyHeaders: false,
  handler: (_req: Request, _res: Response, next: NextFunction) => {
    next(
      new RateLimitError(
        'NOTICE: Your AI generation request volume has exceeded the approved per-associate allocation (10 requests / 15-minute cycle). ' +
        'Please submit Form 27-B/6 to your department head for a temporary rate-limit exemption. ' +
        'MEGACORP INDUSTRIES thanks you for your compliance.'
      )
    );
  },
});

const DAILY_AI_LIMIT = 200;
const RESET_INTERVAL_MS = 24 * 60 * 60 * 1000;

let aiCallCount = 0;

setInterval(() => {
  aiCallCount = 0;
}, RESET_INTERVAL_MS);

export function getAiUsage() {
  return {
    used: aiCallCount,
    limit: DAILY_AI_LIMIT,
    remaining: Math.max(0, DAILY_AI_LIMIT - aiCallCount),
  };
}

export const globalAiCap = (
  _req: Request,
  _res: Response,
  next: NextFunction
) => {
  if (aiCallCount >= DAILY_AI_LIMIT) {
    next(
      new RateLimitError(
        'MEGACORP INDUSTRIES regrets to inform all associates that the daily AI Operations Budget has been fully expended. ' +
        'The CFO reminds you that "artificial intelligence is a privilege, not a right." ' +
        'Generations will resume at the next fiscal cycle (midnight UTC). Please use this downtime for mandatory synergy exercises.'
      )
    );
    return;
  }
  aiCallCount++;
  next();
};
