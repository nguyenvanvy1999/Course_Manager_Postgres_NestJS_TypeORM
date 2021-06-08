import { applyDecorators } from '@nestjs/common';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';

export const ApiInit = (summary: string, type?: any, resDescription?: string) =>
  applyDecorators(
    ApiOperation({ summary }),
    ApiOkResponse({ description: resDescription || 'OK', type }),
  );
