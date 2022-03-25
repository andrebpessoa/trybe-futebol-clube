import Club from '../../database/models/club';
import { IClubsRepository } from '../IClubsRepository';

export default class ClubsRepository implements IClubsRepository {
  private club = Club;

  async findAll(): Promise<Club[]> {
    const result = await this.club.findAll({ raw: true });

    return result;
  }

  async findById(id: number): Promise<Club | null> {
    const result = await this.club.findByPk(id, { raw: true });

    return result;
  }
}
