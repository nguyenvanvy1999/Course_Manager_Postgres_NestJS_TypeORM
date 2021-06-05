import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationQueryDTO } from 'src/core/base/dtos';
import { SubtitleService } from 'src/core/subtitle/services';
import { Repository } from 'typeorm';
import { SubLineCreateDTO, SubLineDTO, SubLineUpdateDTO } from '../dtos';
import { SubLine } from '../models';

@Injectable()
export class SubLineService {
  constructor(
    @InjectRepository(SubLine)
    private readonly sublineRepository: Repository<SubLine>,
    private readonly subtitleService: SubtitleService,
  ) {}

  public async create(
    subLineCreationDTO: SubLineCreateDTO,
  ): Promise<SubLineDTO> {
    try {
      //FIXME: miss check supporter
      const subtitle = await this.subtitleService.findById(
        subLineCreationDTO.subtitleId,
      );
      if (!subtitle) throw new NotFoundException('Subtitle is not exist');
      const subLine = await this.sublineRepository.save({
        subtitle,
        content: subLineCreationDTO.content,
        timestamp: new Date(subLineCreationDTO.timestamp).toISOString(),
        createdBy: '',
        updatedBy: '',
      });
      return await this.findById(subLine.id);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  public async findAll(paginationQuery: PaginationQueryDTO): Promise<{
    data: SubLineDTO[];
    totalPage: number;
    totalCount: number;
  }> {
    try {
      const { limit, offset } = paginationQuery;
      const [data, totalCount] = await this.sublineRepository.findAndCount({
        select: ['id', 'timestamp', 'content', 'subtitle'],
        relations: ['subtitle'],
        skip: offset,
        take: limit,
        order: { id: 'DESC' },
      });
      return {
        data,
        totalPage: Math.ceil(totalCount / limit),
        totalCount,
      };
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  public async findById(id: string): Promise<SubLineDTO> {
    try {
      return await this.sublineRepository.findOne(id, {
        select: ['id', 'timestamp', 'content', 'subtitle'],
        relations: ['subtitle'],
      });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  public async update(
    id: string,
    subLineUpdatingDTO: SubLineUpdateDTO,
  ): Promise<SubLineDTO> {
    try {
      const subtitle = await this.sublineRepository.preload({
        id,
        ...subLineUpdatingDTO,
      });
      const subLine = await this.sublineRepository.save(subtitle);
      return await this.findById(subLine.id);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  public async delete(id: string): Promise<boolean> {
    try {
      const result = await this.sublineRepository.delete(id);
      return result.affected !== null;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
