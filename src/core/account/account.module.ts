import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account } from './models';

@Module({
  imports: [TypeOrmModule.forFeature([Account])],
  providers: [],
  controllers: [],
  exports: [],
})
export class AccountModule {}
