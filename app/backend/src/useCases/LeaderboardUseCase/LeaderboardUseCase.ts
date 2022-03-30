import ErrorMiddleware from '../../middlewares/ErrorMiddleware';
import { ILeaderboardRepository } from '../../repositories/ILeaderboardRepository';

export default class LeaderboardUseCase {
  constructor(
    private leaderboardRepository: ILeaderboardRepository,
  ) {}

  async execute() {
    const matches = this.leaderboardRepository.findLeaderboard();

    if (!matches) throw new ErrorMiddleware('Matches not found', 404);

    return matches;
  }
}
