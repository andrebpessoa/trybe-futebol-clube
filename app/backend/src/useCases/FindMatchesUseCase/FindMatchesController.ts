import { Request, Response } from 'express';
import ErrorMiddleware from '../../middlewares/ErrorMiddleware';
import FindMatchesUseCase from './FindMatchesUseCase';

export default class FindMatchesController {
  constructor(
    private findMatchesUseCase: FindMatchesUseCase,
  ) {}

  async handle(req: Request, res: Response): Promise<Response> {
    let query;

    const { id: idString } = req.params;
    const { inProgress } = req.query;

    const id = +idString;

    if (inProgress) query = (inProgress === 'true');

    try {
      const user = await this.findMatchesUseCase.execute({ id, query });

      return res.status(200).json(user);
    } catch ({ message, statusCode }) {
      throw new ErrorMiddleware(`${message}`, statusCode);
    }
  }
}
