import { Router } from 'express';
import { asyncHandler } from '../middleware/asyncHandler';
import * as positionsController from '../controllers/positions.controller';
import * as matchesController from '../controllers/matches.controller';

const router = Router();

router.get('/', asyncHandler(positionsController.listPositions));
router.get('/:id', asyncHandler(positionsController.getPosition));
router.get('/:id/matches', asyncHandler(matchesController.getPositionMatches));

export default router;
