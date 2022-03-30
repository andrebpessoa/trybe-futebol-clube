import { Router } from 'express';

import { leaderboardController } from '../useCases/LeaderboardUseCase';
import { leaderboardAwayController } from '../useCases/LeaderboardAwayUseCase';
import { leaderboardHomeController } from '../useCases/LeaderboardHomeUseCase';

const leaderboardRouter = Router();

leaderboardRouter.get(
  '/leaderboard/home',
  async (req, res) => leaderboardHomeController.handle(req, res),
);

leaderboardRouter.get(
  '/leaderboard/away',
  async (req, res) => leaderboardAwayController.handle(req, res),
);

leaderboardRouter.get(
  '/leaderboard',
  async (req, res) => leaderboardController.handle(req, res),
);

export default leaderboardRouter;
