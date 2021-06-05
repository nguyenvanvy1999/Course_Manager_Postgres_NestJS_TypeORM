import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Admin, Mod, Supporter, User } from './models';

@Module({
  imports: [TypeOrmModule.forFeature([User, Admin, Mod, Supporter])],
  providers: [],
  controllers: [],
  exports: [],
})
export class UserModule {}
