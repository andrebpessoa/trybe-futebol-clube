import { Request, Response } from 'express';
import FindClubByIdError from './FindClubByIdError';
import FindClubByIdUseCase from './FindClubByIdUseCase';

export default class FindClubByIdController {
  constructor(
    private findClubByIdUseCase: FindClubByIdUseCase,
  ) {}

  async handle(req: Request, res: Response): Promise<Response> {
    const { id: idString } = req.params;
    const id = +idString;

    try {
      const user = await this.findClubByIdUseCase.execute({ id });

      return res.status(200).json(user);
    } catch ({ message, statusCode }) {
      throw new FindClubByIdError(`${message}`, statusCode);
    }
  }
}
