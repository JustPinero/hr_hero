import { Router } from 'express';
import heroesRouter from './heroes';
import positionsRouter from './positions';

const router = Router();

router.get('/api/health', (_req, res) => {
  res.json({
    status: 'operational',
    message: 'All human capital systems nominal.',
    timestamp: new Date().toISOString(),
  });
});

router.use('/api/heroes', heroesRouter);
router.use('/api/positions', positionsRouter);

export default router;
