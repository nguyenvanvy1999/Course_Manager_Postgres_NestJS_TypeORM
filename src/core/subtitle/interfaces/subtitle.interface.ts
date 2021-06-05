import { SubLine } from 'src/core/subline/models';
import { Video } from 'src/core/video/models';

export interface ISubtitle {
  id: string;
  video: Video;
  subLines: SubLine[];
  language: string;
}
