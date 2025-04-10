/* eslint-disable @typescript-eslint/require-await */
import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { UserPermissionService } from './user-permission.service';
import { CreateUserPermissionDto } from './dto/create-user-permission.dto';
import { UpdateUserPermissionDto } from './dto/update-user-permission.dto';
import { UserPermission } from './schema/user-permission.schema';

@Controller('user-permissions')
export class UserPermissionController {
  constructor(private readonly userPermissionService: UserPermissionService) {}

  // Create a new UserPermission
  @Post()
  async create(
    @Body() createUserPermissionDto: CreateUserPermissionDto,
  ): Promise<UserPermission> {
    return this.userPermissionService.create(createUserPermissionDto);
  }

  // Get all UserPermissions
  @Get()
  async findAll(): Promise<UserPermission[]> {
    return this.userPermissionService.findAll();
  }

  // Get a single UserPermission by ID
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<UserPermission> {
    return this.userPermissionService.findOne(id);
  }

  // Update UserPermission
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateUserPermissionDto: UpdateUserPermissionDto,
  ): Promise<UserPermission> {
    return this.userPermissionService.update(id, updateUserPermissionDto);
  }

  // Delete UserPermission
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.userPermissionService.remove(id);
  }
}
