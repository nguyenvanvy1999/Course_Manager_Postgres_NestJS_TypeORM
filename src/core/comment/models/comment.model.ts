import { Base } from 'src/core/base/models';
import { CommentReaction } from 'src/core/comment-reaction/models';
import { CheckString } from 'src/decorators';
import { Column, Entity, OneToMany } from 'typeorm';
import { IComment } from '../interfaces';
@Entity('Comments')
export class Comment extends Base implements IComment {
  @OneToMany(
    () => CommentReaction,
    (commentReaction) => commentReaction.comment,
  )
  commentReactions: CommentReaction[];

  @Column({ nullable: false })
  @CheckString()
  content: string;
}
