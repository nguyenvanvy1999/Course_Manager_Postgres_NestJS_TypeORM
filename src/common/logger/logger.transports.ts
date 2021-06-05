import { transports, format } from 'winston';
import { utilities } from 'nest-winston';
import winstonDaily from 'winston-daily-rotate-file';
import { logDir } from './logger.const';
import { configService } from '../config';
const { combine, timestamp, simple, ms, json } = format;

export const winstonTransport = [
  configService.isDevelopment()
    ? new transports.Console({
        format: combine(timestamp(), ms(), utilities.format.nestLike()),
      })
    : new transports.Console({
        format: combine(timestamp(), ms(), simple(), json()),
      }),
  new winstonDaily({
    filename: `${logDir}/app/app-%DATE%.log`,
    datePattern: 'YYYY-MM-DD',
    zippedArchive: true,
    handleExceptions: true,
    maxSize: '20m',
    maxFiles: 30,
  }),
  new winstonDaily({
    filename: `${logDir}/error/error-%DATE%.log`,
    level: 'error',
    datePattern: 'YYYY-MM-DD',
    zippedArchive: true,
    handleExceptions: true,
    maxSize: '20m',
    maxFiles: 30,
  }),
];
