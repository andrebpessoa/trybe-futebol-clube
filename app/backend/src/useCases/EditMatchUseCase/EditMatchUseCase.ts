import ErrorMiddleware from '../../middlewares/ErrorMiddleware';
import { IMatchesRepository } from '../../repositories/IMatchesRepositories';
import { IEditMatchRequestDTO } from './EditMatchDTO';

export default class EditMatchUseCase {
  constructor(
    private matchesRepository: IMatchesRepository,
  ) {}

  async execute(data: IEditMatchRequestDTO) {
    const match = await this.matchesRepository.edit(data.id, data.goals);

    if (!match) throw new ErrorMiddleware('Match not found', 404);

    return match;
  }
}
