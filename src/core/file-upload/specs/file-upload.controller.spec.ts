import { Test, TestingModule } from '@nestjs/testing';
import { FileUploadController } from '../controllers';
import { FileUploadByS3 } from '../strategies';

describe('FileUploadController', () => {
  let controller: FileUploadController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FileUploadController],
      providers: [FileUploadByS3],
    }).compile();

    controller = module.get<FileUploadController>(FileUploadController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
