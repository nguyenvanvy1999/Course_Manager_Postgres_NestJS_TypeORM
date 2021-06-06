import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentModule } from '../comment/comment.module';
import { CommentReactionController } from './controllers';
import { CommentReaction } from './models';
import { CommentReactionService } from './services';

@Module({
  imports: [CommentModule, TypeOrmModule.forFeature([CommentReaction])],
  providers: [CommentReactionService],
  controllers: [CommentReactionController],
  exports: [CommentReactionService],
})
export class CommentReactionModule {}
