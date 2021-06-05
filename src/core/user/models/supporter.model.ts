import { OneToOne, PrimaryGeneratedColumn, Entity } from 'typeorm';

import { ISupporter, IUser } from '../interfaces';

@Entity('Supporters')
export class Supporter implements ISupporter {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne('User', 'supporter')
  user: IUser;
}
