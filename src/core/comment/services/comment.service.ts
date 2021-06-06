import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationQueryDTO } from 'src/core/base/dtos';
import { Repository } from 'typeorm';
import { CommentCreateDTO, CommentDTO, CommentUpdateDTO } from '../dtos';
import { Comment } from '../models';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
  ) {}

  public async create(data: CommentCreateDTO): Promise<CommentDTO> {
    try {
      // FIXME:miss check video and user
      const comment = await this.commentRepository.save({
        ...data,
        createdBy: '',
        updatedBy: '',
      });
      return await this.findOne(comment.id);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  public async findAll(paginationQuery: PaginationQueryDTO): Promise<{
    data: CommentDTO[];
    totalPage: number;
    totalCount: number;
  }> {
    try {
      const { limit, offset } = paginationQuery;
      const [data, totalCount] = await this.commentRepository.findAndCount({
        select: ['id', 'content'],
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

  public async findOne(id: string): Promise<CommentDTO> {
    try {
      return await this.commentRepository.findOne(id, {
        select: ['id', 'content'],
      });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  public async update(
    id: string,
    update: CommentUpdateDTO,
  ): Promise<CommentDTO> {
    try {
      const comment = await this.commentRepository.preload({
        id,
        ...update,
      });
      await this.commentRepository.save(comment);
      return await this.findOne(comment.id);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  public async delete(id: string): Promise<boolean> {
    try {
      const result = await this.commentRepository.delete(id);
      return result.affected !== null;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
