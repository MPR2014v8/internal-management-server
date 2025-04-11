/* eslint-disable no-useless-catch */
import { Controller, Get, Post, Body, Delete, Put } from '@nestjs/common';
import { UserPermissionService } from './user-permission.service';
import { CreateUserPermissionDto } from './dto/create-user-permission.dto';
import { UserPermission } from './schema/user-permission.schema';

@Controller('user-permissions')
export class UserPermissionController {
  constructor(private readonly userPermissionService: UserPermissionService) {}

  // Create multiple user permissions
  @Post()
  async create(
    @Body() createUserPermissionDtos: CreateUserPermissionDto[],
  ): Promise<UserPermission[]> {
    return this.userPermissionService.create(createUserPermissionDtos);
  }

  // Get all user permissions
  @Get()
  async findAll(): Promise<UserPermission[]> {
    return this.userPermissionService.findAll();
  }

  // Get multiple user permissions by a list of IDs
  @Post('list')
  async findManyByIds(
    @Body() body: { ids: string[] },
  ): Promise<UserPermission[]> {
    const { ids } = body;
    console.log('ids : ', ids);
    try {
      return await this.userPermissionService.findManyByIds(ids);
    } catch (error) {
      console.error('Error finding user permissions by IDs:', error);
      return [];
    }
  }

  // Update multiple user permissions
  @Put()
  async update(
    @Body() updateUserPermissionDtos: CreateUserPermissionDto[],
  ): Promise<UserPermission[]> {
    return this.userPermissionService.update(updateUserPermissionDtos);
  }

  // Delete multiple user permissions
  @Delete()
  async remove(@Body() body: { ids: string[] }) {
    try {
      const { ids } = body;
      await this.userPermissionService.remove(ids);
      return { message: 'User permissions deleted successfully' };
    } catch (error) {
      throw error;
    }
  }
}
