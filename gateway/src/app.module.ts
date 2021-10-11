import { Module } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { ClientProxyFactory } from '@nestjs/microservices';
import { AuthController } from './controller/auth.controller';
import { UserController } from './controller/user.controller';
import { HttpExceptionFilter } from './providers/interceptor/http-exception.filter';
import { ApiInterceptor } from './providers/interceptor/api.interceptor';
import { ConfigService } from './services/config/config.service';

@Module({
  imports: [],
  controllers: [UserController, AuthController],
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
    { provide: APP_INTERCEPTOR, useClass: ApiInterceptor },
    { provide: APP_FILTER, useClass: HttpExceptionFilter },
  ],
})
export class AppModule {}
