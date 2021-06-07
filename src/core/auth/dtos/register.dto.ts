import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';
import { AccountCreateDTO } from 'src/core/account/dtos';
import { CheckString } from 'src/decorators';

export class RegisterDTO extends PartialType(AccountCreateDTO) {
  @ApiProperty({
    description: 'Email to register',
    type: String,
    required: true,
    uniqueItems: true,
    default: '',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: 'Full name',
    type: String,
    required: true,
    default: '',
  })
  @CheckString()
  fullName: string;
}
