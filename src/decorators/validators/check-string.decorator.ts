import { applyDecorators } from '@nestjs/common';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';
import { Trim } from 'src/validators';

export function CheckString(require = true, min?: number, max?: number) {
  const _ = [IsString(), Trim(), Type(() => String)];
  require && _.push(IsNotEmpty());
  min && _.push(MinLength(min));
  max && _.push(MaxLength(max));
  return applyDecorators(..._);
}
