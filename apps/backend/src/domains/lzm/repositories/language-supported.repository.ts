import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, RootFilterQuery } from "mongoose";
import { LanguageSupported, LanguageSupportedDocument } from "../schemas/language-supported.schema";

@Injectable()
export class LanguageSupportedRepository {
  constructor(
    @InjectModel(LanguageSupported.name)
    private readonly languageSupportedModel: Model<LanguageSupportedDocument>
  ) { }

  async find(query: RootFilterQuery<LanguageSupportedDocument>) {
    return this.languageSupportedModel.find(query).exec();
  }

  async createMany(languages: Partial<LanguageSupported>[]) {
    return this.languageSupportedModel.insertMany(languages, { ordered: false });
  }

  async updateById(id: string, update: Partial<LanguageSupported>) {
    return this.languageSupportedModel.findByIdAndUpdate(id, update, { new: true }).exec();
  }

  // Thêm các method CRUD khác nếu cần
}
