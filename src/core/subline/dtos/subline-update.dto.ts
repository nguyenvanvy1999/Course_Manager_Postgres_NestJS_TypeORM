import { PartialType } from '@nestjs/swagger';
import { SubLineCreateDTO } from './subline-create.dto';

export class SubLineUpdateDTO extends PartialType(SubLineCreateDTO) {}
