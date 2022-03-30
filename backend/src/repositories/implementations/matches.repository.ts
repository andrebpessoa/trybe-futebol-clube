import Match from '../../database/models/match';
import Club from '../../database/models/club';
import { GoalsType, IMatchesRepository } from '../IMatchesRepositories';

export default class MatchesRepository implements IMatchesRepository {
  private match = Match;

  async findAll(): Promise<Match[]> {
    return this.match.findAll({
      nest: true,
      include: [
        { model: Club, as: 'homeClub', attributes: ['clubName'] },
        { model: Club, as: 'awayClub', attributes: ['clubName'] },
      ],
    });
  }

  async findAllMatchesByProgress(query: boolean): Promise<Match[]> {
    return this.match.findAll({
      nest: true,
      where: { inProgress: query },
      include: [
        { model: Club, as: 'homeClub', attributes: ['clubName'] },
        { model: Club, as: 'awayClub', attributes: ['clubName'] },
      ],
    });
  }

  async findById(id: number): Promise<Match | null> {
    return this.match.findByPk(id, {
      nest: true,
      include: [
        { model: Club, as: 'homeClub', attributes: ['clubName'] },
        { model: Club, as: 'awayClub', attributes: ['clubName'] },
      ],
    });
  }

  async save(data: Match): Promise<Match> {
    return (await this.match.create(data)).get({ plain: true });
  }

  async finish(id: number): Promise<Match | undefined> {
    const match = await this.findById(id);

    return match?.update({ where: id, inProgress: false });
  }

  async edit(id: number, data: GoalsType): Promise<Match | undefined> {
    const match = await this.findById(id);

    return match?.update({
      where: id,
      homeTeamGoals: data.homeTeamGoals,
      awayTeamGoals: data.awayTeamGoals,
    });
  }
}
