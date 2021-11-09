import { Blog } from '../../blogs/blogs.entity';
export interface BlogContentFace {
  id?: string;
  user: string;
  title: string;
  summary: string;
  content: string;
}
export class BlogContentFaceImp implements BlogContentFace {
  user: string;
  id?: string;
  summary: string;
  title = '测试标题';
  content = '# 测试';
}

export interface SearchBlogInfo extends Blog {
  name: string;
}
