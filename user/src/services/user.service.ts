import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IUser } from '../interfaces/user/user.interface';
import { User } from '../users/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  async getUserInfo(code: string): Promise<User | null> {
    const userInfo = await this.usersRepository.findOne(code);
    return userInfo;
  }
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  public async createUser(createUserDto: IUser): Promise<User> {
    const user = new User();
    user.code = createUserDto.code;
    user.name = createUserDto.name;
    user.role = createUserDto.role;

    return this.usersRepository.save(user);
  }
}
