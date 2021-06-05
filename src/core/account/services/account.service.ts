import {
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AccountDTO, AccountUpdateDTO } from '../dtos';
import { Account } from '../models';
import { mapAccountToAccountDTO } from '../tools';

export class AccountService {
  constructor(
    @InjectRepository(Account)
    private readonly accountRepository: Repository<Account>,
  ) {}

  public async findOne(username: string): Promise<Account | undefined> {
    try {
      return this.accountRepository.findOne({ where: { username } });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  public async findAll(): Promise<AccountDTO[]> {
    try {
      const accounts = await this.accountRepository.find();
      return accounts.map(mapAccountToAccountDTO);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  public async findById(id: string): Promise<AccountDTO> {
    try {
      const account = await this.accountRepository.findOne({ id });
      if (!account)
        throw new NotFoundException(`Account with id ${id} is not found`);
      return mapAccountToAccountDTO(account);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  public async update(
    id: string,
    update: AccountUpdateDTO,
  ): Promise<AccountDTO> {
    try {
      const account = await this.accountRepository.save({ id, ...update });
      return mapAccountToAccountDTO(account);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  public async remove(id: string): Promise<boolean> {
    try {
      const result = await this.accountRepository.delete({ id });
      return result.affected !== null;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
