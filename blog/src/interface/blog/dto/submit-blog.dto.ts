import { ApiProperty } from '@nestjs/swagger';

export class SubmitBlogDto {
  @ApiProperty({
    description: 'id',
    example: 'id',
    required: false,
  })
  id?: string;

  @ApiProperty({
    description: 'title',
    example: '标题',
  })
  title: string;

  user: string; // token中获得用户

  @ApiProperty({
    description: 'summary',
    example: '简介',
  })
  summary: string;

  @ApiProperty({
    description: 'content',
    example: '内容',
  })
  content: string;

  @ApiProperty({
    description: 'tags',
    example: [],
  })
  tags: string[];
}
