import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'Ali۲۲' })
  firstName: string;

  @ApiProperty({ example: 'Ahmadi' })
  lastName: string;

  @ApiProperty({ example: 'ali@example.com' })
  email: string;
}