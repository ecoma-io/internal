import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiParam, ApiQuery } from '@nestjs/swagger';
import { CreateNotificationHistoryDto, NotificationHistoryResponseDto, FilterNotificationHistoryDto } from '../dtos/notification-history.dto';

@ApiTags('NotificationHistory')
@Controller('ndm/histories')
export class NotificationHistoryController {

  @Get()
  @ApiOperation({ summary: 'Lấy danh sách lịch sử gửi thông báo' })
  @ApiQuery({ name: 'email', required: false })
  @ApiQuery({ name: 'templateName', required: false })
  @ApiQuery({ name: 'notificationType', required: false })
  @ApiQuery({ name: 'status', required: false })
  @ApiQuery({ name: 'fromDate', required: false })
  @ApiQuery({ name: 'toDate', required: false })
  @ApiResponse({ status: 200, type: [NotificationHistoryResponseDto] })
  async findAll(@Query() filter: FilterNotificationHistoryDto) {
    // return this.notificationHistoryService.findAll(filter);
    return [];
  }

  @Get(':id')
  @ApiOperation({ summary: 'Lấy chi tiết lịch sử gửi thông báo' })
  @ApiParam({ name: 'id', description: 'ID lịch sử gửi' })
  @ApiResponse({ status: 200, type: NotificationHistoryResponseDto })
  async findOne(@Param('id') id: string) {
    // return this.notificationHistoryService.findOne(id);
    return null;
  }

  @Post()
  @ApiOperation({ summary: 'Ghi nhận lịch sử gửi thông báo' })
  @ApiBody({ type: CreateNotificationHistoryDto })
  @ApiResponse({ status: 201, type: NotificationHistoryResponseDto })
  async create(@Body() dto: CreateNotificationHistoryDto) {
    // return this.notificationHistoryService.create(dto);
    return null;
  }
}
