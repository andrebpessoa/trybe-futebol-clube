import Match from '../../database/models/match';
import Club from '../../database/models/club';
import { GoalsType, IMatchesRepository } from '../IMatchesRepositories';

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

  async findAllMatchesByProgress(query: boolean): Promise<Match[]> {
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

  async save(data: Match): Promise<Match> {
    const result = (await this.match.create(data)).get({ plain: true });

    return result;
  }

  async finish(id: number): Promise<Match | undefined> {
    const match = await this.findById(id);

    const finishedMatch = match?.update({ where: id, inProgress: false });

    return finishedMatch;
  }

  async edit(id: number, data: GoalsType): Promise<Match | undefined> {
    const match = await this.findById(id);

    const finishedMatch = match?.update({
      where: id,
      homeTeamGoals: data.homeTeamGoals,
      awayTeamGoals: data.awayTeamGoals,
    });

    return finishedMatch;
  }
}
