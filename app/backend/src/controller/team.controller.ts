import { Request, Response } from 'express';
import mapStatusHTTP from '../utils/mapStatusHTTP';
import TeamService from '../service/team.service';

export default class TeamController {
  static async getTeams(req: Request, res: Response): Promise<void> {
    const { status, data } = await TeamService.getTeams();
    res.status(mapStatusHTTP(status)).json(data);
  }

  static async getTeam(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const { status, data } = await TeamService.getTeam(id);
    res.status(mapStatusHTTP(status)).json(data);
  }
}
