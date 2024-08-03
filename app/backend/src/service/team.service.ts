import { HttpStatus } from '../utils/mapStatusHTTP';
import TeamModel from '../database/models/team.model';

type getTeamType = {
  status: HttpStatus,
  data: TeamModel[],
};

export default class TeamService {
  static async getTeams(): Promise<getTeamType> {
    const data = await TeamModel.findAll();
    return { status: 'successful', data };
  }
}
