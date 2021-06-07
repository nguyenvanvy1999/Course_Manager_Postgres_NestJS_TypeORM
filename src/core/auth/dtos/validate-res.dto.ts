import { ApiProperty, PickType } from '@nestjs/swagger';
import { CheckString } from 'src/decorators';
import { RegisterDTO } from './register.dto';

class User extends PickType(RegisterDTO, ['email', 'fullName']) {
  @ApiProperty({ description: 'Id', type: String })
  id: string;
}

export class ValidateResDTO {
  @ApiProperty({
    description: 'Username',
    type: String,
    required: true,
    default: '',
  })
  @CheckString()
  username: string;

  @ApiProperty({
    description: 'User',
    required: true,
    type: User,
  })
  user: {
    email: string;
    id: string;
    fullName: string;
  };
}
