import { ApiProperty, OmitType } from '@nestjs/swagger';
import { Subtitle } from 'src/core/subtitle/models';
import { CheckString } from 'src/decorators';
import { SubLineCreateDTO } from './subline-create.dto';

export class SubLineDTO extends OmitType(SubLineCreateDTO, [
  'subtitleId',
  'subtitleId',
]) {
  @ApiProperty({ description: 'Id', type: String })
  @CheckString()
  id: string;

  @ApiProperty({ description: 'Subtitle', type: Subtitle })
  subtitle: Subtitle;

  // @ApiProperty({ default: '' })
  // @IsString()
  // @IsNotEmpty()
  // supporterId: string;
}
