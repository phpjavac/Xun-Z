import { ApiProperty } from '@nestjs/swagger';

export class TagFindAll {
  @ApiProperty({
    name: '用户code',
    example: 'testUser',
    required: false,
  })
  id: string;

  @ApiProperty({
    name: '标签名',
    example: '标签1',
    required: false,
  })
  name: string;
}
