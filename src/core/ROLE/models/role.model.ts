import { Base } from 'src/core/base/models';
import { User } from 'src/core/user/models';
import { Column, Entity, ManyToMany } from 'typeorm';

@Entity('Roles')
export class Role extends Base {
  @Column({ type: 'varchar', length: 200 })
  name: string;

  @ManyToMany(() => User, (user) => user.roles)
  users: User[];
}
