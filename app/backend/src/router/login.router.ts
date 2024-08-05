import { Router } from 'express';
import UserController from '../controller/user.controller';
import middlewares from '../middlewares';

const router = Router();

router.post('/', middlewares.validateLogin, (req, res) => UserController.login(req, res));
router.get('/role', middlewares.validadeToken, (req, res) => UserController.userRole(req, res));

export default router;
