import { ControllerInit } from 'src/decorators';
import { CourseService } from '../services';

@ControllerInit('courses')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}
}
