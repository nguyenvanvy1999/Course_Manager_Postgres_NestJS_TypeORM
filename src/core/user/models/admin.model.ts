import { Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { IAdmin, IUser } from '../interfaces';

@Entity('Admins')
export class Admin implements IAdmin {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne('User', 'supporter')
  user: IUser;
}
