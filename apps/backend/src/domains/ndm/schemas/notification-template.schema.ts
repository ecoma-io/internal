// Định nghĩa kiểu HydratedDocument cho NotificationTemplate, kế thừa từ Document

import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

@Schema({ collection: "notification-templates", timestamps: true })
export class NotificationTemplate {
  @Prop({ required: true, unique: true, trim: true })
  templateName: string; // Tên định danh cho mẫu (ví dụ: 'order_confirmation', 'password_reset')

  @Prop({ required: true, trim: true })
  subject: string; // Chủ đề mặc định của email. Có thể chứa các placeholder (ví dụ: "Đơn hàng {{orderId}} của bạn đã được xác nhận")

  @Prop({ required: true })
  bodyHtml: string; // Nội dung HTML của email. Sử dụng handlebar template

  @Prop()
  bodyText?: string; // Nội dung text thuần túy của email sử dụng handlebar template (fallback hoặc client không hỗ trợ HTML)

  @Prop([String]) // Mảng các placeholder có thể sử dụng trong mẫu (ví dụ: ['userName', 'orderId'])
  placeholders: string[];

  @Prop()
  description?: string; // Mô tả ngắn gọn về mục đích của mẫu
}

export type NotificationTemplateDocument =
  HydratedDocument<NotificationTemplate>;
export const NotificationTemplateSchema =
  SchemaFactory.createForClass(NotificationTemplate);
