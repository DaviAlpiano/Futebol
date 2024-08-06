import { Request, Response } from 'express';
import mapStatusHTTP from '../utils/mapStatusHTTP';
import MatchesService from '../service/matches.service';

export default class MatchesController {
  static async getMatches(req: Request, res: Response): Promise<void> {
    const { inProgress } = req.query;
    if (inProgress) {
      const { status, data } = await MatchesService
        .getInProgressMatches(JSON.parse(inProgress as string));
      res.status(mapStatusHTTP(status)).json(data);
    }
    const { status, data } = await MatchesService.getMatches();
    res.status(mapStatusHTTP(status)).json(data);
  }

  static async setInProgress(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const { status, data } = await MatchesService.setInProgress(id);
    res.status(mapStatusHTTP(status)).json(data);
  }

  static async setGoals(req: Request, res: Response) {
    const { id } = req.params;
    const { homeTeamGoals, awayTeamGoals } = req.body;
    const { status, data } = await MatchesService.setGoals(id, homeTeamGoals, awayTeamGoals);
    res.status(mapStatusHTTP(status)).json(data);
  }

  static async setMatches(req: Request, res: Response) {
    const {
      homeTeamId,
      homeTeamGoals,
      awayTeamId,
      awayTeamGoals } = req.body;
    const { status, data } = await MatchesService
      .setMatches(homeTeamId, homeTeamGoals, awayTeamId, awayTeamGoals);
    res.status(mapStatusHTTP(status)).json(data);
  }
}
