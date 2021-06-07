import { ApiProperty } from '@nestjs/swagger';
import { CheckString } from 'src/decorators';

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
    // type: { email: String, id: String, fullName: String },
  })
  user: {
    email: string;
    id: string;
    fullName: string;
  };
}
