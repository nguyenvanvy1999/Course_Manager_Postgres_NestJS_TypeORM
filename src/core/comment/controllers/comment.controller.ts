import { Crud, CrudController } from '@nestjsx/crud';
import { ControllerInit } from 'src/decorators';
import { CommentCreateDTO, CommentUpdateDTO } from '../dtos';
import { Comment } from '../models';
import { CommentService } from '../services';

@ControllerInit('comment')
@Crud({
  model: { type: Comment },
  dto: { create: CommentCreateDTO, update: CommentUpdateDTO },
})
export class CommentController implements CrudController<Comment> {
  constructor(public service: CommentService) {}
}
