import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { IUser, UserInfo } from './interfaces/user/user.interface';
import { UserService } from './user.service';
import { User } from './users/user.entity';

@Controller()
export class UserController {
  constructor(private readonly appService: UserService) {}
  @MessagePattern('user_create')
  public async createUser(userParams: IUser): Promise<User> {
    const result: User = await this.appService.createUser(userParams);
    return result;
  }

  @MessagePattern('user_login')
  public async loginUser(userParams: UserInfo) {
    const result = await this.appService.loginUser(userParams);
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
  @MessagePattern('submit_blog')
  public async submitBlog(blogContent: { title: string; content: string }) {
    const result = await this.appService;
  }
}
