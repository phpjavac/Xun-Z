import { Blog } from '../../blogs/blogs.entity';
export interface BlogContentFace {
  title: string;
  content: string;
}

export interface SearchBlogInfo extends Blog {
  name: string;
}