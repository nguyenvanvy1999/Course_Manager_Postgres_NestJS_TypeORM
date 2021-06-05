import { IsEmail, IsNotEmpty } from 'class-validator';
import { Account } from 'src/core/account/models';
import { Base } from 'src/core/base/models';
import { Role } from 'src/core/ROLE/models';
import { CheckString } from 'src/decorators';
import { Column, Entity, JoinColumn, ManyToMany, OneToOne } from 'typeorm';
import { IAdmin, IMod, ISupporter, IUser } from '../interfaces';

@Entity('Users')
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

  @OneToOne(() => Account, (account) => account.user)
  @JoinColumn()
  account: Account;

  @ManyToMany(() => Role, (role) => role.users)
  roles: Role[];

  @OneToOne('Admin', 'user')
  @JoinColumn()
  admin?: IAdmin;

  @OneToOne('Mod', 'user')
  @JoinColumn()
  mod?: IMod;

  @OneToOne('Supporter', 'user')
  @JoinColumn()
  supporter?: ISupporter;
}
