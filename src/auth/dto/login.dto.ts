import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ example: 'client@test.com' })
  email: string;

  @ApiProperty({ example: 'password123' })
  password: string;
}