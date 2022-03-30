import ErrorMiddleware from '../../middlewares/ErrorMiddleware';
import { ILeaderboardRepository } from '../../repositories/ILeaderboardRepository';

export default class LeaderboardHomeUseCase {
  constructor(
    private leaderboardRepository: ILeaderboardRepository,
  ) {}

  async execute() {
    const matches = this.leaderboardRepository.findHomeLeaderboard();

    if (!matches) throw new ErrorMiddleware('Matches not found', 404);

    return matches;
  }
}
