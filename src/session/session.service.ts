import { Injectable, BadRequestException } from '@nestjs/common';
import { createResetPasswordSessionDto } from './dto/reset-password.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Session, SessionDocument } from './schema/session.schema';
import { Model } from 'mongoose';

@Injectable()
export class SessionService {
  constructor(
    @InjectModel(Session.name) private sessionModel: Model<SessionDocument>,
  ) {}

  findAll() {
    try {
      return this.sessionModel.find().exec();
    } catch (error) {
      console.log('Error findAll:', error);
      throw new BadRequestException();
    }
  }

  async remove(id: string) {
    try {
      await this.sessionModel.findByIdAndDelete(id).exec();
      return `This action removes a #${id} session`;
    } catch (error) {
      console.log('Error remove :', error);
      throw new BadRequestException();
    }
  }

  createResetPasswordSession(createSessionDto: createResetPasswordSessionDto) {
    try {
      // console.log('createSessionDto : ', createSessionDto);
      const newSession = new this.sessionModel(createSessionDto);
      return newSession.save();
    } catch (error) {
      console.log('Error createResetPasswordSession :', error);
      throw new BadRequestException();
    }
  }

  async findByToken(token: string) {
    try {
      return this.sessionModel.findOne({ token: token }).exec();
    } catch (error) {
      console.log('Error findByToken :', error);
      throw new BadRequestException();
    }
  }
}
