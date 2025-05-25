import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { OTP, OTPSchema } from "./schemas/otp.schema";
import { Permission, PermissionSchema } from "./schemas/permission.schema";
import { Role, RoleSchema } from "./schemas/role.chema";
import { Session, SessionSchema } from "./schemas/session.schema";
import { User, UserSchema } from "./schemas/user.schema";
import { NdmModule } from "../ndm/ndm.module";

@Module({
  imports: [
    NdmModule,
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Role.name, schema: RoleSchema },
      { name: Permission.name, schema: PermissionSchema },
      { name: Session.name, schema: SessionSchema },
      { name: OTP.name, schema: OTPSchema },
    ]),
  ],
  providers: [],
  controllers: [],
})
export class IamModule {}
