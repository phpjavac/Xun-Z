import { Body, Controller, Get, Post } from '@nestjs/common';
import { ClientProxy, MessagePattern } from '@nestjs/microservices';
import { BlogService } from './blog.service';
import { BlogContentFace } from './interface/blog/blog.interface';
import { Inject } from '@nestjs/common';

@Controller()
export class BlogController {
  constructor(private readonly appService: BlogService) {}

  @MessagePattern('blog_submit')
  public async submitBlog(blogContent: BlogContentFace) {
    console.log(12)
    const result = this.appService.submitBlog(blogContent);
    return result;
  }
  @MessagePattern('get_user_blogs')
  public async getUserBlogs(code: string) {
    const result = this.appService.searchBlogInfo(code);
    return result;
  }
}
