import { Injectable } from "@nestjs/common";
import { LanguageSupportedRepository } from "../repositories/language-supported.repository";
import { Types } from 'mongoose';

@Injectable()
export class LanguageSupportedService {
  constructor(private readonly languageSupportedRepository: LanguageSupportedRepository) { }

  async findAll() {
    return this.languageSupportedRepository.find({});
  }

  async findAllActived() {
    return this.languageSupportedRepository.find({ isActive: true });
  }

  async findAllActivedAndTranslatation() {
    return this.languageSupportedRepository.find({ isActive: true, isActiveTranslatation: true });
  }

  async createMany(languages: Partial<{ code: string; name: string; isDefault?: boolean; isActive?: boolean; isActiveTranslatation?: boolean; order?: number; description?: string; }>[]) {
    return this.languageSupportedRepository.createMany(languages);
  }

  async setActive(id: string, isActive: boolean) {
    return this.languageSupportedRepository.updateById(id, { isActive });
  }

  async setActiveTranslation(id: string, isActiveTranslatation: boolean) {
    return this.languageSupportedRepository.updateById(id, { isActiveTranslatation });
  }

  async verifyLanguage(id: string, verifyBy: string) {
    return this.languageSupportedRepository.updateById(id, { verifyBy: new Types.ObjectId(verifyBy) });
  }

  async updateDescription(id: string, description: string) {
    return this.languageSupportedRepository.updateById(id, { description });
  }

}
