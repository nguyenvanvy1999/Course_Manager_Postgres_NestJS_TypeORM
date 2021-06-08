import { Module } from '@nestjs/common';
import { FileUploadController } from './controllers';

@Module({
  controllers: [FileUploadController],
})
export class FileUploadModule {}
