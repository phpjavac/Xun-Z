import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  login(): boolean {
    return true;
  }
  getHello(): string {
    return 'Hello World!';
  }
}
