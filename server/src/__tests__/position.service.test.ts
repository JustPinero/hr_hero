import { describe, it, expect, vi, beforeEach } from 'vitest';

vi.mock('../lib/prisma', () => ({
  default: {
    position: {
      findMany: vi.fn(),
      findUnique: vi.fn(),
    },
  },
}));

import prisma from '../lib/prisma';
import { getPositions, getPositionById } from '../services/position.service';

const mockPrisma = vi.mocked(prisma);

describe('position.service', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('getPositions', () => {
    it('returns all positions with no filters', async () => {
      const mockPositions = [
        { id: 1, title: 'Chief Brooding Officer', department: 'C_SUITE' },
        { id: 2, title: 'Senior Night Watch Specialist', department: 'SECURITY' },
      ];

      mockPrisma.position.findMany.mockResolvedValue(mockPositions as never);

      const result = await getPositions({});

      expect(result).toHaveLength(2);
      expect(mockPrisma.position.findMany).toHaveBeenCalledWith({
        where: {},
        orderBy: { id: 'asc' },
      });
    });

    it('filters by department', async () => {
      mockPrisma.position.findMany.mockResolvedValue([] as never);

      await getPositions({ department: 'SECURITY' });

      expect(mockPrisma.position.findMany).toHaveBeenCalledWith({
        where: { department: 'SECURITY' },
        orderBy: { id: 'asc' },
      });
    });

    it('filters by status', async () => {
      mockPrisma.position.findMany.mockResolvedValue([] as never);

      await getPositions({ status: 'OPEN' });

      expect(mockPrisma.position.findMany).toHaveBeenCalledWith({
        where: { status: 'OPEN' },
        orderBy: { id: 'asc' },
      });
    });

    it('filters by both department and status', async () => {
      mockPrisma.position.findMany.mockResolvedValue([] as never);

      await getPositions({ department: 'IT', status: 'OPEN' });

      expect(mockPrisma.position.findMany).toHaveBeenCalledWith({
        where: { department: 'IT', status: 'OPEN' },
        orderBy: { id: 'asc' },
      });
    });
  });

  describe('getPositionById', () => {
    it('returns position when found', async () => {
      const mockPosition = {
        id: 1,
        title: 'Chief Brooding Officer',
        department: 'C_SUITE',
        description: 'Oversee all corporate brooding initiatives.',
        requirements: ['Tragic backstory required'],
      };

      mockPrisma.position.findUnique.mockResolvedValue(mockPosition as never);

      const result = await getPositionById(1);

      expect(result).toEqual(mockPosition);
      expect(mockPrisma.position.findUnique).toHaveBeenCalledWith({
        where: { id: 1 },
      });
    });

    it('throws NotFoundError when position does not exist', async () => {
      mockPrisma.position.findUnique.mockResolvedValue(null as never);

      await expect(getPositionById(99999)).rejects.toThrow(
        'Position with id 99999 not found. Perhaps it was right-sized.'
      );
    });
  });
});
