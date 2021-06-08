import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Repository } from 'typeorm';
import { CommentReaction } from '../models';

@Injectable()
export class CommentReactionService extends TypeOrmCrudService<CommentReaction> {
  constructor(
    @InjectRepository(CommentReaction)
    private readonly commentReactionRepository: Repository<CommentReaction>,
  ) {
    super(commentReactionRepository);
  }
}
