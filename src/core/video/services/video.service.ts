import {
  Injectable,
  InternalServerErrorException,
  CACHE_MANAGER,
  Inject,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { VideoCreateDTO, VideoDTO, VideoUpdateDTO } from '../dtos';
import { Video } from '../models';
import fs from 'fs';
import { Cache } from 'cache-manager';
import { AppLogger } from 'src/common/logger';

@Injectable()
export class VideoService {
  constructor(
    @InjectRepository(Video)
    private readonly videoRepository: Repository<Video>,
    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
  ) {}

  public async create(video: VideoCreateDTO): Promise<VideoDTO> {
    try {
      return await this.videoRepository.save(video);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  public async findAll(): Promise<VideoDTO[]> {
    try {
      return await this.videoRepository.find();
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  public async findById(id: string): Promise<VideoDTO> {
    try {
      return await this.videoRepository.findOne({ id });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  public async update(id: string, update: VideoUpdateDTO): Promise<VideoDTO> {
    try {
      return await this.videoRepository.save({ id, ...update });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  public async delete(id: string): Promise<boolean> {
    try {
      const result = await this.videoRepository.delete({ id });
      return result.affected !== null;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  public async getVideoPathById(id: string): Promise<string> {
    try {
      const cachedPath = await this.cacheManager.get(`video-${id}`);
      if (cachedPath && cachedPath !== '') return `${cachedPath}`;
      const video = await this.videoRepository.findOne({ id });
      if (!video)
        throw new NotFoundException(`Video with id ${id} is not existed`);
      const url = video.videoUrl;
      if (!url || url === '')
        throw new NotFoundException(
          `Video with id ${id} does not have a valid url`,
        );
      await this.cacheManager.set(`video-${id}`, url, { ttl: 30 * 60 });
      return url;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
  public getVideoSizeByPath(path: string): number | undefined {
    try {
      return fs.statSync(path).size;
    } catch (error) {
      AppLogger.error(error);
      return undefined;
    }
  }

  public getVideoStream(path: string, start: number, end: number) {
    try {
      return fs.createReadStream(path, { start, end });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
