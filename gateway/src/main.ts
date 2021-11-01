import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { logger } from './middleware/logger.middleware';
import { AuthTokenMiddleware } from './middleware/auth.middleware';

// const AuthTokenMiddleware = require('./middleware/auth.middleware')
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const options = new DocumentBuilder()
    .setTitle('Daosheng API docs')
    .addServer('api/v1')
    .addTag('users')
    .addTag('auth')
    .addTag('blog')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('', app, document);

  app.setGlobalPrefix('api/v1');
  app.use(logger);
  // app.use(new AuthTokenMiddleware());
  // app.use(AuthTokenMiddleware);

  await app.listen(3000);
}
bootstrap();
