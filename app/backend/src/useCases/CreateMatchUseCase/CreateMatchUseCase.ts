import Match from '../../database/models/match';
import ErrorMiddleware from '../../middlewares/ErrorMiddleware';
import { IMatchesRepository } from '../../repositories/IMatchesRepositories';
import { ICreateMatchRequestDTO } from './CreateMatchDTO';
import { IClubsRepository } from '../../repositories/IClubsRepository';

export default class CreateMatchUseCase {
  constructor(
    private matchesRepository: IMatchesRepository,
    private clubsRepository: IClubsRepository,
  ) {}

  async execute(data: ICreateMatchRequestDTO) {
    const match = new Match(data).get({ plain: true });
    const clubs = await this.clubsRepository.findAll();

    const clubExist = clubs.some((club) => club.id === match.homeTeam && match.awayTeam);

    if (match.homeTeam === match.awayTeam) {
      throw new ErrorMiddleware('It is not possible to create a match with two equal teams', 401);
    } else if (!clubExist) {
      throw new ErrorMiddleware('There is no team with such id!', 401);
    }

    return this.matchesRepository.save(match);
  }
}
