/* eslint-disable @typescript-eslint/ban-types */
import { Catch, ArgumentsHost } from '@nestjs/common';
import { BaseWsExceptionFilter, WsException } from '@nestjs/websockets';
import { AppLogger } from 'src/common/logger';
import { isObject } from '@nestjs/common/utils/shared.utils';
import { WsErrorRes } from './dtos';

@Catch()
export class WebsocketsExceptionFilter extends BaseWsExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    super.catch(exception, host);
  }
  handleError<TClient extends { emit: Function }>(
    client: TClient,
    exception: Error,
  ) {
    if (!(exception instanceof WsException)) {
      return this.handleUnknownError(exception, client);
    }
    const result = exception.getError();
    const tmp: WsErrorRes = {
      name: exception.name ? exception.name : 'Error',
      message: isObject(result) ? result : { message: exception.message },
      time: new Date().toLocaleString(),
    };
    AppLogger.error(tmp);
    client.emit('exception', tmp);
  }
}
