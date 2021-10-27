import { Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { LoginUserFace } from './interface/user/dto/login-user-dto';

@Injectable()
export class AuthService {
  creat(): boolean {
    throw new Error('Method not implemented.');
  }
  async login(loginInfo: LoginUserFace) {
    return true;
  }
  getHello(): string {
    return 'Hello World!';
  }
}
