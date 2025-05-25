import { Injectable } from '@nestjs/common';
import { SessionRepository } from '../repositories/session.repository';
import { Types } from 'mongoose';
import { SessionDocument } from '../schemas/session.schema';
import { PinoLogger } from '../../../core/logger/pino.logger';

@Injectable()
/**
 * Service thao tác với session: tạo, xóa, xác thực session
 */
export class SessionService {
  private readonly logger = new PinoLogger(SessionService.name);
  constructor(
    private readonly sessionRepository: SessionRepository,
  ) { }

  /**
   * Tạo session mới
   * @param userId Mã user
   * @param userAgent Thông tin user agent
   * @param roleVersion Phiên bản role
   */
  public async createSession(userId: Types.ObjectId, userAgent: string, roleVersion: number): Promise<SessionDocument> {
    this.logger.info('Creating new session', { userId, userAgent, roleVersion });
    return this.sessionRepository.create({
      userId, userAgent, roleVersion, expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    });
  }

  /**
   * Xóa session theo id
   * @param sessionId Mã session
   */
  public async deleteSession(sessionId: string): Promise<void> {
    this.logger.info('Deleting session', { sessionId });
    await this.sessionRepository.delete(sessionId);
  }

  /**
   * Xác thực session hợp lệ
   * @param userId Mã user
   * @param sessionId Mã session
   * @param currentRoleVersion Phiên bản role hiện tại
   */
  public async validateSession(userId: Types.ObjectId, sessionId: string, currentRoleVersion: number): Promise<boolean> {
    this.logger.debug('Validating session', { userId, sessionId, currentRoleVersion });
    const session = await this.sessionRepository.findById(sessionId);
    if (!session) {
      this.logger.warn('Session not found', { sessionId });
      return false;
    }
    if (session.userId.toString() !== userId.toString()) {
      this.logger.warn('Session userId mismatch', { sessionId, userId });
      return false;
    }
    if (session.roleVersion !== currentRoleVersion) {
      this.logger.warn('Session role version mismatch', { sessionId, currentRoleVersion });
      return false;
    }
    if (session.expiresAt < new Date()) {
      this.logger.warn('Session expired', { sessionId });
      return false;
    }
    this.logger.info('Session is valid', { sessionId });
    return true;
  }
}
