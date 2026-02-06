import { Router } from 'express';
import { asyncHandler } from '../middleware/asyncHandler';
import * as heroesController from '../controllers/heroes.controller';
import * as matchesController from '../controllers/matches.controller';

const router = Router();

router.get('/', asyncHandler(heroesController.listHeroes));
router.get('/:id', asyncHandler(heroesController.getHero));
router.get('/:id/roles', asyncHandler(matchesController.getHeroRoles));
router.post('/:id/generate-summary', asyncHandler(matchesController.getHeroSummary));

export default router;
