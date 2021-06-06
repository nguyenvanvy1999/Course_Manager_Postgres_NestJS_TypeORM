import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';
import { CheckString } from 'src/decorators';

export class CommentCreateDTO {
  @ApiProperty({
    description: 'Video id of comment',
    type: String,
    required: true,
    default: '',
  })
  @IsUUID()
  @IsNotEmpty()
  videoId: string;

  @ApiProperty({
    description: 'User id of comment',
    type: String,
    required: true,
    default: '',
  })
  @IsUUID()
  @IsNotEmpty()
  userId: string;

  @ApiProperty({
    description: 'Content',
    type: String,
    required: true,
    default: '',
  })
  @CheckString()
  content: string;
}
