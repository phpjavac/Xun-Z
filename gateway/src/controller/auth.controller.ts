import { Controller, Get, Post, Inject, Body } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(@Inject('AUTH_SERVICE') private client: ClientProxy) {}
  @Post('testlogin')
  @ApiOkResponse({
    type: String,
  })
  async userLogin() {
    return false;
    // return '6';
  }
}
