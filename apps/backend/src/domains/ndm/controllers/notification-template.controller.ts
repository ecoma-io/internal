import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiParam } from '@nestjs/swagger';
import { CreateNotificationTemplateDto, UpdateNotificationTemplateDto, NotificationTemplateResponseDto } from '../dtos/notification-template.dto';

@ApiTags('NotificationTemplate')
@Controller('ndm/templates')
export class NotificationTemplateController {
  // Inject service ở đây (giả sử là notificationTemplateService)

  @Get()
  @ApiOperation({ summary: 'Lấy danh sách template' })
  @ApiResponse({ status: 200, type: [NotificationTemplateResponseDto] })
  async findAll() {
    // return this.notificationTemplateService.findAll();
    return [];
  }

  @Get(':templateName')
  @ApiOperation({ summary: 'Lấy chi tiết template theo tên' })
  @ApiParam({ name: 'templateName', description: 'Tên định danh template' })
  @ApiResponse({ status: 200, type: NotificationTemplateResponseDto })
  async findOne(@Param('templateName') templateName: string) {
    // return this.notificationTemplateService.findOne(templateName);
    return null;
  }

  @Post()
  @ApiOperation({ summary: 'Tạo template mới' })
  @ApiBody({ type: CreateNotificationTemplateDto })
  @ApiResponse({ status: 201, type: NotificationTemplateResponseDto })
  async create(@Body() dto: CreateNotificationTemplateDto) {
    // return this.notificationTemplateService.create(dto);
    return null;
  }

  @Put(':templateName')
  @ApiOperation({ summary: 'Cập nhật template' })
  @ApiParam({ name: 'templateName', description: 'Tên định danh template' })
  @ApiBody({ type: UpdateNotificationTemplateDto })
  @ApiResponse({ status: 200, type: NotificationTemplateResponseDto })
  async update(@Param('templateName') templateName: string, @Body() dto: UpdateNotificationTemplateDto) {
    // return this.notificationTemplateService.update(templateName, dto);
    return null;
  }

  @Delete(':templateName')
  @ApiOperation({ summary: 'Xóa template' })
  @ApiParam({ name: 'templateName', description: 'Tên định danh template' })
  @ApiResponse({ status: 200, description: 'Xóa thành công' })
  async remove(@Param('templateName') templateName: string) {
    // return this.notificationTemplateService.remove(templateName);
    return null;
  }
}
