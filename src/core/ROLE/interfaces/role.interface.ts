import { User } from 'src/core/user/models';

export interface IRole {
  id: string;
  name: string;
  users: User[];
}
