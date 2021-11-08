import { ApiProperty } from '@nestjs/swagger';

export class CreateTagDto {
  @ApiProperty({
    name: '标签id',
    example: 'id',
    required: false,
  })
  id: string;

  @ApiProperty({
    name: '标签名',
    example: '标签1',
    required: true,
  })
  name: string;
}
