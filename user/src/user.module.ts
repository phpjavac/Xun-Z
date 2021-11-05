import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { ConfigService } from './services/config/config.service';
import { User } from './users/user.entity';
import { ClientProxyFactory } from '@nestjs/microservices';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      ...new ConfigService().get('sql'),
      entities: [User],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [UserController],
  providers: [
    UserService,
    ConfigService,
    {
      provide: 'AUTH_SERVICE',
      useFactory: (configService: ConfigService) => {
        return ClientProxyFactory.create(configService.get('auth'));
      },
      inject: [ConfigService],
    },
  ],
})
export class UserModule {}
