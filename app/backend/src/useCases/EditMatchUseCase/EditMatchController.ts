import { Request, Response } from 'express';
import ErrorMiddleware from '../../middlewares/ErrorMiddleware';
import EditMatchUseCase from './EditMatchUseCase';

export default class EditMatchController {
  constructor(
    private editMatchUseCase: EditMatchUseCase,
  ) {}

  async handle(req: Request, res: Response): Promise<Response> {
    const { id: idString } = req.params;
    const goals = req.body;

    const id = +idString;

    try {
      const user = await this.editMatchUseCase.execute({ id, goals });

      return res.status(200).json(user);
    } catch ({ message, statusCode }) {
      throw new ErrorMiddleware(`${message}`, statusCode);
    }
  }
}
