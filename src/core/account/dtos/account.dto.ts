import { ApiProperty, PickType } from '@nestjs/swagger';
import { AccountCreateDTO } from './account-create.dto';

export class AccountDTO extends PickType(AccountCreateDTO, ['username']) {
  @ApiProperty({ description: 'Email', type: String, format: 'email' })
  email: string;

  @ApiProperty({
    description: 'Account created at',
    type: String,
    format: 'date-time',
  })
  createdAt: string;

  @ApiProperty({
    description: 'Roles of account',
    type: [String],
    minLength: 1,
  })
  roles: string[];
}
