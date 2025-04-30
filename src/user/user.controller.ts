/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Request,
  BadRequestException,
  Patch,
  Delete,
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/register.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UserDocument } from './schema/user.schema';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/register')
  create(@Body() registerDto: CreateUserDto) {
    try {
      return this.userService.create(registerDto);
    } catch (error) {
      console.log('Error create :', error);
      throw new BadRequestException();
    }
  }

  @Get()
  findAll() {
    try {
      return this.userService.getAllUsers();
    } catch (error) {
      console.log('Error findAll :', error);
      throw new BadRequestException();
    }
  }

  @Post('/findOne')
  async findOne(@Body() body: { id: string }): Promise<UserDocument> {
    const user = await this.userService.findById(body.id);
    if (!user) {
      throw new BadRequestException('User not found');
    }
    return user;
  }

  @Post('/findMany')
    async findMany(@Body() body: { ids: string[] }): Promise<UserDocument[]> {
      return this.userService.findByIds(body.ids);
  }

  @Put('/update')
  async update(
    @Body() updateProjectDtos: UpdateUserDto[],
  ): Promise<UserDocument[]> {
    return this.userService.update(updateProjectDtos);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/profile')
  async getProfile(@Request() req) {
    try {
      console.log('req.user : ', req.user);
      const user = await this.userService.findByEmail(req.user.email);
      const result = user?.toObject();
      return {
        _id: result._id,
        email: result.email,
        name: result.name,
        isAdmin: result.isAdmin,
        createdAt: result.createdAt,
        updatedAt: result.updatedAt,
      };
    } catch (error) {
      console.log('Error getProfile :', error);
      throw new BadRequestException();
    }
  }

  // Deactivate user
  @Patch('/deactivate')
  async deactivateUser(@Body() body: { userId: string }) {
    try {
      const { userId } = body;
      return await this.userService.deactivateUser(userId);
    } catch (error) {
      console.error('Error deactivating user:', error);
      throw new BadRequestException('Failed to deactivate user');
    }
  }

  // Remove user
  @Delete('/remove')
  async removeUser(@Body() body: { userId: string }) {
    try {
      const { userId } = body;
      return await this.userService.removeUser(userId);
    } catch (error) {
      console.error('Error removing user:', error);
      throw new BadRequestException('Failed to remove user');
    }
  }
}
