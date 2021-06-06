import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationQueryDTO } from 'src/core/base/dtos';
import { CommentService } from 'src/core/comment/services';
import { Repository } from 'typeorm';
import {
  CommentReactionCreateDTO,
  CommentReactionDTO,
  CommentReactionUpdatingDTO,
} from '../dto';
import { CommentReaction } from '../models';

@Injectable()
export class CommentReactionService {
  constructor(
    @InjectRepository(CommentReaction)
    private readonly commentReactionRepository: Repository<CommentReaction>,
    private readonly commentService: CommentService,
  ) {}

  public async create(
    create: CommentReactionCreateDTO,
  ): Promise<CommentReactionDTO> {
    try {
      //FIXME: miss check user
      const comment = await this.commentService.findOne(create.commentId);
      if (!comment) throw new NotFoundException('Comment is not exist');
      const commentReaction = await this.commentReactionRepository.save({
        ...create,
        comment,
        createdBy: '',
        updatedBy: '',
      });
      return this.findOne(commentReaction.id);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  public async findAll(
    commentId: string,
    paginationQuery: PaginationQueryDTO,
  ): Promise<{
    data: CommentReactionDTO[];
    totalPage: number;
    totalCount: number;
  }> {
    try {
      const { limit, offset } = paginationQuery;
      const [data, totalCount] =
        await this.commentReactionRepository.findAndCount({
          select: ['id', 'type', 'comment'],
          where: { comment: commentId },
          relations: ['comment'],
          loadRelationIds: true,
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

  public async findOne(id: string): Promise<CommentReactionDTO> {
    try {
      return await this.commentReactionRepository.findOne(id, {
        select: ['id', 'type', 'comment'],
        relations: ['comment'],
      });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async update(
    id: string,
    update: CommentReactionUpdatingDTO,
  ): Promise<CommentReactionDTO> {
    try {
      await this.commentReactionRepository.save({
        id,
        ...update,
      });
      return this.findOne(id);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async remove(id: string): Promise<boolean> {
    try {
      const result = await this.commentReactionRepository.delete(id);
      return result.affected !== null;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
