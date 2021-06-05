import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommonModule } from './common/common.module';
import { configService } from './common/config';
import { CoreModule } from './core/core.module';

@Module({
  imports: [
    CoreModule,
    CommonModule,
    TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
  ],
})
export class AppModule {}
