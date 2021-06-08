import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './controllers';
import { Admin, Mod, Supporter, User } from './models';
import { UserService } from './services';

@Module({
  imports: [TypeOrmModule.forFeature([User, Admin, Mod, Supporter])],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
