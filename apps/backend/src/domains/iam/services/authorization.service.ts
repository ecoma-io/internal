import { Injectable } from '@nestjs/common';
import { Types } from 'mongoose';
import { UserService } from './user.service';
import { RoleService } from './role.service';
import { PermissionService } from './permission.service';
import { PinoLogger } from '../../../core/logger/pino.logger';

@Injectable()
/**
 * Service kiểm tra quyền truy cập của user dựa trên role và permission.
 */
export class AuthorizationService {
  private readonly logger = new PinoLogger(AuthorizationService.name);
  constructor(
    private readonly userService: UserService,
    private readonly roleService: RoleService,
    private readonly permissionService: PermissionService,
  ) {}

  /**
   * Kiểm tra user có quyền requiredPermission không
   * @param userId Mã user
   * @param requiredPermission Quyền cần kiểm tra
   * @returns true nếu user có quyền, false nếu không
   */
  public async checkPermission(userId: Types.ObjectId, requiredPermission: string): Promise<boolean> {
    this.logger.info('Checking permission for user', { userId, requiredPermission });
    const user = await this.userService.findUserById(userId.toString());
    if (!user || !user.roles || user.roles.length === 0) {
      this.logger.warn('User not found or has no roles', { userId });
      return false;
    }
    const role = await this.roleService['roleRepository'].findRolesByIds([user.roles[0].toString()]);
    if (!role || role.length === 0) {
      this.logger.warn('Role not found for user', { userId });
      return false;
    }
    const hasPermission = role[0].permissions.includes(requiredPermission);
    this.logger.info('Permission check result', { userId, requiredPermission, hasPermission });
    return hasPermission;
  }
}
