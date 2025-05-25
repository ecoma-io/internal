import { Controller, Get, Patch, Body } from "@nestjs/common";
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { LanguageSupportedService } from "../services/language-supported.service";
import {
  SetLanguageActiveDto,
  SetLanguageActiveTranslationDto,
  VerifyLanguageDto,
  UpdateLanguageDescriptionDto
} from '../dtos/language-supported.dto';

@ApiTags('Localization')
@Controller("localization")
export class LocalizationController {

  constructor(private readonly languageSupportedService: LanguageSupportedService) { }

  @Get("languages")
  @ApiOperation({ summary: 'Lấy tất cả ngôn ngữ' })
  @ApiResponse({ status: 200, description: 'Danh sách ngôn ngữ' })
  async getLanguages() {
    return this.languageSupportedService.findAll();
  }

  @Get("languages/actived")
  @ApiOperation({ summary: 'Lấy các ngôn ngữ đang kích hoạt' })
  @ApiResponse({ status: 200, description: 'Danh sách ngôn ngữ đang kích hoạt' })
  async getLanguagesActived() {
    return this.languageSupportedService.findAllActived();
  }

  @Get("languages/actived/translatation")
  @ApiOperation({ summary: 'Lấy các ngôn ngữ vừa kích hoạt vừa bật tự động dịch' })
  @ApiResponse({ status: 200, description: 'Danh sách ngôn ngữ thỏa mãn' })
  async getLanguagesActivedTranslatation() {
    return this.languageSupportedService.findAllActivedAndTranslatation();
  }

  @Patch('languages/active')
  @ApiOperation({ summary: 'Bật/tắt trạng thái kích hoạt ngôn ngữ' })
  @ApiBody({ type: SetLanguageActiveDto })
  @ApiResponse({ status: 200, description: 'Cập nhật trạng thái thành công' })
  async setLanguageActive(@Body() dto: SetLanguageActiveDto) {
    return this.languageSupportedService.setActive(dto.id, dto.isActive);
  }

  @Patch('languages/active-translation')
  @ApiOperation({ summary: 'Bật/tắt chế độ tự động dịch của ngôn ngữ' })
  @ApiBody({ type: SetLanguageActiveTranslationDto })
  @ApiResponse({ status: 200, description: 'Cập nhật trạng thái tự động dịch thành công' })
  async setLanguageActiveTranslation(@Body() dto: SetLanguageActiveTranslationDto) {
    return this.languageSupportedService.setActiveTranslation(dto.id, dto.isActiveTranslatation);
  }

  @Patch('languages/verify')
  @ApiOperation({ summary: 'Xác thực ngôn ngữ bởi user' })
  @ApiBody({ type: VerifyLanguageDto })
  @ApiResponse({ status: 200, description: 'Xác thực thành công' })
  async verifyLanguage(@Body() dto: VerifyLanguageDto) {
    return this.languageSupportedService.verifyLanguage(dto.id, dto.verifyBy);
  }

  @Patch('languages/description')
  @ApiOperation({ summary: 'Cập nhật mô tả ngôn ngữ' })
  @ApiBody({ type: UpdateLanguageDescriptionDto })
  @ApiResponse({ status: 200, description: 'Cập nhật mô tả thành công' })
  async updateLanguageDescription(@Body() dto: UpdateLanguageDescriptionDto) {
    return this.languageSupportedService.updateDescription(dto.id, dto.description);
  }
}
