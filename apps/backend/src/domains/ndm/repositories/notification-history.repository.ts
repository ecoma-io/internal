import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { NotificationHistory, NotificationHistoryDocument } from "../schemas/notification-history.schema";

@Injectable()
export class NotificationHistoryRepository {
  constructor(
    @InjectModel(NotificationHistory.name)
    private readonly notificationHistoryModel: Model<NotificationHistoryDocument>
  ) {}

  async findAll() {
    return this.notificationHistoryModel.find().exec();
  }

  async create(data: any) {
    return this.notificationHistoryModel.create(data);
  }

  // Thêm các method CRUD khác nếu cần
}
