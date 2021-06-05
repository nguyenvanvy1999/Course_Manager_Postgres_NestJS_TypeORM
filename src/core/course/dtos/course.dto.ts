import { PartialType } from '@nestjs/swagger';
import { CourseCreateDTO } from './course-create.dto';

export class CourseDTO extends PartialType(CourseCreateDTO) {}
