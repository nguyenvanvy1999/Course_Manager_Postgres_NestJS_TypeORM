import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configService } from './common/config';
import { CoreModule } from './core/core.module';

@Module({
  imports: [
    CoreModule,
    CoreModule,
    TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
  ],
})
export class AppModule {}
