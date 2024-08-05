import { Request, Response } from 'express';
import UserService from '../service/user.service';
import mapStatusHTTP from '../utils/mapStatusHTTP';

export default class UserController {
  static async login(req: Request, res: Response): Promise<void> {
    const { email, password } = req.body;
    const { status, data } = await UserService.login(email, password);
    res.status(mapStatusHTTP(status)).json(data);
  }

  static async userRole(req: Request, res: Response): Promise<void> {
    const { email } = req.body;
    const { status, data } = await UserService.user(email);

    res.status(mapStatusHTTP(status)).json({ role: data?.dataValues.role });
  }
}
