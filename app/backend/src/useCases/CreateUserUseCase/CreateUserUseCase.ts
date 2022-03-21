import { hashSync } from 'bcryptjs';
import User from '../../database/models/user';
import { IUsersRepository } from '../../repositories/IUsersReposity';
import { ICreateUserRequestDTO } from './CreateUserDTO';
import CreateUserError from './CreateUserError';

export default class CreateUserUseCase {
  constructor(
    private usersRepository: IUsersRepository,
  ) {}

  async execute(data: ICreateUserRequestDTO) {
    const userAlreadyExists = await this.usersRepository.findByEmail(data.email);

    if (userAlreadyExists) throw new CreateUserError('User already exists', 409);

    const user = new User(data).get({ plain: true });

    const encryptedPassword = hashSync(user.password);

    const result = await this.usersRepository.save({ ...user, password: encryptedPassword });

    return {
      id: result.id,
      username: result.username,
      role: result.role,
      email: result.email,
    };
  }
}
