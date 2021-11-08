import {
  Controller,
  Post,
  Inject,
  Body,
  Get,
  Req,
  Param,
  Put,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { firstValueFrom } from 'rxjs';
import { SubmitBlogDto } from '../interface/blog/dto/submit-blog-dto';
import {
  BlogPageRequestDto,
  BlogPageResponseDto,
} from '../interface/blog/dto/find-all-blog-dto';
import { Authorization } from '../decorator/authorization.decorator';
import * as jwt from 'jsonwebtoken';

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

  @Get('findOne/:id')
  @ApiParam({
    name: 'id',
  })
  async findOne(@Param('id') id) {
    const findOneResponse = await firstValueFrom(
      this.client.send('blog_info', id),
    );
    return findOneResponse;
  }

  @Post('findAll')
  async findAll(
    @Body() query: BlogPageRequestDto,
  ): Promise<BlogPageResponseDto> {
    const response = await firstValueFrom(this.client.send('blog_list', query));
    return response;
  }

  @Put('remove/:id')
  @ApiParam({
    name: 'id',
  })
  async remove(@Param('id') id) {
    const removeResponse = await firstValueFrom(
      this.client.send('blog_remove', id),
    );
    return removeResponse;
  }

  @Get('user')
  async getUserBlogs(@Req() request) {
    // const headerToken = request.headers['token'] || null;
    // if (!headerToken) return false;
    const authTokenResponse = await firstValueFrom(
      this.client.send('get_user_blogs', 'testUser'),
    );
    return authTokenResponse;
  }

  @Post('tagCreate')
  @Authorization(true)
  async tagFindAll(@Body() query, @Req() request) {
    const info = jwt.verify(request.headers.token, process.env.SECRET_KEY);
    const paramData = {
      ...query,
      userCode: info.key,
    };
    console.log(paramData, 'info');
    return null;
  }
}
