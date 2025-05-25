import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

@Schema({ collection: "translations", timestamps: true })
export class Translation {
  @Prop({ required: true, unique: true, trim: true })
  // Key duy nhất của bản dịch, ví dụ: 'email.order_confirmation.subject', 'email.common.greeting'
  key: string;

  @Prop({
    type: Map, // Mongoose sẽ lưu trữ dưới dạng một object trong DB: { "en": "Value in English", "vi": "Giá trị tiếng Việt" }
    of: String, // Giá trị của mỗi cặp key-value trong Map là một chuỗi
    required: true,
  })
  // Map từ mã ngôn ngữ sang nội dung đã dịch
  values: Map<string, string>;

  @Prop()
  description?: string; // Mô tả thêm về bản dịch này (ví dụ: "Chủ đề email xác nhận đơn hàng")
}

export type TranslationDocument = HydratedDocument<Translation>;
export const TranslationSchema = SchemaFactory.createForClass(Translation);
