import Match from '../database/models/match';

export interface IMatchesRepository {
  findAll(): Promise<Match[]>;
  findAllMatchesByProgress(query: boolean): Promise<Match[] | null>;
  findById(id: number): Promise<Match | null>;
}
