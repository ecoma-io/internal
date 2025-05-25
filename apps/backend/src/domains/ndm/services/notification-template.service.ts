import { Injectable } from "@nestjs/common";
import { NotificationTemplateRepository } from "../repositories/notification-template.repository";

@Injectable()
export class NotificationTemplateService {
  constructor(private readonly notificationTemplateRepository: NotificationTemplateRepository) {}

  async findAll() {
    return this.notificationTemplateRepository.findAll();
  }
  // Thêm các method nghiệp vụ khác nếu cần
} 