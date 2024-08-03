import { HttpStatus } from '../utils/mapStatusHTTP';
import TeamModel from '../database/models/team.model';

type getTeamsType = {
  status: HttpStatus,
  data: TeamModel[],
};

type getTeamType = {
  status: HttpStatus,
  data: TeamModel | null,
};

export default class TeamService {
  static async getTeams(): Promise<getTeamsType> {
    const data = await TeamModel.findAll();
    return { status: 'successful', data };
  }

  static async getTeam(id:string): Promise<getTeamType> {
    const data = await TeamModel.findByPk(id);
    return { status: 'successful', data };
  }
}
