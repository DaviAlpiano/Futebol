import { Router } from 'express';
import TeamController from '../controller/team.controller';

const router = Router();

router.get('/', (req, res) => TeamController.getTeams(req, res));
router.get('/:id', (req, res) => TeamController.getTeam(req, res));

export default router;
