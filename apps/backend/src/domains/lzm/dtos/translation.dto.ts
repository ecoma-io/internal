import { ApiProperty } from '@nestjs/swagger';
import { IsObject, IsOptional, IsString } from 'class-validator';

// DTO cho tạo bản dịch mới
export class CreateTranslationDto {
  @ApiProperty({ description: 'Key duy nhất của bản dịch' })
  @IsString()
  key: string;

  @ApiProperty({ description: 'Các giá trị bản dịch theo ngôn ngữ', type: 'object', additionalProperties: { type: 'string' } })
  @IsObject()
  values: Record<string, string>; // { "en": "...", "vi": "..." }

  @ApiProperty({ description: 'Mô tả bản dịch' })
  @IsOptional()
  @IsString()
  description?: string;
}

// DTO cho cập nhật bản dịch
export class UpdateTranslationDto {
  @ApiProperty({ description: 'ID của bản dịch' })
  @IsString()
  id: string;

  @ApiProperty({ description: 'Các giá trị bản dịch theo ngôn ngữ', type: 'object', additionalProperties: { type: 'string' } })
  @IsOptional()
  @IsObject()
  values?: Record<string, string>;

  @ApiProperty({ description: 'Mô tả bản dịch' })
  @IsOptional()
  @IsString()
  description?: string;
}

// DTO cho xóa bản dịch
export class RemoveTranslationDto {
  @ApiProperty({ description: 'ID của bản dịch' })
  @IsString()
  id: string;
}

// DTO cho cập nhật giá trị bản dịch cho một ngôn ngữ cụ thể
export class UpdateTranslationValueDto {
  @ApiProperty({ description: 'Key của bản dịch' })
  @IsString()
  key: string;

  @ApiProperty({ description: 'Mã ngôn ngữ' })
  @IsString()
  lang: string;

  @ApiProperty({ description: 'Giá trị bản dịch' })
  @IsString()
  value: string;
}

// DTO cho lấy giá trị bản dịch theo key và ngôn ngữ
export class GetTranslationValueDto {
  @ApiProperty({ description: 'Key của bản dịch' })
  @IsString()
  key: string;

  @ApiProperty({ description: 'Mã ngôn ngữ' })
  @IsString()
  lang: string;
}
