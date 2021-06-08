import { Crud, CrudController } from '@nestjsx/crud';
import { ControllerInit } from 'src/decorators';
import { Role } from '../models';
import { RoleService } from '../services';

@ControllerInit('role')
@Crud({ model: { type: Role } })
export class RoleController implements CrudController<Role> {
  constructor(public service: RoleService) {}
}
