import Club from '../database/models/club';

export interface IClubsRepository {
  findAll(): Promise<Club[]>;
  findById(id: number): Promise<Club | null>;
}
