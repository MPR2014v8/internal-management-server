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
import { RegisterDto } from './dto/register.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/register')
  create(@Body() registerDto: RegisterDto) {
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
}
