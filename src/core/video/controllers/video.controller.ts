import {
  Post,
  Body,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
} from '@nestjs/common';
import { ApiInit, ControllerInit } from 'src/decorators';
import { VideoCreateDTO, VideoUpdateDTO } from '../dtos';
import { VideoService } from '../services';
import { Crud, CrudController } from '@nestjsx/crud';
import { Video } from '../models';
import { FileInterceptor } from '@nestjs/platform-express';
import { catchError } from 'src/common/exceptions';

@ControllerInit('video')
@Crud({
  model: { type: Video },
  dto: { create: VideoCreateDTO, update: VideoUpdateDTO },
})
export class VideoController implements CrudController<Video> {
  constructor(public service: VideoService) {}

  @Post('upload')
  @ApiInit('Upload video', VideoCreateDTO) //FIXME: add swagger file here
  @UseInterceptors(FileInterceptor('file'))
  public async create(
    @Body() createVideoDto: VideoCreateDTO,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<VideoCreateDTO> {
    try {
      if (!file) throw new BadRequestException('Video is required');
      return await this.service.create(createVideoDto, file);
    } catch (error) {
      catchError(error);
    }
  }
}
