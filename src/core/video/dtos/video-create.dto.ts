import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { Course } from 'src/core/course/models';
import { CheckString } from 'src/decorators';

export class VideoCreateDTO {
  @ApiProperty({
    description: 'Video title',
    type: String,
    required: true,
    default: 'this is title',
  })
  @CheckString()
  readonly title: string;

  @ApiProperty({
    description: 'Video description',
    type: String,
    required: true,
    default: 'this is description',
  })
  @CheckString()
  readonly description: string;

  @ApiProperty({
    description: 'Video thumbnail url',
    type: String,
    required: true,
    default: 'this is thumbnailUrl',
  })
  @CheckString()
  readonly thumbnailUrl?: string;

  @ApiProperty({
    description: 'Video url',
    type: String,
    required: true,
    default: 'this is videoUrl',
  })
  @CheckString()
  readonly videoUrl?: string;

  @ApiProperty({
    description: 'Course of video',
    required: false,
    default: new Course(),
  })
  @IsNotEmpty()
  readonly course?: Course;
}
