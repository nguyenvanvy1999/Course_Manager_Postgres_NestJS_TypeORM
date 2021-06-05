import { PartialType } from '@nestjs/swagger';
import { AccountCreateDTO } from './account-create.dto';

export class AccountUpdateDTO extends PartialType(AccountCreateDTO) {}
