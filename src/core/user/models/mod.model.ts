import { OneToOne, PrimaryGeneratedColumn, Entity } from 'typeorm';

import { IMod, IUser } from '../interfaces';

@Entity('Mods')
export class Mod implements IMod {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne('User', 'supporter')
  user: IUser;
}
