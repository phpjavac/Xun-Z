import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IUser, UserInfo } from './interfaces/user/user.interface';
import { User } from './users/user.entity';
import { Repository } from 'typeorm';
import { ClientProxy } from '@nestjs/microservices';
import { Inject } from '@nestjs/common';
import * as md5 from 'md5';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class UserService {
  async getUserInfo(code: string): Promise<User | null> {
    const userInfo = await this.usersRepository.findOne(code);
    return userInfo;
  }
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    @Inject('AUTH_SERVICE')
    private authClient: ClientProxy, // @Inject('USER_SERVICE') private userServiceClient: ClientProxy,
  ) {}

  public async createUser(createUserDto: IUser): Promise<User> {
    const user = new User();
    const userFin = await this.usersRepository.findOne(createUserDto.code);
    if (userFin) {
      return null;
    }
    user.code = createUserDto.code;
    user.name = createUserDto.name;
    user.role = createUserDto.role;

    return this.usersRepository.save(user);
  }

  public async loginUser(
    userInfo: UserInfo,
  ): Promise<false | { code: string; role: string; token: any }> {
    const userFin = await this.usersRepository.findOne(userInfo.code);
    if (!userFin || userFin.password !== md5(userInfo.password)) return false;
    const { code, role } = userFin;

    const token = await firstValueFrom(
      this.authClient.send('auth_login_token', code),
    );
    return { code, role, token };
  }

  public async submitBlog(blogContent: { title: string; content: string }) {
    return false;
  }
}
