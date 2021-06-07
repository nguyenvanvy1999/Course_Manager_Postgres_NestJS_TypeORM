import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { ValidateResDTO } from '../dtos';

export const User = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user: ValidateResDTO = request.user;
    return user;
  },
);
