import { Post, Get, Delete, Patch, Body, Param, Query } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';
import { Crud, CrudController } from '@nestjsx/crud';
import { ControllerInit } from 'src/decorators';
import { CommentReactionCreateDTO, CommentReactionUpdatingDTO } from '../dto';
import { CommentReaction } from '../models';
import { CommentReactionService } from '../services';

@ControllerInit('comment-reaction')
@Crud({
  model: { type: CommentReaction },
  dto: { create: CommentReactionCreateDTO, update: CommentReactionUpdatingDTO },
})
export class CommentReactionController
  implements CrudController<CommentReaction>
{
  constructor(public service: CommentReactionService) {}
}
