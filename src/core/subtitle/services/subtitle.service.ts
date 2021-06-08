import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Repository } from 'typeorm';
import { Subtitle } from '../models';

@Injectable()
export class SubtitleService extends TypeOrmCrudService<Subtitle> {
  constructor(
    @InjectRepository(Subtitle)
    private readonly subtitleRepository: Repository<Subtitle>,
  ) {
    super(subtitleRepository);
  }
}
