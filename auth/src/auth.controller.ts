import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { AuthService } from './auth.service';

@Controller()
export class AuthController {
  constructor(private readonly appService: AuthService) {}
  @MessagePattern('auth_user_creat')
  creat(): boolean {
    return this.appService.creat();
  }
  @MessagePattern('auth_user_login')
  login(): boolean {
    return this.appService.login();
  }
}
