import LeaderboardRepository from '../../repositories/implementations/leaderboard.repository';
import LeaderboardController from './LeaderboardController';
import LeaderboardUseCase from './LeaderboardUseCase';

const leaderboardRepository = new LeaderboardRepository();

const leaderboardUseCase = new LeaderboardUseCase(
  leaderboardRepository,
);

const leaderboardController = new LeaderboardController(
  leaderboardUseCase,
);

export { leaderboardController, leaderboardUseCase };
