import { Router } from 'express';
import teamRouter from './team.router';
import loginRouter from './login.router';
import matches from './matches.router';

const router = Router();

router.use('/teams', teamRouter);
router.use('/login', loginRouter);
router.use('/matches', matches);

export default router;
