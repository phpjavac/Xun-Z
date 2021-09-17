import { Module } from '@nestjs/common';
import { ClientProxyFactory } from '@nestjs/microservices';
import { AppController } from './app.controller';
// import { AppService } from './app.service';
import { AuthController } from './controller/auth.controller';
import { UserController } from './controller/user.controller';
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
  ],
})
export class AppModule {}
