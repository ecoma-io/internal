import { Injectable } from '@nestjs/common';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { CreateNotificationHistoryDto } from '../dtos/notification-history.dto';

@Injectable()
export class NotificationService {
  private readonly exchange = 'notification.exchange';
  private readonly routingKey = 'notification.send';

  constructor(private readonly amqpConnection: AmqpConnection) {}

  /**
   * Publish yêu cầu gửi notification vào RabbitMQ
   */
  async sendNotification(dto: CreateNotificationHistoryDto): Promise<void> {
    await this.amqpConnection.publish(this.exchange, this.routingKey, dto);
  }
}
