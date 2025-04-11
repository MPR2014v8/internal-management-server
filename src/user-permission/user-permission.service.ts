/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import {
  UserPermission,
  UserPermissionDocument,
} from './schema/user-permission.schema';
import { CreateUserPermissionDto } from './dto/create-user-permission.dto';

@Injectable()
export class UserPermissionService {
  constructor(
    @InjectModel(UserPermission.name)
    private readonly userPermissionModel: Model<UserPermissionDocument>,
  ) {}

  // Create multiple user permissions
  async create(
    createUserPermissionDtos: CreateUserPermissionDto[],
  ): Promise<UserPermission[]> {
    const userPermissions = createUserPermissionDtos.map((dto) => ({
      ...dto,
      user: new Types.ObjectId(dto.user),
    }));

    try {
      const newUserPermissions =
        await this.userPermissionModel.insertMany(userPermissions);
      return this.userPermissionModel
        .find({ _id: { $in: newUserPermissions.map((t) => t._id) } })
        .lean()
        .exec();
    } catch (error) {
      throw new Error(`Error creating user permissions: ${error.message}`);
    }
  }

  // Get all user permissions
  async findAll(): Promise<UserPermission[]> {
    return this.userPermissionModel.find().populate('user').lean().exec();
  }

  // Get multiple user permissions by a list of IDs
  async findManyByIds(ids: string[]): Promise<UserPermission[]> {
    const objectIds = ids.map((id) => new Types.ObjectId(id));
    return this.userPermissionModel
      .find({ _id: { $in: objectIds } })
      .populate('user')
      .lean()
      .exec();
  }

  // Update multiple user permissions
  async update(
    updateUserPermissionDtos: CreateUserPermissionDto[],
  ): Promise<UserPermission[]> {
    const updatedUserPermissions: UserPermission[] = [];

    for (const dto of updateUserPermissionDtos) {
      const updated = await this.userPermissionModel
        .findOneAndUpdate(
          { _id: new Types.ObjectId(dto._id) },
          {
            permissionName: dto.permissionName,
            user: new Types.ObjectId(dto.user),
          },
          { new: true }, // Return the updated document
        )
        .lean()
        .exec();

      if (!updated) {
        throw new Error(`User permission with ID ${dto._id} not found`);
      }

      updatedUserPermissions.push(updated);
    }

    return updatedUserPermissions;
  }

  // Delete multiple user permissions by IDs
  async remove(ids: string[]): Promise<void> {
    const objectIds = ids.map((id) => new Types.ObjectId(id));
    const result = await this.userPermissionModel
      .deleteMany({ _id: { $in: objectIds } })
      .exec();

    if (result.deletedCount === 0) {
      throw new Error('No user permissions were deleted');
    }
  }
}
