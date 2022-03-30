import { Request, Response } from 'express';
import ErrorMiddleware from '../../middlewares/ErrorMiddleware';
import LeaderboardAwayUseCase from './LeaderboardAwayUseCase';

export default class LeaderboardAwayController {
  constructor(
    private leaderboardAwayUseCase: LeaderboardAwayUseCase,
  ) {}

  async handle(req: Request, res: Response): Promise<Response> {
    try {
      const leaderboard = await this.leaderboardAwayUseCase.execute();

      return res.status(200).json(leaderboard);
    } catch ({ message, statusCode }) {
      throw new ErrorMiddleware(`${message}`, statusCode);
    }
  }
}
