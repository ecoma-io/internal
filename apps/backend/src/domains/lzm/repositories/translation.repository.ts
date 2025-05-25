import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Translation, TranslationDocument } from "../schemas/translation.schema";

@Injectable()
export class TranslationRepository {
  constructor(
    @InjectModel(Translation.name)
    private readonly translationModel: Model<TranslationDocument>
  ) {}

  async findAll() {
    return this.translationModel.find().exec();
  }

  async findOne(id: string) {
    return this.translationModel.findById(id).exec();
  }

  async create(dto: any) {
    return this.translationModel.create(dto);
  }

  async update(id: string, dto: any) {
    return this.translationModel.findByIdAndUpdate(id, dto, { new: true }).exec();
  }

  async remove(id: string) {
    return this.translationModel.findByIdAndDelete(id).exec();
  }

  async findByKey(key: string) {
    return this.translationModel.findOne({ key }).exec();
  }

  // Thêm các method CRUD khác nếu cần
}
