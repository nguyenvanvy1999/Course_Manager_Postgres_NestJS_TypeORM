import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Subtitle } from './models';

@Module({ imports: [TypeOrmModule.forFeature([Subtitle])] })
export class SubtitleModule {}
