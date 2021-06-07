import { ApiProperty } from '@nestjs/swagger';
import { CheckString } from 'src/decorators';
import { ValidateResDTO } from './validate-res.dto';

export class LoginResDTO {
  @ApiProperty({ description: 'Cookie', type: String, required: true })
  @CheckString()
  cookie: string;
  user: ValidateResDTO;
}
