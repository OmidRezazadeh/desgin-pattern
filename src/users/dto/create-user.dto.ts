import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'Ali' })
  firstName: string;

  @ApiProperty({ example: 'Ahmadi' })
  lastName: string;

  @ApiProperty({ example: 'ali@example.com' })
  email: string;
}