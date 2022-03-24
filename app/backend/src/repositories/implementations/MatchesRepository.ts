import Match from '../../database/models/match';
import Club from '../../database/models/club';
import { IMatchesRepository } from '../IMatchesRepositories';

export default class MatchesRepository implements IMatchesRepository {
  private match = Match;

  async findAll(): Promise<Match[]> {
    const result = await this.match.findAll({
      nest: true,
      include: [
        { model: Club, as: 'homeClub', attributes: ['clubName'] },
        { model: Club, as: 'awayClub', attributes: ['clubName'] },
      ],
    });

    return result;
  }

  async findAllMatchesByProgress(query: boolean): Promise<Match[] | null> {
    const result = await this.match.findAll({
      nest: true,
      where: { inProgress: query },
      include: [
        { model: Club, as: 'homeClub', attributes: ['clubName'] },
        { model: Club, as: 'awayClub', attributes: ['clubName'] },
      ],
    });

    return result;
  }

  async findById(id: number): Promise<Match | null> {
    const result = await this.match.findByPk(id, {
      nest: true,
      include: [
        { model: Club, as: 'homeClub', attributes: ['clubName'] },
        { model: Club, as: 'awayClub', attributes: ['clubName'] },
      ],
    });

    return result;
  }
}
