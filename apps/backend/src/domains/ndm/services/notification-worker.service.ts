import { Injectable } from '@nestjs/common';
import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { NotificationHistoryRepository } from '../repositories/notification-history.repository';
import { NotificationStatus } from '../schemas/notification-history.schema';

@Injectable()
export class NotificationWorkerService {
  constructor(private readonly notificationHistoryRepository: NotificationHistoryRepository) {}

  @RabbitSubscribe({
    exchange: 'notification.exchange',
    routingKey: 'notification.send',
    queue: 'notification.send.queue',
  })
  async handleNotification(payload: any) {
    // Thực hiện gửi email/sms... (giả lập gửi thành công)
    // Sau đó lưu vào NotificationHistory với trạng thái phù hợp
    await this.notificationHistoryRepository.create({
      ...payload,
      status: NotificationStatus.QUEUED,
      processingAttempts: [{ status: NotificationStatus.QUEUED, attemptedAt: new Date() }],
    });
    // Sau khi gửi thành công/thất bại, update lại status, errorMessage, ...
  }
}
