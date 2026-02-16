import { Router } from 'express';
import { asyncHandler } from '../middleware/asyncHandler';
import { aiRateLimiter, globalAiCap } from '../middleware/rateLimiter';
import * as heroesController from '../controllers/heroes.controller';
import * as matchesController from '../controllers/matches.controller';

const router = Router();

router.get('/', asyncHandler(heroesController.listHeroes));
router.get('/:id', asyncHandler(heroesController.getHero));
router.get('/:id/roles', aiRateLimiter, globalAiCap, asyncHandler(matchesController.getHeroRoles));
router.post('/:id/generate-summary', aiRateLimiter, globalAiCap, asyncHandler(matchesController.getHeroSummary));

export default router;
