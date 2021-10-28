import { Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { LoginUserFace } from './interface/user/dto/login-user-dto';
const jwt = require('jsonwebtoken');

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
  async authLoginToken(key: string) {
    const token = jwt.sign({ key }, process.env.SECRET_KEY, {
      expiresIn: '1d',
    });
    if (token) {
      return token;
    } else {
      return false;
    }
  }
}
