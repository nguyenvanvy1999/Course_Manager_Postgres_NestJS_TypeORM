import { Module } from '@nestjs/common';
import { AccountModule } from './account/account.module';
import { CourseModule } from './course/course.module';
import { StreamModule } from './stream/stream.module';
import { SubLineModule } from './subline/subline.module';
import { SubtitleModule } from './subtitle/subtitle.module';
import { VideoModule } from './video/video.module';

@Module({
  imports: [
    AccountModule,
    CourseModule,
    VideoModule,
    StreamModule,
    SubtitleModule,
    SubLineModule,
  ],
})
export class CoreModule {}
