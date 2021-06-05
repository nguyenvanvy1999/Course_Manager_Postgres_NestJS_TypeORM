import { Test, TestingModule } from '@nestjs/testing';
import { SubLineService } from '../services';

describe('SubLineService', () => {
  let service: SubLineService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SubLineService],
    }).compile();

    service = module.get<SubLineService>(SubLineService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
