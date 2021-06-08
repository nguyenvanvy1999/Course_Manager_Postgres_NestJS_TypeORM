import { Crud } from '@nestjsx/crud';
import { ControllerInit } from 'src/decorators';
import { SubLineCreateDTO, SubLineUpdateDTO } from '../dtos';
import { SubLine } from '../models';
import { SubLineService } from '../services';
import { CrudController } from '@nestjsx/crud';
@ControllerInit('subline')
@Crud({
  model: { type: SubLine },
  dto: { create: SubLineCreateDTO, update: SubLineUpdateDTO },
})
export class SubLineController implements CrudController<SubLine> {
  constructor(public service: SubLineService) {}
}
