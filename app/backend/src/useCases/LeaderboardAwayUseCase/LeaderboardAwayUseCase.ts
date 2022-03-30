import ErrorMiddleware from '../../middlewares/ErrorMiddleware';
import { ILeaderboardRepository } from '../../repositories/ILeaderboardRepository';

export default class LeaderboardAwayUseCase {
  constructor(
    private leaderboardRepository: ILeaderboardRepository,
  ) {}

  async execute() {
    const matches = this.leaderboardRepository.findAwayLeaderboard();

    if (!matches) throw new ErrorMiddleware('Matches not found', 404);

    return matches;
  }
}
