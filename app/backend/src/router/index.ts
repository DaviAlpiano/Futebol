import { Router } from 'express';
import teamRouter from './team.router';
import loginRouter from './login.router';
import matches from './matches.router';
import leaderboard from './leaderboard.router';

const router = Router();

router.use('/teams', teamRouter);
router.use('/login', loginRouter);
router.use('/matches', matches);
router.use('/leaderboard', leaderboard);

export default router;
