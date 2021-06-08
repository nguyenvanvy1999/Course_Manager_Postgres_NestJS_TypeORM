import { Crud, CrudController } from '@nestjsx/crud';
import { ControllerInit } from 'src/decorators';
import { SubtitleCreateDTO, SubtitleUpdateDTO } from '../dtos';
import { Subtitle } from '../models';
import { SubtitleService } from '../services';

@ControllerInit('subtitle')
@Crud({
  model: { type: Subtitle },
  dto: { create: SubtitleCreateDTO, update: SubtitleUpdateDTO },
})
export class SubtitleController implements CrudController<Subtitle> {
  constructor(public service: SubtitleService) {}
}
