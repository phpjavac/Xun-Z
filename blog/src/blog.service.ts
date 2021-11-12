import { Inject, Injectable } from '@nestjs/common';
import {
  BlogContentFace,
  SearchBlogInfo,
} from './interface/blog/blog.interface';
import { Blog } from './blogs/blogs.entity';
import { Repository, getRepository, getConnection } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import {
  BlogPageRequest,
  BlogPageResponse,
} from './interface/common/page.interface';
import { Tag } from './blogs/tag.entity';
import { TagFindAll } from './interface/tag/dto/find-tag.dto';
import { CreateTagDto } from './interface/tag/dto/create-tag.dto';
import { SubmitBlogDto } from './interface/blog/dto/submit-blog.dto';

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
  /**
   * blog-博客模块
   */
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
  public async blogFindAll(
    query: BlogPageRequest,
  ): Promise<BlogPageResponse<Blog>> {
    const { pageNo, pageSize } = query;
    const filed = [
      'blog.id',
      'blog.user',
      'blog.summary',
      'blog.title',
      'blog.createTime',
      'blog.updateTime',
    ];
    // console.time('this is time');
    const [list, total] = await getRepository(Blog)
      .createQueryBuilder('blog')
      .select(filed)
      .skip((pageNo - 1) * pageSize)
      .take(pageSize)
      .orderBy('blog.updateTime')
      .getManyAndCount();
    const actionAll = [];
    for (let bi = 0; bi < list.length; bi += 1) {
      const action = getConnection()
        .createQueryBuilder()
        .relation(Blog, 'tags')
        .of(list[bi].id)
        .loadMany()
        .then((resList) => {
          list[bi].tags = resList;
        });
      actionAll.push(action);
    }
    await Promise.all(actionAll);
    // console.timeEnd('this is time');
    const response = {
      pageNo,
      pageSize,
      list,
      total,
    };

    return response;
  }
  public async blogFindOne(blogId: string): Promise<BlogContentFace> {
    try {
      const info = await getRepository(Blog)
        .createQueryBuilder('blog')
        .where('blog.id = :id', { id: blogId })
        .leftJoinAndSelect('blog.tags', 'tags')
        .getOne();
      return info;
    } catch (error) {
      return error;
    }
  }
  public async submitBlog(blogContent: SubmitBlogDto) {
    const { id, title, content, summary, user, tags } = blogContent;
    const newData: Partial<Blog> = {
      title,
      content,
      summary,
    };
    try {
      if (!!id) {
        const blog = { ...newData, id };
        await this.blogEdit(blog, tags);
      } else {
        const blog = { ...newData, user };
        await this.blogCreate(blog, tags);
      }
      return null;
    } catch (error) {
      return error;
    }
  }
  private async blogEdit(blog: Partial<Blog>, tags: string[]) {
    try {
      blog.updateTime = new Date();
      // update:blog
      await getConnection()
        .createQueryBuilder()
        .update(Blog)
        .set(blog)
        .where('id = :id', { id: blog.id })
        .execute();
      const oldTagsIds = await this.getTagIdsByBlogId(blog.id);
      // 因为blogId并没有发生变化，不会触发外键删除
      // update: blog-tags
      await getConnection()
        .createQueryBuilder()
        .relation(Blog, 'tags')
        .of(blog)
        .remove(oldTagsIds);
      await getConnection()
        .createQueryBuilder()
        .relation(Blog, 'tags')
        .of(blog)
        .add(tags);
      return null;
    } catch (error) {
      return error;
    }
  }
  private async blogCreate(blog: Partial<Blog>, tags: string[]) {
    try {
      const info = await getConnection()
        .createQueryBuilder()
        .insert()
        .into(Blog)
        .values(blog)
        .execute();
      Object.assign(blog, info.generatedMaps);
      await getConnection()
        .createQueryBuilder()
        .relation(Blog, 'tags')
        .of(blog)
        .add(tags);
      return null;
    } catch (error) {
      return error;
    }
  }
  public async blogRemove(blogId: string) {
    try {
      // blogId被删除，触发外键删除关联表数据
      await getConnection()
        .createQueryBuilder()
        .delete()
        .from(Blog)
        .where('id = :id', { id: blogId })
        .execute();
      return null;
    } catch (error) {
      return error;
    }
  }
  private async getTagIdsByBlogId(blogId: string) {
    const oldTagEntity = await getConnection()
      .createQueryBuilder()
      .relation(Blog, 'tags')
      .of(blogId)
      .loadMany<Tag>();
    return oldTagEntity.map((tag) => tag.id);
  }
  /**
   * tag-标签模块
   */
  public async tagCreate(data: CreateTagDto & { userCode: string }) {
    try {
      const { userCode, name } = data;
      await getConnection()
        .createQueryBuilder()
        .insert()
        .into(Tag)
        .values([{ userCode, name }])
        .execute();
      return null;
    } catch (error) {
      return error;
    }
  }
  public async tagFindAll(data: TagFindAll) {
    console.log(data, 'this is where');
    const tagList = await getRepository(Tag)
      .createQueryBuilder('tag')
      .getMany();
    return tagList;
  }
  public async tagRemove(tagId: string) {
    try {
      await getConnection()
        .createQueryBuilder()
        .delete()
        .from(Tag)
        .where('id = :id', { id: tagId })
        .execute();
      return null;
    } catch (error) {
      return error;
    }
  }
  private async getBlogIdsByTagId(tagId: string) {
    const oldBlogEntity = await getRepository(Blog)
      .createQueryBuilder('blog')
      .leftJoin('blog_tag', 'blog_tag', 'blog.id = blog_tag.blogId')
      .where('blog_tag.tagId = :id', { id: tagId })
      .getMany();
    return oldBlogEntity.map((blog) => blog.id);
  }
}
