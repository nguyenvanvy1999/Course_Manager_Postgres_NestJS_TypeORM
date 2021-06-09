import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { configService } from 'src/common/config';
import { catchError } from 'src/common/exceptions';
import { AppLogger } from 'src/common/logger';
import { Account } from 'src/core/account/models';
import { Role } from 'src/core/role/models';
import { User } from 'src/core/user/models';
import { Connection, Repository } from 'typeorm';
import { LoginResDTO, RegisterDTO, ValidateResDTO } from '../dtos';
import { TokenPayload } from '../interfaces';
import { hashPassword, isMatch } from '../tools';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly connection: Connection,
    @InjectRepository(Account)
    private readonly accountRepository: Repository<Account>,
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  public async validateUser(
    username: string,
    password: string,
  ): Promise<ValidateResDTO | null> {
    try {
      const account = await this.accountRepository.findOne({
        where: { username },
        relations: ['user'],
      });
      const isPassword = await isMatch(password, account.password);
      if (!account || !isPassword) return null;
      const { id, email, fullName } = account.user;
      return {
        username: account.username,
        user: { id, email, fullName },
      };
    } catch (error) {
      AppLogger.error(error.message);
      return null;
    }
  }

  public async validateJwtUser(
    payload: TokenPayload,
  ): Promise<ValidateResDTO | null> {
    try {
      const user = await this.userRepository.findOne({ id: payload.userId });
      if (!user) return null;
      const { id, fullName, email } = user;
      return { username: payload.username, user: { id, email, fullName } };
    } catch (error) {
      AppLogger.error(error.message);
      return null;
    }
  }

  public async login(account: ValidateResDTO): Promise<LoginResDTO> {
    try {
      const {
        username,
        user: { id },
      } = account;
      const cookie = this.getCookieWithJwtToken(username, id);
      return { cookie, user: account };
    } catch (error) {
      catchError(error);
    }
  }

  public async register({
    username,
    email,
    fullName,
    password: rawPass,
  }: RegisterDTO): Promise<any> {
    try {
      const userRole = await this.roleRepository.findOneOrFail({
        name: 'USER',
      });
      const existedAccount = await this.accountRepository.findOne({
        where: { username },
      });
      if (existedAccount) throw new BadRequestException('Username is existed');
      const existedUser = await this.userRepository.findOne({
        where: { email },
      });
      if (existedUser) throw new BadRequestException('Email is existed');
      const hashedPassword = await hashPassword(rawPass);
      await this.connection.transaction(async (manager) => {
        const newAccount = new Account();
        newAccount.username = username;
        newAccount.password = hashedPassword;
        AppLogger.verbose(newAccount);
        await manager.save(newAccount);
        const newUser = new User();
        newUser.email = email;
        newUser.account = newAccount;
        newUser.roles = [userRole];
        newUser.fullName = fullName;
        AppLogger.verbose(newUser);
        const createdUser = await manager.save(newUser);
        AppLogger.verbose(createdUser.id);
        return this.login({
          username,
          user: {
            id: createdUser.id,
            email,
            fullName,
          },
        });
      });
    } catch (error) {
      catchError(error);
    }
  }
  private getCookieWithJwtToken(username: string, userId: string): string {
    try {
      const payload: TokenPayload = { username, userId };
      const token = this.jwtService.sign(payload);
      const {
        signOptions: { expiresIn },
      } = configService.getJwtConfig();
      return `Authentication=${token}; HttpOnly; Path=/; Max-Age=${expiresIn};SameSite=None; Secure`;
    } catch (error) {
      catchError(error);
    }
  }
}
