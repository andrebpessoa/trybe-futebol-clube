import { Request, Response } from 'express';
import ErrorMiddleware from '../../middlewares/ErrorMiddleware';
import FinishMatchUseCase from './FinishMatchUseCase';

export default class FinishMatchController {
  constructor(
    private finishMatchUseCase: FinishMatchUseCase,
  ) {}

  async handle(req: Request, res: Response): Promise<Response> {
    const { id: idString } = req.params;

    const id = +idString;

    try {
      const user = await this.finishMatchUseCase.execute({ id });

      return res.status(200).json(user);
    } catch ({ message, statusCode }) {
      throw new ErrorMiddleware(`${message}`, statusCode);
    }
  }
}
