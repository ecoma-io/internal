import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Role, RoleDocument } from '../schemas';

@Injectable()
export class RoleRepository {
  constructor(
    @InjectModel(Role.name)
    private readonly roleModel: Model<RoleDocument>,
  ) {}

  public async findByName(name: string): Promise<RoleDocument | null> {
    return this.roleModel.findOne({ name }).exec();
  }

  public async findRolesByIds(ids: string[]): Promise<RoleDocument[]> {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    return this.roleModel.find({ _id: { $in: ids } }).exec();
  }

  public async create(createRoleDto: any) {
    return this.roleModel.create(createRoleDto);
  }
}
