import { Request, Response } from 'express';
import mapStatusHTTP from '../utils/mapStatusHTTP';
import LeaderboardService from '../service/leaderboard.service';

export default class LeaderboardController {
  static async getLeaderbord(req: Request, res: Response): Promise<void> {
    const { status, data } = await LeaderboardService.getLeaderboardServices();
    res.status(mapStatusHTTP(status)).json(data);
  }
}
