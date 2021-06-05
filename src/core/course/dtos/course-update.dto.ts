import { PartialType } from '@nestjs/swagger';
import { CourseCreateDTO } from './course-create.dto';

export class CourseUpdateDTO extends PartialType(CourseCreateDTO) {}
