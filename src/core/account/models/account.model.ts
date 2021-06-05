import { User } from 'src/core/user/models';
import { Column, Entity, OneToOne } from 'typeorm';
import { Base } from '../../base/models';
import { IAccount } from '../interfaces';

@Entity('Accounts')
export class Account extends Base implements IAccount {
  @Column({ type: 'varchar', length: 20, unique: true })
  username: string;

  @Column({ type: 'varchar', length: 300 })
  password: string;

  @OneToOne(() => User, (user) => user.id)
  user: User;
}
