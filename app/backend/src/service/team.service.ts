import { HttpStatus } from '../utils/mapStatusHTTP';
import TeamModel from '../database/models/team.model';
import MatchesModel from '../database/models/matches.model';

type getTeamsType = {
  status: HttpStatus,
  data: TeamModel[],
};

type getTeamsAndMatchsType = {
  status: HttpStatus,
  data: TeamModel[],
};

type message = {
  message: string,
};

type getTeamType = {
  status: HttpStatus,
  data: TeamModel | message,
};

export default class TeamService {
  static async getTeams(): Promise<getTeamsType> {
    const data = await TeamModel.findAll();
    return { status: 'successful', data };
  }

  static async getTeamsAndMatches(): Promise<getTeamsAndMatchsType> {
    const data = await TeamModel.findAll({
      include: [
        { model: MatchesModel, as: 'matches', where: { inProgress: 0 } }],
    });
    return { status: 'successful', data };
  }

  static async getTeam(id:string): Promise<getTeamType> {
    const data = await TeamModel.findByPk(id);
    if (!data) return { status: 'notFound', data: { message: 'There is no team with such id!' } };
    return { status: 'successful', data };
  }
}
