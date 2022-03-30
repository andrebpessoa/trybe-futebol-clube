import User from '../database/models/user';

export interface ILoginRepository {
  findByEmail(email: string): Promise<User | null >;
}
