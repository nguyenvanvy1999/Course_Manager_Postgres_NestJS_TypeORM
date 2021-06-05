import { Video } from 'src/core/video/models';

export interface ICourse {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  videos?: Video[];
}
