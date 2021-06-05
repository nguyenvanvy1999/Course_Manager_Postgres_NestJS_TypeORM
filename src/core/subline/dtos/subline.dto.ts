import { Subtitle } from 'src/core/subtitle/models';
import { IsDate, IsNotEmpty, IsUUID } from 'class-validator';
import { CheckString } from 'src/decorators';
import { ApiProperty } from '@nestjs/swagger';

export class SubLineDTO {
  @ApiProperty({ description: 'Id', type: String })
  @IsUUID()
  id: string;

  @ApiProperty({ description: 'Subtitle of Subline' })
  subtitle: Subtitle;

  // @ApiProperty({ default: '' })
  // @IsString()
  // @IsNotEmpty()
  // supporterId: string;
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
