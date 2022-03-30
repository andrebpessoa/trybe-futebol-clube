import { Request, Response } from 'express';
import ErrorMiddleware from '../../middlewares/ErrorMiddleware';
import FindClubsUseCase from './FindClubsUseCase';

export default class FindClubsController {
  constructor(
    private findClubsUseCase: FindClubsUseCase,
  ) {}

  async handle(req: Request, res: Response): Promise<Response> {
    const { id: idString } = req.params;

    const id = +idString;

    try {
      const user = await this.findClubsUseCase.execute({ id });

      return res.status(200).json(user);
    } catch ({ message, statusCode }) {
      throw new ErrorMiddleware(`${message}`, statusCode);
    }
  }
}
