import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  creat(): boolean {
    throw new Error('Method not implemented.');
  }
  login(): boolean {
    return true;
  }
  getHello(): string {
    return 'Hello World!';
  }
}
