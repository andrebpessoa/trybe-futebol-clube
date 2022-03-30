import LeaderboardRepository from '../../repositories/implementations/leaderboard.repository';
import LeaderboardAwayController from './LeaderboardAwayController';
import LeaderboardAwayUseCase from './LeaderboardAwayUseCase';

const leaderboardRepository = new LeaderboardRepository();

const leaderboardAwayUseCase = new LeaderboardAwayUseCase(
  leaderboardRepository,
);

const leaderboardAwayController = new LeaderboardAwayController(
  leaderboardAwayUseCase,
);

export { leaderboardAwayController, leaderboardAwayUseCase };
