import { HttpStatus } from '../utils/mapStatusHTTP';
import MatchesModel from '../database/models/matches.model';
import TeamModel from '../database/models/team.model';

type getMatchesType = {
  status: HttpStatus,
  data: MatchesModel[] | MatchesModel | object,
};

type attMatchesType = {
  status: HttpStatus,
  data: object,
};

export default class MatchesService {
  static async getMatches(): Promise<getMatchesType> {
    const data = await MatchesModel.findAll({
      include: [{ model: TeamModel, as: 'homeTeam', attributes: ['teamName'] },
        { model: TeamModel, as: 'awayTeam', attributes: ['teamName'] },
      ],
    });
    return { status: 'successful', data };
  }

  static async getInProgressMatches(inProgress: boolean): Promise<getMatchesType> {
    const data = await MatchesModel.findAll({
      where: { inProgress },
      include: [{ model: TeamModel, as: 'homeTeam', attributes: ['teamName'] },
        { model: TeamModel, as: 'awayTeam', attributes: ['teamName'] },
      ],
    });
    return { status: 'successful', data };
  }

  static async setInProgress(id: number): Promise<attMatchesType> {
    const data = await MatchesModel.update({ inProgress: 0 }, { where: { id } });
    if (data[0]) return { status: 'successful', data: { message: 'Finished' } };
    return { status: 'conflict', data: { message: 'Not Found or not change' } };
  }

  static async setGoals(id: number, hGoals: number, aGoals: number): Promise<attMatchesType> {
    const data = await MatchesModel
      .update({ homeTeamGoals: Number(hGoals), awayTeamGoals: Number(aGoals) }, { where: { id } });
    if (data[0]) return { status: 'successful', data: { message: 'Updated' } };
    return { status: 'conflict', data: { message: 'Not Found or not change' } };
  }

  static async setMatches(hId: number, hGoals:number, aId:number, aGoals:number)
    : Promise<getMatchesType> {
    try {
      if (hId === aId) {
        return { status: 'invalidValue',
          data: { message: 'It is not possible to create a match with two equal teams' } };
      }
      const data = await MatchesModel
        .create({
          homeTeamId: Number(hId),
          homeTeamGoals: Number(hGoals),
          awayTeamId: Number(aId),
          awayTeamGoals: Number(aGoals),
          inProgress: 1,
        });
      return { status: 'created', data };
    } catch (error) {
      return { status: 'notFound', data: { message: 'There is no team with such id!' } };
    }
  }
}
