/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { SessionService } from 'src/session/session.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import * as nodemailer from 'nodemailer';
import * as dotenv from 'dotenv';


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
    const payload = { email: user.email, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async forgotPassword(email: string) {
    try {
      const existUser = await this.userService.findByEmail(email);
      if (!existUser) {
        throw new Error('User not found');
      }

      const randomString = require('crypto').randomBytes(32).toString('hex') + new Date().toISOString();
      const Token = require('crypto').createHash('sha256').update(randomString).digest('hex');
      const resCreateSession = await this.sessionService.createResetPasswordSession({ token: Token, expiresAt: new Date(Date.now() + 60 * 60 * 1000) });
      
      if (!resCreateSession) {
        throw new Error('Failed to create session for password reset');
      }
      console.log('resCreateSession :: ', resCreateSession);
      
      existUser.sessions.push(resCreateSession);
      await existUser.save();

      const from: string = 'testing@resetpassword.com';
      const to: string = email;
      const subject: string = 'Hi there, this is a link to reset your password';
      const mailTemplate: string = `<h1>Hello</h1><p>This is a link for reset password http://localhost:3001/logins/reset_password/${Token}</p>`;

      this.sendMail( from, to, subject, mailTemplate);
      
      
    } catch (error) {
      console.error('Error in forgotPassword:', error);
      throw new Error('Failed to send password reset email');
    }
    
  }

  async resetPassword(password: string, token: string) {
    try {
      const session = await this.sessionService.findByToken(token);
      if (!session) {
        throw new Error('session not found');
      }
      const user = await this.userService.findBySessionId(session);
      if (!user) {
        throw new Error('User not found');
      }
      
      
      user.set('password', password);
      await user.save().then(async () => {
        this.sessionService.remove(session._id as string);
        this.userService.removeSession(user._id as string, session._id as string);
      });
      console.log('Password reset successfully for user:', user.email);
      
    } catch (error) {
      console.error('Error in resetPassword:', error);
      throw new Error('Failed to reset password');
    }

  }


  async sendMail (from: string, to: string, subject: string, html: string) {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        host: process.env.MAIL_HOST,
        port: 587,
        secure: false,
        auth: {
            user: process.env.MAIL_USERNAME,
            pass: process.env.MAIL_PASSWORD
        }
    });

    const mailOptions = {
        from: from,
        to: to,
        subject: subject,
        html: html
    };

    console.log(`Sending mail to - ${to}`);
    transporter.sendMail(mailOptions, (error, info)=> {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
  }

}
