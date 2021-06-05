import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from '../models';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
  ) {}

  public async create(name: string, createdBy: string): Promise<void> {
    await this.roleRepository.save({ name, createdBy, updatedBy: createdBy });
  }
}
