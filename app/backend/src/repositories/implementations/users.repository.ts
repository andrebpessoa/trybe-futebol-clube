import User from '../../database/models/user';
import { IUsersRepository } from '../IUsersReposity';

export default class UsersRepository implements IUsersRepository {
  private user = User;

  async findByEmail(email: string): Promise<User | null> {
    return this.user.findOne<User>({ where: { email } });
  }

  async save(user: User): Promise<User> {
    return (await this.user.create(user)).get({ plain: true });
  }
}
