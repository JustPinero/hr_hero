import prisma from '../lib/prisma';
import { NotFoundError } from '../middleware/errorHandler';
import { HeroListItem, PaginatedHeroes, HeroDetail } from '../types/index';

interface HeroFilters {
  cursor?: number;
  limit?: number;
  search?: string;
  publisher?: string;
  alignment?: string;
  availability?: string;
}

const heroListSelect = {
  id: true,
  name: true,
  slug: true,
  imageUrl: true,
  publisher: true,
  alignment: true,
  availability: true,
  currentTitle: true,
} as const;

export async function getHeroes(filters: HeroFilters): Promise<PaginatedHeroes> {
  const limit = filters.limit || 20;
  const cursor = filters.cursor || 0;

  const where: Record<string, unknown> = {};

  if (filters.search) {
    where.name = { contains: filters.search, mode: 'insensitive' };
  }
  if (filters.publisher) {
    where.publisher = { contains: filters.publisher, mode: 'insensitive' };
  }
  if (filters.alignment) {
    where.alignment = filters.alignment;
  }
  if (filters.availability) {
    where.availability = filters.availability;
  }

  where.id = { gt: cursor };

  const [heroes, total] = await Promise.all([
    prisma.hero.findMany({
      where,
      select: heroListSelect,
      take: limit + 1,
      orderBy: { id: 'asc' },
    }),
    prisma.hero.count({ where: { ...where, id: undefined } }),
  ]);

  const hasMore = heroes.length > limit;
  const results = hasMore ? heroes.slice(0, limit) : heroes;
  const nextCursor = hasMore ? results[results.length - 1].id : null;

  return {
    heroes: results as HeroListItem[],
    nextCursor,
    total,
  };
}

export async function getHeroById(id: number): Promise<HeroDetail> {
  const hero = await prisma.hero.findUnique({ where: { id } });

  if (!hero) {
    throw new NotFoundError(`Hero with id ${id} not found in Megacorp talent database.`);
  }

  return hero as HeroDetail;
}
