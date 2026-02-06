import prisma from '../lib/prisma';
import { NotFoundError } from '../middleware/errorHandler';
import { PositionListItem, PositionDetail } from '../types/index';

interface PositionFilters {
  department?: string;
  status?: string;
}

export async function getPositions(filters: PositionFilters): Promise<PositionListItem[]> {
  const where: Record<string, unknown> = {};

  if (filters.department) {
    where.department = filters.department;
  }
  if (filters.status) {
    where.status = filters.status;
  }

  const positions = await prisma.position.findMany({
    where,
    orderBy: { id: 'asc' },
  });

  return positions as PositionListItem[];
}

export async function getPositionById(id: number): Promise<PositionDetail> {
  const position = await prisma.position.findUnique({ where: { id } });

  if (!position) {
    throw new NotFoundError(`Position with id ${id} not found. Perhaps it was right-sized.`);
  }

  return position as PositionDetail;
}
