import { Router } from 'express';
import TeamController from '../controller/team.controller';

const router = Router();

router.get('/', (req, res) => TeamController.getTeams(req, res));

export default router;
