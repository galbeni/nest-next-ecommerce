// DTO for updating user profile

import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString } from 'class-validator';

export class UpdateUserDto {
  @IsEmail()
  @IsOptional()
  @ApiProperty({
    description: 'User email address',
    example: 'user@example.com',
    required: false,
  })
  email?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    description: 'User first name',
    example: 'John',
    required: false,
  })
  firstName?: string | null;

  @IsOptional()
  @IsString()
  @ApiProperty({
    description: 'User last name',
    example: 'Doe',
    required: false,
  })
  lastName?: string | null;
}
