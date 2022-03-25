import { Request, Response } from 'express';
import ErrorMiddleware from '../../middlewares/ErrorMiddleware';
import CreateMatchUseCase from './CreateMatchUseCase';

export default class CreateMatchController {
  constructor(
    private createMatchUseCase: CreateMatchUseCase,
  ) {}

  async handle(req: Request, res: Response): Promise<Response> {
    try {
      const user = await this.createMatchUseCase.execute(req.body);

      return res.status(201).json(user);
    } catch ({ message, statusCode }) {
      throw new ErrorMiddleware(`${message}`, statusCode);
    }
  }
}
