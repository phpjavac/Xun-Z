import { ApiProperty } from '@nestjs/swagger';

export class CreateTagDto {
  @ApiProperty({
    example: 'id',
    required: false,
  })
  id: string;

  @ApiProperty({
    example: '标签1',
    required: true,
  })
  name: string;
}
