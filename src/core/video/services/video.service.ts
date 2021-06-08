import {
  Injectable,
  InternalServerErrorException,
  CACHE_MANAGER,
  Inject,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { VideoCreateDTO } from '../dtos';
import { Video } from '../models';
import fs from 'fs';
import { Cache } from 'cache-manager';
import { AppLogger } from 'src/common/logger';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { FileUpload } from 'src/core/file-upload/interfaces';
import { FileUploadByS3 } from 'src/core/file-upload/strategies';
import { catchError } from 'src/common/exceptions';
import { CourseService } from 'src/core/course/services';

@Injectable()
export class VideoService extends TypeOrmCrudService<Video> {
  private fileUpload: FileUpload;
  constructor(
    @InjectRepository(Video)
    private readonly videoRepository: Repository<Video>,
    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
    private readonly courseService: CourseService,
  ) {
    super(videoRepository);
    this.fileUpload = new FileUploadByS3();
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

  public async create(
    createVideoDto: VideoCreateDTO,
    file: Express.Multer.File,
  ): Promise<VideoCreateDTO> {
    try {
      const course = await this.courseService.findOne(createVideoDto.courseId);
      if (!course) throw new BadRequestException('Course is not exist');
      const video = await this.videoRepository.save({
        ...createVideoDto,
        course,
        createdBy: '',
        updatedBy: '',
      });
      this.fileUpload
        .uploadVideo(file)
        .then(async (result) => {
          video.videoUrl = result.Location;
          await this.videoRepository.save(video);
        })
        .catch(() => {
          throw new BadRequestException('Upload video fail');
        });
      return video;
    } catch (error) {
      catchError(error);
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
      catchError(error);
    }
  }
}
