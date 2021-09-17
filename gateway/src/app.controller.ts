import { Controller, Get, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Observable } from 'rxjs';

@ApiTags('users')
@Controller('users')
export class AppController {
  constructor(@Inject('USER_SERVICE') private client: ClientProxy) {}

  @Get()
  @ApiOkResponse({
    type: String,
  })
  getHello(): Observable<number> {
    const pattern = { cmd: 'sum' };
    const payload = [1, 2, 3, 4, 5, 6];
    return this.client.send<number>(pattern, payload);
  }
}
