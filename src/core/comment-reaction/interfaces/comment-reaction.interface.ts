import { Comment } from 'src/core/comment/models';

export interface ICommentReaction {
  id: string;
  comment: Comment;
  type: string;
}
