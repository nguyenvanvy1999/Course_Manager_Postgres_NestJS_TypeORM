import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configService } from 'src/common/config';
import { AccountModule } from '../account/account.module';
import { Account } from '../account/models';
import { Role } from '../role/models';
import { User } from '../user/models';
import { AuthController } from './controllers';
import { AuthService } from './services';
import { JwtStrategy, LocalStrategy } from './strategies';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Role, Account]),
    PassportModule,
    JwtModule.register(configService.getJwtConfig()),
  ],
  providers: [AuthService, JwtStrategy, LocalStrategy],
  controllers: [AuthController],
  exports: [AuthService, JwtModule],
})
export class AuthModule {}
