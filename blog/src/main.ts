import { NestFactory } from '@nestjs/core';
import { BlogModule } from './blog.module';
import { Logger } from '@nestjs/common';
import { ConfigService } from './services/config/config.service';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    BlogModule,
    {
      transport: Transport.TCP,
      options: {
        port: new ConfigService().get('port'),
      },
    },
  );
  await app.listen();
  Logger.log('BLOG_SERVER onSuccess');
}
bootstrap();
