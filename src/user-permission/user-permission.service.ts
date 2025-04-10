import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserPermission } from './schema/user-permission.schema';
import { CreateUserPermissionDto } from './dto/create-user-permission.dto';
import { UpdateUserPermissionDto } from './dto/update-user-permission.dto';

@Injectable()
export class UserPermissionService {
  constructor(
    @InjectModel(UserPermission.name)
    private readonly userPermissionModel: Model<UserPermission>,
  ) {}

  // Create a UserPermission
  async create(
    createUserPermissionDto: CreateUserPermissionDto,
  ): Promise<UserPermission> {
    const newUserPermission = new this.userPermissionModel(
      createUserPermissionDto,
    );
    return newUserPermission.save();
  }

  // Get all UserPermissions
  async findAll(): Promise<UserPermission[]> {
    return this.userPermissionModel.find().exec();
  }

  // Get a single UserPermission by ID
  async findOne(id: string): Promise<UserPermission> {
    const userPermission = await this.userPermissionModel.findById(id).exec();
    if (!userPermission) {
      throw new NotFoundException(`UserPermission with ID ${id} not found`);
    }
    return userPermission;
  }

  // Update a UserPermission
  async update(
    id: string,
    updateUserPermissionDto: UpdateUserPermissionDto,
  ): Promise<UserPermission> {
    const updatedUserPermission = await this.userPermissionModel
      .findByIdAndUpdate(id, updateUserPermissionDto, { new: true })
      .exec();
    if (!updatedUserPermission) {
      throw new NotFoundException(`UserPermission with ID ${id} not found`);
    }
    return updatedUserPermission;
  }

  // Delete a UserPermission
  async remove(id: string): Promise<void> {
    const result = await this.userPermissionModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`UserPermission with ID ${id} not found`);
    }
  }
}
