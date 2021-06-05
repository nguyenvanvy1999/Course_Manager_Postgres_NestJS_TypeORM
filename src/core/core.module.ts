import { Module } from '@nestjs/common';
import { AccountModule } from './account/account.module';
import { CourseModule } from './course/course.module';
import { VideoModule } from './video/video.module';

@Module({ imports: [AccountModule, CourseModule, VideoModule] })
export class CoreModule {}
