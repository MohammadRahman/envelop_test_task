import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { json, urlencoded } from 'express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.use(json({ limit: '50mb' })); // Set the desired limit
  app.use(urlencoded({ extended: true, limit: '50mb' }));
  app.enableCors({
    origin: 'http://localhost:5173', // Set the allowed origin(s)
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type,Authorization',
  });
  await app.listen(3009);
}
bootstrap();
