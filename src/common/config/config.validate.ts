import joi from 'joi';
import { environmentsConst, tldsConst, envDefaultConst } from './config.const';

export const envValidate = joi
  .object({
    // set env and config
    DEBUG: joi.boolean().default(false),
    TEST: joi.boolean().default(false),
    SEND_MAIL: joi.boolean().default(false),
    NODE_ENV: joi
      .string()
      .valid(...environmentsConst)
      .default(environmentsConst[0]),
    // url and port
    PORT: joi.number().default(envDefaultConst.port),
    URL: joi
      .string()
      .uri({ scheme: [/https?/] })
      .default(envDefaultConst.host),
    // database
    MONGO_URI: joi
      .string()
      .regex(/^mongodb/)
      .default(envDefaultConst.mongoUri),
    // send mail
    SMTP_USER: joi
      .string()
      .email({ minDomainSegments: 2, tlds: { allow: [...tldsConst] } }),
    SMTP_PASSWORD: joi.string(),
    SENDGRID_API_KEY: joi.string(),
    // bcrypt salt
    SALT: joi.number().min(4).max(15).default(10),
    // jwt config
    JWT_SECRET: joi
      .string()
      .regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)
      .min(10)
      .required(),
  })
  .or('SMTP_USER', 'SENDGRID_API_KEY')
  .and('SMTP_USER', 'SMTP_PASSWORD')
  .unknown(true);
