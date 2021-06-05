import { Body, Delete, Get, Param, Patch } from '@nestjs/common';
import { ApiNotFoundResponse } from '@nestjs/swagger';
import { ErrorRes } from 'src/common/exceptions';
import { ApiInit, ControllerInit } from 'src/decorators';
import { AccountDTO, AccountUpdateDTO } from '../dtos';
import { AccountService } from '../services';

@ControllerInit('accounts')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Get()
  @ApiInit('Find all account ', [AccountDTO])
  public async findAll(): Promise<AccountDTO[]> {
    try {
      return await this.accountService.findAll();
    } catch (error) {
      throw error;
    }
  }

  @Get(':id')
  @ApiInit('Find account by id', AccountDTO)
  @ApiNotFoundResponse({ description: 'Account not found', type: ErrorRes })
  public async findById(@Param('id') id: string): Promise<AccountDTO> {
    try {
      return await this.accountService.findById(id);
    } catch (error) {
      throw error;
    }
  }

  @Patch(':id')
  @ApiInit('Update account', AccountDTO)
  public async update(
    @Param('id') id: string,
    @Body() update: AccountUpdateDTO,
  ): Promise<AccountDTO> {
    try {
      return await this.accountService.update(id, update);
    } catch (error) {
      throw error;
    }
  }

  @Delete(':id')
  @ApiInit('Delete account', Boolean)
  public async delete(@Param('id') id: string): Promise<boolean> {
    try {
      return await this.accountService.delete(id);
    } catch (error) {
      throw error;
    }
  }
}
