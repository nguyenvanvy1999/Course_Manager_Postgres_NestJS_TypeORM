import { Get, Param, Req, Res, BadRequestException } from '@nestjs/common';
import { VideoService } from 'src/core/video/services';
import { ControllerInit } from 'src/decorators';
import { generateStreamResponseConfig } from '../tools';
import { Request, Response } from 'express';
import { AppLogger } from 'src/common/logger';

@ControllerInit('stream')
export class StreamController {
  constructor(private readonly videoService: VideoService) {}

  @Get(':id')
  async streamVideo(
    @Param('id') id: string,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    try {
      // Ensure there is a range given for the video
      const range = req.headers.range;
      if (!range) {
        throw new BadRequestException('Requires Range header');
      }

      const videoPath = await this.videoService.getVideoPathById(id);
      const videoSize = this.videoService.getVideoSizeByPath(videoPath);
      AppLogger.verbose(`Video size: ${videoSize}`);

      const { headers, start, end } = generateStreamResponseConfig(
        range,
        videoSize,
      );

      // HTTP Status 206 for Partial Content
      res.writeHead(206, headers);

      // create video read stream for this particular chunk
      const videoStream = this.videoService.getVideoStream(
        videoPath,
        start,
        end,
      );

      // Stream the video chunk to the client
      videoStream.pipe(res);
    } catch (error) {
      throw error;
    }
  }
}
