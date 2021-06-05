import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationQueryDTO } from 'src/core/base/dtos';
import { Repository } from 'typeorm';
import { SubtitleCreateDTO, SubtitleUpdateDTO } from '../dtos';
import { Subtitle } from '../models';

@Injectable()
export class SubtitleService {
  constructor(
    @InjectRepository(Subtitle)
    private readonly subtitleRepository: Repository<Subtitle>,
  ) {}

  public async create(
    subtitleCreationDTO: SubtitleCreateDTO,
  ): Promise<Subtitle> {
    try {
      //FIXME:miss check video and supporter
      return await this.subtitleRepository.save({
        ...subtitleCreationDTO,
        createdBy: '',
        updatedBy: '',
      });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  public async findAll(paginationQuery: PaginationQueryDTO): Promise<{
    data: Subtitle[];
    totalPage: number;
    totalCount: number;
  }> {
    try {
      const { limit, offset } = paginationQuery;
      const [data, totalCount] = await this.subtitleRepository.findAndCount({
        skip: offset,
        take: limit,
        order: { createdAt: 'DESC' },
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

  public async findById(id: string): Promise<Subtitle> {
    try {
      return await this.subtitleRepository.findOne(id);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  public async update(
    id: string,
    subtitleUpdatingDTO: SubtitleUpdateDTO,
  ): Promise<Subtitle> {
    try {
      const subtitle = await this.subtitleRepository.preload({
        id,
        ...subtitleUpdatingDTO,
      });
      return await this.subtitleRepository.save(subtitle);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  public async delete(id: string): Promise<boolean> {
    try {
      const result = await this.subtitleRepository.delete(id);
      return result.affected !== null;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
