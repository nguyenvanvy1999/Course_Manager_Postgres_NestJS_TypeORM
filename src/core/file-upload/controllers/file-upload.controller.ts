import {
  BadRequestException,
  Body,
  Get,
  InternalServerErrorException,
  Param,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { catchError } from 'src/common/exceptions';
import { ApiInit, ControllerInit } from 'src/decorators';
import { FileUploadDTO } from '../dtos';
import { FileUpload } from '../interfaces';
import { FileUploadByS3 } from '../strategies';
import { Response } from 'express';

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

  @Get('download')
  @ApiInit('Download file from S3')
  public download(@Param('url') url: string, @Res() res: Response) {
    try {
      const stream = this.fileUpload.downloadVideo(url);
      stream.on('error', (err) => {
        throw new InternalServerErrorException(err);
      });
      res.set('Content-Length', stream.ContentLength);
      res.set('Last-Modified', stream.LastModified);
      res.set('ETag', stream.ETag);
      stream.on('end', () => {
        console.log('Served by Amazon S3: ');
      });
      stream.pipe(res);
    } catch (error) {
      catchError(error);
    }
  }
}
