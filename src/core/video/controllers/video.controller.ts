import { ControllerInit } from 'src/decorators';
import { VideoService } from '../services';

@ControllerInit('video')
export class VideoController {
  constructor(private readonly videoService: VideoService) {}
}
