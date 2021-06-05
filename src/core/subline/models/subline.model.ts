import { Base } from 'src/core/base/models';
import { Subtitle } from 'src/core/subtitle/models';
import { CheckString } from 'src/decorators';
import { Entity, ManyToOne, CreateDateColumn, Column } from 'typeorm';
import { ISubLine } from '../interfaces';

@Entity('SubLines')
export class SubLine extends Base implements ISubLine {
  @ManyToOne(() => Subtitle, (subtitle) => subtitle.subLines, { cascade: true })
  subtitle: Subtitle;

  //   @ManyToOne(() => User, (supporter) => supporter, { cascade: true })
  //   supporter: User;

  @CreateDateColumn({ type: 'timestamptz', nullable: false })
  timestamp: Date;

  @Column({ nullable: false })
  @CheckString(true)
  content: string;
}
