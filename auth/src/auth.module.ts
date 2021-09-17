import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { ConfigService } from './services/config/config.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      ...new ConfigService().get('sql'),
      entities: [],
      synchronize: true,
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
