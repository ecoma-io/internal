import { Injectable } from "@nestjs/common";
import { TranslationRepository } from "../repositories/translation.repository";

@Injectable()
export class TranslationService {
  constructor(private readonly translationRepository: TranslationRepository) {}

  async findAll() {
    return this.translationRepository.findAll();
  }

  async findOne(id: string) {
    return this.translationRepository.findOne(id);
  }

  async create(dto: any) {
    return this.translationRepository.create(dto);
  }

  async update(id: string, dto: any) {
    return this.translationRepository.update(id, dto);
  }

  async remove(id: string) {
    return this.translationRepository.remove(id);
  }

  async getValue(key: string, lang: string): Promise<string | null> {
    const translation = await this.translationRepository.findByKey(key);
    if (!translation) return null;
    if (translation.values instanceof Map) {
      return translation.values.get(lang) || null;
    }
    // Nếu values là object (trường hợp mapping từ DB)
    if (typeof translation.values === 'object' && translation.values !== null) {
      return translation.values[lang] || null;
    }
    return null;
  }

  // Thêm các method nghiệp vụ khác nếu cần
}
