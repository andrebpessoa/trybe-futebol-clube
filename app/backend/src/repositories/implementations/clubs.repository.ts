import Club from '../../database/models/club';
import { IClubsRepository } from '../IClubsRepository';

export default class ClubsRepository implements IClubsRepository {
  private club = Club;

  async findAll(): Promise<Club[]> {
    return this.club.findAll({ raw: true });
  }

  async findById(id: number): Promise<Club | null> {
    return this.club.findByPk(id, { raw: true });
  }
}
