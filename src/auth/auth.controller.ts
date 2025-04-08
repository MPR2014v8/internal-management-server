/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from 'src/auth/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Request() req) {
    const { access_token } = await this.authService.login(req.user);
    return {
      accessToken: access_token,
    };
  }

  @Post('/forgot-password')
  async forgotPassword(@Request() req) {
    console.log(req.body.email);
    return this.authService.forgotPassword(req.body.email);
  }

  @Post('/reset-password')
  async resetPassword(@Request() req) {
    console.log(req.body);
    const { password, token } = req.body;
    return this.authService.resetPassword(password, token);
  }
}
