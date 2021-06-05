import { Post, Get, Delete, Patch, Body, Param, Query } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';
import { FindAllResDTO, PaginationQueryDTO } from 'src/core/base/dtos';
import { ApiInit, ControllerInit } from 'src/decorators';
import { SubtitleCreateDTO, SubtitleDTO, SubtitleUpdateDTO } from '../dtos';
import { Subtitle } from '../models';
import { SubtitleService } from '../services';

@ControllerInit('subtitle')
export class SubtitleController {
  constructor(private readonly subtitleService: SubtitleService) {}

  @Post()
  @ApiOperation({ description: 'Create new subtitle' })
  @ApiCreatedResponse({ description: 'OK', type: SubtitleDTO })
  public async create(
    @Body() subtitleCreationDTO: SubtitleCreateDTO,
  ): Promise<SubtitleDTO> {
    try {
      return await this.subtitleService.create(subtitleCreationDTO);
    } catch (error) {
      throw error;
    }
  }

  @Get()
  @ApiInit('Find all subtitle', FindAllResDTO)
  public async findAll(@Query() paginationQuery: PaginationQueryDTO): Promise<{
    data: SubtitleDTO[];
    totalPage: number;
    totalCount: number;
  }> {
    try {
      return await this.subtitleService.findAll(paginationQuery);
    } catch (error) {
      throw error;
    }
  }

  @Get(':id')
  @ApiInit('Get subtitle by id', SubtitleDTO)
  public async findOne(@Param('id') id: string): Promise<Subtitle> {
    try {
      return await this.subtitleService.findById(id);
    } catch (error) {
      throw error;
    }
  }

  @Patch(':id')
  @ApiInit('Update subtitle', SubtitleDTO)
  public async update(
    @Param('id') id: string,
    @Body() subtitleUpdatingDTO: SubtitleUpdateDTO,
  ): Promise<Subtitle> {
    try {
      return await this.subtitleService.update(id, subtitleUpdatingDTO);
    } catch (error) {
      throw error;
    }
  }

  @Delete(':id')
  @ApiInit('Delete subtitle', Boolean)
  async remove(@Param('id') id: string): Promise<boolean> {
    try {
      return this.subtitleService.delete(id);
    } catch (error) {
      throw error;
    }
  }
}
