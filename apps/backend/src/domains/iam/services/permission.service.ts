import { Injectable } from '@nestjs/common';
import { PermissionRepository } from '../repositories/permission.repository';
import { CreatePermissionDto } from '../dtos/permission.dto';
import { PermissionDocument } from '../schemas/permission.schema';
import { PinoLogger } from '../../../core/logger/pino.logger';

@Injectable()
/**
 * Service thao tác với permission: tạo group, resolve implied permissions
 */
export class PermissionService {
  private readonly logger = new PinoLogger(PermissionService.name);
  constructor(
    private readonly permissionRepository: PermissionRepository,
  ) {}

  /**
   * Tạo permission group mới
   * @param createPermissionDto Thông tin group
   */
  public async createPermissionGroup(createPermissionDto: CreatePermissionDto): Promise<PermissionDocument> {
    this.logger.info('Creating new permission group', { groupKey: createPermissionDto.groupKey });
    return this.permissionRepository.create(createPermissionDto);
  }

  /**
   * Resolve các permission implied từ các key truyền vào
   * @param basePermissionKeys Danh sách key gốc
   */
  public async resolveImpliedPermissions(basePermissionKeys: string[]): Promise<Set<string>> {
    this.logger.debug('Resolving implied permissions', { basePermissionKeys });
    const allPermissions = await this.permissionRepository.findAll();
    const result = new Set<string>();
    for (const group of allPermissions) {
      for (const action of group.actions) {
        const key = `${group.groupKey}:${action.key}`;
        if (basePermissionKeys.includes(key)) {
          result.add(key);
          if (action.implies && Array.isArray(action.implies)) {
            for (const implied of action.implies) {
              result.add(implied);
            }
          }
        }
      }
    }
    this.logger.info('Resolved implied permissions', { result: Array.from(result) });
    return result;
  }
}
