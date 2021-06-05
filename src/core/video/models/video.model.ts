import { Base } from 'src/core/base/models';
import { Course } from 'src/core/course/models/course.model';
import { Subtitle } from 'src/core/subtitle/models';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { IVideo } from '../interfaces';

@Entity({ name: 'Videos' })
export class Video extends Base implements IVideo {
  @Column({ type: 'varchar', length: 300 })
  title: string;

  @Column({ type: 'varchar', length: 300 })
  description: string;

  @Column({ type: 'varchar', length: 300 })
  thumbnailUrl: string;

  @Column({ type: 'varchar', length: 300 })
  videoUrl: string;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  publishAt: Date;

  @ManyToOne(() => Course, (course) => course.videos)
  course: Course;

  @OneToMany(() => Subtitle, (subtitle) => subtitle.video)
  subtitles: Subtitle[];
}
