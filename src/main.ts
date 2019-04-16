import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MyLogger } from './middlewares/logger.middleware';
import { ValidationPipe } from './pipes/validation.pipe';

declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { logger: new MyLogger() });
  // app.useGlobalPipes(new ValidationPipe());
  // app.use(logger);
  await app.listen(3000);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
