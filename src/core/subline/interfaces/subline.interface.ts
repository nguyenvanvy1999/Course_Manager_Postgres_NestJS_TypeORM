import { Subtitle } from 'src/core/subtitle/models';

export interface ISubLine {
  id: string;
  subtitle: Subtitle;
  timestamp: Date;
  content: string;
}
