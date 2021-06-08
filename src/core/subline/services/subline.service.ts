import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Repository } from 'typeorm';
import { SubLine } from '../models';

@Injectable()
export class SubLineService extends TypeOrmCrudService<SubLine> {
  constructor(
    @InjectRepository(SubLine)
    private readonly sublineRepository: Repository<SubLine>,
  ) {
    super(sublineRepository);
  }
}
