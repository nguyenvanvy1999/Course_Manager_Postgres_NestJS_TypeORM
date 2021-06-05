import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Video } from './models';

@Module({ imports: [TypeOrmModule.forFeature([Video])] })
export class VideoModule {}
