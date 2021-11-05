import { Blog } from '../../blogs/blogs.entity';
export interface BlogContentFace {
  id?: string;
  title: string;
  content: string;
}
export class BlogContentFaceImp implements BlogContentFace {
  title = '测试标题';
  content = '# 测试';
}

export interface SearchBlogInfo extends Blog {
  name: string;
}
