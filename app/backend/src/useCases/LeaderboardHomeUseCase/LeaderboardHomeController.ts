import { Request, Response } from 'express';
import ErrorMiddleware from '../../middlewares/ErrorMiddleware';
import LeaderboardHomeUseCase from './LeaderboardHomeUseCase';

export default class LeaderboardHomeController {
  constructor(
    private leaderboardHomeUseCase: LeaderboardHomeUseCase,
  ) {}

  async handle(req: Request, res: Response): Promise<Response> {
    try {
      const leaderboard = await this.leaderboardHomeUseCase.execute();

      return res.status(200).json(leaderboard);
    } catch ({ message, statusCode }) {
      throw new ErrorMiddleware(`${message}`, statusCode);
    }
  }
}
