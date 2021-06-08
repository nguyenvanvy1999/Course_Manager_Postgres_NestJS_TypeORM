import { Module, CACHE_MANAGER, CacheModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CourseModule } from '../course/course.module';
import { VideoController } from './controllers';
import { Video } from './models';
import { VideoService } from './services';

@Module({
  imports: [CourseModule, TypeOrmModule.forFeature([Video])],
  providers: [VideoService, { provide: CACHE_MANAGER, useClass: CacheModule }],
  controllers: [VideoController],
  exports: [VideoService],
})
export class VideoModule {}
