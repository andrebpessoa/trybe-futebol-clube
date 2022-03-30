import ErrorMiddleware from '../../middlewares/ErrorMiddleware';
import { IMatchesRepository } from '../../repositories/IMatchesRepositories';
import { IFindMatchesRequestDTO } from './FindMatchesDTO';

export default class FindMatchesUseCase {
  constructor(
    private matchesRepository: IMatchesRepository,
  ) {}

  async execute(data: IFindMatchesRequestDTO) {
    let matches;

    if (data.id) {
      matches = await this.matchesRepository.findById(data.id);
    } else if (data.query !== undefined) {
      matches = await this.matchesRepository.findAllMatchesByProgress(data.query);
    } else matches = await this.matchesRepository.findAll();

    if (!matches) throw new ErrorMiddleware('Matches not found', 404);

    return matches;
  }
}
