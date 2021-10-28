import { Controller, Get, Post, Inject, Body } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

@Controller('blog')
@ApiTags('blog')
export class BlogController {
  constructor(@Inject('BLOG_SERVICE') private client: ClientProxy) {}
  @Get('getHello')
  @ApiOkResponse({
    type: String,
  })
  async getHello() {
    return false;
  }
}
