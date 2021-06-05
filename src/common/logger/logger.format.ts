import { format } from 'winston';
import { configService } from '../config';

const { printf, combine, json, timestamp, simple, colorize, ms } = format;

const logFormat = printf(
  ({ timestamp, level, message }) => `${timestamp} ${level}: ${message}`,
);

export function getFormat() {
  return configService.isDevelopment()
    ? combine(
        timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        json(),
        ms(),
        logFormat,
      )
    : combine(
        timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        logFormat,
        colorize(),
        ms(),
        simple(),
      );
}
