import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubLine } from './models';

@Module({ imports: [TypeOrmModule.forFeature([SubLine])] })
export class SubLineModule {}
