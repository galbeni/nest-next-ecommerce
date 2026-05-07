// DTO

import { Role } from '.prisma/client/edge';
import { ApiProperty } from '@nestjs/swagger';

export class UserResponseDto {
  @ApiProperty({
    description: 'User ID',
    example: 'user-123',
  })
  id: string;

  @ApiProperty({
    description: 'User email address',
    example: 'user@example.com',
  })
  email: string;

  @ApiProperty({
    description: 'User first name',
    example: 'John',
    nullable: true,
  })
  firstName: string | null;

  @ApiProperty({
    description: 'User last name',
    example: 'Doe',
    nullable: true,
  })
  lastName: string | null;

  @ApiProperty({
    description: 'User role',
    enum: Role,
  })
  role: Role;

  @ApiProperty({
    description: 'Timestamp when the user was created',
    example: '2026-01-01T00:00:00.000Z',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Timestamp when the user was last updated',
    example: '2026-01-01T00:00:00.000Z',
  })
  updatedAt: Date;
}
