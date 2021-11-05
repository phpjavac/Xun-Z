import { Body, Controller, Get, Post } from '@nestjs/common';
import { ClientProxy, MessagePattern } from '@nestjs/microservices';
import { BlogService } from './blog.service';
import { BlogContentFace } from './interface/blog/blog.interface';
import { Inject } from '@nestjs/common';
import { BlogPageRequest } from './interface/common/page.interface';

@Controller()
export class BlogController {
  constructor(private readonly appService: BlogService) {}

  @MessagePattern('blog_submit')
  public async submitBlog(blogContent: BlogContentFace) {
    const result = this.appService.submitBlog(blogContent);
    return result;
  }
  @MessagePattern('blog_info')
  public async blogFindOne(id: string) {
    const result = this.appService.blogFindOne(id);
    return result;
  }
  @MessagePattern('blog_list')
  public async blogFindAll(query: BlogPageRequest) {
    console.log({ query });
    const result = this.appService.blogFindAll(query);
    return result;
  }
  @MessagePattern('get_user_blogs')
  public async getUserBlogs(code: string) {
    const result = this.appService.searchBlogInfo(code);
    return result;
  }
  @MessagePattern('get_test')
  public async getTest() {
    return 'test';
  }
}
