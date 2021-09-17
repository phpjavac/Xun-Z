import { Controller, Get, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Observable } from 'rxjs';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(@Inject('AUTH_SERVICE') private client: ClientProxy) {}
  @Get('login')
  @ApiOkResponse({
    type: String,
  })
  userLogin(): Observable<number> {
    return this.client.send<number>('auth_user_login', 'login');
  }
}
