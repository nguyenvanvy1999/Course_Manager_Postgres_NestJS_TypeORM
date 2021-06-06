import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentController } from './controllers';
import { Comment } from './models';
import { CommentService } from './services';

@Module({
  imports: [TypeOrmModule.forFeature([Comment])],
  providers: [CommentService],
  controllers: [CommentController],
  exports: [CommentService],
})
export class CommentModule {}
