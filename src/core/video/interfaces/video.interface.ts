import { Course } from 'src/core/course/models';
import { Subtitle } from 'src/core/subtitle/models';

export interface IVideo {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  videoUrl: string;
  publishAt: Date;
  course: Course;
  subtitles: Subtitle[];
}
