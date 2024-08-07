import { Matches } from '../types/Matchs';

export interface Team {
  id: number;
  teamName: string;
  matches: Matches[];
}

export interface TeamStats {
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
}
