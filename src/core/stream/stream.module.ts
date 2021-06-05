import { CacheModule, Module } from '@nestjs/common';
import { VideoModule } from '../video/video.module';
import { StreamController } from './controllers';

@Module({
  imports: [VideoModule, CacheModule.register()],
  controllers: [StreamController],
})
export class StreamModule {}
