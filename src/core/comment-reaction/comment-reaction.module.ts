import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentReactionController } from './controllers';
import { CommentReaction } from './models';
import { CommentReactionService } from './services';

@Module({
  imports: [TypeOrmModule.forFeature([CommentReaction])],
  providers: [CommentReactionService],
  controllers: [CommentReactionController],
  exports: [CommentReactionService],
})
export class CommentReactionModule {}
