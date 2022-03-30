import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { readFile } from 'fs/promises';
import path = require('path');

import { ILoginRequestDTO } from './LoginDTO';
import { ILoginRepository } from '../../repositories/ILoginRepository';
import ErrorMiddleware from '../../middlewares/ErrorMiddleware';

export default class LoginUseCase {
  constructor(
    private loginRepository: ILoginRepository,
  ) {}

  async execute(data: ILoginRequestDTO) {
    const JWT_SECRET = await readFile(path.join(process.cwd(), 'jwt.evaluation.key'));

    if (!data.email || !data.password) throw new ErrorMiddleware('All fields must be filled', 401);

    const userExists = await this.loginRepository.findByEmail(data.email);

    if (!userExists) throw new ErrorMiddleware('Incorrect email or password', 401);

    const isValidPassword = await compare(data.password, userExists.password);

    if (!isValidPassword) throw new ErrorMiddleware('Incorrect email or password', 401);

    const user = {
      id: userExists.id,
      username: userExists.username,
      role: userExists.role,
      email: userExists.email,
    };

    const token = sign(user, JWT_SECRET, { expiresIn: '1h' });

    return {
      user,
      token,
    };
  }
}
