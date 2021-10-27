import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IUser, UserInfo } from './interfaces/user/user.interface';
import { User } from './users/user.entity';
import { Repository } from 'typeorm';
import { ClientProxy } from '@nestjs/microservices';
import { Inject } from '@nestjs/common';

@Injectable()
export class UserService {
  async getUserInfo(code: string): Promise<User | null> {
    const userInfo = await this.usersRepository.findOne(code);
    return userInfo;
  }
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>, // @Inject('USER_SERVICE') private userServiceClient: ClientProxy,
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

  public async loginUser(userInfo: UserInfo) {
    const userFin = await this.usersRepository.findOne(userInfo.code);
    console.log(userFin);
    console.log(userInfo);
    if (!userFin || userFin.password !== userInfo.password)
      return '用户名或密码不正确';
    return '登陆成功';
  }
}
