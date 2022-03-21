import User from '../../database/models/user';
import { IUsersRepository } from '../IUsersReposity';

export default class UsersRepository implements IUsersRepository {
  private user = User;

  async findByEmail(email: string): Promise<User | null> {
    const result = await this.user.findOne<User>({ where: { email } });

    return result;
  }

  async save(user: User): Promise<User> {
    const result = (await this.user.create(user)).get({ plain: true });

    return result;
  }
}
