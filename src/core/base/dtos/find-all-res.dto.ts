import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsInt } from 'class-validator';

export class FindAllResDTO {
  @ApiProperty({ description: 'Datas', type: Array })
  @IsArray()
  data: any[];

  @ApiProperty({
    description: 'Total page',
    type: Number,
    required: true,
  })
  @IsInt()
  totalPage: number;

  @ApiProperty({ description: 'Total count', type: Number, required: true })
  @IsInt()
  totalCount: number;
}
