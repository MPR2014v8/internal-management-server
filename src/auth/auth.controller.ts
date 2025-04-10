/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import {
  Controller,
  Post,
  Request,
  UseGuards,
  BadRequestException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from 'src/auth/local-auth.guard';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Request() req) {
    try {
      const { access_token } = await this.authService.login(req.user);
      return {
        accessToken: access_token,
      };
    } catch (error) {
      console.log('Error login :', error);
      throw new BadRequestException();
    }
  }

  @Post('/forgot-password')
  async forgotPassword(@Request() req) {
    try {
      console.log(req.body.email);
      return this.authService.forgotPassword(req.body.email);
    } catch (error) {
      console.log('Error forgotPassword :', error);
      throw new BadRequestException();
    }
  }

  @Post('/reset-password')
  async resetPassword(@Request() req) {
    try {
      console.log(req.body);
      const { password, token } = req.body;
      return this.authService.resetPassword(password, token);
    } catch (error) {
      console.log('Error resetPassword :', error);
      throw new BadRequestException();
    }
  }
}
