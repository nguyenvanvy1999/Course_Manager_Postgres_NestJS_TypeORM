import { applyDecorators, Controller } from '@nestjs/common';
import { ApiInternalServerErrorResponse, ApiTags } from '@nestjs/swagger';
import { ErrorRes } from 'src/common/exceptions';

export const ControllerInit = (name: string) =>
  applyDecorators(
    Controller(name),
    ApiTags(name),
    ApiInternalServerErrorResponse({
      description: 'Server Error!',
      type: ErrorRes,
    }),
  );
