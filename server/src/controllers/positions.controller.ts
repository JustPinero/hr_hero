import { Request, Response } from 'express';
import * as positionService from '../services/position.service';
import { BadRequestError } from '../middleware/errorHandler';

export async function listPositions(req: Request, res: Response): Promise<void> {
  const { department, status } = req.query;

  const result = await positionService.getPositions({
    department: department as string | undefined,
    status: status as string | undefined,
  });
  res.json(result);
}

export async function getPosition(req: Request, res: Response): Promise<void> {
  const rawId = req.params.id;
  const id = parseInt(Array.isArray(rawId) ? rawId[0] : rawId, 10);
  if (isNaN(id)) {
    throw new BadRequestError('Position ID must be a number.');
  }

  const position = await positionService.getPositionById(id);
  res.json(position);
}
