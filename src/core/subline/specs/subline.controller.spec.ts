import { Test, TestingModule } from '@nestjs/testing';
import { SubLineController } from '../controllers';
import { SubLineService } from '../services';

describe('SubLineController', () => {
  let controller: SubLineController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SubLineController],
      providers: [SubLineService],
    }).compile();

    controller = module.get<SubLineController>(SubLineController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
