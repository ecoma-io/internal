import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Schema as MongooseSchema } from "mongoose";
import { Role, RoleSchema } from "./role.chema";

@Schema({ timestamps: true, collection: "users" })
export class User {
  @Prop({ required: true, trim: true })
  firstName: string;

  @Prop({ trim: true })
  lastName?: string;

  @Prop({ required: true, unique: true, trim: true, lowercase: true })
  email: string;

  @Prop({ trim: true }) // Password là optional
  password?: string;

  @Prop({
    type: [{ type: MongooseSchema.Types.ObjectId, ref: RoleSchema }],
    default: [],
  })
  roles: Role[]; // Mảng các ID của roles

  @Prop({ default: true })
  isActive: boolean;
}
export type UserDocument = HydratedDocument<User>;
export const UserSchema = SchemaFactory.createForClass(User);
