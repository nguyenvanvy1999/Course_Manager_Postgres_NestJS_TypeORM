import { ControllerInit } from 'src/decorators';
import { CommentReactionService } from '../services';

@ControllerInit('comment-reaction')
export class CommentReactionController {
  constructor(
    private readonly commentReactionService: CommentReactionService,
  ) {}
}
