import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";
import { User } from "../../iam/schemas";

@Schema({ collection: "languages-supported", timestamps: true })
export class LanguageSupported {
  @Prop({ required: true, unique: true, trim: true })
  // Mã ngôn ngữ theo chuẩn ISO 639-1 (ví dụ: 'en', 'vi', 'fr', 'es').
  // Đây là key chính để tham chiếu ngôn ngữ.
  code: string;

  @Prop({ required: true, trim: true })
  // Tên hiển thị của ngôn ngữ (ví dụ: 'English', 'Tiếng Việt', 'Français').
  // Dùng cho việc hiển thị trong giao diện người dùng.
  name: string;

  @Prop({ required: true, default: false })
  // Xác định liệu đây có phải là ngôn ngữ mặc định (fallback) hay không.
  // Chỉ nên có MỘT ngôn ngữ mặc định.
  isDefault: boolean;


  @Prop({ default: false })
  // Trạng thái kích hoạt: liệu ngôn ngữ này có đang được sử dụng hay không.
  // Cho phép vô hiệu hóa một ngôn ngữ mà không cần xóa nó.
  isActive: boolean;

  @Prop({ default: false })
  // Xác định liệu đây có phải là ngôn ngữ mặc định (fallback) hay không.
  // Chỉ nên có MỘT ngôn ngữ mặc định.
  isActiveTranslatation: boolean;

  @Prop()
  // Mô tả thêm về ngôn ngữ (ví dụ: 'Ngôn ngữ chính cho thị trường Bắc Mỹ').
  description?: string;

  @Prop({ type: Types.ObjectId, ref: "User" })
  // Người dùng đã xác thực ngôn ngữ này
  // Nếu không có người xác thực thì sẽ là undefined
  verifyBy?: Types.ObjectId | User;

}
export type LanguageSupportedDocument = HydratedDocument<LanguageSupported>;
export const LanguageSupportedSchema = SchemaFactory.createForClass(LanguageSupported);

