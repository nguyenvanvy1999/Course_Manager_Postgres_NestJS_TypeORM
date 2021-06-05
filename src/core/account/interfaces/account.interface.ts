import { User } from 'src/core/user/models';

export interface IAccount {
  id: string;
  username: string;
  password: string;
  user: User;
}
