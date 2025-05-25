import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsOptional, IsString } from 'class-validator';

export class CreateNotificationTemplateDto {
  @ApiProperty({ description: 'Tên định danh cho template' })
  @IsString()
  templateName: string;

  @ApiProperty({ description: 'Chủ đề mặc định của email' })
  @IsString()
  subject: string;

  @ApiProperty({ description: 'Nội dung HTML của email' })
  @IsString()
  bodyHtml: string;

  @ApiProperty({ description: 'Nội dung text thuần (tùy chọn)' })
  @IsOptional()
  @IsString()
  bodyText?: string;

  @ApiProperty({ description: 'Mảng các placeholder có thể sử dụng', type: [String] })
  @IsArray()
  @IsString({ each: true })
  placeholders: string[];

  @ApiProperty({ description: 'Mô tả ngắn về template', required: false })
  @IsOptional()
  @IsString()
  description?: string;
}

export class UpdateNotificationTemplateDto {
  @ApiProperty({ description: 'Chủ đề mặc định của email', required: false })
  @IsOptional()
  @IsString()
  subject?: string;

  @ApiProperty({ description: 'Nội dung HTML của email', required: false })
  @IsOptional()
  @IsString()
  bodyHtml?: string;

  @ApiProperty({ description: 'Nội dung text thuần (tùy chọn)', required: false })
  @IsOptional()
  @IsString()
  bodyText?: string;

  @ApiProperty({ description: 'Mảng các placeholder có thể sử dụng', type: [String], required: false })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  placeholders?: string[];

  @ApiProperty({ description: 'Mô tả ngắn về template', required: false })
  @IsOptional()
  @IsString()
  description?: string;
}

export class DeleteNotificationTemplateDto {
  @ApiProperty({ description: 'Tên định danh template' })
  @IsString()
  templateName: string;
}

export class NotificationTemplateResponseDto {
  @ApiProperty()
  templateName: string;
  @ApiProperty()
  subject: string;
  @ApiProperty()
  bodyHtml: string;
  @ApiProperty({ required: false })
  bodyText?: string;
  @ApiProperty({ type: [String] })
  placeholders: string[];
  @ApiProperty({ required: false })
  description?: string;
}
