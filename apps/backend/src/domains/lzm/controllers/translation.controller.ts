import { Controller, Get, Post, Put, Delete, Param, Body } from "@nestjs/common";
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiParam } from '@nestjs/swagger';
import { TranslationService } from "../services/translation.service";
import { CreateTranslationDto, UpdateTranslationDto } from '../dtos/translation.dto';

@ApiTags('Translation')
@Controller("localization/translations")
export class TranslationController {
  constructor(private readonly translationService: TranslationService) {}

  @Get()
  @ApiOperation({ summary: 'Lấy tất cả bản dịch' })
  @ApiResponse({ status: 200, description: 'Danh sách bản dịch' })
  async findAll() {
    return this.translationService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: 'Lấy bản dịch theo id' })
  @ApiParam({ name: 'id', description: 'ID của bản dịch' })
  @ApiResponse({ status: 200, description: 'Bản dịch' })
  async findOne(@Param("id") id: string) {
    return this.translationService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Tạo bản dịch mới' })
  @ApiBody({ type: CreateTranslationDto })
  @ApiResponse({ status: 201, description: 'Bản dịch đã tạo' })
  async create(@Body() dto: CreateTranslationDto) {
    return this.translationService.create(dto);
  }

  @Put(":id")
  @ApiOperation({ summary: 'Cập nhật bản dịch' })
  @ApiParam({ name: 'id', description: 'ID của bản dịch' })
  @ApiBody({ type: UpdateTranslationDto })
  @ApiResponse({ status: 200, description: 'Bản dịch đã cập nhật' })
  async update(@Param("id") id: string, @Body() dto: UpdateTranslationDto) {
    return this.translationService.update(id, dto);
  }

  @Delete(":id")
  @ApiOperation({ summary: 'Xóa bản dịch' })
  @ApiParam({ name: 'id', description: 'ID của bản dịch' })
  @ApiResponse({ status: 200, description: 'Bản dịch đã xóa' })
  async remove(@Param("id") id: string) {
    return this.translationService.remove(id);
  }
}
