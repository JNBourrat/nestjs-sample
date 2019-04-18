import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { logger, MyLogger } from './middlewares/logger.middleware';

declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { logger: new MyLogger() });
  app.use(logger);
  app.enableCors();
  await app.listen(3000);
}

bootstrap();
