import { ApiProperty } from '@nestjs/swagger';
import { IsArray } from 'class-validator';
import { Video } from 'src/core/video/models';
import { CheckString } from 'src/decorators';

export class CourseCreateDTO {
  @ApiProperty({
    description: 'Course title',
    type: String,
    required: true,
    default: 'Title',
  })
  @CheckString()
  readonly title: string;

  @ApiProperty({
    description: 'course description',
    type: String,
    required: false,
    default: 'Description',
  })
  @CheckString(false)
  readonly description: string;

  @ApiProperty({
    description: 'Course thumbnail url ',
    type: String,
    required: true,
    default: 'Thumbnail',
  })
  @CheckString()
  readonly thumbnailUrl: string;

  @IsArray()
  readonly videos: Video[];
}
