import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Permission, PermissionDocument } from '../schemas';
import { CreatePermissionDto } from '../dtos/permission.dto';

@Injectable()
export class PermissionRepository {
  constructor(
    @InjectModel(Permission.name)
    private readonly permissionModel: Model<PermissionDocument>,
  ) {}

  public async findByGroupKey(groupKey: string): Promise<PermissionDocument | null> {
    return this.permissionModel.findOne({ groupKey }).exec();
  }

  public async findAll(): Promise<PermissionDocument[]> {
    return this.permissionModel.find().exec();
  }

  public async create(createPermissionDto: CreatePermissionDto) {
    return this.permissionModel.create(createPermissionDto);
  }
}
