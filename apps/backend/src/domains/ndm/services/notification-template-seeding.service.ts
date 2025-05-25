import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { NotificationTemplateRepository } from '../repositories/notification-template.repository';

@Injectable()
export class NotificationTemplateSeedingService implements OnModuleInit {
  private readonly logger = new Logger(NotificationTemplateSeedingService.name);

  constructor(
    private readonly notificationTemplateRepository: NotificationTemplateRepository,
  ) {}

  async onModuleInit() {
    await this.seedDefaultTemplates();
  }

  async seedDefaultTemplates() {
    await this.seedDefaultLayout();
    await this.seedOtpTemplate();
  }

  private async seedDefaultLayout() {
    const templateName = 'default_layout';
    const existed = await this.notificationTemplateRepository.findByTemplateName(templateName);
    if (existed) {
      this.logger.log(`Template '${templateName}' đã tồn tại, bỏ qua seeding.`);
      return;
    }
    const defaultLayout = {
      templateName,
      subject: '{{subject}}',
      bodyHtml: '<html><body><div style="padding:24px;">{{{bodyHtml}}}</div></body></html>',
      bodyText: '{{bodyText}}',
      placeholders: ['subject', 'bodyHtml', 'bodyText'],
      description: 'Layout mặc định cho tất cả email.'
    };
    await this.notificationTemplateRepository.upsertByTemplateName(templateName, defaultLayout);
    this.logger.log(`Seeded template: ${templateName}`);
  }

  private async seedOtpTemplate() {
    const templateName = 'otp_email';
    const existed = await this.notificationTemplateRepository.findByTemplateName(templateName);
    if (existed) {
      this.logger.log(`Template '${templateName}' đã tồn tại, bỏ qua seeding.`);
      return;
    }
    const otpTemplate = {
      templateName,
      subject: 'Mã xác thực OTP của bạn',
      bodyHtml: '<h2>Mã OTP của bạn là: <b>{{otp}}</b></h2><p>Mã này sẽ hết hạn sau {{expireMinutes}} phút.</p>',
      bodyText: 'Mã OTP của bạn là: {{otp}}. Mã này sẽ hết hạn sau {{expireMinutes}} phút.',
      placeholders: ['otp', 'expireMinutes'],
      description: 'Template gửi mã OTP cho người dùng.'
    };
    await this.notificationTemplateRepository.upsertByTemplateName(templateName, otpTemplate);
    this.logger.log(`Seeded template: ${templateName}`);
  }
}
