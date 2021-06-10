import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '../services';

describe('UserService', () => {
  let controller: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService],
    }).compile();

    controller = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
