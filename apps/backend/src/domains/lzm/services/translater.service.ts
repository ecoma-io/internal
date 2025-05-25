import { Injectable } from '@nestjs/common';
import { TranslationService } from './translation.service';

@Injectable()
export class TranslaterService {
  constructor(private readonly translationService: TranslationService) {}

  /**
   * Lấy bản dịch theo key và lang, có fallback sang fallbackLang nếu không có.
   */
  async translate(key: string, lang: string, fallbackLang = 'en'): Promise<string | null> {
    // Giả sử translationService có method getValue(key, lang)
    const translation = await this.translationService.getValue(key, lang);
    if (translation) return translation;
    if (fallbackLang && fallbackLang !== lang) {
      return this.translationService.getValue(key, fallbackLang);
    }
    return null;
  }
}
