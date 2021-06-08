import { Post, Body } from '@nestjs/common';
import { ApiInit, ControllerInit } from 'src/decorators';
import { VideoCreateDTO, VideoUpdateDTO } from '../dtos';
import { VideoService } from '../services';
import { Crud, CrudController } from '@nestjsx/crud';
import { Video } from '../models';
import { catchError } from 'src/common/exceptions';

@ControllerInit('video')
@Crud({
  model: { type: Video },
  dto: { create: VideoCreateDTO, update: VideoUpdateDTO },
  routes: {
    only: [
      'createOneBase',
      'deleteOneBase',
      'getOneBase',
      'updateOneBase',
      'getManyBase',
    ],
  },
})
export class VideoController implements CrudController<Video> {
  constructor(public service: VideoService) {}

  @Post('upload')
  @ApiInit('Upload video', VideoCreateDTO)
  public async create(@Body() video: VideoCreateDTO): Promise<VideoCreateDTO> {
    try {
      return await this.service.create(video);
    } catch (error) {
      catchError(error);
    }
  }
}
