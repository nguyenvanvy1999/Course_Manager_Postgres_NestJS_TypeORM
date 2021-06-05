import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SubtitleService } from 'src/core/subtitle/services';
import { Repository } from 'typeorm';
import { SubLine } from '../models';

@Injectable()
export class SubLineService {
  constructor(
    @InjectRepository(SubLine)
    private readonly sublineRepository: Repository<SubLine>,
    private readonly subtitleService: SubtitleService,
  ) {}
}
