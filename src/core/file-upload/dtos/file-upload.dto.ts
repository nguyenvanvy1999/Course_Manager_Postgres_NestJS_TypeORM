import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty } from 'class-validator';
import { FileUploadType } from '../interfaces';

export class FileUploadDTO {
  @ApiProperty({
    description: 'File type',
    required: true,
    type: String,
    enum: FileUploadType,
    default: FileUploadType.VIDEO_THUMB,
  })
  @IsEnum(FileUploadType)
  @IsNotEmpty()
  readonly type: FileUploadType;
}
