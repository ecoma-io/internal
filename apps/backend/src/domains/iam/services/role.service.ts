import { Injectable } from '@nestjs/common';
import { RoleRepository } from '../repositories/role.repository';
import { PermissionRepository } from '../repositories/permission.repository';
import { CreateRoleDto } from '../dtos/role.dto';
import { RoleDocument } from '../schemas/role.schema';
import { PinoLogger } from '../../../core/logger/pino.logger';

@Injectable()
/**
 * Service thao tác với role: tạo role, lấy permission của role
 */
export class RoleService {
  private readonly logger = new PinoLogger(RoleService.name);
  constructor(
    private readonly roleRepository: RoleRepository,
    private readonly permissionRepository: PermissionRepository,
  ) {}

  /**
   * Tạo role mới
   * @param createRoleDto Thông tin role
   */
  public async createRole(createRoleDto: CreateRoleDto): Promise<RoleDocument> {
    this.logger.info('Creating new role', { name: createRoleDto.name });
    return this.roleRepository.create(createRoleDto);
  }

  /**
   * Lấy danh sách permission của role
   * @param roleId Mã role
   */
  public async getRolePermissions(roleId: string): Promise<string[]> {
    this.logger.debug('Getting permissions for role', { roleId });
    const role = await this.roleRepository.findRolesByIds([roleId]);
    if (!role || role.length === 0) {
      this.logger.warn('Role not found', { roleId });
      return [];
    }
    return role[0].permissions;
  }
}
