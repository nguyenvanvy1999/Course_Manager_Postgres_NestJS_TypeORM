import { Test, TestingModule } from '@nestjs/testing';
import { VideoService } from 'src/core/video/services';
import { StreamController } from '../controllers';

describe('StreamController', () => {
  let controller: StreamController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StreamController],
      providers: [VideoService],
    }).compile();

    controller = module.get<StreamController>(StreamController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
