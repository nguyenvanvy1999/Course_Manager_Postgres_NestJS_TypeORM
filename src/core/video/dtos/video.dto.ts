import { PartialType } from '@nestjs/swagger';
import { VideoCreateDTO } from './video-create.dto';

export class VideoDTO extends PartialType(VideoCreateDTO) {}
