import { Entity, Column, ManyToOne, OneToMany } from 'typeorm';
import { IsNotEmpty, IsString } from 'class-validator';
import { Video } from 'src/core/video/models';
import { SubLine } from 'src/core/subline/models';
import { Base } from 'src/core/base/models';
import { ISubtitle } from '../interfaces';

@Entity('Subtitles')
export class Subtitle extends Base implements ISubtitle {
  @ManyToOne(() => Video, (video) => video.subtitles, { cascade: true })
  video: Video;

  @OneToMany(() => SubLine, (subLine) => subLine.subtitle)
  subLines: SubLine[];

  @Column({ nullable: false })
  @IsString()
  @IsNotEmpty()
  language: string;
}
