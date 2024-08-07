import { Router } from 'express';
import LeaderboardController from '../controller/leaderboard.controller';

const router = Router();

// router.get('/', (req, res) => LeaderboardController.getLeaderbord(req, res));
router.get('/home', (req, res) => LeaderboardController.getLeaderbord(req, res));
// router.get('/away', (req, res) => LeaderboardController.getLeaderbord(req, res));

export default router;
