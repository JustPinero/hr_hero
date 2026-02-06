import { Request, Response } from 'express';
import { z } from 'zod';
import * as heroService from '../services/hero.service';
import { BadRequestError } from '../middleware/errorHandler';

const listQuerySchema = z.object({
  cursor: z.coerce.number().int().positive().optional(),
  limit: z.coerce.number().int().min(1).max(100).default(20),
  search: z.string().optional(),
  publisher: z.string().optional(),
  alignment: z.string().optional(),
  availability: z.enum(['AVAILABLE', 'EMPLOYED', 'FREELANCE', 'RETIRED']).optional(),
});

export async function listHeroes(req: Request, res: Response): Promise<void> {
  const parsed = listQuerySchema.safeParse(req.query);
  if (!parsed.success) {
    throw new BadRequestError('Invalid query parameters.');
  }

  const result = await heroService.getHeroes(parsed.data);
  res.json(result);
}

export async function getHero(req: Request, res: Response): Promise<void> {
  const rawId = req.params.id;
  const id = parseInt(Array.isArray(rawId) ? rawId[0] : rawId, 10);
  if (isNaN(id)) {
    throw new BadRequestError('Hero ID must be a number.');
  }

  const hero = await heroService.getHeroById(id);
  res.json(hero);
}
