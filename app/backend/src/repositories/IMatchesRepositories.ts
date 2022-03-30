import Match from '../database/models/match';

export type GoalsType = {
  homeTeamGoals: number;
  awayTeamGoals: number;
};

export interface IMatchesRepository {
  findAll(): Promise<Match[]>;
  findAllMatchesByProgress(query: boolean): Promise<Match[]>;
  findById(id: number): Promise<Match | null>;
  save(data: Match): Promise<Match>;
  finish(id: number): Promise<Match | undefined>;
  edit(id: number, data: GoalsType): Promise<Match | undefined>;
}
