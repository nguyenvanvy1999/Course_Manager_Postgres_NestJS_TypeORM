import { Post, Get, Delete, Patch, Body, Param, Query } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';
import { FindAllResDTO, PaginationQueryDTO } from 'src/core/base/dtos';
import { ApiInit, ControllerInit } from 'src/decorators';
import { SubLineCreateDTO, SubLineDTO, SubLineUpdateDTO } from '../dtos';
import { SubLineService } from '../services';

@ControllerInit('subline')
export class SubLineController {
  constructor(private readonly sublineService: SubLineService) {}

  @Post()
  @ApiOperation({ description: 'Create subline' })
  @ApiCreatedResponse({ description: 'OK', type: SubLineDTO })
  public async create(
    @Body() subLineCreationDTO: SubLineCreateDTO,
  ): Promise<SubLineDTO> {
    try {
      return await this.sublineService.create(subLineCreationDTO);
    } catch (error) {
      throw error;
    }
  }

  @Get()
  @ApiInit('Find all subline', FindAllResDTO)
  public async findAll(@Query() paginationQuery: PaginationQueryDTO): Promise<{
    data: SubLineDTO[];
    totalPage: number;
    totalCount: number;
  }> {
    try {
      return await this.sublineService.findAll(paginationQuery);
    } catch (error) {
      throw error;
    }
  }

  @Get(':id')
  @ApiInit('Get subline by id', SubLineDTO)
  public async findOne(@Param('id') id: string): Promise<SubLineDTO> {
    try {
      return await this.sublineService.findById(id);
    } catch (error) {
      throw error;
    }
  }

  @Patch(':id')
  @ApiInit('Update subline', SubLineDTO)
  public async update(
    @Param('id') id: string,
    @Body() subLineUpdatingDTO: SubLineUpdateDTO,
  ): Promise<SubLineDTO> {
    try {
      return await this.sublineService.update(id, subLineUpdatingDTO);
    } catch (error) {
      throw error;
    }
  }

  @Delete(':id')
  @ApiInit('Delete subline', Boolean)
  async remove(@Param('id') id: string): Promise<boolean> {
    try {
      return await this.sublineService.delete(id);
    } catch (error) {
      throw error;
    }
  }
}
