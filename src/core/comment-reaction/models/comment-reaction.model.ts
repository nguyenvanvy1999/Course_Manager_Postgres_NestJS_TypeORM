import { Base } from 'src/core/base/models';
import { Comment } from 'src/core/comment/models';
import { CheckString } from 'src/decorators';
import { Column, Entity, ManyToOne } from 'typeorm';
import { ICommentReaction } from '../interfaces';

@Entity('Comment_reaction')
export class CommentReaction extends Base implements ICommentReaction {
  @ManyToOne(() => Comment, (comment) => comment.commentReactions, {
    cascade: true,
  })
  comment: Comment;

  @Column({ nullable: false })
  @CheckString()
  type: string;
}
