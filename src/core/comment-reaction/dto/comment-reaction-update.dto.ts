import { PickType } from '@nestjs/swagger';
import { CommentReactionCreateDTO } from './comment-reaction-create.dto';

export class CommentReactionUpdatingDTO extends PickType(
  CommentReactionCreateDTO,
  ['type'],
) {}
