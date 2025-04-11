/* eslint-disable @typescript-eslint/no-unnecessary-type-assertion */
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
    // Ensure employee is always a valid ObjectId
    const timeStamps = createTimeStampDtos.map((dto) => ({
      ...dto,
      employee:
        typeof dto.employee === 'string'
          ? new Types.ObjectId(dto.employee)
          : new Types.ObjectId(dto.employee._id),
    }));

    try {
      const newTimeStamps = await this.timeStampModel.insertMany(timeStamps);

      // Extract the inserted ObjectIds into an array
      const insertedIds = newTimeStamps.map((doc) => doc._id);

      return this.timeStampModel
        .find({ _id: { $in: insertedIds } })
        .populate('employee')
        .lean()
        .exec();
    } catch (error) {
      console.error(`Error creating timestamps: ${error.message}`);
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
      try {
        if (!dto._id) {
          throw new Error(`Missing _id for update.`);
        }

        const employeeId =
          typeof dto.employee === 'string'
            ? new Types.ObjectId(dto.employee)
            : new Types.ObjectId(dto.employee?._id as string); // ✅ Safe type assertion

        const updated = await this.timeStampModel
          .findOneAndUpdate(
            { _id: new Types.ObjectId(dto._id) }, // Ensure _id is ObjectId
            {
              ...dto,
              employee: employeeId,
            },
            { new: true },
          )
          .populate('employee')
          .exec();

        if (!updated) {
          throw new Error(`TimeStamp with ID ${dto._id} not found`);
        }

        updatedTimeStamps.push(updated);
      } catch (error) {
        console.error(`Error updating TimeStamp: ${error.message}`);
        throw new Error(
          `Error updating TimeStamp with ID ${dto._id}: ${error.message}`,
        );
      }
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
