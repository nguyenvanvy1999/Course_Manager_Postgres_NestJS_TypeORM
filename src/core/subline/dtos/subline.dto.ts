import { Subtitle } from 'src/core/subtitle/models';
import { IsDate, IsUUID } from 'class-validator';
import { CheckString } from 'src/decorators';

export class SubLineDTO {
  @IsUUID()
  id: string;

  subtitle: Subtitle;

  // @ApiProperty({ default: '' })
  // @IsString()
  // @IsNotEmpty()
  // supporterId: string;

  @IsDate()
  timestamp: Date;

  @CheckString()
  content: string;
}
