import { ApiProperty } from '@nestjs/swagger';
import { Page } from '../../common/page.interface';
import { IBlog } from '../blog.interface';

/**
 * blog分页相应
 */
export interface BlogPageResponse<T> extends Page {
  total: number;
  list: T[];
}

/**
 * blog分页请求
 */
export interface BlogPageRequest extends Page {
  userCode?: string;
}

/**
 * blog分页请求体
 */
export class BlogPageRequestDto implements BlogPageRequest {
  @ApiProperty({ description: '页码', example: 1 })
  pageNo: number;

  @ApiProperty({ description: '分页大小', example: 15 })
  pageSize: number;

  @ApiProperty({
    description: '用户code',
    example: '用户code',
    required: false,
  })
  userCode: string;
}

export class BlogPageResponseDto implements BlogPageResponse<IBlog> {
  @ApiProperty({ description: 'pageNo', example: '页码' })
  pageNo: number;

  @ApiProperty({ description: 'pageSize', example: '每页条数' })
  pageSize: number;

  @ApiProperty({ description: 'total', example: '总条数' })
  total: number;

  @ApiProperty({ description: 'list', example: '博文数据list' })
  list: IBlog[];
}
