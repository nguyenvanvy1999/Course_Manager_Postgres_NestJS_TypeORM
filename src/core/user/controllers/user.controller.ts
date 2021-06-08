import { ControllerInit } from 'src/decorators';
import { Crud, CrudController } from '@nestjsx/crud';
import { User } from '../models';
import { UserService } from '../services';

@ControllerInit('user')
@Crud({
  model: { type: User },
})
export class UserController implements CrudController<User> {
  constructor(public service: UserService) {}
}
