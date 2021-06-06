import { Injectable } from '@nestjs/common';
import { AppLogger } from 'src/common/logger';

@Injectable()
export class AuthService {
  public async validateJwtUser({ username, password }): Promise<any> {
    try {
    } catch (error) {
      AppLogger.error(error.message);
      return null;
    }
  }

  public async validateUser(username: string, password: string): Promise<any> {
    try {
    } catch (error) {
      AppLogger.error(error.message);
      return null;
    }
  }
}
