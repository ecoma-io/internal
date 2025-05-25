import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { NotificationTemplate, NotificationTemplateDocument } from "../schemas/notification-template.schema";

@Injectable()
export class NotificationTemplateRepository {
  constructor(
    @InjectModel(NotificationTemplate.name)
    private readonly notificationTemplateModel: Model<NotificationTemplateDocument>
  ) {}

  async findAll() {
    return this.notificationTemplateModel.find().exec();
  }

  async findByTemplateName(templateName: string) {
    return this.notificationTemplateModel.findOne({ templateName }).exec();
  }

  async upsertByTemplateName(templateName: string, data: Partial<NotificationTemplate>) {
    return this.notificationTemplateModel.updateOne(
      { templateName },
      { $set: data },
      { upsert: true }
    );
  }

  // Thêm các method CRUD khác nếu cần
}
