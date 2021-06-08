import { Crud, CrudController } from '@nestjsx/crud';
import { Roles } from 'src/core/auth/decorators';
import { Role } from 'src/core/auth/interfaces';
import { ControllerInit } from 'src/decorators';
import { Course } from '../models';
import { CourseService } from '../services';

@ControllerInit('course')
@Crud({
  model: { type: Course },
  routes: {
    only: [
      'createOneBase',
      'deleteOneBase',
      'getOneBase',
      'updateOneBase',
      'getManyBase',
    ],
    createOneBase: { decorators: [Roles(Role.Admin)] },
  },
})
export class CourseController implements CrudController<Course> {
  constructor(public service: CourseService) {}
}
