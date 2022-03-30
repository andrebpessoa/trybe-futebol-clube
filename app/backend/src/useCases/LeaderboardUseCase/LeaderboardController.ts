import { Request, Response } from 'express';
import ErrorMiddleware from '../../middlewares/ErrorMiddleware';
import LeaderboardUseCase from './LeaderboardUseCase';

export default class LeaderboardController {
  constructor(
    private leaderboardUseCase: LeaderboardUseCase,
  ) {}

  async handle(req: Request, res: Response): Promise<Response> {
    try {
      const leaderboard = await this.leaderboardUseCase.execute();

      return res.status(200).json(leaderboard);
    } catch ({ message, statusCode }) {
      throw new ErrorMiddleware(`${message}`, statusCode);
    }
  }
}
