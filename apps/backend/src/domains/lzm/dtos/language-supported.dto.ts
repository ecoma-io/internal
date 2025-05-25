import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';

// DTO cho bật/tắt trạng thái kích hoạt ngôn ngữ
export class SetLanguageActiveDto {
  @ApiProperty({ description: 'ID của ngôn ngữ' })
  @IsString()
  id: string; // id của ngôn ngữ

  @ApiProperty({ description: 'Trạng thái kích hoạt' })
  @IsBoolean()
  @Type(() => Boolean)
  isActive: boolean;
}

// DTO cho bật/tắt chế độ tự động dịch
export class SetLanguageActiveTranslationDto {
  @ApiProperty({ description: 'ID của ngôn ngữ' })
  @IsString()
  id: string; // id của ngôn ngữ

  @ApiProperty({ description: 'Trạng thái tự động dịch' })
  @IsBoolean()
  @Type(() => Boolean)
  isActiveTranslatation: boolean;
}

// DTO cho xác thực ngôn ngữ
export class VerifyLanguageDto {
  @ApiProperty({ description: 'ID của ngôn ngữ' })
  @IsString()
  id: string; // id của ngôn ngữ

  @ApiProperty({ description: 'ID của user xác thực' })
  @IsString()
  verifyBy: string; // id của user xác thực
}

// DTO cho cập nhật mô tả ngôn ngữ
export class UpdateLanguageDescriptionDto {
  @ApiProperty({ description: 'ID của ngôn ngữ' })
  @IsString()
  id: string; // id của ngôn ngữ

  @ApiProperty({ description: 'Mô tả ngôn ngữ' })
  @IsString()
  description: string;
}
