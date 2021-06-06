import { Test, TestingModule } from '@nestjs/testing';
import { CommentReactionController } from '../controllers';
import { CommentReactionService } from '../services';

describe('CommentReactionController', () => {
  let controller: CommentReactionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CommentReactionController],
      providers: [CommentReactionService],
    }).compile();

    controller = module.get<CommentReactionController>(
      CommentReactionController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
