import { Injectable, OnModuleInit } from "@nestjs/common";
import { LanguageSupportedService } from "./language-supported.service";
import { LanguageSupported } from "../schemas/language-supported.schema";

// Danh sách các ngôn ngữ theo chuẩn ISO 639-1 (trừ tiếng Anh)
const ISO_639_1_LANGUAGES: { code: string; name: string }[] = [
  { code: 'af', name: 'Afrikaans' },
  { code: 'am', name: 'አማርኛ' },
  { code: 'ar', name: 'العربية' },
  { code: 'az', name: 'Azərbaycanca' },
  { code: 'bn', name: 'বাংলা' },
  { code: 'bg', name: 'Български' },
  { code: 'bs', name: 'Bosanski' },
  { code: 'my', name: 'မြန်မာဘာသာ' },
  { code: 'ca', name: 'Català' }, // Thêm ngôn ngữ này để ví dụ sắp xếp
  { code: 'cs', name: 'Čeština' },
  { code: 'zh', name: '中文' },
  { code: 'co', name: 'Corsu' },
  { code: 'cy', name: 'Cymraeg' },
  { code: 'da', name: 'Dansk' },
  { code: 'de', name: 'Deutsch' },
  { code: 'dv', name: 'ދިވެހި' },
  { code: 'dz', name: 'རྫོང་ཁ་' },
  { code: 'el', name: 'Ελληνικά' },
  { code: 'en', name: 'English' },
  { code: 'es', name: 'Español' },
  { code: 'et', name: 'Eesti' },
  { code: 'fa', name: 'فارسی' },
  { code: 'fi', name: 'Suomi' },
  { code: 'fj', name: 'Vosa Vakaviti' },
  { code: 'fo', name: 'Føroyskt' },
  { code: 'fr', name: 'Français' },
  { code: 'fy', name: 'Frysk' },
  { code: 'ga', name: 'Gaeilge' },
  { code: 'gd', name: 'Gàidhlig' },
  { code: 'gu', name: 'ગુજરાતી' },
  { code: 'gv', name: 'Gaelg' },
  { code: 'ha', name: 'Hausa' },
  { code: 'he', name: 'עברית' },
  { code: 'hi', name: 'हिन्दी' },
  { code: 'hr', name: 'Hrvatski' },
  { code: 'hu', name: 'Magyar' },
  { code: 'hy', name: 'Հայերեն' },
  { code: 'id', name: 'Bahasa Indonesia' },
  { code: 'ig', name: 'Igbo' },
  { code: 'is', name: 'Íslenska' },
  { code: 'it', name: 'Italiano' },
  { code: 'ja', name: '日本語' },
  { code: 'ka', name: 'ქართული' },
  { code: 'kk', name: 'Қазақ тілі' },
  { code: 'kl', name: 'Kalaallisut' },
  { code: 'km', name: 'ភាសាខ្មែរ' },
  { code: 'kn', name: 'ಕನ್ನಡ' },
  { code: 'ko', name: '한국어' },
  { code: 'ku', name: 'Kurdî' },
  { code: 'ky', name: 'Кыргызча' },
  { code: 'lo', name: 'ລາວ' },
  { code: 'lt', name: 'Lietuvių' },
  { code: 'lv', name: 'Latviešu' },
  { code: 'li', name: 'Limburgs' },
  { code: 'mk', name: 'Македонски' },
  { code: 'ml', name: 'മലയാളം' },
  { code: 'mn', name: 'Монгол' },
  { code: 'mi', name: 'Māori' },
  { code: 'ms', name: 'Bahasa Melayu' },
  { code: 'ne', name: 'नेपाली' },
  { code: 'nl', name: 'Nederlands' },
  { code: 'no', name: 'Norsk' },
  { code: 'oc', name: 'Occitan' },
  { code: 'om', name: 'Oromoo' },
  { code: 'pa', name: 'ਪੰਜਾਬੀ' },
  { code: 'pl', name: 'Polski' },
  { code: 'pt', name: 'Português' },
  { code: 'ps', name: 'پښتو' },
  { code: 'ro', name: 'Română' },
  { code: 'ru', name: 'Русский' },
  { code: 'rw', name: 'Kinyarwanda' },
  { code: 'sd', name: 'سنڌي' },
  { code: 'sg', name: 'Sängö' },
  { code: 'si', name: 'සිංහල' },
  { code: 'sk', name: 'Slovenčina' },
  { code: 'sl', name: 'Slovenščina' },
  { code: 'sm', name: 'Gagana Sāmoa' },
  { code: 'so', name: 'Soomaaliga' },
  { code: 'sr', name: 'Српски' },
  { code: 'st', name: 'Sesotho' },
  { code: 'sv', name: 'Svenska' },
  { code: 'sw', name: 'Kiswahili' },
  { code: 'ta', name: 'தமிழ்' },
  { code: 'te', name: 'తెలుగు' },
  { code: 'tg', name: 'Тоҷикӣ' },
  { code: 'th', name: 'ไทย' },
  { code: 'ti', name: 'ትግርኛ' },
  { code: 'tk', name: 'Türkmençe' },
  { code: 'to', name: 'lea faka-Tonga' },
  { code: 'tr', name: 'Türkçe' },
  { code: 'ty', name: 'Reo Tahiti' },
  { code: 'ug', name: 'ئۇيغۇرچە' },
  { code: 'uk', name: 'Українська' },
  { code: 'ur', name: 'اردو' },
  { code: 'uz', name: 'Oʻzbekcha' },
  { code: 'vi', name: 'Tiếng Việt' },
  { code: 'wa', name: 'Walon' },
  { code: 'xh', name: 'IsiXhosa' },
  { code: 'yo', name: 'Yorùbá' },
  { code: 'zu', name: 'IsiZulu' }
];

@Injectable()
export class LanguageSupportedSeedingService implements OnModuleInit {
  constructor(private readonly languageSupportedService: LanguageSupportedService) { }

  async onModuleInit() {
    const existing = await this.languageSupportedService.findAll();
    const existingCodes = new Set(existing.map((l: LanguageSupported) => l.code));

    // Check if English exists
    const hasEnglish = existingCodes.has('en');

    // Filter languages to insert
    const toInsert = ISO_639_1_LANGUAGES.filter(lang => !existingCodes.has(lang.code));

    // If English is being inserted, set it as default
    if (!hasEnglish && toInsert.some(lang => lang.code === 'en')) {
      const englishIndex = toInsert.findIndex(lang => lang.code === 'en');
      toInsert[englishIndex] = { ...toInsert[englishIndex], isDefault: true } as LanguageSupported;
    }

    if (toInsert.length > 0) {
      await this.languageSupportedService.createMany(toInsert);
    }
  }
}
