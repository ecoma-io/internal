import { Injectable } from '@nestjs/common';
import { UserService } from './user.service';
import { SessionService } from './session.service';
import { OTPService } from './otp.service';
import { RoleService } from './role.service';
import { RegisterDto, LoginByPassswordDto, AuthResponseDto, LoginByOTPDto } from '../dtos/auth.dto';
import { PinoLogger } from '../../../core/logger/pino.logger';
import { CreateUserDto } from '../dtos/user.dto';
import { Types } from 'mongoose';
import { NotificationService } from '../../ndm/services/notification-queue.service';

@Injectable()
export class AuthService {

  private readonly logger = new PinoLogger(AuthService.name);

  constructor(
    private readonly userService: UserService,
    private readonly sessionService: SessionService,
    private readonly otpService: OTPService,
    private readonly roleService: RoleService,
    private readonly notificationService: NotificationService
  ) { }

  public async signUp(registerDto: RegisterDto): Promise<AuthResponseDto> {
    this.logger.info('Start sign up user', { email: registerDto.email });
    this.logger.debug('Register data transfaer object', { ...registerDto });

    try {
      // 1. Kiểm tra email đã tồn tại chưa
      const existedUser = await this.userService.findUserByEmail(registerDto.email);
      if (existedUser) {
        this.logger.warn('Account with email already exists!', { email: registerDto.email });
        return { success: false, data: undefined };
      }

      // 2. Lấy role mặc định
      const defaultRole = await this.roleService['roleRepository'].findByName('user');
      const roleIds = defaultRole ? [defaultRole._id.toString()] : [];

      // 3. Tạo user mới
      const createUserDto: CreateUserDto = {
        firstName: registerDto.firstName,
        lastName: registerDto.lastName,
        email: registerDto.email,
        password: registerDto.password,
        roleIds,
      };
      const user = await this.userService.createUser(createUserDto);

      // 4. Gửi OTP xác thực email
      const otp = await this.otpService.generateAndSendOtp(user._id as Types.ObjectId, 'email_verification');

      // 5. Gửi thông báo otp đến cho user
      await this.notificationService.sendNotification({
        userId: user._id.toString(),
        email: user.email,
        templateName: 'otp_email',
        notificationType: 'otp',
        data: {
          otp: otp,
          expireMinutes: 5,
        },
      });

      this.logger.info('Đăng ký user thành công', { email: registerDto.email, userId: user._id }, 'AuthService');
      return { success: true, data: undefined };
    } catch (error) {
      this.logger.error('Đăng ký user thất bại', error, 'AuthService');
      throw error;
    }
  }

  public async signInByPassword(loginByPasswordDto: LoginByPassswordDto, headers: Record<string, string>): Promise<AuthResponseDto> {
    this.logger.info('Bắt đầu đăng nhập bằng password', { email: loginByPasswordDto.email }, 'AuthService');

    const userAgent = headers['user-agent'];
    if (!userAgent) {
      this.logger.warn('User agent không được cung cấp', {}, 'AuthService');
      return { success: false };
    }

    const user = await this.userService.findUserByEmail(loginByPasswordDto.email);

    if (!user || user.password !== loginByPasswordDto.password) {
      this.logger.warn('Sai email hoặc mật khẩu', { email: loginByPasswordDto.email }, 'AuthService');
      return { success: false };
    }
    // Tạo session
    const session = await this.sessionService.createSession(user._id, userAgent, user.roles?.[0]?.version || 1);
    this.logger.info('Đăng nhập thành công', { userId: user._id, sessionId: session._id }, 'AuthService');
    return { success: true, data: { token: session._id.toString(), passwordSetNeeded: !user.password } };
  }

  public async signInByOTP(loginByOTPDto: LoginByOTPDto, headers: Record<string, string>): Promise<AuthResponseDto> {
    this.logger.info('Bắt đầu đăng nhập bằng OTP', { email: loginByOTPDto.email }, 'AuthService');

    const userAgent = headers['user-agent'];
    if (!userAgent) {
      this.logger.warn('User agent không được cung cấp', {}, 'AuthService');
      return { success: false };
    }

    const user = await this.userService.findUserByEmail(loginByOTPDto.email);
    if (!user) {
      this.logger.warn('Không tìm thấy user', { email: loginByOTPDto.email }, 'AuthService');
      return { success: false };
    }
    const valid = await this.otpService.validateOtp(user._id, loginByOTPDto.otp);
    if (!valid) {
      this.logger.warn('OTP không hợp lệ', { email: loginByOTPDto.email }, 'AuthService');
      return { success: false };
    }
    // Tạo session
    const session = await this.sessionService.createSession(user._id, userAgent, user.roles?.[0]?.version || 1);
    this.logger.info('Đăng nhập OTP thành công', { userId: user._id, sessionId: session._id }, 'AuthService');
    return { success: true, data: { token: session._id.toString(), passwordSetNeeded: !user.password } };
  }

  public async signOut(userId: string, sessionId: string): Promise<void> {
    await this.sessionService.deleteSession(sessionId);
    this.logger.info('Đăng xuất thành công', { userId, sessionId }, 'AuthService');
  }


}
