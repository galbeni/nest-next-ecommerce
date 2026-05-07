// DTO for changing user password

import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Matches, MinLength } from 'class-validator';

export class ChangePasswordDto {
  @IsString()
  @IsNotEmpty({ message: 'Current password must not be empty' })
  @ApiProperty({
    description: 'Current password',
    example: 'currentPassword123',
  })
  currentPassword: string;

  @IsString()
  @IsNotEmpty({ message: 'New password must not be empty' })
  @MinLength(8, { message: 'New password must be at least 8 characters long' })
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    {
      message:
        'New password must contain at least one uppercase letter, one lowercase letter, one number, and one special character',
    },
  )
  @ApiProperty({
    description: 'New password',
    example: 'NewP@ssw0rd!',
    minLength: 8,
  })
  newPassword: string;
}
