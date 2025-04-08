import { Injectable } from '@nestjs/common';
import { createResetPasswordSessionDto, CreateSessionDto } from './dto/create-session.dto';
import { UpdateSessionDto } from './dto/update-session.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Session, SessionDocument } from './schema/session.schema';
import { Model } from 'mongoose';

@Injectable()
export class SessionService {
  constructor(@InjectModel(Session.name) private sessionModel: Model<SessionDocument>) {}

  create(createSessionDto: CreateSessionDto) {
    return 'This action adds a new session';
  }

  findAll() {
    return this.sessionModel.find().exec();
  }

  findOne(id: number) {
    return `This action returns a #${id} session`;
  }

  update(id: number, updateSessionDto: UpdateSessionDto) {
    return `This action updates a #${id} session`;
  }

  remove(id: string) {
    this.sessionModel.findByIdAndDelete(id).exec();
    return `This action removes a #${id} session`;
  }

  createResetPasswordSession(createSessionDto: createResetPasswordSessionDto){
    // console.log('createSessionDto : ', createSessionDto);
    const newSession = new this.sessionModel(createSessionDto);
    return newSession.save();
  }

  async findByToken(token: string) {
    return this.sessionModel.findOne({ token:token,expiresAt: { $gt:new Date()} }).exec();
  }
}
