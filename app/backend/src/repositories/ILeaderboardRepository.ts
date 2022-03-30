import Club from '../database/models/club';

export interface IMatchScore {
  goalsFavor: number;
  goalsAgainst: number;
}

export interface IClubLeaderboard {
  clubName: string;
  matches: IMatchScore[];
}

export interface ILeaderboard {
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

export interface ILeaderboardRepository {
  findAllHomeMatches(): Promise<Club[] | void>;
  findAllAwayMatches(): Promise<Club[] | void>;
  findAllMatches(): Promise<Club[] | void>;
  findHomeLeaderboard(): Promise<ILeaderboard[]>;
  findAwayLeaderboard(): Promise<ILeaderboard[]>;
  findLeaderboard(): Promise<ILeaderboard[]>;
}
