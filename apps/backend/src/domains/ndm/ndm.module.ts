import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { RabbitMQConfig } from '../../config/rabbitmq.config';
import { MongooseModule } from "@nestjs/mongoose";
import {
  NotificationHistory,
  NotificationHistorySchema,
} from "./schemas/notification-history.schema";
import {
  NotificationTemplate,
  NotificationTemplateSchema,
} from "./schemas/notification-template.schema";
import { NotificationTemplateRepository } from './repositories/notification-template.repository';
import { NotificationHistoryRepository } from './repositories/notification-history.repository';
import { NotificationTemplateService } from './services/notification-template.service';
import { NotificationHistoryService } from './services/notification-history.service';
import { NotificationTemplateSeedingService } from './services/notification-template-seeding.service';
import { NotificationService } from './services/notification-queue.service';
import { NotificationWorkerService } from './services/notification-worker.service';
import { HandlebarsRenderService } from './services/handlebars-render.service';
import { LzmModule } from "../lzm/lzm.module";

@Module({
  imports: [
    LzmModule,
    RabbitMQModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const rabbitMQConfig = configService.get<RabbitMQConfig>('rabbitmq');
        return {
          exchanges: [
            { name: 'notification.exchange', type: 'topic' },
          ],
          uri: rabbitMQConfig.uri,
          connectionInitOptions: { wait: false },
        };
      },
    }),
    MongooseModule.forFeature([
      { name: NotificationTemplate.name, schema: NotificationTemplateSchema },
      { name: NotificationHistory.name, schema: NotificationHistorySchema },
    ]),
  ],
  providers: [
    NotificationTemplateRepository,
    NotificationHistoryRepository,
    NotificationTemplateService,
    NotificationHistoryService,
    NotificationTemplateSeedingService,
    NotificationService,
    NotificationWorkerService,
    HandlebarsRenderService,
  ],
  controllers: [],
  exports: [NotificationService],
})
export class NdmModule { }
