import { Controller, Post, Inject, Body, Get, Req } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiTags } from '@nestjs/swagger';
import { firstValueFrom } from 'rxjs';
import { SubmitBlogDto } from '../interface/user/dto/submit-blog-dto';

@Controller('blog')
@ApiTags('blog')
export class BlogController {
  constructor(@Inject('BLOG_SERVICE') private client: ClientProxy) {}
  @Post('submitBlog')
  async submitBlog(@Body() submitContent: SubmitBlogDto) {
    const submitBlogResponse = await firstValueFrom(
      this.client.send('blog_submit', submitContent),
    );
    return submitBlogResponse;
  }
  @Get('user')
  async getUserBlogs(@Req() request) {
    const headerToken = request.headers['token'] || null;
    if (!headerToken) return false;
    const authTokenResponse = await firstValueFrom(
      this.client.send('auth_token_analysis', headerToken),
    );
    return authTokenResponse;
  }
}
