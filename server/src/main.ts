import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { json, urlencoded } from 'express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.use(json({ limit: '50mb' })); // Set the desired limit
  app.use(urlencoded({ extended: true, limit: '50mb' }));
  app.enableCors({
    origin: ['http://localhost:81'], // Set the allowed origin(s)
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type,Authorization',
  });

  app.use((req, res, next) => {
    res.on('finish', () => {
      console.log(
        'CORS headers:',
        res.getHeaders()['access-control-allow-origin'],
      );
    });
    next();
  });
  await app.listen(3009);
}
bootstrap();
