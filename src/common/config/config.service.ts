import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtConfig } from './interfaces';

@Injectable()
export class AppConfigService extends ConfigService {
  constructor() {
    super();
  }

  get host(): string {
    return this.get<string>('HOST');
  }

  get port(): number {
    return this.get<number>('PORT');
  }

  get env(): string {
    return this.get<string>('NODE_ENV');
  }

  get salt(): number {
    return this.get<number>('SALT');
  }

  public isEnv(env: string): boolean {
    return this.get('NODE_ENV') === env;
  }

  public isProduction(): boolean {
    return this.get<string>('NODE_ENV') === 'production';
  }

  public isDevelopment(): boolean {
    return this.get<string>('NODE_ENV') === 'development';
  }

  public getMongoConfig() {
    return { type: 'mongodb', host: 'localhost', port: 27017 };
  }

  public getJwtConfig(): JwtConfig {
    return {
      secret: this.get<string>('JWT_SECRET'),
      signOptions: { expiresIn: '15m' },
    };
  }
}
