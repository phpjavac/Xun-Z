import { Inject, Injectable } from '@nestjs/common';
import {
  BlogContentFace,
  SearchBlogInfo,
} from './interface/blog/blog.interface';
import { Blog } from './blogs/blogs.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class BlogService {
  constructor(
    @InjectRepository(Blog)
    private readonly blogRepository: Repository<Blog>,
    @Inject('USER_SERVICE') private userServiceClient,
  ) {}
  getHello(): string {
    return 'Hello World!';
  }
  async searchBlogInfo(code: string): Promise<SearchBlogInfo[]> {
    const blog = new Blog();
    blog.user = code;
    const blogList = (await this.blogRepository.find(blog)) || [];
    const userInfo = await this.userServiceClient.send('get_userInfo', code);
    const result = blogList.map(
      (item) =>
        ({
          ...item,
          name: userInfo.name,
        } as SearchBlogInfo),
    );
    return result;
  }
  public async submitBlog(blogContent: BlogContentFace) {
    const blog = new Blog();
    blog.user = 'testUser';
    blog.title = blogContent.title;
    blog.content = blogContent.content;
    await this.blogRepository.save(blog);

    return null;
  }
}
