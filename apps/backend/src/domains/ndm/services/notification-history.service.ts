import { Injectable } from "@nestjs/common";
import { NotificationHistoryRepository } from "../repositories/notification-history.repository";

@Injectable()
export class NotificationHistoryService {
  constructor(private readonly notificationHistoryRepository: NotificationHistoryRepository) {}

  async findAll() {
    return this.notificationHistoryRepository.findAll();
  }
  // Thêm các method nghiệp vụ khác nếu cần
} 