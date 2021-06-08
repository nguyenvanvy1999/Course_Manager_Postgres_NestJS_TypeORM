import {
  BadRequestException,
  Body,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { catchError } from 'src/common/exceptions';
import { ApiInit, ControllerInit } from 'src/decorators';
import { FileUploadDTO } from '../dtos';
import { FileUpload } from '../interfaces';
import { FileUploadByS3 } from '../strategies';

@ControllerInit('file-upload')
export class FileUploadController {
  private fileUpload: FileUpload;
  constructor() {
    this.fileUpload = new FileUploadByS3();
  }

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  @ApiInit('Upload file ', String)
  async create(
    @UploadedFile() file: Express.Multer.File,
    @Body() fileUploadDTO: FileUploadDTO,
  ) {
    try {
      if (!file) throw new BadRequestException('File is required');
      if (!fileUploadDTO.type)
        throw new BadRequestException('Type is required');
      const data = await this.fileUpload.uploadFile(file, fileUploadDTO.type);
      return { data };
    } catch (error) {
      catchError(error);
    }
  }
}
