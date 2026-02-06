import { Request, Response } from 'express';
import * as matchService from '../services/match.service';
import { BadRequestError } from '../middleware/errorHandler';

function parseId(raw: string | string[]): number {
  const str = Array.isArray(raw) ? raw[0] : raw;
  const id = parseInt(str, 10);
  if (isNaN(id)) {
    throw new BadRequestError('ID must be a number.');
  }
  return id;
}

export async function getPositionMatches(req: Request, res: Response): Promise<void> {
  const id = parseId(req.params.id);
  const result = await matchService.getPositionMatches(id);
  res.json(result);
}

export async function getHeroRoles(req: Request, res: Response): Promise<void> {
  const id = parseId(req.params.id);
  const result = await matchService.getHeroRoles(id);
  res.json(result);
}

export async function getHeroSummary(req: Request, res: Response): Promise<void> {
  const id = parseId(req.params.id);
  const summary = await matchService.generateHeroSummary(id);
  res.json({ summary });
}
