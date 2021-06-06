import { Request } from 'express';
import { Account } from 'src/core/account/models';

export interface RequestWithAccount extends Request {
  account: Account;
}
