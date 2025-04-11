/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { TimeStamp, TimeStampDocument } from './schema/time-stamp.schema';
import { CreateTimeStampDto } from './dto/create-time-stamp.dto';

@Injectable()
export class TimeStampService {
  constructor(
    @InjectModel(TimeStamp.name)
    private timeStampModel: Model<TimeStampDocument>,
  ) {}

  // Create multiple time stamps
  async create(
    createTimeStampDtos: CreateTimeStampDto[],
  ): Promise<TimeStamp[]> {
    const timeStamps = createTimeStampDtos.map((dto) => ({
      ...dto,
      employee: new Types.ObjectId(dto.employee),
    }));

    try {
      const newTimeStamps = await this.timeStampModel.insertMany(timeStamps, {
        rawResult: true, // Optional: Helps with debugging
      });

      return this.timeStampModel
        .find({ _id: { $in: newTimeStamps.insertedIds } })
        .lean()
        .exec();
    } catch (error) {
      throw new Error(`Error creating timestamps: ${error.message}`);
    }
  }

  // Get all time stamps
  async findAll(): Promise<TimeStamp[]> {
    return this.timeStampModel.find().populate('employee').exec();
  }

  // Get a single time stamp by ID
  async findOne(id: string): Promise<TimeStamp> {
    const timeStamp = await this.timeStampModel
      .findById(id)
      .populate('employee')
      .exec();
    if (!timeStamp) {
      throw new Error(`TimeStamp with ID ${id} not found`);
    }
    return timeStamp;
  }

  // Get multiple time stamps by IDs
  async findManyByIds(ids: string[]): Promise<TimeStamp[]> {
    const objectIds = ids.map((id) => new Types.ObjectId(id));
    const timeStamps = await this.timeStampModel
      .find({ _id: { $in: objectIds } })
      .populate('employee')
      .exec();

    if (!timeStamps || timeStamps.length === 0) {
      throw new Error('No timestamps found for the given IDs');
    }

    return timeStamps;
  }

  // Update multiple time stamps
  async update(
    updateTimeStampDtos: CreateTimeStampDto[],
  ): Promise<TimeStamp[]> {
    const updatedTimeStamps: TimeStamp[] = [];

    for (const dto of updateTimeStampDtos) {
      const updated = await this.timeStampModel
        .findOneAndUpdate(
          { _id: new Types.ObjectId(dto.id) },
          { ...dto, employee: new Types.ObjectId(dto.employee) },
          { new: true },
        )
        .populate('employee')
        .exec();

      if (!updated) {
        throw new Error(`TimeStamp with ID ${dto.id} not found`);
      }

      updatedTimeStamps.push(updated);
    }

    return updatedTimeStamps;
  }

  // Delete multiple time stamps by IDs
  async remove(ids: string[]): Promise<void> {
    const objectIds = ids.map((id) => new Types.ObjectId(id));
    const result = await this.timeStampModel
      .deleteMany({ _id: { $in: objectIds } })
      .exec();

    if (result.deletedCount === 0) {
      throw new Error('No timestamps were deleted');
    }
  }
}
