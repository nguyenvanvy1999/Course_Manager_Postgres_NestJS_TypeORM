import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { AppLogger } from '../logger';
import { Response, Request } from 'express';
import { ErrorRes } from './dtos';
import { configService } from '../config';

@Catch()
export class HttpExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    AppLogger.error(exception);
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;
    if (
      status === HttpStatus.UNAUTHORIZED &&
      request.originalUrl === '/auth/profile'
    ) {
      response.setHeader(
        'Access-Control-Allow-Origin',
        configService.getClientUrl(),
      );
      response.setHeader(
        'Set-Cookie',
        `Authentication=; HttpOnly; Path=/; Max-Age=0;SameSite=None; Secure`,
      );
      response.status(HttpStatus.OK).send();
      return;
    }
    let message: any =
      exception instanceof HttpException
        ? exception.getResponse()
        : 'Internal server';
    message = message instanceof Object ? message.message : message;
    if (message instanceof Array) {
      for (let i = 0; i < message.length; i++) {
        if (message[i].split(' ')[0].includes('.')) {
          const customMessage = message[i].split(' ');
          customMessage[0] = customMessage[0].split('.')[2];
          message[i] = customMessage.join(' ');
        }
      }
    }
    response.setHeader(
      'Access-Control-Allow-Origin',
      configService.getClientUrl(),
    );
    const res: ErrorRes = {
      status,
      timestamp: new Date().toLocaleString(),
      method: request.method,
      path: request.url,
      message,
    };
    response.status(status).json(res);
  }
}
