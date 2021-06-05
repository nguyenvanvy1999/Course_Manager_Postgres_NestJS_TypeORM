import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VideoController } from './controllers';
import { Video } from './models';
import { VideoService } from './services';

@Module({
  imports: [TypeOrmModule.forFeature([Video])],
  providers: [VideoService],
  controllers: [VideoController],
  exports: [VideoService],
})
export class VideoModule {}
