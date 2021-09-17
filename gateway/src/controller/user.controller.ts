import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Inject,
  Param,
  Post,
  Res,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { firstValueFrom } from 'rxjs';
import { CreateUserDto } from '../interface/user/dto/create-user.dto';
import { IServiceUserCreateResponse } from '../interface/user/service-user-create-response.interface';
import { Logger } from '../utils/log4js';
import { Response } from 'express';

@Controller('user')
@ApiTags('user')
export class UserController {
  constructor(@Inject('USER_SERVICE') private userServiceClient: ClientProxy) {}
  @Post('create')
  async createUser(
    @Body() userRequest: CreateUserDto,
  ): Promise<IServiceUserCreateResponse> {
    const createUserResponse: IServiceUserCreateResponse = await firstValueFrom(
      this.userServiceClient.send('user_create', userRequest),
    );
    return createUserResponse;
  }
  @Get(':code')
  @ApiParam({
    name: 'code',
  })
  async getUser(
    @Param('code') code,
    @Res() res: Response,
  ): Promise<IServiceUserCreateResponse> {
    Logger.log(code);
    try {
      const userInfo: IServiceUserCreateResponse | null = await firstValueFrom(
        this.userServiceClient.send('get_userInfo', code),
      );
      Logger.log(userInfo);
      return userInfo;
    } catch (error) {
      res.status(HttpStatus.NOT_FOUND).send();
    }
  }
}
