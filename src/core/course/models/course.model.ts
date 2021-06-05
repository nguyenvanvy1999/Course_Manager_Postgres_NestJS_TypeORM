import { Base } from 'src/core/base/models';
import { Video } from 'src/core/video/models';
import { Column, Entity, OneToMany } from 'typeorm';
import { ICourse } from '../interfaces';

@Entity({ name: 'Courses' })
export class Course extends Base implements ICourse {
  @Column({ type: 'varchar', length: 300 })
  title: string;

  @Column({ type: 'varchar', length: 300 })
  description: string;

  @Column({ type: 'varchar', length: 300 })
  thumbnailUrl: string;

  @OneToMany(() => Video, (video) => video.course)
  videos?: Video[];
}
