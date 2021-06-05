import { envValidate } from './config.validate';

export const configModuleSetup = {
  cache: true,
  isGlobal: true,
  envFilePath: '.env',
  validationSchema: envValidate,
};
