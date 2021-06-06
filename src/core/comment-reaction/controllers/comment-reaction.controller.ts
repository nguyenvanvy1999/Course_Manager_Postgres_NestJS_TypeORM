import { Post, Get, Delete, Patch, Body, Param, Query } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';
import { FindAllResDTO, PaginationQueryDTO } from 'src/core/base/dtos';
import { ApiInit, ControllerInit } from 'src/decorators';
import {
  CommentReactionCreateDTO,
  CommentReactionDTO,
  CommentReactionUpdatingDTO,
} from '../dto';
import { CommentReactionService } from '../services';

@ControllerInit('comment-reaction')
export class CommentReactionController {
  constructor(
    private readonly commentReactionService: CommentReactionService,
  ) {}

  @Post()
  @ApiOperation({ description: 'Create new comment reaction' })
  @ApiCreatedResponse({ description: 'OK', type: CommentReactionDTO })
  public async create(
    @Body() create: CommentReactionCreateDTO,
  ): Promise<CommentReactionDTO> {
    try {
      return await this.commentReactionService.create(create);
    } catch (error) {
      throw error;
    }
  }

  @Get('/comment/:commentId')
  @ApiInit('Get all reaction of comment', FindAllResDTO)
  public async findAll(
    @Query() paginationQuery: PaginationQueryDTO,
    @Param('commentId') commentId: string,
  ): Promise<{
    data: CommentReactionDTO[];
    totalPage: number;
    totalCount: number;
  }> {
    try {
      return await this.commentReactionService.findAll(
        commentId,
        paginationQuery,
      );
    } catch (error) {
      throw error;
    }
  }

  @Get(':id')
  @ApiInit('Get reaction by id', CommentReactionDTO)
  public async findOne(@Param('id') id: string): Promise<CommentReactionDTO> {
    try {
      return await this.commentReactionService.findOne(id);
    } catch (error) {
      throw error;
    }
  }

  @Patch(':id')
  @ApiInit('Update reaction', CommentReactionDTO)
  async update(
    @Param('id') id: string,
    @Body() update: CommentReactionUpdatingDTO,
  ): Promise<CommentReactionDTO> {
    try {
      return await this.commentReactionService.update(id, update);
    } catch (error) {
      throw error;
    }
  }

  @Delete(':id')
  @ApiInit('Delete reaction', Boolean)
  public async remove(@Param('id') id: string): Promise<boolean> {
    try {
      return this.commentReactionService.remove(id);
    } catch (error) {
      throw error;
    }
  }
}
