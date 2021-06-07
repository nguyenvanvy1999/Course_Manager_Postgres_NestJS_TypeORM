import { ApiProperty } from '@nestjs/swagger';
import { CheckString } from 'src/decorators';

export class AccountCreateDTO {
  @ApiProperty({
    description: 'Username',
    type: String,
    required: true,
    uniqueItems: true,
    default: 'Username',
  })
  @CheckString()
  readonly username: string;

  @ApiProperty({
    description: 'Password',
    type: String,
    required: true,
    minLength: 5,
    default: 'Password',
  })
  @CheckString(true, 5)
  readonly password: string;
}
