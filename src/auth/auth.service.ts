/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-base-to-string */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { HttpCode, Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { SessionService } from 'src/session/session.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import * as nodemailer from 'nodemailer';
import * as dotenv from 'dotenv';
import { HttpErrorByCode } from '@nestjs/common/utils/http-error-by-code.util';
import { Types } from 'mongoose';

dotenv.config(); // Load environment variables

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly sessionService: SessionService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.userService.findByEmail(email);

    console.log('user :: ', user);
    console.log('password :: ', password);

    if (user && (await bcrypt.compare(password, user.password))) {
      const result = user.toObject();
      console.log('result :: ', result);
      return {
        email: result.email,
        userId: result._id,
      };
    }

    return null;
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user.user };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async forgotPassword(
    email: string,
  ): Promise<{ status: number; message: string }> {
    try {
      const user = await this.userService.findByEmail(email);
      if (!user) {
        return { status: 404, message: 'User not found.' };
      }

      const token = this.generateResetToken();

      await this.sessionService.createResetPasswordSession({
        token,
        expiresAt: new Date(Date.now() + 60 * 60 * 1000), // 1 hour expiration
        user: user._id as Types.ObjectId,
      });

      const resetLink = `http://localhost:3001/logins/reset_password/${token}`;
      const subject = `Hi ${user.name}, reset your password`;
      const mailTemplate = `<h1>Hello</h1><p>Click <a href="${resetLink}">here</a> to reset your password.</p>`;
      await this.sendMail(email, subject, mailTemplate);

      return {
        status: 200,
        message: 'Password reset email sent successfully.',
      };
    } catch (error) {
      console.error('Error in forgotPassword:', error);
      return {
        status: 500,
        message: 'An error occurred while processing the request.',
      };
    }
  }

  async resetPassword(
    password: string,
    token: string,
  ): Promise<{ status: number; message: string }> {
    try {
      const session = await this.sessionService.findByToken(token);
      if (!session || session.expiresAt < new Date()) {
        return { status: 401, message: 'Session has expired or is invalid.' };
      }

      const user = await this.userService.findById(session.user.toString());
      if (!user) {
        return { status: 404, message: 'User not found.' };
      }

      user.password = password;
      await user.save();
      await this.sessionService.remove([session._id as string]);

      return { status: 200, message: 'Password reset successfully.' };
    } catch (error) {
      console.error('Error in resetPassword:', error);
      return {
        status: 500,
        message: 'An error occurred while processing the request.',
      };
    }
  }

  private generateResetToken(): string {
    const randomString =
      require('crypto').randomBytes(32).toString('hex') +
      new Date().toISOString();
    return require('crypto')
      .createHash('sha256')
      .update(randomString)
      .digest('hex');
  }

  async sendMail(to: string, subject: string, html: string): Promise<void> {
    try {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        host: process.env.MAIL_HOST,
        port: 587,
        secure: false,
        auth: {
          user: process.env.MAIL_USERNAME,
          pass: process.env.MAIL_PASSWORD,
        },
      });

      const mailOptions = { to, subject, html };
      await transporter.sendMail(mailOptions);
      console.log('Email sent successfully to:', to);
    } catch (error) {
      console.error('Error in sendMail:', error);
    }
  }
}
