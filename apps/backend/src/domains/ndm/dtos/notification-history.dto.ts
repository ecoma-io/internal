import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsDateString, IsObject, IsOptional, IsString } from 'class-validator';
import { NotificationStatus } from '../schemas/notification-history.schema';

export class CreateNotificationHistoryDto {
  @ApiProperty({ description: 'ID của user nhận thông báo' })
  @IsString()
  userId: string;

  @ApiProperty({ description: 'Email người nhận' })
  @IsString()
  email: string;

  @ApiProperty({ description: 'Tên template đã sử dụng' })
  @IsString()
  templateName: string;

  @ApiProperty({ description: 'Loại thông báo' })
  @IsString()
  notificationType: string;

  @ApiProperty({ description: 'Trạng thái gửi', enum: NotificationStatus })
  @IsOptional()
  @IsString()
  status?: NotificationStatus;

  @ApiProperty({ description: 'Chi tiết lỗi (nếu có)' })
  @IsOptional()
  @IsString()
  errorMessage?: string;

  @ApiProperty({ description: 'Dữ liệu động dùng để render template', type: Object })
  @IsOptional()
  @IsObject()
  data?: Record<string, unknown>;
}

export class NotificationHistoryResponseDto {
  @ApiProperty()
  userId: string;
  @ApiProperty()
  email: string;
  @ApiProperty()
  templateName: string;
  @ApiProperty()
  notificationType: string;
  @ApiProperty({ enum: NotificationStatus })
  status: NotificationStatus;
  @ApiProperty()
  errorMessage?: string;
  @ApiProperty({ type: Object })
  data?: Record<string, unknown>;
  @ApiProperty({ type: [Object] })
  processingAttempts?: any[];
  @ApiProperty()
  createdAt: Date;
  @ApiProperty()
  updatedAt: Date;
}

export class FilterNotificationHistoryDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  email?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  templateName?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  notificationType?: string;

  @ApiProperty({ required: false, enum: NotificationStatus })
  @IsOptional()
  @IsString()
  status?: NotificationStatus;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsDateString()
  fromDate?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsDateString()
  toDate?: string;
}
