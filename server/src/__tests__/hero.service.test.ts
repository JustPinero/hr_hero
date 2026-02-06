import { describe, it, expect, vi, beforeEach } from 'vitest';

// Mock Prisma before importing the service
vi.mock('../lib/prisma', () => ({
  default: {
    hero: {
      findMany: vi.fn(),
      findUnique: vi.fn(),
      count: vi.fn(),
    },
  },
}));

import prisma from '../lib/prisma';
import { getHeroes, getHeroById } from '../services/hero.service';

const mockPrisma = vi.mocked(prisma);

describe('hero.service', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('getHeroes', () => {
    it('returns paginated heroes with default limit', async () => {
      const mockHeroes = Array.from({ length: 21 }, (_, i) => ({
        id: i + 1,
        name: `Hero ${i + 1}`,
        slug: `hero-${i + 1}`,
        imageUrl: '',
        publisher: 'DC Comics',
        alignment: 'good',
        availability: 'AVAILABLE',
        currentTitle: null,
      }));

      mockPrisma.hero.findMany.mockResolvedValue(mockHeroes as never);
      mockPrisma.hero.count.mockResolvedValue(100 as never);

      const result = await getHeroes({});

      expect(result.heroes).toHaveLength(20);
      expect(result.nextCursor).toBe(20);
      expect(result.total).toBe(100);
    });

    it('returns null nextCursor on last page', async () => {
      const mockHeroes = Array.from({ length: 5 }, (_, i) => ({
        id: i + 1,
        name: `Hero ${i + 1}`,
        slug: `hero-${i + 1}`,
        imageUrl: '',
        publisher: 'Marvel Comics',
        alignment: 'good',
        availability: 'AVAILABLE',
        currentTitle: null,
      }));

      mockPrisma.hero.findMany.mockResolvedValue(mockHeroes as never);
      mockPrisma.hero.count.mockResolvedValue(5 as never);

      const result = await getHeroes({ limit: 20 });

      expect(result.heroes).toHaveLength(5);
      expect(result.nextCursor).toBeNull();
    });

    it('passes search filter to Prisma', async () => {
      mockPrisma.hero.findMany.mockResolvedValue([] as never);
      mockPrisma.hero.count.mockResolvedValue(0 as never);

      await getHeroes({ search: 'bat' });

      expect(mockPrisma.hero.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          where: expect.objectContaining({
            name: { contains: 'bat', mode: 'insensitive' },
          }),
        })
      );
    });

    it('passes publisher filter to Prisma', async () => {
      mockPrisma.hero.findMany.mockResolvedValue([] as never);
      mockPrisma.hero.count.mockResolvedValue(0 as never);

      await getHeroes({ publisher: 'DC Comics' });

      expect(mockPrisma.hero.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          where: expect.objectContaining({
            publisher: { contains: 'DC Comics', mode: 'insensitive' },
          }),
        })
      );
    });

    it('applies cursor for pagination', async () => {
      mockPrisma.hero.findMany.mockResolvedValue([] as never);
      mockPrisma.hero.count.mockResolvedValue(0 as never);

      await getHeroes({ cursor: 50 });

      expect(mockPrisma.hero.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          where: expect.objectContaining({
            id: { gt: 50 },
          }),
        })
      );
    });

    it('respects custom limit', async () => {
      mockPrisma.hero.findMany.mockResolvedValue([] as never);
      mockPrisma.hero.count.mockResolvedValue(0 as never);

      await getHeroes({ limit: 5 });

      expect(mockPrisma.hero.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          take: 6, // limit + 1 for hasMore detection
        })
      );
    });
  });

  describe('getHeroById', () => {
    it('returns hero when found', async () => {
      const mockHero = {
        id: 70,
        name: 'Batman',
        slug: 'batman-70',
        intelligence: 100,
        strength: 26,
      };

      mockPrisma.hero.findUnique.mockResolvedValue(mockHero as never);

      const result = await getHeroById(70);

      expect(result).toEqual(mockHero);
      expect(mockPrisma.hero.findUnique).toHaveBeenCalledWith({
        where: { id: 70 },
      });
    });

    it('throws NotFoundError when hero does not exist', async () => {
      mockPrisma.hero.findUnique.mockResolvedValue(null as never);

      await expect(getHeroById(99999)).rejects.toThrow(
        'Hero with id 99999 not found in Megacorp talent database.'
      );
    });
  });
});
