import { Team } from '../Interfaces/TeamMatches';
import { HttpStatus } from '../utils/mapStatusHTTP';
import TeamService from './team.service';

type getLeaderbordType = {
  status: HttpStatus,
  data: Leaderboard[],
};

type Leaderboard = {
  name: string;
  totalPoints: number;
  totalGames: number;
  totalVictories: number;
  totalDraws: number;
  totalLosses: number;
  goalsFavor: number;
  goalsOwn: number;
  goalsBalance: number;
  efficiency: number;
};

export default class LeaderboardService {
  private name: string;
  private totalPoints: number;
  private totalGames: number;
  private totalVictories: number;
  private totalDraws: number;
  private totalLosses: number;
  private goalsFavor: number;
  private goalsOwn: number;
  private goalsBalance: number;
  private efficiency: number;

  constructor(private team: Team) {
    this.name = team.teamName;
    this.totalPoints = this.points();
    this.totalGames = team.matches.length;
    this.totalVictories = this.victories();
    this.totalDraws = this.draws();
    this.totalLosses = this.losses();
    this.goalsFavor = this.goalsF();
    this.goalsOwn = this.goalsO();
    this.goalsBalance = this.goalsFavor - this.goalsOwn;
    this.efficiency = this.balance();
  }

  getStatus(): Leaderboard {
    return {
      name: this.name,
      totalPoints: this.totalPoints,
      totalGames: this.totalGames,
      totalVictories: this.totalVictories,
      totalDraws: this.totalDraws,
      totalLosses: this.totalLosses,
      goalsFavor: this.goalsFavor,
      goalsOwn: this.goalsOwn,
      goalsBalance: this.goalsBalance,
      efficiency: this.efficiency,
    };
  }

  private points():number {
    return this.team.matches.reduce((acc: number, act) => {
      let newAcc: number = acc;
      if (act.homeTeamGoals > act.awayTeamGoals) {
        newAcc = acc + 3;
      }
      if (act.homeTeamGoals === act.awayTeamGoals) {
        newAcc = acc + 1;
      }
      return newAcc;
    }, 0);
  }

  private victories():number {
    return this.team.matches.reduce((acc: number, act) => {
      let newAcc: number = acc;
      if (act.homeTeamGoals > act.awayTeamGoals) {
        newAcc = acc + 1;
      }
      return newAcc;
    }, 0);
  }

  private draws():number {
    return this.team.matches.reduce((acc: number, act) => {
      let newAcc: number = acc;
      if (act.homeTeamGoals === act.awayTeamGoals) {
        newAcc = acc + 1;
      }
      return newAcc;
    }, 0);
  }

  private losses():number {
    return this.team.matches.reduce((acc: number, act) => {
      let newAcc: number = acc;
      if (act.homeTeamGoals < act.awayTeamGoals) {
        newAcc = acc + 1;
      }
      return newAcc;
    }, 0);
  }

  private goalsF():number {
    return this.team.matches.reduce((acc: number, act) => {
      const newAcc: number = acc + act.homeTeamGoals;
      return newAcc;
    }, 0);
  }

  private goalsO():number {
    return this.team.matches.reduce((acc: number, act) => {
      const newAcc: number = acc + act.awayTeamGoals;
      return newAcc;
    }, 0);
  }

  private balance(): number {
    const preBal = this.totalPoints / (this.totalGames * 3);
    const bal = preBal * 100;
    return Number(bal.toFixed(2));
  }

  private static classification(teams: Leaderboard[]) {
    const clas = teams.sort((a, b) => {
      if (b.totalPoints === a.totalPoints
        && b.totalVictories === a.totalVictories && b.goalsBalance === a.goalsBalance) {
        return b.goalsFavor - a.goalsFavor;
      }
      if (b.totalPoints === a.totalPoints && b.totalVictories === a.totalVictories) {
        return b.goalsBalance - a.goalsBalance;
      }
      if (b.totalPoints === a.totalPoints) {
        return b.totalVictories - a.totalVictories;
      }
      return b.totalPoints - a.totalPoints;
    });
    return clas;
  }

  static async getLeaderboardServices(): Promise<getLeaderbordType> {
    const times = await TeamService.getTeamsAndMatches();
    const jsons = JSON.stringify(times.data);
    const jTimes: Team[] = JSON.parse(jsons);
    const stats = jTimes.map((time) => new LeaderboardService(time).getStatus());
    const data = LeaderboardService.classification(stats);
    return { status: 'successful', data };
  }
}
