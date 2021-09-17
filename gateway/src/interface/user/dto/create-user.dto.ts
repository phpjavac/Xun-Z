import { ApiProperty } from '@nestjs/swagger';

export enum UserRoleTypeEnum {
  admin,
  teacher,
  student,
}

export class CreateUserDto {
  @ApiProperty({
    uniqueItems: true,
    example: 'zhangsan',
    required: true,
  })
  code: string;

  @ApiProperty({
    minLength: 10,
    example: '张三',
    required: true,
  })
  name: string;
  @ApiProperty({
    example: '0',
    required: true,
  })
  role: UserRoleTypeEnum;
}
