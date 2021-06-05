import { ControllerInit } from 'src/decorators';
import { SubLineService } from '../services';

@ControllerInit('subline')
export class SubLineController {
  constructor(private readonly sublineService: SubLineService) {}
}
