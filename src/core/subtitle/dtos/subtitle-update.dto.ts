import { PartialType } from '@nestjs/swagger';
import { SubtitleCreateDTO } from './subtitle-create.dto';

export class SubtitleUpdateDTO extends PartialType(SubtitleCreateDTO) {}
