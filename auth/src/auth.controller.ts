import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { AuthService } from './auth.service';
import { LoginUserFace } from './interface/user/dto/login-user-dto';

@Controller()
export class AuthController {
  constructor(private readonly appService: AuthService) {}
  @MessagePattern('auth_user_creat')
  creat(): boolean {
    return this.appService.creat();
  }
  @MessagePattern('auth_user_login')
  async login(loginInfo: LoginUserFace) {
    const result = await this.appService.login(loginInfo);
    return result;
  }
  @MessagePattern('auth_login_token')
  async authLoginToken(userId: string) {
    const result = await this.appService.authLoginToken(userId);
    return result;
  }
}
