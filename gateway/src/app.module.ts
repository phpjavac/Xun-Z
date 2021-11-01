import { Module } from '@nestjs/common';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { ClientProxyFactory } from '@nestjs/microservices';
import { AuthController } from './controller/auth.controller';
import { UserController } from './controller/user.controller';
import { BlogController } from './controller/blog.controller';
import { HttpExceptionFilter } from './providers/interceptor/http-exception.filter';
import { ApiInterceptor } from './providers/interceptor/api.interceptor';
import { ConfigService } from './services/config/config.service';
import { AuthTokenMiddleware } from './middleware/auth.middleware';
import { AuthGuard } from './services/guards/authorization.guard';

@Module({
  imports: [],
  controllers: [UserController, AuthController, BlogController],
  providers: [
    ConfigService,
    {
      provide: 'AUTH_SERVICE',
      useFactory: (configService: ConfigService) => {
        return ClientProxyFactory.create(configService.get('auth'));
      },
      inject: [ConfigService],
    },
    {
      provide: 'USER_SERVICE',
      useFactory: (configService: ConfigService) => {
        return ClientProxyFactory.create(configService.get('user'));
      },
      inject: [ConfigService],
    },
    {
      provide: 'BLOG_SERVICE',
      useFactory: (configService: ConfigService) => {
        return ClientProxyFactory.create(configService.get('blog'));
      },
      inject: [ConfigService],
    },
    { provide: APP_INTERCEPTOR, useClass: ApiInterceptor },
    { provide: APP_FILTER, useClass: HttpExceptionFilter },
    { provide: APP_GUARD, useClass: AuthGuard },
  ],
})
export class AppModule {}
