import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { IUser } from './interfaces/user/user.interface';
import { UserService } from './services/user.service';
import { User } from './users/user.entity';

@Controller()
export class UserController {
  constructor(private readonly appService: UserService) {}
  @MessagePattern('user_create')
  public async createUser(userParams: IUser): Promise<User> {
    const result: User = await this.appService.createUser(userParams);
    return result;
  }

  @MessagePattern('get_userInfo')
  public async getUserInfo(code: string): Promise<User> {
    const result: User = await this.appService.getUserInfo(code);
    return result;
  }
  @MessagePattern({ cmd: 'sum' })
  accumulate(data: number[]): number {
    return (data || []).reduce((a, b) => a + b);
  }
}
