import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { readFile } from 'fs/promises';
import path = require('path');
import { ILoginRequestDTO } from './LoginDTO';
import LoginError from './LoginError';
import { ILoginRepository } from '../../repositories/ILoginRepository';

export default class LoginUseCase {
  constructor(
    private loginRepository: ILoginRepository,
  ) {}

  async execute(data: ILoginRequestDTO) {
    const JWT_SECRET = await readFile(path.join(process.cwd(), 'jwt.evaluation.key'));

    if (!data.email || !data.password) throw new LoginError('All fields must be filled', 401);

    const user = await this.loginRepository.findByEmail(data.email);

    if (!user) throw new LoginError('Incorrect email or password', 401);

    const isValidPassword = await compare(data.password, user.password);

    if (!isValidPassword) throw new LoginError('Incorrect email or password', 401);

    const token = sign(data, JWT_SECRET, { expiresIn: '1h' });

    return {
      user: {
        id: user.id,
        username: user.username,
        role: user.role,
        email: user.email,
      },
      token,
    };
  }
}
