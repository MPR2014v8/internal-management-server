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
  @Post('list') // Using POST to receive an array in the body
  async findManyByIds(@Body() ids: string[]): Promise<UserPermission[]> {
    return this.userPermissionService.findManyByIds(ids);
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
  async remove(@Body() ids: string[]): Promise<void> {
    return this.userPermissionService.remove(ids);
  }
}
