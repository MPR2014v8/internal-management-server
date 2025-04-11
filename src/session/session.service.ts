/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { Injectable, BadRequestException } from '@nestjs/common';
import { createResetPasswordSessionDto } from './dto/reset-password.dto';

import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Session, SessionDocument } from './schema/session.schema';
import { CreateSessionDto } from './dto/create-session.dto';

@Injectable()
export class SessionService {
  constructor(
    @InjectModel(Session.name) private sessionModel: Model<SessionDocument>,
  ) {}

  // Create multiple sessions
  async create(createSessionDtos: CreateSessionDto[]): Promise<Session[]> {
    const sessions = createSessionDtos.map((dto) => ({
      ...dto,
      user: new Types.ObjectId(dto.user),
    }));

    try {
      const newSessions = await this.sessionModel.insertMany(sessions);
      return this.sessionModel
        .find({ _id: { $in: newSessions.map((t) => t._id) } })
        .lean()
        .exec();
    } catch (error) {
      throw new Error(`Error creating sessions: ${error.message}`);
    }
  }

  // Get all sessions
  async findAll(): Promise<Session[]> {
    return this.sessionModel.find().populate('user').lean().exec();
  }

  // Get multiple sessions by a list of IDs
  async findManyByIds(ids: string[]): Promise<Session[]> {
    const objectIds = ids.map((id) => new Types.ObjectId(id));
    return this.sessionModel
      .find({ _id: { $in: objectIds } })
      .populate('user')
      .lean()
      .exec();
  }

  // Update multiple sessions
  async update(updateSessionDtos: CreateSessionDto[]): Promise<Session[]> {
    const updatedSessions: Session[] = [];

    for (const dto of updateSessionDtos) {
      const updated = await this.sessionModel
        .findOneAndUpdate(
          { _id: new Types.ObjectId(dto._id) },
          {
            ip: dto.ip,
            device: dto.device,
            token: dto.token,
            expiresAt: dto.expiresAt,
            user: new Types.ObjectId(dto.user),
          },
          { new: true }, // Return the updated document
        )
        .lean()
        .exec();

      if (!updated) {
        throw new Error(`Session with ID ${dto._id} not found`);
      }

      updatedSessions.push(updated);
    }

    return updatedSessions;
  }

  // Delete multiple sessions by IDs
  async remove(ids: string[]): Promise<void> {
    const objectIds = ids.map((id) => new Types.ObjectId(id));
    const result = await this.sessionModel
      .deleteMany({ _id: { $in: objectIds } })
      .exec();

    if (result.deletedCount === 0) {
      throw new Error('No sessions were deleted');
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

  async findByToken(token: string): Promise<SessionDocument | null> {
    try {
      return this.sessionModel.findOne({ token: token }).exec();
    } catch (error) {
      console.log('Error findByToken :', error);
      throw new BadRequestException();
    }
  }
}
