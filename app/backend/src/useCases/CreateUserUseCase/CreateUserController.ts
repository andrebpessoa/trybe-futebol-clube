import { Request, Response } from 'express';
import ErrorMiddleware from '../../middlewares/ErrorMiddleware';
import CreateUserUseCase from './CreateUserUseCase';

export default class CreateUserController {
  constructor(
    private createUserUseCase: CreateUserUseCase,
  ) {}

  async handle(req: Request, res: Response): Promise<Response> {
    const data = req.body;

    try {
      const user = await this.createUserUseCase.execute(data);

      return res.status(201).json(user);
    } catch ({ message, statusCode }) {
      throw new ErrorMiddleware(`${message}`, statusCode);
    }
  }
}
