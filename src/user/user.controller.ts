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
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/register.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

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
