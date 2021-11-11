import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { BlogService } from './blog.service';
import { BlogPageRequest } from './interface/common/page.interface';
import { CreateTagDto } from './interface/tag/dto/create-tag.dto';
import { Tag } from './interface/tag/tag.interface';
import { TagFindAll } from './interface/tag/dto/find-tag.dto';
import { SubmitBlogDto } from './interface/blog/dto/submit-blog.dto';

@Controller()
export class BlogController {
  constructor(private readonly appService: BlogService) {}

  @MessagePattern('blog_submit')
  public async submitBlog(blogContent: SubmitBlogDto) {
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
  @MessagePattern('blog_remove')
  public async blogRemove(blogId: string) {
    const result = this.appService.blogRemove(blogId);
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
  /**
   * tag
   */
  @MessagePattern('tag_create')
  public async tagCreate(
    data: CreateTagDto & { userCode: string },
  ): Promise<boolean> {
    const result = this.appService.tagCreate(data);
    return result;
  }
  @MessagePattern('tag_remove')
  public async tagRemove(id: string): Promise<boolean> {
    const result = this.appService.tagRemove(id);
    return result;
  }
  @MessagePattern('tag_list')
  public async tagFindAll(data: TagFindAll): Promise<Tag[]> {
    const result = this.appService.tagFindAll(data);
    return result;
  }
}
