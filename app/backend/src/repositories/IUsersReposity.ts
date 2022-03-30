import User from '../database/models/user';

export interface IUsersRepository {
  findByEmail(email: string): Promise<User | null >;
  save(user: User): Promise<User>;
}
