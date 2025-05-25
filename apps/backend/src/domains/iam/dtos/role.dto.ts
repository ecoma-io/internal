import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsOptional, IsString, IsArray } from 'class-validator';
import { IResponseDTO } from '../../../core/dto/response.interface';

export class CreateRoleDto {
  @ApiProperty()
  @IsString()
  @Expose()
  name: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @Expose()
  description?: string;

  @ApiProperty({ type: [String] })
  @IsArray()
  @Expose()
  permissions: string[];
}

export class UpdateRoleDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @Expose()
  name?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @Expose()
  description?: string;

  @ApiPropertyOptional({ type: [String] })
  @IsOptional()
  @IsArray()
  @Expose()
  permissions?: string[];
}

export class RoleResponseDataDto {
  @ApiProperty()
  @Expose()
  id: string;

  @ApiProperty()
  @Expose()
  name: string;

  @ApiPropertyOptional()
  @Expose()
  description?: string;

  @ApiProperty({ type: [String] })
  @Expose()
  permissions: string[];
}

export class RoleResponseDto implements IResponseDTO<RoleResponseDataDto> {
  @ApiProperty()
  @Expose()
  success: boolean;

  @ApiProperty()
  @Expose()
  data?: RoleResponseDataDto;
}
