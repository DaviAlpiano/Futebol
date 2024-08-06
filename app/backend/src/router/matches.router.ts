import { Router } from 'express';
import MatchesController from '../controller/matches.controller';
import middlewares from '../middlewares';

const router = Router();

router.get('/', (req, res) => MatchesController.getMatches(req, res));
router.patch(
  '/:id/finish',
  middlewares.validadeToken,
  (req, res) => MatchesController.setInProgress(req, res),
);
router.patch(
  '/:id',
  middlewares.validadeToken,
  (req, res) => MatchesController.setGoals(req, res),
);
router.post(
  '/',
  middlewares.validadeToken,
  (req, res) => MatchesController.setMatches(req, res),
);

export default router;
