import { ApiProperty, PickType } from '@nestjs/swagger';
import { SubLine } from 'src/core/subline/models';
import { Video } from 'src/core/video/models';
import { SubtitleCreateDTO } from './subtitle-create.dto';

export class SubtitleDTO extends PickType(SubtitleCreateDTO, ['language']) {
  @ApiProperty({ description: 'Video of subtitle' })
  video: Video;

  @ApiProperty({ description: 'Sublines of subtitle' })
  subLines: SubLine[];
}
