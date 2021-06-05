import { applyDecorators } from '@nestjs/common';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';

export const ApiInit = (
  description: string,
  type?: any,
  resDescription?: string,
) =>
  applyDecorators(
    ApiOperation({ description }),
    ApiOkResponse({ description: resDescription || 'OK', type }),
  );
