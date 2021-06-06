import { Post, Get, Delete, Patch, Body, Query, Param } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';
import { FindAllResDTO, PaginationQueryDTO } from 'src/core/base/dtos';
import { ApiInit, ControllerInit } from 'src/decorators';
import { CommentCreateDTO, CommentDTO, CommentUpdateDTO } from '../dtos';
import { CommentService } from '../services';

@ControllerInit('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post()
  @ApiOperation({ description: 'Create new comment' })
  @ApiCreatedResponse({ description: 'OK', type: CommentDTO })
  public async create(@Body() create: CommentCreateDTO): Promise<CommentDTO> {
    try {
      return await this.commentService.create(create);
    } catch (error) {
      throw error;
    }
  }

  @Get()
  @ApiInit('Find all comment', FindAllResDTO)
  public async findAll(@Query() paginationQuery: PaginationQueryDTO): Promise<{
    data: CommentDTO[];
    totalPage: number;
    totalCount: number;
  }> {
    try {
      return await this.commentService.findAll(paginationQuery);
    } catch (error) {
      throw error;
    }
  }

  @Get(':id')
  @ApiInit('Find comment by id', CommentDTO)
  public async findOne(@Param('id') id: string): Promise<CommentDTO> {
    try {
      return await this.commentService.findOne(id);
    } catch (error) {
      throw error;
    }
  }

  @Patch(':id')
  @ApiInit('Update comment', CommentDTO)
  public async update(
    @Param('id') id: string,
    @Body() update: CommentUpdateDTO,
  ): Promise<CommentDTO> {
    try {
      return await this.commentService.update(id, update);
    } catch (error) {
      throw error;
    }
  }

  @Delete(':id')
  @ApiInit('Delete comment', Boolean)
  public async remove(@Param('id') id: string): Promise<boolean> {
    try {
      return this.commentService.delete(id);
    } catch (error) {
      throw error;
    }
  }
}
