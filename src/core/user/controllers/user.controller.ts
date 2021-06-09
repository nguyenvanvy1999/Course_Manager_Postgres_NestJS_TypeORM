import { ControllerInit } from 'src/decorators';
import {
  Crud,
  CrudController,
  CrudRequest,
  GetManyDefaultResponse,
  Override,
  ParsedRequest,
} from '@nestjsx/crud';
import { User } from '../models';
import { UserService } from '../services';
import { AppLogger } from 'src/common/logger';
import { catchError } from 'src/common/exceptions';

@ControllerInit('user')
@Crud({
  model: { type: User },
})
export class UserController implements CrudController<User> {
  constructor(public service: UserService) {}

  get base(): CrudController<User> {
    return this;
  }

  @Override()
  async getMany(
    @ParsedRequest() req: CrudRequest,
  ): Promise<GetManyDefaultResponse<User> | User[]> {
    try {
      req.options.query.join = {
        account: {
          allow: ['username'],
          eager: true,
        },
        roles: {
          allow: ['name'],
          eager: true,
        },
      };
      const baseRes = await this.base.getManyBase(req);
      baseRes['data'] = baseRes['data'].map((item) => {
        const { account, roles, ...rest } = item;
        return {
          ...rest,
          username: account.username,
          roles: roles.map((role) => role['name']).join(','),
        };
      });
      AppLogger.log(baseRes['data']);
      return baseRes;
    } catch (error) {
      catchError(error);
    }
  }
}
