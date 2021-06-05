import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNotEmpty, IsUUID } from 'class-validator';
import { CheckString } from 'src/decorators';

export class SubLineCreateDTO {
  @ApiProperty({
    description: 'Subtitle id of subline',
    type: String,
    required: true,
    default: '',
  })
  @IsUUID()
  @IsNotEmpty()
  subtitleId: string;

  @ApiProperty()
  @IsUUID()
  @IsNotEmpty()
  supporterId: string;

  @ApiProperty({
    description: 'Timestamp',
    required: true,
    default: new Date(Date.now()).toISOString(),
  })
  @IsDate()
  @IsNotEmpty()
  timestamp: Date;

  @ApiProperty({
    description: 'Content',
    type: String,
    required: true,
    default: '',
  })
  @CheckString()
  content: string;
}
