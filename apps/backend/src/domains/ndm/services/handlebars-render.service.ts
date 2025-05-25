import { Injectable } from '@nestjs/common';
import * as hbs from 'handlebars';
import { TranslaterService } from '../../lzm/services/translater.service';

@Injectable()
export class HandlebarsRenderService {
  private readonly handlebars: typeof hbs;

  constructor(private readonly translaterService: TranslaterService) {
    this.handlebars = hbs.create();
    this.registerHelpers();
  }

  private registerHelpers() {
    this.handlebars.registerHelper('translate', (key: string, lang: string, options) => {
      // Helper đồng bộ, chỉ dùng cho các bản dịch đã preload vào context
      // Nếu muốn async, cần dùng engine hỗ trợ (hoặc preload translations vào context)
      const translations = options.data.root.translations || {};
      return translations[key]?.[lang] || key;
    });
  }

  /**
   * Render template với context và hỗ trợ dịch tự động qua translaterService
   * Nếu muốn dịch động, preload translations vào context trước khi render
   */
  async render(template: string, context: Record<string, any>, lang?: string): Promise<string> {
    // Nếu muốn dịch động, có thể preload các key cần dịch vào context.translations
    // hoặc custom lại helper translate để gọi translaterService.translate (async)
    const compiled = this.handlebars.compile(template);
    return compiled({ ...context, lang });
  }
}
