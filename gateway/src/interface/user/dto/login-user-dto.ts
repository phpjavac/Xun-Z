import { ApiProperty } from '@nestjs/swagger';

export class loginUserDto {
  @ApiProperty({ description: 'code', example: 'admin' })
  code: string;
  @ApiProperty({ description: 'password', example: '123456' })
  password: string;
}

export interface LoginUserInfo {
  code: string;
  password: string;
}
