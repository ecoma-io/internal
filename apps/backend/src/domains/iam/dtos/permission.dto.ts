import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { IsArray, IsOptional, IsString } from 'class-validator';
import { IResponseDTO } from '../../../core/dto/response.interface';

export class PermissionActionDto {
  @ApiProperty()
  @IsString()
  @Expose()
  name: string;

  @ApiProperty()
  @IsString()
  @Expose()
  key: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @Expose()
  description?: string;

  @ApiPropertyOptional({ type: [String] })
  @IsOptional()
  @IsArray()
  @Expose()
  implies?: string[];
}

export class CreatePermissionDto {
  @ApiProperty()
  @IsString()
  @Expose()
  groupName: string;

  @ApiProperty()
  @IsString()
  @Expose()
  groupKey: string;

  @ApiProperty({ type: [PermissionActionDto] })
  @IsArray()
  @Type(() => PermissionActionDto)
  @Expose()
  actions: PermissionActionDto[];
}

export class PermissionResponseDataDto {
  @ApiProperty()
  @Expose()
  id: string;

  @ApiProperty()
  @Expose()
  groupName: string;

  @ApiProperty()
  @Expose()
  groupKey: string;

  @ApiProperty({ type: [PermissionActionDto] })
  @Expose()
  actions: PermissionActionDto[];
}

export class PermissionResponseDto implements IResponseDTO<PermissionResponseDataDto> {
  @ApiProperty()
  @Expose()
  success: boolean;

  @ApiProperty()
  @Expose()
  data?: PermissionResponseDataDto;
}
