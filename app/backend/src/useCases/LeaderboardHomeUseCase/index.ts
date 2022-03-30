import LeaderboardRepository from '../../repositories/implementations/leaderboard.repository';
import LeaderboardHomeController from './LeaderboardHomeController';
import LeaderboardHomeUseCase from './LeaderboardHomeUseCase';

const leaderboardRepository = new LeaderboardRepository();

const leaderboardHomeUseCase = new LeaderboardHomeUseCase(
  leaderboardRepository,
);

const leaderboardHomeController = new LeaderboardHomeController(
  leaderboardHomeUseCase,
);

export { leaderboardHomeController, leaderboardHomeUseCase };
