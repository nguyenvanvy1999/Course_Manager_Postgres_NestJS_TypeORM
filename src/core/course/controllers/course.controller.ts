import { Body, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';
import { ApiInit, ControllerInit } from 'src/decorators';
import { CourseCreateDTO, CourseDTO, CourseUpdateDTO } from '../dtos';
import { CourseService } from '../services';

@ControllerInit('courses')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @Get()
  @ApiInit('Get all course', [CourseDTO])
  public async getAll(): Promise<CourseDTO[]> {
    try {
      return await this.courseService.findAll();
    } catch (error) {
      throw error;
    }
  }

  @Get(':id')
  @ApiInit('Get course by id', CourseDTO)
  public async findOne(@Param('id') id: string): Promise<CourseDTO> {
    try {
      return await this.courseService.findById(id);
    } catch (error) {
      throw error;
    }
  }

  @Post()
  @ApiOperation({ description: 'Create new course' })
  @ApiCreatedResponse({ description: 'OK', type: CourseDTO })
  public async create(@Body() body: CourseCreateDTO): Promise<CourseDTO> {
    try {
      return await this.courseService.create(body);
    } catch (error) {
      throw error;
    }
  }

  @Patch(':id')
  @ApiInit('Update course', CourseDTO)
  public async update(
    @Param(':id') id: string,
    @Body() update: CourseUpdateDTO,
  ): Promise<CourseDTO> {
    try {
      return await this.courseService.update(id, update);
    } catch (error) {
      throw error;
    }
  }

  @Delete(':id')
  @ApiInit('Delete course', Boolean)
  public async delete(@Param('id') id: string): Promise<boolean> {
    try {
      return await this.courseService.delete(id);
    } catch (error) {
      throw error;
    }
  }
}
