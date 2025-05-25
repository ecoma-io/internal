import { Injectable } from '@nestjs/common';
import { OTPRepository } from '../repositories/otp.repository';
import { Types } from 'mongoose';
import { PinoLogger } from '../../../core/logger/pino.logger';

/**
 * Service xử lý OTP: tạo, gửi, xác thực OTP cho user
 */
@Injectable()
export class OTPService {
  private readonly logger = new PinoLogger(OTPService.name);

  constructor(
    private readonly otpRepository: OTPRepository,
  ) {}

  /**
   * Tạo và gửi OTP cho user
   * @param userId Mã user
   * @param type Loại OTP (email_verification, password_reset)
   */
  public async generateAndSendOtp(userId: Types.ObjectId, type: 'email_verification' | 'password_reset'): Promise<string> {
    // 1. Tạo mã OTP 6 số
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 phút
    // 2. Lưu vào DB
    await this.otpRepository.createOrUpdateOtp({ userId, token: otp, expiresAt, isUsed: false });
    // 3. Gửi email (giả lập)
    this.logger.info('Generated and sent OTP', { userId, type });
    this.logger.debug('OTP value (for dev only)', { otp });
    return otp;
  }

  /**
   * Xác thực OTP
   * @param userId Mã user
   * @param token Mã OTP
   */
  public async validateOtp(userId: Types.ObjectId, token: string): Promise<boolean> {
    this.logger.info('Validating OTP', { userId });
    const otpDoc = await this.otpRepository.findValidOtp(userId, token);
    if (!otpDoc) {
      this.logger.warn('OTP not found or invalid', { userId });
      return false;
    }
    otpDoc.isUsed = true;
    await otpDoc.save();
    this.logger.info('OTP validated and marked as used', { userId });
    return true;
  }
}
