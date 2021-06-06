import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsEnum, IsUUID } from 'class-validator';
import { ReactionType } from '../interfaces/enums';

export class CommentReactionCreateDTO {
  @ApiProperty({
    description: 'User id',
    type: String,
    required: true,
    default: '',
  })
  @IsUUID()
  userId: string;

  @ApiProperty({
    description: 'Comment id ',
    type: String,
    required: true,
    default: '',
  })
  @IsUUID()
  commentId: string;

  @ApiProperty({
    description: 'Reaction type',
    required: true,
    enum: ReactionType,
    default: ReactionType.LIKE,
  })
  @IsEnum(ReactionType)
  @IsNotEmpty()
  type: string;
}
