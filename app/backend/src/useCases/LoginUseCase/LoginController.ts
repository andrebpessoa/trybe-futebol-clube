import { Request, Response } from 'express';
import ErrorMiddleware from '../../middlewares/ErrorMiddleware';
import LoginUseCase from './LoginUseCase';

export default class LoginController {
  constructor(
    private loginUseCase: LoginUseCase,
  ) {}

  async handle(req: Request, res: Response): Promise<Response> {
    const data = req.body;

    try {
      const user = await this.loginUseCase.execute(data);

      return res.status(200).json(user);
    } catch ({ message, statusCode }) {
      throw new ErrorMiddleware(`${message}`, statusCode);
    }
  }
}
