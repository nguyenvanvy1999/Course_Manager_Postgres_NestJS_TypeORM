import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubtitleController } from './controllers';
import { Subtitle } from './models';
import { SubtitleService } from './services';

@Module({
  imports: [TypeOrmModule.forFeature([Subtitle])],
  providers: [SubtitleService],
  controllers: [SubtitleController],
  exports: [SubtitleService],
})
export class SubtitleModule {}
