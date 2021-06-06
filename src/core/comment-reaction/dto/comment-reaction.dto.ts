import { ApiProperty, PickType } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';
import { Comment } from 'src/core/comment/models';
import { CommentReactionCreateDTO } from './comment-reaction-create.dto';

export class CommentReactionDTO extends PickType(CommentReactionCreateDTO, [
  'type',
]) {
  @ApiProperty({
    description: 'Id of comment reaction',
    type: String,
    required: true,
  })
  @IsUUID()
  @IsNotEmpty()
  id: string;

  @ApiProperty({ description: 'Comment of reaction' })
  comment: Comment;
}
