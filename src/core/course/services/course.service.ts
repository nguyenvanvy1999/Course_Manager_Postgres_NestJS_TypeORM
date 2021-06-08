import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CourseCreateDTO, CourseDTO, CourseUpdateDTO } from '../dtos';
import { Course } from '../models';

@Injectable()
export class CourseService {
  constructor(
    @InjectRepository(Course)
    private readonly courseRepository: Repository<Course>,
  ) {}

  public async findAll(): Promise<CourseDTO[]> {
    try {
      return await this.courseRepository.find();
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  public async findOne(id: string): Promise<CourseDTO> {
    try {
      return await this.courseRepository.findOne({ id });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  public async update(id: string, update: CourseUpdateDTO): Promise<CourseDTO> {
    try {
      return await this.courseRepository.save({ id, ...update });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  public async delete(id: string): Promise<boolean> {
    try {
      const result = await this.courseRepository.delete({ id });
      return result.affected !== null;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  public async create(course: CourseCreateDTO): Promise<CourseDTO> {
    try {
      return await this.courseRepository.save(course);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
