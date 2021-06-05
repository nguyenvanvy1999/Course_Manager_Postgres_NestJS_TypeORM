import { Post, Get, Patch, Delete, Param, Body } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';
import { ApiInit, ControllerInit } from 'src/decorators';
import { VideoCreateDTO, VideoDTO, VideoUpdateDTO } from '../dtos';
import { VideoService } from '../services';

@ControllerInit('video')
export class VideoController {
  constructor(private readonly videoService: VideoService) {}

  @Post()
  @ApiOperation({ description: 'Create new video' })
  @ApiCreatedResponse({ description: 'OK', type: VideoDTO })
  public async create(
    @Body() createVideoDto: VideoCreateDTO,
  ): Promise<VideoDTO> {
    try {
      return await this.videoService.create(createVideoDto);
    } catch (error) {
      throw error;
    }
  }

  @Get()
  @ApiInit('Find all video', [VideoDTO])
  public async findAll(): Promise<VideoDTO[]> {
    try {
      return await this.videoService.findAll();
    } catch (error) {
      throw error;
    }
  }

  @Get(':id')
  @ApiInit('Find video by id', VideoDTO)
  public async findOne(@Param('id') id: string): Promise<VideoDTO> {
    try {
      return await this.videoService.findById(id);
    } catch (error) {
      throw error;
    }
  }

  @Patch(':id')
  @ApiInit('Update video', VideoDTO)
  public async update(
    @Param('id') id: string,
    @Body() updateVideoDto: VideoUpdateDTO,
  ): Promise<VideoDTO> {
    try {
      return await this.videoService.update(id, updateVideoDto);
    } catch (error) {
      throw error;
    }
  }

  @Delete(':id')
  @ApiInit('Delete video', VideoDTO)
  public async remove(@Param('id') id: string): Promise<boolean> {
    try {
      return await this.videoService.delete(id);
    } catch (error) {
      throw error;
    }
  }
}
