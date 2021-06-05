import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';
import { CheckString } from 'src/decorators';

export class SubtitleCreateDTO {
  @ApiProperty({
    description: 'Video id ',
    type: String,
    required: true,
    default: '',
  })
  @IsUUID()
  videoId: string;

  @ApiProperty({
    description: 'Supporter id ',
    type: String,
    required: true,
    default: '',
  })
  @IsUUID()
  supporterId: string;

  @ApiProperty({
    description: 'Language',
    type: String,
    required: true,
    default: 'vn',
  })
  @CheckString()
  language: string;
}
