import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { OTP, OTPDocument } from '../schemas';

@Injectable()
export class OTPRepository {
  constructor(
    @InjectModel(OTP.name)
    private readonly otpModel: Model<OTPDocument>,
  ) {}

  public async findValidOtp(userId: Types.ObjectId, token: string): Promise<OTPDocument | null> {
    return this.otpModel.findOne({ user: userId, code: token, isValid: true }).exec();
  }

  public async createOrUpdateOtp({ userId, token, expiresAt, isUsed }: { userId: Types.ObjectId, token: string, expiresAt: Date, isUsed: boolean }) {
    const otpDoc = await this.otpModel.findOne({ userId, isUsed: false });
    if (otpDoc) {
      otpDoc.code = token;
      otpDoc.expiresAt = expiresAt;
      otpDoc.isUsed = isUsed;
      await otpDoc.save();
      return otpDoc;
    } else {
      return this.otpModel.create({ userId, code: token, expiresAt, isUsed });
    }
  }
}
