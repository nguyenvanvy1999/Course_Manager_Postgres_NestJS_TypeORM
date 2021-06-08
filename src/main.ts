import { INestApplication, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionsFilter } from './common/exceptions';
import { AppLogger, stream } from './common/logger';
import morgan from 'morgan';
import express from 'express';
import helmet from 'helmet';
import path from 'path';
import favicon from 'serve-favicon';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { configService } from './common/config';
import { ResponseAddAccessTokenToHeaderInterceptor } from './common/interceptors';
import cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { logger: AppLogger });
  initMiddleware(app);
  initGlobal(app);
  initSwagger(app);
  const port = process.env.PORT || 3000;
  await app.listen(port);
  log();
}

function initMiddleware(app: INestApplication) {
  app.use(
    morgan(' :method :url :status :res[content-length] - :response-time ms', {
      stream: stream,
    }),
  );
  app.enableCors({
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });
  app.use(cookieParser());
  app.use(helmet());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(favicon(path.join(__dirname, '../public/favicon.ico')));
}

function initSwagger(app: INestApplication) {
  if (configService.swagger) {
    const config = new DocumentBuilder()
      .addBearerAuth()
      .setTitle('Mesthing API')
      .setContact(
        'Nguyen Van Vy',
        'https://github.com/nguyenvanvy1999',
        'nguyenvanvy1999@gmail.com',
      )
      .setDescription('Resort Management API')
      .setVersion('1.0')
      .setLicense('MIT', 'https://opensource.org/licenses/MIT')
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('apis', app, document);
  }
}

function initGlobal(app: INestApplication) {
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new HttpExceptionsFilter());
  app.useGlobalInterceptors(new ResponseAddAccessTokenToHeaderInterceptor());
}

function log() {
  const { port, host, nodeEnv, swagger } = configService;
  console.log('');
  console.log('');
  console.log('');
  console.log(`-------------------------------------------------------`);
  console.log(`Server        : http://${host}:${port}`);
  console.log(`Environment   : ${nodeEnv}`);
  swagger
    ? console.log(`Swagger       : http://${host}:${port}/apis`)
    : console.log('Swagger       : Disable');
  console.log(`-------------------------------------------------------`);
  console.log('');
}
bootstrap();
