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
    // Map the DTOs to the appropriate format
    const sessions = createSessionDtos.map((dto) => {
      let userId: Types.ObjectId | null = null;

      // Check if the user is not null
      if (dto.user !== null) {
        // If user is a string (ObjectId)
        userId =
          typeof dto.user === 'string'
            ? new Types.ObjectId(dto.user)
            : // If user is an object containing _id
              new Types.ObjectId(dto.user._id);
      }

      return {
        ...dto,
        user: userId, // Convert user to ObjectId if not null
      };
    });

    try {
      // Insert the new sessions into the database
      const newSessions = await this.sessionModel.insertMany(sessions);

      // Extract the inserted IDs
      const insertedIds = newSessions.map((session) => session._id);

      // Return the newly inserted sessions
      return this.sessionModel
        .find({ _id: { $in: insertedIds } })
        .lean()
        .exec();
    } catch (error) {
      // Catch and throw any error that occurs during the creation process
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
      // Validate that _id exists
      if (!dto._id) {
        throw new Error('Session ID is required for update.');
      }

      // Handle user field - if user is null or an object, process accordingly
      let userId: Types.ObjectId | null = null;

      if (dto.user !== null) {
        // Check if user is a string (ObjectId) or an object with _id
        userId =
          typeof dto.user === 'string'
            ? new Types.ObjectId(dto.user)
            : new Types.ObjectId(dto.user._id);
      }

      // Prepare the update data
      const updateData: any = {
        ip: dto.ip,
        device: dto.device,
        token: dto.token,
        expiresAt: dto.expiresAt,
      };

      // Only include user if it's not null
      if (userId) {
        updateData.user = userId;
      }

      // Update the session in the database
      const updated = await this.sessionModel
        .findOneAndUpdate(
          { _id: new Types.ObjectId(dto._id) },
          updateData,
          { new: true }, // Return the updated document
        )
        .lean()
        .exec();

      // Handle case where session is not found
      if (!updated) {
        throw new Error(`Session with ID ${dto._id} not found`);
      }

      // Push updated session to the result array
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
