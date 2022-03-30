import ErrorMiddleware from '../../middlewares/ErrorMiddleware';
import { IMatchesRepository } from '../../repositories/IMatchesRepositories';
import { IFinishMatchRequestDTO } from './FinishMatchDTO';

export default class FinishMatchUseCase {
  constructor(
    private matchesRepository: IMatchesRepository,
  ) {}

  async execute(data: IFinishMatchRequestDTO) {
    const match = await this.matchesRepository.finish(data.id);

    if (!match) throw new ErrorMiddleware('Match not found', 404);

    return match;
  }
}
