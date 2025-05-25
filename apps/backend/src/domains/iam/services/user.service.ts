import { Injectable } from '@nestjs/common';
import { UserRepository } from '../repositories/user.repository';
import { RoleRepository } from '../repositories/role.repository';
import { CreateUserDto } from '../dtos/user.dto';
import { UserDocument } from '../schemas/user.schema';
import { PinoLogger } from '../../../core/logger/pino.logger';

@Injectable()
/**
 * Service thao tác với user: tạo, tìm kiếm, ...
 */
export class UserService {
  private readonly logger = new PinoLogger(UserService.name);
  constructor(
    private readonly userRepository: UserRepository,
    private readonly roleRepository: RoleRepository,
  ) {}

  /**
   * Tạo user mới
   * @param createUserDto Thông tin user
   */
  public async createUser(createUserDto: CreateUserDto): Promise<UserDocument> {
    this.logger.info('Creating new user', { email: createUserDto.email });
    const userData = {
      ...createUserDto,
      roles: [],
      isActive: true,
    };
    return this.userRepository.create(userData);
  }

  /**
   * Tìm user theo id
   * @param id Mã user
   */
  public async findUserById(id: string): Promise<UserDocument | null> {
    this.logger.debug('Finding user by id', { id });
    return this.userRepository.findByIdWithRoles(id);
  }

  /**
   * Tìm user theo email
   * @param email Email user
   */
  public async findUserByEmail(email: string): Promise<UserDocument | null> {
    this.logger.debug('Finding user by email', { email });
    return this.userRepository.findByEmail(email);
  }
}
