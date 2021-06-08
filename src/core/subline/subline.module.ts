import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubLineController } from './controllers';
import { SubLine } from './models';
import { SubLineService } from './services';

@Module({
  imports: [TypeOrmModule.forFeature([SubLine])],
  providers: [SubLineService],
  controllers: [SubLineController],
  exports: [SubLineService],
})
export class SubLineModule {}
