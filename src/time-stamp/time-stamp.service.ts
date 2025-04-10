// src/time-stamp/time-stamp.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TimeStamp, TimeStampDocument } from './schema/time-stamp.schema';
import { CreateTimeStampDto } from './dto/create-time-stamp.dto';
import { UpdateTimeStampDto } from './dto/update-time-stamp.dto';

@Injectable()
export class TimeStampService {
  constructor(
    @InjectModel(TimeStamp.name)
    private timeStampModel: Model<TimeStampDocument>,
  ) {}

  // Create a new TimeStamp
  async create(createTimeStampDto: CreateTimeStampDto): Promise<TimeStamp> {
    const createdTimeStamp = new this.timeStampModel(createTimeStampDto);
    return createdTimeStamp.save();
  }

  // Get all TimeStamps
  async findAll(): Promise<TimeStamp[]> {
    return this.timeStampModel.find().populate('employee').exec();
  }

  // Get a specific TimeStamp by ID
  async findOne(id: string): Promise<TimeStamp> {
    const timeStamp = await this.timeStampModel
      .findById(id)
      .populate('employee')
      .exec();
    if (!timeStamp) {
      throw new NotFoundException(`TimeStamp with id ${id} not found`);
    }
    return timeStamp;
  }

  // Update an existing TimeStamp
  async update(
    id: string,
    updateTimeStampDto: UpdateTimeStampDto,
  ): Promise<TimeStamp> {
    const existingTimeStamp = await this.timeStampModel.findById(id).exec();
    if (!existingTimeStamp) {
      throw new NotFoundException(`TimeStamp with id ${id} not found`);
    }

    // Update fields
    Object.assign(existingTimeStamp, updateTimeStampDto);
    return existingTimeStamp.save();
  }

  // Delete a TimeStamp
  async remove(id: string): Promise<void> {
    const timeStamp = await this.timeStampModel.findById(id).exec();
    if (!timeStamp) {
      throw new NotFoundException(`TimeStamp with id ${id} not found`);
    }

    // Use deleteOne or delete() instead of remove
    await this.timeStampModel.deleteOne({ _id: id }).exec();
  }
}
