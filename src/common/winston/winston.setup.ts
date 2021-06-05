import { AppConfigModule, AppConfigService } from 'src/common/config';
import winston from 'winston';
import rotateFile from 'winston-daily-rotate-file';

export const winstonModuleSetup = {
  imports: [AppConfigModule],
  inject: [AppConfigService],
  useFactory: (configService: AppConfigService) => {
    return configService.isEnv('dev')
      ? {
          level: 'info',
          format: winston.format.json(),
          defaultMeta: { service: 'user-service' },
          transports: [
            new winston.transports.Console({
              format: winston.format.simple(),
            }),
          ],
        }
      : {
          level: 'info',
          format: winston.format.json(),
          defaultMeta: { service: 'user-service' },
          transports: [
            new winston.transports.File({
              filename: 'logs/error.log',
              level: 'error',
            }),
            new winston.transports.Console({
              format: winston.format.simple(),
            }),
            new rotateFile({
              filename: 'logs/application-%DATE%.log',
              datePattern: 'YYYY-MM-DD',
              zippedArchive: true,
              maxSize: '20m',
              maxFiles: '14d',
            }),
          ],
        };
  },
};
