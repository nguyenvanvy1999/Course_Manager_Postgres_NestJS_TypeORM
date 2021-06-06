import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';
import { CheckString } from 'src/decorators';

export class CommentDTO {
  @ApiProperty({ description: 'Id of comment', type: String, required: true })
  @IsUUID()
  @IsNotEmpty()
  id: string;

  @ApiProperty({ description: 'Content', type: String, default: '' })
  @CheckString()
  content: string;
}
