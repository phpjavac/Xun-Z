import { ApiProperty } from '@nestjs/swagger';

export class SubmitBlogDto {
  @ApiProperty({ description: 'title', example: '标题' })
  title: string;
  @ApiProperty({ description: 'content', example: '内容' })
  content: string;
}
