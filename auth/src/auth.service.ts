import { Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { LoginUserFace } from './interface/user/dto/login-user-dto';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthService {
  authTokenAnalysis(token: string) {
    const auth = jwt.verify(token.substr(7), process.env.SECRET_KEY);
    if (!auth) return false;
    return auth;
  }
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
