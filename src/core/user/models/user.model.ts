import { IsEmail, IsNotEmpty } from 'class-validator';
import { Account } from 'src/core/account/models/account.model';
import { Base } from 'src/core/base/models';
import { CheckString } from 'src/decorators';
import { Column, Entity } from 'typeorm';
import { IUser } from '../interfaces';

@Entity('users')
export class User extends Base implements IUser {
  @Column({ comment: 'Email of user', type: 'varchar', unique: true })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Column({
    comment: 'Full name of user',
    type: 'varchar',
    length: 200,
    nullable: true,
  })
  @CheckString(false)
  fullName: string;
  account: Account;
}
