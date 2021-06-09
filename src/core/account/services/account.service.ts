import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { catchError } from 'src/common/exceptions';
import { Repository } from 'typeorm';
import { AccountDTO, AccountUpdateDTO } from '../dtos';
import { Account } from '../models';
import { mapAccountToAccountDTO } from '../tools';

@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(Account)
    private readonly accountRepository: Repository<Account>,
  ) {}

  public async findOne(username: string): Promise<Account | undefined> {
    try {
      return this.accountRepository.findOne({ where: { username } });
    } catch (error) {
      catchError(error);
    }
  }

  public async findAll(): Promise<AccountDTO[]> {
    try {
      const accounts = await this.accountRepository.find();
      return accounts.map(mapAccountToAccountDTO);
    } catch (error) {
      catchError(error);
    }
  }

  public async findById(id: string): Promise<AccountDTO> {
    try {
      const account = await this.accountRepository.findOne({ id });
      if (!account)
        throw new NotFoundException(`Account with id ${id} is not found`);
      return mapAccountToAccountDTO(account);
    } catch (error) {
      catchError(error);
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
      catchError(error);
    }
  }

  public async delete(id: string): Promise<boolean> {
    try {
      const result = await this.accountRepository.delete({ id });
      return result.affected !== null;
    } catch (error) {
      catchError(error);
    }
  }
}
