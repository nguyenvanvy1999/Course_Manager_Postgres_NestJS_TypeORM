import { CommentReaction } from 'src/core/comment-reaction/models';

export interface IComment {
  id: string;
  commentReactions: CommentReaction[];
  content: string;
}
