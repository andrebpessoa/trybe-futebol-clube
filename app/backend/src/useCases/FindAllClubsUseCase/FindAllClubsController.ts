import { Request, Response } from 'express';
import FindAllClubsUserError from './FindAllClubsError';
import FindAllClubsUseCase from './FindAllClubsUseCase';

export default class ClubsController {
  constructor(
    private findAllClubsUseCase: FindAllClubsUseCase,
  ) {}

  async handle(req: Request, res: Response): Promise<Response> {
    try {
      const user = await this.findAllClubsUseCase.execute();

      return res.status(200).json(user);
    } catch ({ message, statusCode }) {
      throw new FindAllClubsUserError(`${message}`, statusCode);
    }
  }
}
