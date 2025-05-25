import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsEmail, IsOptional, IsString, MinLength, IsArray } from 'class-validator';
import { IResponseDTO } from '../../../core/dto/response.interface';

export class CreateUserDto {
  @ApiProperty()
  @IsString()
  @Expose()
  firstName: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @Expose()
  lastName?: string;

  @ApiProperty()
  @IsEmail()
  @Expose()
  email: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MinLength(6)
  @Expose()
  password?: string;

  @ApiPropertyOptional({ type: [String] })
  @IsOptional()
  @IsArray()
  @Expose()
  roleIds?: string[];
}

export class UpdateUserDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @Expose()
  firstName?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @Expose()
  lastName?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsEmail()
  @Expose()
  email?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MinLength(6)
  @Expose()
  password?: string;

  @ApiPropertyOptional({ type: [String] })
  @IsOptional()
  @IsArray()
  @Expose()
  roleIds?: string[];
}

export class UserResponseDataDto {
  @ApiProperty()
  @Expose()
  id: string;

  @ApiProperty()
  @Expose()
  firstName: string;

  @ApiPropertyOptional()
  @Expose()
  lastName?: string;

  @ApiProperty()
  @Expose()
  email: string;

  @ApiPropertyOptional({ type: [String] })
  @Expose()
  roleIds?: string[];
}

export class UserResponseDto implements IResponseDTO<UserResponseDataDto> {
  @ApiProperty()
  @Expose()
  success: boolean;

  @ApiProperty()
  @Expose()
  data?: UserResponseDataDto;
}
